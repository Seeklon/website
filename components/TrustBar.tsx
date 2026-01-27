import { Linkedin, Briefcase, Globe, Search } from 'lucide-react'

export default function TrustBar() {
    return (
        <section className="py-10 border-b border-slate-100 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
                    Compatible avec vos plateformes préférées
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    
                    {/* LinkedIn Style */}
                    <div className="flex items-center gap-2 font-bold text-2xl text-[#0077b5]">
                        <Linkedin size={28} />
                        <span>LinkedIn</span>
                    </div>

                    {/* Indeed Style (Simulé) */}
                    <div className="flex items-center gap-2 font-bold text-2xl text-[#2164f3]">
                        <Search size={28} strokeWidth={3} className="text-[#2164f3]" />
                        <span className="font-sans tracking-tight">indeed</span>
                    </div>

                    {/* Monster Style (Simulé) */}
                    <div className="flex items-center gap-2 font-extrabold text-2xl text-[#6e46ae]">
                        <Briefcase size={28} />
                        <span className="font-serif tracking-tighter">MONSTER</span>
                    </div>

                    {/* HelloWork Style (Simulé) */}
                    <div className="flex items-center gap-2 font-bold text-2xl text-[#ff5252]">
                        <Globe size={28} />
                        <span>HelloWork</span>
                    </div>

                </div>
            </div>
        </section>
    )
}
