"use client"

import Button from '@/components/Button'
import { Mail, Linkedin, MapPin, Send, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {

  const FORMSPREE_CONTACT_ID = "xpqqzzan";
  const FORMSPREE_NEWSLETTER_ID = "xdaaoooe";

  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [isSuccessContact, setIsSuccessContact] = useState(false)

  const [isSubmittingNews, setIsSubmittingNews] = useState(false)
  const [isSuccessNews, setIsSuccessNews] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) setIsSuccessContact(true);
      else alert("Erreur lors de l'envoi du message.");
    } catch (error) {
      alert("Erreur de connexion.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingNews(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_NEWSLETTER_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) setIsSuccessNews(true);
      else alert("Erreur lors de l'inscription.");
    } catch (error) {
      alert("Erreur de connexion.");
    } finally {
      setIsSubmittingNews(false);
    }
  };

  return (
      <div className="relative min-h-screen bg-background overflow-hidden py-24">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-[100px] animate-pulse duration-[5000ms]"></div>
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse duration-[7000ms]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">

          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-6 tracking-wide uppercase">
              Parlons Recrutement
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-6">
              Une question ? <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              On vous écoute.
            </span>
            </h1>
            <p className="font-sans text-xl text-text-muted max-w-2xl mx-auto">
              Que ce soit pour une démo ou juste pour dire bonjour, notre équipe est prête à vous répondre.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">

            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-2xl font-bold text-text-main mb-6">Nos Coordonnées</h2>

                <a href="https://www.linkedin.com/company/seeklon" target="_blank" className="group flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/80 hover:scale-102 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#0077b5] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wide">Réseaux</p>
                    <p className="text-text-main font-medium group-hover:text-[#0077b5] transition-colors">Suivez-nous sur LinkedIn</p>
                  </div>
                </a>

                <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/80 transition-all duration-300">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wide">Bureau</p>
                    <p className="text-text-main font-medium">Paris, France</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl shadow-blue-900/10 group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

                <h3 className="font-heading text-xl font-bold mb-2 relative z-10">La Tempête RH 🌪️</h3>
                <p className="text-slate-400 text-sm mb-6 relative z-10">Recevez nos meilleurs conseils pour recruter sans stresser.</p>

                {!isSuccessNews ? (
                    <form className="flex gap-2 relative z-10" onSubmit={handleNewsletterSubmit}>
                      <input
                          required
                          name="email"
                          type="email"
                          placeholder="Votre email pro"
                          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:bg-white/20 focus:border-primary transition-all text-sm"
                      />
                      <button
                          type="submit"
                          disabled={isSubmittingNews}
                          className="bg-primary hover:bg-primary-light text-white p-3 rounded-xl transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmittingNews ? <Loader2 className="animate-spin" size={20}/> : <ArrowRight size={20} />}
                      </button>
                    </form>
                ) : (
                    // SUCCES NEWSLETTER
                    <div className="relative z-10 flex items-center gap-3 text-green-400 font-medium animate-in fade-in slide-in-from-left-4">
                      <CheckCircle size={20} />
                      <span>Vous êtes inscrit !</span>
                    </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 h-full">

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70"></div>

                {!isSuccessContact ? (
                    <>
                      <h2 className="text-2xl font-bold text-text-main mb-8 flex items-center gap-2">
                        Envoyez-nous un message
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      </h2>

                      <form className="space-y-6" onSubmit={handleContactSubmit}>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold text-text-muted ml-1">Nom complet</label>
                            <input required name="name" id="name" type="text" className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="company" className="text-sm font-semibold text-text-muted ml-1">Société</label>
                            <input name="company" id="company" type="text" className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm" placeholder="Votre entreprise" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-text-muted ml-1">Email professionnel</label>
                          <input required name="email" id="email" type="email" className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm" placeholder="john@company.com" />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-semibold text-text-muted ml-1">Message</label>
                          <textarea required name="message" id="message" rows={5} className="w-full px-5 py-4 rounded-xl bg-white/50 border border-transparent focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium text-text-main placeholder-slate-400 shadow-sm resize-none" placeholder="Dites-nous tout..."></textarea>
                        </div>

                        <div className="pt-4">
                          <Button
                              variant={"outline"}
                              type="submit"
                              disabled={isSubmittingContact}
                              className="w-full py-4 text-lg font-bold text-primary rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmittingContact ? (
                                "Envoi en cours..."
                            ) : (
                                <>
                                  <Send size={20} />
                                  Envoyer le message
                                </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                        <CheckCircle size={40} />
                      </div>
                      <h3 className="font-heading text-3xl font-bold text-text-main mb-4">Message reçu !</h3>
                      <p className="font-sans text-lg text-text-muted max-w-md">
                        Merci de nous avoir contactés. Notre équipe Seeklon a bien reçu votre demande et reviendra vers vous sous 24h.
                      </p>
                      <button
                          onClick={() => setIsSuccessContact(false)}
                          className="mt-8 text-primary font-medium hover:underline"
                      >
                        Envoyer un autre message
                      </button>
                    </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
  )
}