"use client"

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')
  return (
      <footer className="relative bg-[#0F172A] text-slate-400 py-12 overflow-hidden">

        {/* --- 1. LIGNE DE SÉPARATION LUMINEUSE (Top Glow) --- */}
        {/* Une ligne de lumière qui s'estompe sur les côtés. Très chic. */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

        {/* --- 2. FOND AMBIANT & WATERMARK --- */}
        {/* Un "S" géant ou le nom Seeklon en fond pour habiller */}
        <div className="absolute -bottom-20 -right-20 pointer-events-none select-none overflow-hidden">
        <span className="font-heading font-bold text-[12rem] leading-none text-white/[0.03] tracking-tighter whitespace-nowrap">
          SEEKLON
        </span>
        </div>

        {/* Petit brouillard bleu au fond à gauche pour la profondeur */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>


        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 mb-10">

            {/* Colonne 1 (Large - 4 cols) : Marque */}
            <div className="md:col-span-4 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                  {/* Logo avec filtre pour être blanc sur fond noir */}
                  <Image
                      src="/logo.png"
                      alt={t('logoAlt')}
                      fill
                      className="object-contain invert brightness-0 grayscale-0 opacity-90"
                  />
                </div>
                <span className="font-heading text-2xl font-bold text-white tracking-tight">
                  Seeklon
                </span>
              </Link>
              <p className="font-sans text-sm leading-relaxed max-w-sm text-slate-400">
                {t('tagline')}
              </p>
            </div>

            <div className="md:col-span-1"></div>

            <div className="md:col-span-2">
              <h3 className="font-heading font-semibold text-white mb-6">{t('product')}</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/#product" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('features')}</Link></li>
                <li><Link href="/contact" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('requestDemo')}</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-heading font-semibold text-white mb-6">{t('company')}</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/about" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('about')}</Link></li>
                <li><Link href="/blog" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('blog')}</Link></li>
                <li><Link href="/contact" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('contact')}</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-heading font-semibold text-white mb-6">{t('legal')}</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link href="/legal" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('legalMentions')}</Link></li>
                <li><Link href="/privacy" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('privacy')}</Link></li>
                <li><Link href="/rgpd" className="hover:text-primary-light hover:pl-1 transition-all duration-200">{t('cookies')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <div>
              © {new Date().getFullYear()} Seeklon Inc. {t('copyright')}
            </div>

            <div className="flex items-center gap-6">
              <Link href="https://www.linkedin.com/company/seeklon/" target="_blank" className="hover:text-white transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
