// components/Header.tsx
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-300
      bg-white/70 backdrop-blur-md
      border-b border-white/40 shadow-sm"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo Zone */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
                        <Image
                            src="../logo.png"
                            alt="Seeklon Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    {/* Typo Jakarta (Heading) + Couleur Primary (Deep Royal) */}
                    <span className="font-heading text-xl font-bold text-primary tracking-tight">
            Seeklon
          </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {['Accueil', 'À propos', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="font-sans text-sm font-medium text-text-muted hover:text-primary-light transition-colors relative group"
                        >
                            {item}
                            {/* Petit point bleu qui apparait au hover (Détail UX sympa) */}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-light transition-all group-hover:w-full rounded-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Action Zone */}
                <div className="hidden md:flex gap-4">
                    <Link href="/contact">
                        {/* Le bouton utilise déjà tes styles primary via le composant Button */}
                        <Button variant="primary" className="shadow-lg shadow-primary/20">
                            Demander une démo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Burger (Stylisé Frost) */}
                <button className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-md transition-colors">
                    <span className="sr-only">Menu</span>
                    <div className="w-6 h-0.5 bg-current mb-1.5 rounded-full"></div>
                    <div className="w-6 h-0.5 bg-current mb-1.5 rounded-full"></div>
                    <div className="w-6 h-0.5 bg-current rounded-full"></div>
                </button>
            </div>
        </header>
    )
}