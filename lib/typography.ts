const NBSP = ' '
const NARROW_NBSP = ' '

/**
 * French high punctuation takes a no-break space before it — a full one before the colon,
 * a narrow one before the others. The articles are written with a plain space, which lets
 * a line break in front of a colon; it showed on the blog titles. Applied at render, so
 * the markdown files stay easy to write.
 */
export function frenchSpacing(text: string, locale: string): string {
  if (locale === 'en') return text
  return text
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;!?%])/g, `${NARROW_NBSP}$1`)
    .replace(/«\s/g, `«${NARROW_NBSP}`)
    .replace(/\s»/g, `${NARROW_NBSP}»`)
}
