import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Vos données sont précieuses. Notre infrastructure respecte les normes RGPD les plus strictes avec un hébergement sécurisé et souverain.",
    author: "Sécurité & confidentialité",
    role: "L'équipe de développement"
  },
  {
    quote: "L'approche innovante de Seeklon a fait l'unanimité. C'est pour son impact concret sur le recrutement que nous sommes fiers de lui décerner le prix Coup de Cœur du Jury.",
    author: "Hackathon BPI France",
    role: "Jury, BPI France"
  },
  {
    quote: "Une intelligence artificielle entraînée pour ignorer les données sensibles (âge, genre, origine) et se concentrer uniquement sur les compétences réelles.",
    author: "Tech & Ethique",
    role: "L'équipe de développement"
  }
]

export default function SocialProof() {
  return (
      <section className="py-24 relative overflow-hidden bg-background">

        {/* --- SOLUTION : LE GRADIENT MASK --- */}
        {/* Le masque rend les bords haut/bas transparents pour que les blobs s'effacent en douceur */}
        <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          {/* Blob Haut Gauche */}
          <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"></div>
          {/* Blob Bas Droite */}
          <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-primary-light/15 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-16">
            Faites nous confiance
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((item, index) => (
                <div
                    key={index}
                    // Style Apple Glass identique aux features
                    className="group relative p-8 rounded-2xl
                               bg-gradient-to-br from-white/60 via-white/30 to-white/10
                               backdrop-blur-xl backdrop-saturate-150
                               border border-white/50
                               shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                               hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                               hover:-translate-y-1 hover:bg-white/40
                               transition-all duration-300 text-left flex flex-col h-full"
                >
                  {/* Reflet spéculaire */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>

                  <Quote className="absolute top-6 right-6 text-primary/20 w-12 h-12 rotate-180 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[170deg]" />

                  <div className="flex-grow">
                    <p className="font-sans text-text-main italic mb-8 relative z-10 leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>

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
        </div>
      </section>
  )
}