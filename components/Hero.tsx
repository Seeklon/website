import Button from './Button'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative bg-background py-20 md:py-32 overflow-hidden min-h-[85vh] flex items-center justify-center">

            {/* --- Z-INDEX 10 : CONTENU --- */}
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="font-heading text-4xl md:text-8xl font-extrabold text-text-main mb-6 leading-tight">
                    Seeklon. <br className="hidden md:block" />
                </h1>
                <h2 className="font-heading text-4xl md:text-6xl font-medium leading-tight">
                    Quand le talent émerge de <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                        la tempête
                    </span>
                </h2>

                <p className="font-sans text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto">
                    <br className="hidden md:block" />
                    Seeklon est la solution SaaS d’IA qui trie et score automatiquement vos candidatures pour garantir des recrutements durables.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/contact">
                        <Button className="w-full md:w-auto text-lg px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full transition-all shadow-lg shadow-primary/20">
                            Demander une démo
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline" className="w-full md:w-auto text-lg px-8 py-3 border border-primary/20 text-primary hover:bg-primary/5 rounded-full transition-all backdrop-blur-sm bg-white/30">
                            En savoir plus
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-0">

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
        </section>
    )
}