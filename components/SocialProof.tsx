export default function SocialProof() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Ils nous font confiance</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="italic text-slate-600 mb-6">"Seeklon a transformé notre processus de recrutement. Nous avons gagné un temps précieux et trouvé des candidats qui correspondent vraiment à notre culture."</p>
            <div className="font-bold text-slate-900">Sophie M.</div>
            <div className="text-sm text-slate-500">DRH, TechStart</div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="italic text-slate-600 mb-6">"L'interface est intuitive et le tri par IA est impressionnant de précision. Un must-have pour les PME sans service RH dédié."</p>
            <div className="font-bold text-slate-900">Thomas L.</div>
            <div className="text-sm text-slate-500">CEO, InnovCorp</div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="italic text-slate-600 mb-6">"70% de temps gagné sur le tri des CVs. Le ROI est immédiat. Je recommande vivement."</p>
            <div className="font-bold text-slate-900">Marie D.</div>
            <div className="text-sm text-slate-500">Office Manager, GreenAgency</div>
          </div>
        </div>

        <div className="flex justify-center gap-12 opacity-50 grayscale">
          {/* Partner Logos removed as requested */}
      </div>
      </div>
    </section>
  )
}
