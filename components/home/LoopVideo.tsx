'use client'

import { useEffect, useRef } from 'react'

/**
 * A silent product loop laid over its own first frame. The still underneath is the real
 * content — it is what paints first, what counts for LCP, and all there is with reduced
 * motion or without scripts. The video asks for nothing until the page has loaded and the
 * slot is on screen, fades in once it is actually playing, and pauses when it leaves.
 */
export default function LoopVideo({
  wide,
  narrow,
  narrowBelow = 1024,
  active = true,
  className = '',
}: {
  wide: string
  /** A lighter or differently framed file for small screens. */
  narrow?: string
  narrowBelow?: number
  /** A slide that is not the current one keeps its still. */
  active?: boolean
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const activeRef = useRef(active)
  const visibleRef = useRef(false)
  activeRef.current = active

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const sync = () => {
      if (visibleRef.current && activeRef.current) {
        if (!video.getAttribute('src')) {
          const file = narrow && window.innerWidth < narrowBelow ? narrow : wide
          // H.264 plays everywhere that matters and is decoded in hardware. The few browsers
          // built without it (some Linux Chromiums) get the VP9 file of the same name.
          const h264 = video.canPlayType('video/mp4; codecs="avc1.64001f"') !== ''
          video.src = h264 ? file : file.replace(/\.mp4$/, '.webm')
        }
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        sync()
      },
      // Low on purpose: on a 900px-high screen the hero capture shows a quarter of itself.
      { threshold: 0.12 },
    )
    const start = () => observer.observe(video)
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    video.addEventListener('sync', sync)
    return () => {
      observer.disconnect()
      window.removeEventListener('load', start)
      video.removeEventListener('sync', sync)
    }
  }, [wide, narrow, narrowBelow])

  useEffect(() => {
    ref.current?.dispatchEvent(new Event('sync'))
  }, [active])

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={(event) => {
        event.currentTarget.dataset.playing = 'true'
      }}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 data-[playing=true]:opacity-100 ${className}`}
    />
  )
}
