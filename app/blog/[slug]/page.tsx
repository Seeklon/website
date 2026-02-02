import { getPostBySlug, getAllPosts } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPostBySlug(params.slug)
    
    if (!post) {
        return {
            title: 'Article non trouvé',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `https://landing.seeklon.com/blog/${params.slug}`,
        },
    }
}

export default function BlogPost({ params }: Props) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="bg-background min-h-screen pb-24">
            
            {/* HEADER POST */}
            <div className="bg-[#0F172A] text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
                    
                    <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} className="mr-2" /> Retour au blog
                    </Link>
                    
                    <div className="flex items-center justify-center gap-4 text-sm font-medium text-primary-light mb-6">
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><Tag size={14}/> {post.category}</span>
                        <span className="flex items-center gap-1 text-slate-400"><Calendar size={14}/> {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>

                    <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* CONTENT */}
            <article className="container mx-auto px-4 -mt-10 relative z-20 max-w-3xl">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
                    
                    {/* Cover Image inside article */}
                    <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-10 bg-primary/5 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                            <Image 
                                src={post.coverImage} 
                                alt={post.title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark prose-img:rounded-xl">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100">
                        <div className="bg-primary/5 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary shrink-0">
                                <Image src="/logo.png" alt="Seeklon" fill className="object-contain p-2 invert brightness-0 grayscale-0" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-main text-lg mb-1">À propos de Seeklon</h3>
                                <p className="text-sm text-text-muted">
                                    Seeklon aide les PME à recruter simplement grâce à l'IA. 
                                    <Link href="/contact" className="text-primary font-bold ml-1 hover:underline">Découvrir la solution</Link>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </article>

        </div>
    )
}
