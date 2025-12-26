import { CheckCircle, Clock, BarChart3, Users } from 'lucide-react'

const features = [
  {
    title: "Tri Automatisé",
    description: "L'IA analyse et classe les CV instantanément pour ne garder que le meilleur.",
    icon: CheckCircle
  },
  {
    title: "Matching Intelligent",
    description: "Un algorithme qui comprend vos besoins et trouve les profils compatibles.",
    icon: Users
  },
  {
    title: "Dashboard Analytique",
    description: "Suivez vos recrutements avec des données claires et des indicateurs de performance.",
    icon: BarChart3
  },
  {
    title: "Gain de Temps",
    description: "Réduisez de 70% le temps passé sur le tri des candidatures.",
    icon: Clock
  }
]

export default function Features() {
  return (
      <section className="py-24 bg-background relative overflow-hidden">

        {/* --- FOND VIVANT (Crucial pour l'effet verre) --- */}
        <div className="absolute inset-0 pointer-events-none">
          {/* J'ai intensifié un peu les blobs pour qu'ils traversent bien le verre */}
          <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-primary-light/15 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">
              Fonctionnalités Clés
            </h2>
            <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Tout ce dont vous avez besoin pour simplifier vos processus RH et recruter mieux.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="group relative p-8 rounded-2xl
                               bg-gradient-to-br from-white/60 via-white/30 to-white/10
                               backdrop-blur-xl backdrop-saturate-150
                               border border-white/50
                               shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                               hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                               hover:-translate-y-1 hover:bg-white/40
                               transition-all duration-300"
                >

                  {/* Reflet spéculaire (Lumière en haut à gauche) */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6
                                  bg-white/40 border border-white/60 shadow-inner
                                  text-primary transition-transform duration-300 group-hover:scale-110">
                    <feature.icon size={26} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text-main mb-3">
                    {feature.title}
                  </h3>

                  <p className="font-sans text-text-muted leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}