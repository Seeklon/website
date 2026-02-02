import Image from 'next/image'
import { Target, Heart, Zap, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/Button'

export default function About() {

  const membres = ["Thomas B", "Ilyes M", "Robin B", "Deniz U"]

  return (
      <div className="bg-background overflow-hidden">

        {/* HERO SECTION */}
        <section className="relative py-24 md:py-32 flex flex-col items-center text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[4000ms]"></div>

          <div className="container mx-auto px-4 relative z-10">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-8 leading-tight">
              Le recrutement, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
               enfin serein.
            </span>
            </h1>
            <p className="font-sans text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Nous croyons que chaque PME mérite d'accéder aux mêmes technologies que les géants de la Tech pour trouver les meilleurs talents.
            </p>
          </div>
        </section>

        {/* STORY SECTION : CHAOS VS CLARTÉ */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

            {/* Texte */}
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-main mb-6">
                Pourquoi Seeklon ?
              </h2>
              <div className="space-y-6 font-sans text-lg text-text-muted">
                <p>
                  Les dirigeants de PME sont des héros du quotidien, souvent débordés. Le recrutement devient vite une charge mentale qui freine la croissance.
                </p>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative">
                  <p className="font-medium text-primary italic relative z-10">
                    "Seeklon filtre le bruit pour que l'humain puisse se concentrer sur la rencontre authentique."
                  </p>
                </div>
              </div>
            </div>

            {/* --- VISUEL ANIMÉ --- */}
            <div className="relative h-[400px] w-full group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-light/5 rounded-3xl blur-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>

              <div className="relative h-full w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full p-8 flex flex-col justify-between items-center">

                  {/* 1. CHAOS ANIMÉ (Haut) */}
                  <div className="w-full flex justify-center items-end gap-1 h-16 opacity-60">
                    {[...Array(20)].map((_, i) => {
                      const height = Math.max(20, Math.random() * 100);
                      return (
                          <div
                              key={i}
                              className="w-1.5 bg-primary rounded-full animate-pulse"
                              style={{
                                height: `${height}%`,
                                animationDuration: '1s',
                                animationDelay: `${i * 0.05}s`
                              }}
                          ></div>
                      )
                    })}
                  </div>

                  {/* 2. LE FILTRE (Centre) */}
                  <div className="relative z-10 animate-bounce duration-[3000ms]">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                      <Zap className="text-white w-10 h-10" />
                    </div>
                    {/* Onde de choc */}
                    <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20"></div>
                  </div>

                  {/* 3. CLARTÉ (Bas) */}
                  <div className="w-48 h-16 rounded-2xl bg-white shadow-lg border border-white/80 flex items-center px-4 gap-3 transform hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <Target size={20}/>
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <div className="w-16 h-2 bg-slate-800 rounded-full opacity-20"></div>
                      <div className="w-full h-1.5 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-24 bg-[#0F172A] relative overflow-hidden text-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">Nos Valeurs</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, color: "blue", title: "Simplicité", text: "Des outils puissants qui s'utilisent comme une évidence. Pas de formation nécessaire." },
                { icon: Heart, color: "pink", title: "Authenticité", text: "L'IA gère le volume pour vous laisser gérer la relation humaine." },
                { icon: Zap, color: "amber", title: "Efficacité", text: "Chaque minute gagnée sur le tri est une minute investie dans votre croissance." }
              ].map((val, i) => (
                  <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl bg-${val.color}-500/20 flex items-center justify-center text-${val.color}-400 mb-6 group-hover:scale-110 transition-transform`}>
                      <val.icon size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-3 text-white">{val.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{val.text}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM & CTA */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-main mb-6">L'équipe Fondatrice</h2>
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="group relative w-64 h-80 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="absolute inset-0 bg-slate-50 flex items-center justify-center text-slate-300">
                      <Users size={48} opacity={0.5}/>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-white/90 backdrop-blur-md border-t border-slate-100">
                      <div className="font-bold text-text-main">{membres[i - 1]}</div>
                      <div className="text-xs text-primary font-medium uppercase">Co-Founder</div>
                    </div>
                  </div>
              ))}
            </div>

            <div className="bg-primary/5 rounded-3xl p-12 max-w-4xl mx-auto border border-primary/10">
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Prêt à simplifier vos recrutements ?</h3>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full shadow-lg shadow-primary/20 hover:-translate-y-1 transition-transform">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
  )
}
