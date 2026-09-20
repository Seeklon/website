import localFont from 'next/font/local'
import { Plus_Jakarta_Sans } from 'next/font/google'

// Host Grotesk (SIL OFL), variable 300–800, latin subset from Google Fonts.
export const hostGrotesk = localFont({
  src: './HostGrotesk-latin.woff2',
  weight: '300 800',
  display: 'swap',
  variable: '--font-host-grotesk',
})

// Genoid by Limitype, used for the "plus vite." accent only.
// This is the free *demo* build (personal use): a commercial licence is
// required before going live (https://www.limitype.com).
export const genoid = localFont({
  src: './GenoidDemo-Bold.woff2',
  weight: '700',
  display: 'swap',
  variable: '--font-genoid',
})

// Fonts of the other pages (app/[locale]/(site)), self-hosted instead of being fetched
// from Google Fonts / Fontshare on every page, the home page included.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const cabinetGrotesk = localFont({
  src: [
    { path: './site/CabinetGrotesk-400.woff2', weight: '400' },
    { path: './site/CabinetGrotesk-500.woff2', weight: '500' },
    { path: './site/CabinetGrotesk-700.woff2', weight: '700' },
    { path: './site/CabinetGrotesk-800.woff2', weight: '800' },
  ],
  display: 'swap',
  variable: '--font-cabinet',
})
