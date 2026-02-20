"use client"

import Button from './Button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function Hero() {
    const t = useTranslations('Hero')
    return (
        <section className="relative bg-background py-20 md:py-32 overflow-hidden min-h-[70vh] flex items-center">

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                        <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-text-main mb-8 leading-tight">
                            {t('titleBefore')}{" "}
                            <span className="font-accent italic text-primary" style={{ fontWeight: 600 }}>
                                {t('titleAccent')}
                            </span>
                        </h1>
                        <h2 className="font-heading text-xl md:text-2xl font-medium leading-relaxed text-text-muted mb-10 max-w-lg">
                            {t('subtitle')}
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 justify-start">
                            <Link href="/contact">
                                <Button className="w-full sm:w-auto text-lg px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full transition-all shadow-lg shadow-primary/20">
                                    {t('tryProduct')}
                                </Button>
                            </Link>
                            <Link href="/product">
                                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-3 border border-primary/20 text-primary hover:bg-primary/5 rounded-full transition-all backdrop-blur-sm bg-white/30">
                                    {t('howItWorks')}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:block h-full min-h-[400px] flex items-center justify-center">
                        <img 
                            src="/capdshbrdseeklon.png" 
                            alt={t('dashboardAlt')}
                            className="w-full h-auto rounded-lg shadow-2xl animate-bounce-slow object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none -z-0 [mask-image:radial-gradient(closest-side,black_30%,transparent_80%)]">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg_80deg,#3B82F6_120deg,transparent_180deg)] blur-[50px] opacity-60 mix-blend-multiply"></div>

                    {/* Bras 2 : Deep Royal (Décalé de 180deg) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[conic-gradient(from_180deg,transparent_0deg_80deg,#1A459C_120deg,transparent_180deg)] blur-[50px] opacity-60 mix-blend-multiply"></div>
                </div>
                <div className="absolute inset-0 animate-spin-reverse-slow opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-primary/20 border-dashed"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/10"></div>
                </div>

            </div>

            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none"></div>

        </section>
    )
}
