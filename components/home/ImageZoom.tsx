'use client'

import { useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

/**
 * The product captures are the one thing on the page people want to look at closely, and
 * they were 430px wide with no way in. Clicking one opens it on its own, centred. A
 * native <dialog> carries the focus trap, Esc and the backdrop for free.
 */
export default function ImageZoom({
  children,
  src,
  srcSet,
  alt,
  caption,
  openLabel,
  closeLabel,
  focusable = true,
}: {
  children: ReactNode
  src?: string
  srcSet?: string
  alt: string
  caption?: string
  openLabel: string
  closeLabel: string
  /** A slide that is off-screen is aria-hidden; its button must leave the tab order too. */
  focusable?: boolean
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        tabIndex={focusable ? 0 : -1}
        onClick={() => dialogRef.current?.showModal()}
        className="block w-full cursor-zoom-in rounded-[8px] text-left"
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
        className="max-h-[92vh] w-[min(1240px,92vw)] rounded-[24px] bg-white p-4 text-ink backdrop:bg-ink/55 md:p-6"
      >
        <figure className="m-0">
          <img src={src} srcSet={srcSet} alt={alt} className="h-auto w-full rounded-[12px]" />
          <figcaption className="mt-4 flex items-center justify-between gap-6 text-[15px] text-ink-soft">
            {caption}
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-150 hover:border-azure/40 hover:text-azure-deep"
              aria-label={closeLabel}
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </figcaption>
        </figure>
      </dialog>
    </>
  )
}
