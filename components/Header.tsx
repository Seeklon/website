"use client"

import { Link, usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function Header() {
    const t = useTranslations('Header')
    const pricingT = useTranslations('Pricing')
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const switchLocale = (nextLocale: string) => {
        router.replace(`${pathname}${window.location.search}${window.location.hash}`, { locale: nextLocale })
    }

    const navItems = [
        { label: t('home'), href: '/' },
        { label: t('product'), href: '/product' },
        { label: t('pricing'), href: '/pricing' },
        { label: t('blog'), href: '/blog' },
        { label: t('about'), href: '/about' },
        { label: t('contact'), href: '/contact' }
    ]
    const isPricingPage = pathname === '/pricing'
    const primaryHref = isPricingPage ? '/contact?plan=beta' : '/contact'
    const primaryLabel = isPricingPage ? pricingT('betaCta') : t('tryProduct')

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
                            alt={t('logoAlt')}
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
                <div className="hidden md:flex gap-4 items-center">
                    <div className="flex gap-1 text-sm font-medium">
                        {['fr', 'en'].map((loc) => (
                            <button
                                key={loc}
                                onClick={() => switchLocale(loc)}
                                className={`px-2 py-1 rounded ${locale === loc ? 'text-primary font-bold bg-primary/10' : 'text-text-muted hover:text-primary'}`}
                            >
                                {loc.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <Link href={primaryHref} className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
                        {primaryLabel}
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

                    <div className="flex gap-2 py-2">
                        {['fr', 'en'].map((loc) => (
                            <button
                                key={loc}
                                onClick={() => { switchLocale(loc); setIsMobileMenuOpen(false); }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${locale === loc ? 'bg-primary text-white' : 'bg-slate-100 text-text-muted'}`}
                            >
                                {loc.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="h-px bg-slate-100 my-2"></div>

                    <Link href={primaryHref} onClick={() => setIsMobileMenuOpen(false)} className="block w-full rounded-lg bg-primary py-3 text-center font-medium text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30">
                        {primaryLabel}
                    </Link>
                </div>
            </div>

        </header>
    )
}
