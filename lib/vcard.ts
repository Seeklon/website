import type { BusinessCard } from './business-card'

function escapeText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,')
}

// vCard folding is measured in UTF-8 bytes, without splitting a code point.
function foldLine(line: string): string {
  const encoder = new TextEncoder()
  let folded = ''
  let length = 0

  for (const character of Array.from(line)) {
    const bytes = encoder.encode(character).length
    if (length + bytes > 75) {
      folded += '\r\n '
      length = 1
    }
    folded += character
    length += bytes
  }

  return folded
}

export function createVCard(card: BusinessCard): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeText(card.lastName)};${escapeText(card.firstName)};;;`,
    `FN:${escapeText(`${card.firstName} ${card.lastName}`)}`,
    `ORG:${escapeText(card.organization)}`,
    `TITLE:${escapeText(card.role)}`,
    ...(card.email ? [`EMAIL;TYPE=INTERNET,WORK:${escapeText(card.email)}`] : []),
    ...(card.phone ? [`TEL;TYPE=WORK:${escapeText(card.phone)}`] : []),
    `URL:${card.website}`,
    `URL:${card.publicUrl}`,
    ...(card.linkedin ? [`X-SOCIALPROFILE;TYPE=linkedin:${card.linkedin}`] : []),
    `NOTE:${escapeText(card.description)}`,
    'END:VCARD',
  ]

  return `${lines.map(foldLine).join('\r\n')}\r\n`
}
