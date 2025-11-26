// Component: Header
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
             {/* Note: Place your logo.png in the public folder */}
             <Image 
               src="/logo.png" 
               alt="Seeklon Logo" 
               fill
               className="object-contain"
               priority
             />
          </div>
          <span className="text-xl font-bold text-slate-900">Seeklon</span>
        </Link>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-slate-600 hover:text-seeklon-blue transition-colors">Accueil</Link>
          <Link href="/about" className="text-slate-600 hover:text-seeklon-blue transition-colors">À propos</Link>
          <Link href="/contact" className="text-slate-600 hover:text-seeklon-blue transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex gap-4">
          <Link href="/contact">
            <Button variant="primary">Demander une démo</Button>
          </Link>
        </div>
        
        <button className="md:hidden p-2">
           <span className="sr-only">Menu</span>
           <div className="w-6 h-0.5 bg-slate-800 mb-1"></div>
           <div className="w-6 h-0.5 bg-slate-800 mb-1"></div>
           <div className="w-6 h-0.5 bg-slate-800"></div>
        </button>
      </div>
    </header>
  )
}
