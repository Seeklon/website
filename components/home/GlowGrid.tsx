'use client'

import type { ReactNode } from 'react'

/**
 * A grid whose cards catch the light under the pointer: the listener sits on the grid and
 * writes the position into the hovered `.glow` card, so one handler serves every card.
 */
export default function GlowGrid({
  className,
  children,
  label,
  as: Tag = 'ul',
}: {
  className?: string
  children: ReactNode
  label?: string
  as?: 'ul' | 'div'
}) {
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>('.glow')
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    card.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag className={className} onPointerMove={onPointerMove} aria-label={label}>
      {children}
    </Tag>
  )
}
