import Button from './Button'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function Pricing() {
    return (
        <section id="pricing" className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">
                        Tarification simple
                    </h2>
                    <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                        Choisissez l'offre adaptée à vos besoins de recrutement.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    
                    {/* START */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-heading text-xl font-bold text-text-main mb-2">Bêta</h3>
                        <div className="text-3xl font-bold text-primary mb-6">Gratuit</div>
                        <p className="text-sm text-text-muted mb-6 h-10">
                            Pour découvrir la puissance de l'IA Seeklon.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-text-muted">
                                <Check size={18} className="text-green-500" /> 1 offre d'emploi active
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-muted">
                                <Check size={18} className="text-green-500" /> Tri IA standard
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-muted">
                                <Check size={18} className="text-green-500" /> Support email
                            </li>
                        </ul>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full py-3 rounded-xl border-primary text-primary hover:bg-primary/5">
                                Accès Bêta
                            </Button>
                        </Link>
                    </div>

                    {/* PRO (Highlighted) */}
                    <div className="relative p-8 rounded-3xl bg-white border-2 border-primary shadow-xl scale-105 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                            Recommandé
                        </div>
                        <h3 className="font-heading text-xl font-bold text-text-main mb-2">Standard</h3>
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-primary">49€</span>
                            <span className="text-sm text-text-muted"> / mois</span>
                        </div>
                        <p className="text-sm text-text-muted mb-6 h-10">
                            Pour les PME qui recrutent régulièrement.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium">
                                <Check size={18} className="text-primary" /> Offres illimitées
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium">
                                <Check size={18} className="text-primary" /> Tri IA avancé & Scoring
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium">
                                <Check size={18} className="text-primary" /> Multidiffusion incluse
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-main font-medium">
                                <Check size={18} className="text-primary" /> Guides d'entretien IA
                            </li>
                        </ul>
                        <Link href="/contact">
                            <Button className="w-full py-3 rounded-xl bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20">
                                Commencer l'essai
                            </Button>
                        </Link>
                    </div>

                    {/* ENTREPRISE */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h3 className="font-heading text-xl font-bold text-text-main mb-2">Entreprise</h3>
                        <div className="text-3xl font-bold text-primary mb-6">Sur mesure</div>
                        <p className="text-sm text-text-muted mb-6 h-10">
                            Pour les gros volumes de recrutement.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-sm text-text-muted">
                                <Check size={18} className="text-green-500" /> Volume illimité
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-muted">
                                <Check size={18} className="text-green-500" /> Accompagnement personnalisé
                            </li>
                            <li className="flex items-center gap-3 text-sm text-text-muted">
                                <Check size={18} className="text-green-500" /> Facturation centralisée
                            </li>
                        </ul>
                        <Link href="/contact">
                            <Button variant="outline" className="w-full py-3 rounded-xl border-primary text-primary hover:bg-primary/5">
                                Contacter les ventes
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
