import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Seeklon transforme l'approche du recrutement PME. L'outil fait gagner un temps précieux en ne présentant que les profils pertinents.",
    author: "Témoignage Mentor",
    role: "Expert Business"
  },
  {
    quote: "Une innovation prometteuse qui répond aux vrais besoins de tri et de qualification des candidats.",
    author: "Témoignage Équipe Pédagogique Epitech",
    role: "Direction"
  }
]

export default function SocialProof() {
  return (
      <section className="py-12 relative overflow-hidden bg-background">

        {/* --- SOLUTION : LE GRADIENT MASK --- */}
        <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-primary-light/15 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-12">
            Témoignages
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {testimonials.map((item, index) => (
                <div
                    key={index}
                    className="group relative p-8 rounded-2xl
                               bg-gradient-to-br from-white/60 via-white/30 to-white/10
                               backdrop-blur-xl backdrop-saturate-150
                               border border-white/50
                               shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                               hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]
                               hover:-translate-y-1 hover:bg-white/40
                               transition-all duration-300 text-left flex flex-col h-full"
                >
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
