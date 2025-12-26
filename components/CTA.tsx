// Component: CTA
import Button from './Button'
import Link from 'next/link'

export default function CTA() {
    return (
        <section className="relative py-24 overflow-hidden">

            {/* 1. FOND "DEEP ICE" */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark z-0"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light/30 rounded-full blur-2xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center relative z-10">

                <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Prêt à recruter durablement ?
                </h2>

                <p className="font-sans text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Rejoignez la beta et découvrez comment l'IA de Seeklon transforme votre gestion RH dès aujourd'hui.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">

                    {/* BOUTON 1 : Commencer maintenant */}
                    <Link href="/contact" className="w-full sm:w-auto">
                        <Button variant={"outline"}
                            className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-full transition-all duration-300
                           bg-white text-primary border-2 border-transparent
                           shadow-lg shadow-blue-900/10
                           hover:-translate-y-1 hover:bg-primary-dark hover:shadow-xl hover:shadow-blue-900/20 hover:text-white">
                            Commencer maintenant
                        </Button>
                    </Link>

                    {/* BOUTON 2 : En savoir plus */}
                    <Link href="/about" className="w-full sm:w-auto">
                        {/* On utilise le composant Button ici aussi pour garantir l'alignement parfait */}
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto px-8 py-4 text-lg font-medium rounded-full transition-all duration-300
                           text-white border-2 border-white/30 bg-transparent
                           hover:bg-white/10 hover:border-white"
                        >
                            En savoir plus
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}