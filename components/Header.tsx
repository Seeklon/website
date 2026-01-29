// components/Header.tsx
"use client"

import Link from 'next/link'
import Image from 'next/image'
import Button from './Button' // Assure-toi que ce chemin est correct
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react' // On utilise Lucide pour les icônes, c'est plus propre

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Nouvel état pour le menu

    const navItems = [
        { label: 'Accueil', href: '/' },
        { label: 'Produit', href: '/product' },
        // { label: 'Tarifs', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
        { label: 'À propos', href: '/about' },
        { label: 'Contact', href: '/contact' }
    ]

    // Gestion du scroll pour l'effet Frost
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Fermer le menu quand on redimensionne la fenêtre au-dessus de 'md'
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled || isMobileMenuOpen // On garde le fond blanc si le menu est ouvert
                    ? "bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm py-2"
                    : "bg-transparent border-b border-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between relative">

                {/* Logo Zone */}
                <Link href="/" className="flex items-center gap-2 group z-50" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Seeklon Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="font-heading text-2xl font-bold text-primary tracking-tight">
                        Seeklon
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="font-sans text-sm font-medium text-text-muted hover:text-primary-light transition-colors relative group"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-light transition-all group-hover:w-full rounded-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Action Zone (Desktop) */}
                <div className="hidden md:flex gap-4">
                    <Link href="/contact">
                        <Button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary/20 text-sm">
                            Testez le produit
                        </Button>
                    </Link>
                </div>

                {/* Mobile Burger Button */}
                {/* On bascule l'état au clic */}
                <button
                    className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-md transition-colors z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {/* Animation simple : Si ouvert on affiche X, sinon Menu */}
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* =========================================
                MOBILE MENU DROPDOWN
                ========================================= */}
            <div
                className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xl transition-all duration-300 origin-top md:hidden ${
                    isMobileMenuOpen
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-5 invisible"
                }`}
            >
                <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            // Fermer le menu au clic sur un lien
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-3 px-4 rounded-xl text-lg font-medium text-text-main hover:bg-primary/5 hover:text-primary transition-colors border border-transparent hover:border-primary/10"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="h-px bg-slate-100 my-2"></div>

                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium shadow-lg shadow-primary/20">
                            Testez le produit
                        </Button>
                    </Link>
                </div>
            </div>

        </header>
    )
}
