import { notFound } from 'next/navigation'

// Next only reaches a nested not-found.tsx when a route calls notFound(); an unmatched URL
// falls straight through to the root one. This catch-all puts stray paths back on the
// localized 404, with the sky, the nav and a way out.
export default function CatchAll() {
  notFound()
}
