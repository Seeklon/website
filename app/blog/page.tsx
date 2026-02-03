import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { Calendar, ArrowRight } from 'lucide-react'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog Seeklon - Conseils Recrutement, RH & Marque Employeur',
    description: 'Conseils recrutement pour PME : rédiger une offre d\'emploi, améliorer l\'expérience candidat, utiliser l\'IA pour le tri de CV et développer votre marque employeur.',
    keywords: ['conseils recrutement', 'blog RH', 'marque employeur', 'expérience candidat', 'rédiger offre emploi', 'IA recrutement', 'conseils PME recrutement'],
    openGraph: {
        title: 'Blog Seeklon - Conseils Recrutement & Marque Employeur',
        description: 'Conseils recrutement pour PME : offres d\'emploi, expérience candidat, IA et marque employeur.',
        url: 'https://landing.seeklon.com/blog',
        siteName: 'Seeklon',
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog Seeklon - Conseils Recrutement & RH',
        description: 'Conseils recrutement pour PME : offres d\'emploi, expérience candidat et IA.',
    },
    alternates: {
        canonical: 'https://landing.seeklon.com/blog',
    },
}

export default function BlogIndex() {
    const posts = getAllPosts()

    return (
        <div className="bg-background min-h-screen">
            
            {/* HERO BLOG */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px]"></div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-text-main mb-6">
                        Conseils & Actualités
                    </h1>
                    <p className="font-sans text-xl text-text-muted max-w-2xl mx-auto">
                        Toutes les clés pour moderniser votre recrutement et attirer les meilleurs talents.
                    </p>
                </div>
            </section>

            {/* LISTE DES ARTICLES */}
            <section className="pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                                
                                {/* Image Cover */}
                                    <div className="relative h-48 w-full overflow-hidden bg-primary/5 p-4 flex items-center justify-center">
                                        <div className="relative w-24 h-24">
                                            <Image 
                                                src={post.coverImage} 
                                                alt={post.title}
                                                fill
                                                className="object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                        </div>
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                                        {post.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
                                        <Calendar size={14} />
                                        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    
                                    <h2 className="font-heading text-xl font-bold text-text-main mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    
                                    <p className="text-text-muted text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center text-primary font-bold text-sm">
                                        Lire l'article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
