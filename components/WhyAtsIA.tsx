import { Clock, PiggyBank, Trophy, Shield } from 'lucide-react'

export default function WhyAtsIA() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 -left-20 w-[500px] h-[500px] bg-primary-light/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-main mb-6">
              Pourquoi choisir un ATS IA plutôt qu'un ATS classique ?
            </h2>
            <p className="text-lg text-text-muted leading-relaxed max-w-3xl mx-auto">
              Les ATS traditionnels se limitent à rechercher des mots-clés dans les CV, éliminant des talents qualifiés pour des raisons techniques. 
              L'IA sémantique de Seeklon <span className="font-bold text-green-600">identifie 3x plus de candidats pertinents</span> en analysant le sens, pas les mots.
            </p>
          </div>

          {/* Main content */}
          <div className="bg-white rounded-3xl shadow-xl border border-glass-border p-8 md:p-12 mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-main leading-relaxed mb-6">
                <span className="font-bold text-primary">L'ATS IA de Seeklon analyse le sens</span>, pas les mots. 
                Grâce au traitement du langage naturel, notre algorithme comprend le contexte des 
                expériences, détecte les soft skills et identifie les compétences transférables. 
                Résultat : <span className="font-semibold text-green-600">zéro faux négatif</span> dû à une variation de formulation.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              
              {/* Card 1: Time Savings */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <Clock className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">12h économisées</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">
                  par recrutement : automatisation du sourcing (4h), du tri CV (5h) et de la planification d'entretiens (3h).
                </p>
              </div>

              {/* Card 2: Cost Reduction */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <PiggyBank className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">-60% de coûts</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">
                  En internalisant le tri avec l'IA, vous économisez les frais de chasseurs de tête (15-20% du salaire brut) tout en gardant la qualité.
                </p>
              </div>

              {/* Card 3: Quality */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <Trophy className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">Top 1% des talents</h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed">
                  Notre IA analyse les soft skills et la compatibilité culturelle pour réduire le turnover précoce de 40%.
                </p>
              </div>

            </div>
          </div>

          {/* Trust Bar */}
          <div className="bg-text-main rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-primary/30">
                    <Shield className="text-primary-light" size={32} strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold mb-2">Solution 100% française et conforme RGPD</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Seeklon centralise vos candidatures provenant de LinkedIn, Indeed, Monster 
                    et génère des guides d'entretien personnalisés. Données hébergées en France, conformité RGPD garantie.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
