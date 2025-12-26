import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Seeklon a transformé notre processus de recrutement. Nous avons gagné un temps précieux et trouvé des candidats qui correspondent vraiment à notre culture.",
    author: "Sophie M.",
    role: "DRH, TechStart"
  },
  {
    quote: "L'interface est intuitive et le tri par IA est impressionnant de précision. Un must-have pour les PME sans service RH dédié.",
    author: "Thomas L.",
    role: "CEO, InnovCorp"
  },
  {
    quote: "70% de temps gagné sur le tri des CVs. Le ROI est immédiat. Je recommande vivement pour toutes les agences en croissance.",
    author: "Marie D.",
    role: "Office Manager, GreenAgency"
  }
]

export default function SocialProof() {
  return (
      <section className="py-24 relative overflow-hidden bg-background">

        {/* --- 1. LE FOND VIVANT (Blobs identiques aux Features) --- */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Blob Haut Gauche pour éclairer le premier témoignage */}
          <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"></div>
          {/* Blob Bas Droite pour éclairer le dernier */}
          <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-primary-light/15 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-16">
            Ils nous font confiance
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((item, index) => (
                <div
                    key={index}
                    // --- 2. STYLE APPLE GLASS ---
                    // Copie exacte du style utilisé dans Features.tsx
                    className="group relative p-8 rounded-2xl
                               bg-gradient-to-br from-white/60 via-white/30 to-white/10
                               backdrop-blur-xl backdrop-saturate-150
                               border border-white/50
                               shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                               hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                               hover:-translate-y-1 hover:bg-white/40
                               transition-all duration-300 text-left flex flex-col h-full"
                >
                  {/* Reflet spéculaire (Lumière sur l'arête du haut) */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>

                  {/* Icône Quote : Un peu plus visible (primary/20) et s'anime au hover */}
                  <Quote className="absolute top-6 right-6 text-primary/20 w-12 h-12 rotate-180 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[170deg]" />

                  {/* Le contenu */}
                  <div className="flex-grow">
                    <p className="font-sans text-text-main italic mb-8 relative z-10 leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* L'auteur */}
                  <div className="border-t border-primary/10 pt-4 mt-auto">
                    <div className="font-heading font-bold text-primary">
                      {item.author}
                    </div>
                    <div className="font-sans text-sm text-text-muted font-medium">
                      {item.role}
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {/* Section Logos Partenaires */}
          <p className="font-sans text-sm text-text-muted uppercase tracking-widest mb-6">
            Déjà adopté par +50 entreprises innovantes
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale mix-blend-multiply">
            <div className="h-8 w-24 bg-slate-400/50 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-slate-400/50 rounded animate-pulse delay-100"></div>
            <div className="h-8 w-24 bg-slate-400/50 rounded animate-pulse delay-200"></div>
            <div className="h-8 w-24 bg-slate-400/50 rounded animate-pulse delay-300"></div>
          </div>
        </div>
      </section>
  )
}