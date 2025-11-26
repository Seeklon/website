import Image from 'next/image'

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Notre Mission</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            « Rendre le recrutement aussi simple que postuler. »
          </p>
        </div>
      </section>

      {/* Story/Problem Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Pourquoi Seeklon ?</h2>
            <p className="text-slate-600 mb-4">
              Les dirigeants de PME sont souvent débordés. Sans service RH dédié, le recrutement devient une charge mentale et financière énorme.
            </p>
            <p className="text-slate-600 mb-4">
              Entre la surcharge de CVs à trier et le risque d'erreurs de recrutement coûteuses, il fallait une solution qui redonne de l'autonomie et de la simplicité.
            </p>
            <p className="text-slate-600 font-semibold">
              Seeklon est né de ce constat : l'IA doit être un soutien, pas un remplaçant, pour remettre l'humain au centre.
            </p>
          </div>
          <div className="bg-slate-100 h-80 rounded-2xl flex items-center justify-center text-slate-400">
            {/* Placeholder for Image */}
            <span>Illustration Mission / Team</span>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-slate-700 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-seeklon-blue">Simplicité</h3>
              <p className="text-slate-300">Des outils puissants mais accessibles à tous, sans jargon technique.</p>
            </div>
            <div className="p-6 border border-slate-700 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-seeklon-blue">Humain</h3>
              <p className="text-slate-300">L'IA facilite le tri, mais la décision finale et la relation restent humaines.</p>
            </div>
            <div className="p-6 border border-slate-700 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-seeklon-blue">Performance</h3>
              <p className="text-slate-300">Un gain de temps réel pour se concentrer sur la croissance de votre entreprise.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section (Simplified) */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">L'Équipe</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Une équipe passionnée par la tech et les RH, dédiée à la réussite des PME.
          </p>
           {/* Team placeholders would go here */}
        </div>
      </section>
    </div>
  )
}
