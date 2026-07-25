"use client"

import Button from './Button'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

const SignalVortex3D = dynamic(() => import('./SignalVortex3D'), {
    ssr: false,
})

export default function Hero() {
    const t = useTranslations('Hero')
    const [canRenderRealtimeVortex, setCanRenderRealtimeVortex] = useState(false)
    const [isVortexReady, setIsVortexReady] = useState(false)

    useEffect(() => {
        const desktopQuery = window.matchMedia('(min-width: 1024px)')
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

        const updateRealtimeVortex = () => {
            const probe = document.createElement('canvas')
            const webglContext = (
                probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
                || probe.getContext('webgl', { failIfMajorPerformanceCaveat: true })
            )
            const webglSupported = Boolean(webglContext)
            const shouldRender = desktopQuery.matches && !reducedMotionQuery.matches && webglSupported

            webglContext?.getExtension('WEBGL_lose_context')?.loseContext()
            setCanRenderRealtimeVortex(shouldRender)
            if (!shouldRender) setIsVortexReady(false)
        }

        updateRealtimeVortex()
        desktopQuery.addEventListener('change', updateRealtimeVortex)
        reducedMotionQuery.addEventListener('change', updateRealtimeVortex)

        return () => {
            desktopQuery.removeEventListener('change', updateRealtimeVortex)
            reducedMotionQuery.removeEventListener('change', updateRealtimeVortex)
        }
    }, [])

    return (
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-background py-20 md:min-h-[calc(100svh-72px)] md:py-24">
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                    isVortexReady ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <Image
                    src="/product/signal-vortex.webp"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-90"
                />
            </div>

            {canRenderRealtimeVortex && (
                <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                        isVortexReady ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <SignalVortex3D onReady={() => setIsVortexReady(true)} />
                </div>
            )}

            <div className="relative z-10 mx-auto w-full max-w-[1800px] px-6 lg:px-10">
                <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6">
                    <div className="text-left">
                        <h1 className="mb-8 font-heading text-5xl font-extrabold leading-tight text-text-main md:text-7xl lg:max-w-[480px]">
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

                    <div
                        className="hidden min-h-[400px] items-center justify-center lg:flex"
                        style={{ perspective: 1400 }}
                    >
                        <div className="relative w-[115%] max-w-none origin-center">
                            <Image
                                src="/product/capture-synthetic.webp"
                                alt={t('dashboardAlt')}
                                width={1902}
                                height={827}
                                priority
                                sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 54vw, 0px"
                                className="h-auto w-full rounded-xl border border-white/80 object-cover shadow-[0_28px_80px_-30px_rgba(15,45,105,0.45)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </section>
    )
}
