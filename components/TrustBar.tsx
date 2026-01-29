import { Linkedin, Briefcase, Globe, Search, Building2, Users, MapPin } from 'lucide-react'

const JOB_BOARDS = [
    {
        name: "LinkedIn",
        icon: <Linkedin size={28} />,
        className: "text-[#0077b5]"
    },
    {
        name: "Indeed",
        icon: <Search size={28} strokeWidth={3} />,
        className: "text-[#2164f3]"
    },
    {
        name: "Monster",
        icon: <Briefcase size={28} />,
        className: "text-[#6e46ae]"
    },
    {
        name: "HelloWork",
        icon: <Globe size={28} />,
        className: "text-[#ff5252]"
    },
    {
        name: "Welcome to the Jungle",
        icon: <Building2 size={28} />,
        className: "text-[#FFD100] bg-black px-2 py-1 rounded" // WTTJ often uses yellow on black
    },
    {
        name: "Apec",
        icon: <Users size={28} />,
        className: "text-[#E84E89]"
    },
    {
        name: "France Travail",
        icon: <MapPin size={28} />,
        className: "text-[#003399]"
    },
    {
        name: "Glassdoor",
        icon: <Search size={28} />,
        className: "text-[#0CAA41]"
    }
]

export default function TrustBar() {
    return (
        <section className="py-10 border-b border-slate-100 bg-white/50 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-8">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    Compatible avec toutes les plateformes du marché

                </p>
            </div>
            
            <div className="relative w-full overflow-hidden">
                <div className="flex w-max animate-scroll">
                    {/* Première boucle */}
                    <div className="flex gap-16 px-8 items-center">
                        {JOB_BOARDS.map((board, index) => (
                            <div key={`list-1-${index}`} className={`flex items-center gap-3 font-bold text-xl whitespace-nowrap opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${board.className}`}>
                                {board.icon}
                                <span>{board.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Deuxième boucle pour l'effet infini */}
                    <div className="flex gap-16 px-8 items-center">
                        {JOB_BOARDS.map((board, index) => (
                            <div key={`list-2-${index}`} className={`flex items-center gap-3 font-bold text-xl whitespace-nowrap opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${board.className}`}>
                                {board.icon}
                                <span>{board.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Dégradés sur les côtés pour adoucir la coupure */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white/80 to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white/80 to-transparent pointer-events-none z-10" />
            </div>
        </section>
    )
}
