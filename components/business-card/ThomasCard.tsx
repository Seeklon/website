'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowUpRight, Download, Globe, Linkedin, Mail, Phone, QrCode, Share2, UserPlus, X } from 'lucide-react'
import { cardIdentity, type BusinessCard } from '@/lib/business-card'
import styles from './ThomasCard.module.css'

type Props = {
  card: BusinessCard
  qrDataUrl: string
  vCardHref: string
}

export default function ThomasCard({ card, qrDataUrl, vCardHref }: Props) {
  const { name, role, address } = cardIdentity(card)
  const dialog = useRef<HTMLDialogElement>(null)
  const qrButton = useRef<HTMLButtonElement>(null)
  const [exporting, setExporting] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [status, setStatus] = useState('')
  const [manualCopy, setManualCopy] = useState(false)

  async function downloadCard() {
    setExporting(true)
    setStatus('')
    try {
      const { createCardPng, downloadBlob } = await import('@/lib/card-export')
      downloadBlob(await createCardPng(card, qrDataUrl), `${card.filename}.png`)
      setStatus('Votre carte est prête dans les téléchargements.')
    } catch {
      setStatus('La carte n’a pas pu être créée. Vérifiez votre connexion et réessayez.')
    } finally {
      setExporting(false)
    }
  }

  async function shareCard() {
    setSharing(true)
    setStatus('')
    setManualCopy(false)
    try {
      if (navigator.share) {
        try {
          await navigator.share({ title: `${name} — ${card.organization}`, text: role, url: card.publicUrl })
          return
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return
        }
      }
      try {
        await navigator.clipboard.writeText(card.publicUrl)
        setStatus('Le lien de ma carte est copié.')
      } catch {
        setManualCopy(true)
        setStatus('Copiez le lien ci-dessous pour partager ma carte.')
      }
    } finally {
      setSharing(false)
    }
  }

  return (
    <main className={styles.page}>
      <article className={styles.card} aria-labelledby="card-name">
        <Image
          src={card.artwork}
          alt={card.artworkAlt}
          width={1280}
          height={857}
          priority
          unoptimized
          className={styles.artwork}
        />
        <div className={styles.content}>
          <h1 id="card-name" className={styles.name}>{name}</h1>
          <p className={styles.role}>{role}</p>
          <p className={styles.description}>{card.description}</p>

          <div className={styles.contacts}>
            {card.email && (
              <a href={`mailto:${card.email}`}><Mail size={18} aria-hidden="true" /><span>{card.email}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            )}
            <a href={card.website} target="_blank" rel="noopener noreferrer">
              <Globe size={18} aria-hidden="true" /><span>{new URL(card.website).hostname}</span><ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {card.linkedin && (
              <a href={card.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} aria-hidden="true" /><span>Mon LinkedIn</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            )}
            {card.phone && <a href={`tel:${card.phone}`}><Phone size={18} aria-hidden="true" /><span>{card.phone}</span><ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>

          <div className={styles.actions}>
            <a className={styles.primary} href={vCardHref} download={`${card.filename}.vcf`}>
              <UserPlus size={20} aria-hidden="true" />Ajouter à mes contacts
            </a>
            <button ref={qrButton} className={styles.secondary} onClick={() => dialog.current?.showModal()}>
              <QrCode size={20} aria-hidden="true" />Afficher mon QR code
            </button>
          </div>
          <div className={styles.utilities}>
            <button onClick={downloadCard} disabled={exporting} aria-busy={exporting}>
              <Download size={17} aria-hidden="true" />{exporting ? 'Création…' : 'Télécharger ma carte'}
            </button>
            <button onClick={shareCard} disabled={sharing}>
              <Share2 size={17} aria-hidden="true" />Partager
            </button>
          </div>
          <p className={styles.status} role="status" aria-live="polite">{status}</p>
          {manualCopy && (
            <label className={styles.copyLink}>
              Lien de ma carte
              <input readOnly value={card.publicUrl} onFocus={(event) => event.currentTarget.select()} />
            </label>
          )}
        </div>
      </article>

      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="qr-name"
        aria-describedby="qr-role"
        onClose={() => qrButton.current?.focus()}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}
      >
        <div className={styles.qrView}>
          <button className={styles.close} aria-label="Fermer le QR code" onClick={() => dialog.current?.close()} autoFocus>
            <X size={24} aria-hidden="true" />
          </button>
          <h2 id="qr-name">{name}</h2>
          <p id="qr-role">{role}</p>
          <Image src={qrDataUrl} alt={`QR code vers ${card.publicUrl}`} width={592} height={592} unoptimized className={styles.qrImage} />
          <p className={styles.scanHint}>Scannez pour garder le contact</p>
          <a className={styles.qrAddress} href={card.publicUrl}>{address}</a>
        </div>
      </dialog>
    </main>
  )
}
