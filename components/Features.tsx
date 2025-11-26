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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Fonctionnalités Clés</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Tout ce dont vous avez besoin pour simplifier vos processus RH et recruter mieux.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-seeklon-blue/10 rounded-xl flex items-center justify-center mb-4 text-seeklon-blue">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
