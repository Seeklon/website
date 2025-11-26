import Button from '@/components/Button'
import { Mail, Linkedin, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contactez-nous</h1>
          <p className="text-slate-600">
            Une question ? Une demande de démo ? Notre équipe est là pour vous répondre.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Nos Coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-seeklon-blue">
                    <Mail size={20} />
                  </div>
                  <a href="mailto:contact@seeklon.com" className="hover:text-seeklon-blue">contact@seeklon.com</a>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-seeklon-blue">
                    <Linkedin size={20} />
                  </div>
                  <a href="https://www.linkedin.com/company/seeklon" target="_blank" className="hover:text-seeklon-blue">Suivez-nous sur LinkedIn</a>
                </div>
                 <div className="flex items-center gap-4 text-slate-600">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-seeklon-blue">
                    <MapPin size={20} />
                  </div>
                  <span>Paris, France</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Newsletter</h3>
              <p className="text-slate-600 mb-4">Abonnez-vous à « La Tempête RH » pour recevoir nos derniers conseils.</p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-seeklon-blue"
                />
                <Button variant="primary" className="px-4">Ok</Button>
              </form>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-seeklon-blue/20 focus:border-seeklon-blue outline-none transition-all" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Société</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-seeklon-blue/20 focus:border-seeklon-blue outline-none transition-all" placeholder="Votre entreprise" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-seeklon-blue/20 focus:border-seeklon-blue outline-none transition-all" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-seeklon-blue/20 focus:border-seeklon-blue outline-none transition-all" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>
              <Button type="submit" variant="primary" className="w-full py-3">
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
