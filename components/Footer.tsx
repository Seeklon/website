import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">Seeklon</div>
            <p className="text-sm mb-4">
              Le vent tourne avec Seeklon. Recruter pour durer, pas pour remplacer dans 6 mois.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li><Link href="/about" className="hover:text-white">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Mentions légales</Link></li>
              <li><Link href="#" className="hover:text-white">RGPD</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
            <ul className="space-y-2">
              <li><Link href="https://www.linkedin.com/company/seeklon" target="_blank" className="hover:text-white">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Seeklon. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
