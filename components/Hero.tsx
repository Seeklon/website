import Button from './Button'
import Link from 'next/link'

export default function Hero() {
    return (
        // Utilisation de la couleur de fond 'Cloud Dancer' définie dans la config
        <section className="relative bg-background py-20 md:py-32 overflow-hidden">

            {/* Contenu principal */}
            <div className="container mx-auto px-4 text-center relative z-10">

                <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-6 leading-tight">
                    Quand le talent émerge de <br className="hidden md:block" />
                    {/* Gradient textuel utilisant le Royal Blue et l'Electric Frost */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            la tempête
          </span>
                </h1>

                <p className="font-sans text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto">
                    Seeklon est la solution SaaS d’IA qui trie et score automatiquement vos candidatures pour garantir des recrutements durables.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link href="/contact">
                        {/* Bouton Primaire (Royal Blue) */}
                        <Button className="w-full md:w-auto text-lg px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-full transition-all shadow-lg shadow-primary/20">
                            Demander une démo
                        </Button>
                    </Link>
                    <Link href="/about">
                        {/* Bouton Outline style 'Glass' */}
                        <Button className="w-full md:w-auto text-lg px-8 py-3 border border-primary/20 text-primary hover:bg-primary/5 rounded-full transition-all">
                            En savoir plus
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Background Elements (L'effet Frost/Atmosphère) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-0">
                {/* Blob 1 : Royal Blue - Animation lente */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob"></div>

                {/* Blob 2 : Electric Frost (plus clair) - Animation décalée */}
                <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary-light/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

                {/* Blob 3 : Ajout d'un blob central très subtil pour la profondeur */}
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>
        </section>
    )
}