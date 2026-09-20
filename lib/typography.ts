const NBSP = ' '
const NARROW_NBSP = ' '

/**
 * French typography, applied at render so the markdown files stay easy to write:
 * a no-break space before high punctuation (a full one before the colon, a narrow one
 * before the others), and real French quotation marks. Without the first rule a title
 * breaks in front of its colon; without the second, straight quotes sit next to the curly
 * apostrophes the rest of the site uses.
 */
export function frenchSpacing(text: string, locale: string): string {
  if (locale === 'en') return text
  return text
    .replace(/"([^"\n]+)"/g, `«${NARROW_NBSP}$1${NARROW_NBSP}»`)
    .replace(/ :/g, `${NBSP}:`)
    .replace(/ ([;!?%])/g, `${NARROW_NBSP}$1`)
    .replace(/«\s/g, `«${NARROW_NBSP}`)
    .replace(/\s»/g, `${NARROW_NBSP}»`)
}
