"use client"

import { Link, usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import Button from './Button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function Header() {
    const t = useTranslations('Header')
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const isBlog = pathname === '/blog' || (pathname && pathname.startsWith('/blog/'))

    const navItems = [
        { label: t('home'), href: '/' },
        { label: t('product'), href: '/product' },
        { label: t('blog'), href: '/blog' },
        { label: t('about'), href: '/about' },
        { label: t('contact'), href: '/contact' }
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
                isBlog
                    ? "blog-nav-header"
                    : isScrolled || isMobileMenuOpen
                        ? "bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm py-2"
                        : "bg-transparent border-b border-transparent py-4"
            }`}
        >
            <div className={`flex items-center justify-between relative ${isBlog ? 'max-w-[1280px] mx-auto px-6 md:px-16' : 'container mx-auto px-4'}`}>

                {/* Logo Zone */}
                <Link href={isBlog ? "/blog" : "/"} className={`z-50 ${isBlog ? 'blog-nav-logo' : 'flex items-center gap-2 group'}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {isBlog ? (
                        <span>Daily RH</span>
                    ) : (
                        <>
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
                        </>
                    )}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={isBlog ? "blog-nav-link" : "font-sans text-sm font-medium text-text-muted hover:text-primary-light transition-colors relative group"}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                            {!isBlog && <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-light transition-all group-hover:w-full rounded-full"></span>}
                        </Link>
                    ))}
                </nav>

                {/* Action Zone (Desktop) */}
                <div className="hidden md:flex gap-4 items-center">
                    <div className={`flex gap-1 ${isBlog ? 'blog-nav-locale' : 'text-sm font-medium'}`}>
                        {['fr', 'en'].map((loc) => (
                            <button
                                key={loc}
                                onClick={() => router.replace(pathname, { locale: loc })}
                                className={isBlog ? `px-2 py-1 ${locale === loc ? 'text-[#111] font-medium' : ''}` : `px-2 py-1 rounded ${locale === loc ? 'text-primary font-bold bg-primary/10' : 'text-text-muted hover:text-primary'}`}
                                data-active={isBlog ? locale === loc : undefined}
                            >
                                {loc.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        {isBlog ? (
                            <span className="blog-nav-cta">{t('tryProduct')}</span>
                        ) : (
                            <Button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-primary/20 text-sm">
                                {t('tryProduct')}
                            </Button>
                        )}
                    </Link>
                </div>

                {/* Mobile Burger Button */}
                <button
                    className={`md:hidden p-2 z-50 relative ${isBlog ? 'text-[#111] hover:bg-black/5 rounded' : 'text-primary hover:bg-primary/5 rounded-md transition-colors'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu dropdown */}
            <div
                className={`absolute top-full left-0 w-full transition-all duration-300 origin-top md:hidden ${
                    isBlog ? 'blog-mobile-menu' : 'bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xl'
                } ${
                    isMobileMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible"
                }`}
            >
                <div className={`${isBlog ? 'max-w-[1280px] mx-auto px-6 py-6' : 'container mx-auto px-4 py-6'} flex flex-col gap-4`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={isBlog ? "block py-3 px-4" : "block py-3 px-4 rounded-xl text-lg font-medium text-text-main hover:bg-primary/5 hover:text-primary transition-colors border border-transparent hover:border-primary/10"}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="flex gap-2 py-2">
                        {['fr', 'en'].map((loc) => (
                            <button
                                key={loc}
                                onClick={() => { router.replace(pathname, { locale: loc }); setIsMobileMenuOpen(false); }}
                                className={isBlog ? `px-3 py-1.5 text-sm ${locale === loc ? 'text-[#111] font-medium' : 'text-black/35'}` : `px-3 py-1.5 rounded-lg text-sm font-medium ${locale === loc ? 'bg-primary text-white' : 'bg-slate-100 text-text-muted'}`}
                            >
                                {loc.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    {!isBlog && <div className="h-px bg-slate-100 my-2"></div>}

                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={isBlog ? 'block' : ''}>
                        {isBlog ? (
                            <span className="blog-mobile-cta block w-full text-center py-3">
                                {t('tryProduct')}
                            </span>
                        ) : (
                            <Button className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium shadow-lg shadow-primary/20">
                                {t('tryProduct')}
                            </Button>
                        )}
                    </Link>
                </div>
            </div>

        </header>
    )
}
