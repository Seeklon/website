import Button from './Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          Quand le talent émerge de <span className="text-seeklon-blue">la tempête</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Seeklon est la solution SaaS d’IA qui trie et score automatiquement vos candidatures pour garantir des recrutements durables.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button variant="primary" className="w-full md:w-auto text-lg px-8 py-3">
              Demander une démo
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="w-full md:w-auto text-lg px-8 py-3">
              En savoir plus
            </Button>
          </Link>
        </div>
      </div>
      {/* Abstract Background Elements could go here */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 opacity-30">
         <div className="absolute -top-24 -right-24 w-96 h-96 bg-seeklon-blue/20 rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 -left-24 w-72 h-72 bg-seeklon-teal/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
