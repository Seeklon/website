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
    title: {
        default: 'Seeklon - Tri intelligent de candidatures par IA',
        template: '%s | Seeklon',
    },
    description: 'Simplifiez le processus de recrutement des PME grâce à notre ATS couplé à une IA de tri hiérarchisé.',
    keywords: ['ATS', 'recrutement', 'IA', 'tri CV', 'PME', 'candidatures', 'RH', 'ressources humaines', 'logiciel recrutement', 'scoring candidat', 'multidiffusion', 'jobboards', 'automatisation recrutement', 'logiciel RH', 'gestion candidatures', 'recrutement France'],
    authors: [{ name: 'Seeklon' }],
    creator: 'Seeklon',
    publisher: 'Seeklon',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/logo.png',
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://landing.seeklon.com',
        siteName: 'Seeklon',
        title: 'Seeklon - Tri intelligent de candidatures par IA',
        description: 'Simplifiez le processus de recrutement des PME grâce à notre ATS couplé à une IA de tri hiérarchisé.',
        images: [
            {
                url: '/logo.png',
                width: 512,
                height: 512,
                alt: 'Seeklon Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Seeklon - Tri intelligent de candidatures',
        description: 'Simplifiez le processus de recrutement des PME grâce à notre ATS couplé à une IA.',
        images: ['/logo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'google1f15b651a8454aac',
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