import { FileText, Share2, BrainCircuit, Trophy, Play } from 'lucide-react'

const steps = [
  {
    title: "Rédaction & Diffusion",
    description: "Le recruteur rédige son offre via le formulaire Seeklon et la poste en un clic sur les principaux sites (Monster, Indeed, LinkedIn, etc.).",
    icon: FileText
  },
  {
    title: "Centralisation",
    description: "Le format de l'offre oblige le candidat à postuler vers notre ATS, centralisant ainsi toutes les sources.",
    icon: Share2
  },
  {
    title: "Tri Intelligent IA",
    description: "Notre ATS couplé à l'IA effectue un tri hiérarchisé instantané des candidatures selon les critères spécifiés dans l'offre.",
    icon: BrainCircuit
  },
  {
    title: "Résultat Immédiat",
    description: "Vous ne lisez que les CV pertinents. Le gain de temps est considérable !",
    icon: Trophy
  }
]

export default function Features() {
  return (
      <section id="product" className="py-12 bg-background relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-primary-light/15 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">
              Comment ça marche ?
            </h2>
            <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Un processus simplifié pour vous concentrer sur l'essentiel : les talents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-10">
            {/* Ligne de connexion entre les étapes (Visible uniquement sur Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10"></div>

            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  
                  {/* Icon Circle */}
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-background shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>
                    <step.icon size={32} className="text-primary" strokeWidth={1.5} />
                    
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-2 border-white">
                        {index + 1}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-text-main mb-3">
                    {step.title}
                  </h3>

                  <p className="font-sans text-text-muted leading-relaxed text-sm max-w-xs">
                    {step.description}
                  </p>
                </div>
            ))}
          </div>

          {/* Placeholder Vidéo Démo */}
          <div className="max-w-4xl mx-auto">
             <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl group cursor-pointer">
                {/* Fond placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                           <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                        <p className="text-slate-400 font-medium">Voir la démo (1min)</p>
                    </div>
                </div>
                
                {/* Overlay effet "scan" ou tech */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
             </div>
          </div>

        </div>
      </section>
  )
}
