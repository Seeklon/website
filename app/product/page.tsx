import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { Bot, Share2, LayoutDashboard, Users, ShieldCheck, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

export default function Product() {
  return (
    <div className="bg-background overflow-hidden">

      {/* 1. HERO PRODUIT */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6 tracking-wide uppercase">
                Tour d'horizon
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-8 leading-tight">
              Une suite complète pour <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
               piloter vos recrutements.
              </span>
            </h1>
            <p className="font-sans text-xl text-text-muted mb-10 leading-relaxed">
              De la diffusion de l'offre à la signature du contrat, Seeklon automatise les tâches chronophages pour vous laisser vous concentrer sur l'humain.
            </p>
            
            <div className="relative w-full aspect-video bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden group">
                 {/* Simulation Interface Dashboard */}
                 <div className="absolute inset-0 bg-slate-800/50 flex flex-col p-6">
                    {/* Fake Header */}
                    <div className="h-12 w-full border-b border-white/10 flex items-center justify-between px-4 mb-6">
                        <div className="flex gap-4">
                            <div className="w-32 h-4 bg-white/10 rounded"></div>
                            <div className="w-20 h-4 bg-white/5 rounded"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary"></div>
                    </div>
                    {/* Fake Content */}
                    <div className="flex gap-6 h-full">
                        <div className="w-64 h-full bg-white/5 rounded-lg p-4 space-y-3 hidden md:block">
                            {[1,2,3,4].map(i => <div key={i} className="w-full h-8 bg-white/5 rounded"></div>)}
                        </div>
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between">
                                <div className="w-48 h-8 bg-white/10 rounded"></div>
                                <div className="w-24 h-8 bg-primary/20 rounded"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[1,2,3].map(i => <div key={i} className="h-24 bg-white/5 rounded-lg border border-white/5"></div>)}
                            </div>
                            <div className="space-y-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="h-16 bg-white/5 rounded-lg flex items-center px-4 gap-4 border border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-white/10"></div>
                                        <div className="flex-1 h-3 bg-white/10 rounded w-1/2"></div>
                                        <div className="w-20 h-6 bg-green-500/20 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>
                 
                 {/* Badge Overlay */}
                 <div className="absolute bottom-6 right-6 bg-white text-text-main px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 animate-bounce-slow">
                    <Bot className="text-primary" size={20} />
                    <span>IA Active</span>
                 </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPARATIF AVANT/APRÈS */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
            <h2 className="text-center font-heading text-3xl font-bold mb-12">Pourquoi changer ?</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* AVANT */}
                <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <XCircle size={100} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle size={20}/></span>
                        Recrutement Traditionnel
                    </h3>
                    <ul className="space-y-4 text-slate-600">
                        <li className="flex gap-3"><span className="text-red-400">✕</span> Multidiffusion manuelle (copier-coller)</li>
                        <li className="flex gap-3"><span className="text-red-400">✕</span> Réception des CV par email en vrac</li>
                        <li className="flex gap-3"><span className="text-red-400">✕</span> Tri manuel sur Excel (chronophage)</li>
                        <li className="flex gap-3"><span className="text-red-400">✕</span> Perte de candidatures intéressantes</li>
                    </ul>
                </div>

                {/* APRÈS */}
                <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-lg relative overflow-hidden ring-1 ring-green-500/20">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <CheckCircle2 size={100} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20}/></span>
                        Avec Seeklon
                    </h3>
                    <ul className="space-y-4 text-slate-700 font-medium">
                        <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> 1 clic pour diffuser partout</li>
                        <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> Centralisation automatique</li>
                        <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> L'IA pré-sélectionne le Top 10%</li>
                        <li className="flex gap-3"><CheckCircle2 size={20} className="text-green-500 shrink-0"/> Dashboard collaboratif</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* 3. DEEP DIVE FEATURES */}
      <section className="py-24">
        <div className="container mx-auto px-4 space-y-24">
            
            {/* Feature 1 : IA */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative h-[400px] bg-gradient-to-br from-primary/5 to-blue-50 rounded-3xl border border-primary/10 flex items-center justify-center p-8">
                     <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-4 max-w-sm border border-slate-100">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <span className="font-bold text-slate-700">Candidat #42</span>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Match 94%</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                            <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs font-semibold text-primary uppercase mb-2">Analyse IA</p>
                            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg leading-relaxed">
                                "Profil pertinent. Compétences techniques validées. Expérience en management alignée avec le besoin."
                            </p>
                        </div>
                     </div>
                </div>
                <div className="order-1 md:order-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                        <Bot size={24} />
                    </div>
                    <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">Une IA qui comprend, pas qui cherche.</h2>
                    <p className="text-lg text-text-muted mb-6 leading-relaxed">
                        Oubliez la recherche par mots-clés qui élimine les bons profils. Notre IA analyse la sémantique, le parcours et le potentiel. Elle lit le CV comme un humain expert le ferait, mais en une fraction de seconde.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-text-main"><CheckCircle2 size={18} className="text-primary"/> Scoring automatique (0 à 100%)</li>
                        <li className="flex items-center gap-2 text-text-main"><CheckCircle2 size={18} className="text-primary"/> Détection des soft skills</li>
                    </ul>
                </div>
            </div>

            {/* Feature 2 : Centralisation */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                        <Share2 size={24} />
                    </div>
                    <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">Diffusez une fois, recevez partout.</h2>
                    <p className="text-lg text-text-muted mb-6 leading-relaxed">
                        Connectez Seeklon à LinkedIn, Indeed, Monster et vos réseaux sociaux. Publiez votre offre depuis notre interface et laissez la magie opérer. Toutes les candidatures redescendent dans un pipeline unique.
                    </p>
                    <Link href="/contact">
                         <span className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                            Voir les intégrations <ArrowRight size={16}/>
                         </span>
                    </Link>
                </div>
                <div className="relative h-[400px] bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-purple-100 flex items-center justify-center">
                    {/* Visual representation of centralization */}
                    <div className="relative w-64 h-64">
                         <div className="absolute top-0 left-0 w-16 h-16 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold animate-pulse">in</div>
                         <div className="absolute top-0 right-0 w-16 h-16 bg-blue-700 rounded-xl shadow-lg flex items-center justify-center text-white font-bold animate-pulse" style={{animationDelay: '0.5s'}}>In</div>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white border-4 border-primary rounded-full shadow-2xl flex items-center justify-center z-10">
                             <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white">
                                 <Share2 />
                             </div>
                         </div>
                         {/* Lines connecting */}
                         <svg className="absolute inset-0 w-full h-full text-slate-300 -z-0" viewBox="0 0 100 100">
                             <line x1="20" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4"/>
                             <line x1="80" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4"/>
                         </svg>
                    </div>
                </div>
            </div>

            {/* Feature 3 : Collaboratif */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 relative h-[400px] bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden flex items-center justify-center">
                     <div className="w-3/4 bg-white shadow-xl rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">T</div>
                            <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none text-sm text-slate-600">
                                "J'adore ce profil ! Je l'ai mis en shortlist pour l'entretien."
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">A</div>
                            <div className="bg-primary text-white p-3 rounded-lg rounded-tr-none text-sm">
                                "Top, je bloque le créneau mardi à 14h."
                            </div>
                        </div>
                     </div>
                </div>
                <div className="order-1 md:order-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                        <Users size={24} />
                    </div>
                    <h2 className="font-heading text-3xl font-bold mb-4 text-text-main">Recrutez en équipe.</h2>
                    <p className="text-lg text-text-muted mb-6 leading-relaxed">
                        Le recrutement est un sport d'équipe. Partagez les profils, ajoutez des notes privées, @mentionnez vos collègues et prenez des décisions collégiales sans quitter la plateforme.
                    </p>
                </div>
            </div>

        </div>
      </section>

      {/* 4. SÉCURITÉ & TECH */}
      <section className="py-16 bg-[#0F172A] text-white">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl">
                <div className="flex items-start gap-6">
                    <ShieldCheck size={48} className="text-green-400 shrink-0" />
                    <div>
                        <h3 className="text-xl font-bold mb-2">Sécurité Enterprise-Grade</h3>
                        <p className="text-slate-400 max-w-lg">
                            Vos données sont hébergées en France (OVH/Scaleway) et chiffrées de bout en bout. Nous sommes conformes RGPD et ne revendons jamais vos données candidats.
                        </p>
                    </div>
                </div>
                <div>
                     <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-500/10 text-green-400 font-bold border border-green-500/20">
                        <CheckCircle2 size={16} className="mr-2"/> Conforme RGPD
                     </span>
                </div>
            </div>
        </div>
      </section>

      {/* 5. CTA BOTTOM */}
      <section className="py-24 text-center">
         <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-main mb-8">
                Prêt à moderniser votre recrutement ?
            </h2>
            <Link href="/contact">
                <Button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 text-xl rounded-full shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform">
                    Démarrer la Bêta Gratuite
                </Button>
            </Link>
            <p className="mt-6 text-text-muted text-sm">Aucune carte bancaire requise • Installation en 2 min</p>
         </div>
      </section>

    </div>
  )
}
