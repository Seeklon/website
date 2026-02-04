"use client"

import Button from './Button'

export default function Newsletter() {
    return (
        <section className="py-12 bg-background relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center bg-white/50 backdrop-blur-sm border border-white/60 rounded-3xl p-8 md:p-12 shadow-sm">
                    <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                        Recevez la newsletter
                    </h2>
                    <p className="font-sans text-text-muted mb-8 text-lg">
                        Recevez nos conseils pour optimiser vos recrutements.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="Votre email professionnel" 
                            className="flex-grow px-6 py-3 rounded-full border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                            required 
                        />
                        <Button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-primary/20 transition-all">
                            S'inscrire
                        </Button>
                    </form>
                    <p className="text-xs text-text-muted mt-4">
                        Nous respectons vos données. Désinscription à tout moment.
                    </p>
                </div>
             </div>
        </section>
    )
}
