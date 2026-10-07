import { cardIdentity, type BusinessCard } from './business-card'

export const CARD_FONT = 'Seeklon Card'

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const timeout = window.setTimeout(() => reject(new Error('Image loading timed out')), 15000)
    image.onload = () => {
      window.clearTimeout(timeout)
      resolve(image)
    }
    image.onerror = () => {
      window.clearTimeout(timeout)
      reject(new Error('Could not load the card artwork'))
    }
    image.src = src
  })
}

function drawWrappedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, lineHeight: number) {
  let line = ''
  for (const word of text.split(' ')) {
    const candidate = line ? `${line} ${word}` : word
    if (line && context.measureText(candidate).width > width) {
      context.fillText(line, x, y)
      y += lineHeight
      line = word
    } else {
      line = candidate
    }
  }
  context.fillText(line, x, y)
}

export async function createCardPng(card: BusinessCard, qrDataUrl: string): Promise<Blob> {
  const [artwork, qr, regularFont, boldFont] = await Promise.all([
    loadImage(card.artwork),
    loadImage(qrDataUrl),
    document.fonts.load(`400 36px "${CARD_FONT}"`),
    document.fonts.load(`700 80px "${CARD_FONT}"`),
  ])

  if (!regularFont.length || !boldFont.length) {
    throw new Error('The card font is not available')
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is not available')

  const { name, role, address } = cardIdentity(card)
  context.fillStyle = '#104dad'
  context.fillRect(0, 0, canvas.width, canvas.height)
  // Preserve the full supplied artwork, including its original wordmark.
  context.drawImage(artwork, 0, 0, 1080, 1080 * artwork.naturalHeight / artwork.naturalWidth)
  context.fillStyle = '#ffffff'
  context.textBaseline = 'top'
  context.font = `700 80px "${CARD_FONT}"`
  context.fillText(name, 90, 790)
  context.font = `400 36px "${CARD_FONT}"`
  context.fillText(role, 90, 902)
  context.font = `400 34px "${CARD_FONT}"`
  drawWrappedText(context, card.description, 90, 990, 900, 52)

  // Reuse the exact same QR as the screen, at its native integer module scale.
  // Its opaque white background already includes a four-module quiet zone.
  context.imageSmoothingEnabled = false
  context.drawImage(qr, (1080 - qr.naturalWidth) / 2, 1190)
  context.textAlign = 'center'
  context.font = `400 32px "${CARD_FONT}"`
  context.fillText(address, 540, 1810)
  if (card.email) {
    context.font = `400 27px "${CARD_FONT}"`
    context.fillText(card.email, 540, 1870)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('PNG export failed')), 'image/png')
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  // Give mobile browsers time to hand the file to their download manager.
  window.setTimeout(() => URL.revokeObjectURL(url), 60000)
}
