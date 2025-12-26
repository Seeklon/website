// components/Header.tsx
"use client"

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useState, useEffect } from 'react'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    // Configuration des liens du menu
    // C'est ici qu'on définit : Label (Texte) vs Href (Lien)
    const navItems = [
        { label: 'Accueil', href: '/' },
        { label: 'À propos', href: '/about' }, // Lien vers /about, mais affiche "À propos"
        { label: 'Contact', href: '/contact' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/70 backdrop-blur-sm border-b border-white/40 shadow-sm py-2"
                    : "bg-transparent border-b border-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">

                {/* Logo Zone */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Seeklon Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-heading text-xl font-bold text-primary tracking-tight">
                        Seeklon
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {/* On boucle sur notre tableau d'objets navItems */}
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="font-sans text-sm font-medium text-text-muted hover:text-primary-light transition-colors relative group"
                        >
                            {/* On affiche le Label ("À propos") */}
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-light transition-all group-hover:w-full rounded-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Action Zone */}
                <div className="hidden md:flex gap-4">
                    <Link href="/contact">
                        <Button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary/20 text-sm">
                            Demander une démo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Burger */}
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