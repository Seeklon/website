import './globals.css'
import type {Metadata} from 'next'
// 1. Import des deux familles de polices
import {DM_Sans, Plus_Jakarta_Sans} from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// 2. Configuration de DM Sans (Corps de texte)
// On ajoute 'variable' pour que Tailwind puisse l'utiliser
const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
})

// 3. Configuration de Jakarta (Titres)
const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://landing.seeklon.com'),
    title: 'Seeklon - Tri intelligent de candidatures',
    description: 'Simplifiez le processus de recrutement des PME grâce à notre ATS couplé à une IA de tri hiérarchisé.',
    icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/logo.png',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
        <body className={`
        ${dmSans.variable} 
        ${jakarta.variable} 
        font-sans 
        bg-background 
        text-text-main
        antialiased
      `}>
        <Header/>
        <main className="min-h-screen pt-16">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    )
}