"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    Search, Filter, Activity, Clock, Gauge, ArrowRight, ShieldCheck, 
    PlayCircle, Flame, Dumbbell, Sparkles, ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExercisesListingPage() {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const categories = ["All", "Strength", "Cardio", "Yoga", "Pilates", "Crossfit"];

    useEffect(() => {
        const fetchExercises = () => {
            const savedExercises = JSON.parse(localStorage.getItem("adminExercises") || "[]");
            // If empty, provide some elegant sample exercises that are connected
            if (savedExercises.length === 0) {
                const sampleData = [
                    { 
                        id: 1, 
                        title: "Morning Flow Yoga", 
                        slug: "morning-flow-yoga",
                        category: "Yoga", 
                        duration: 30, 
                        intensity: "Low", 
                        calories: 150, 
                        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
                        description: "Deep stretch and breathing exercises for a perfect morning start."
                    },
                    { 
                        id: 2, 
                        title: "Full Body Strength", 
                        slug: "full-body-strength",
                        category: "Strength", 
                        duration: 45, 
                        intensity: "High", 
                        calories: 450, 
                        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
                        description: "Target all major muscle groups with compound movements and resistance training."
                    },
                    { 
                        id: 3, 
                        title: "HIIT Cardio Blast", 
                        slug: "hiit-cardio-blast",
                        category: "Cardio", 
                        duration: 20, 
                        intensity: "High", 
                        calories: 300, 
                        image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=500",
                        description: "Short bursts of intense activity to maximize calorie burn and metabolic rate."
                    }
                ];
                setExercises(sampleData);
                setFilteredExercises(sampleData);
            } else {
                setExercises(savedExercises);
                setFilteredExercises(savedExercises);
            }
            setLoading(false);
        };
        fetchExercises();
        
        // Listen for admin changes
        window.addEventListener('storage', fetchExercises);
        return () => window.removeEventListener('storage', fetchExercises);
    }, []);

    useEffect(() => {
        let temp = [...exercises];
        if (activeCategory !== "All") {
            temp = temp.filter(ex => ex.category === activeCategory);
        }
        if (searchTerm) {
            temp = temp.filter(ex => 
                ex.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                ex.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredExercises(temp);
    }, [activeCategory, searchTerm, exercises]);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans">
            
            {/* Massive Premium Hero Section */}
            <section className="relative h-[65vh] md:h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image Header */}
                <div 
                    className="absolute inset-0 z-0 scale-105"
                    style={{
                        backgroundImage: `url("/exercise-banner.png")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-black/30 to-black/50" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-[#B4E567] px-6 py-2 rounded-full border-2 border-white/40 mb-6 font-bold text-[11px] uppercase tracking-widest text-[#215b33] shadow-2xl"
                    >
                        <Sparkles size={14} /> Global Training Hub
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.9] mb-8"
                    >
                        TRANSFORM YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B4E567] via-white to-white/60">LIFESTYLE TODAY</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl text-white/90 font-bold text-base md:text-lg tracking-tight mb-12 drop-shadow-lg"
                    >
                        Curated by world-class trainers and medical experts to provide you with scientific exercise programs that deliver results.
                    </motion.p>
                    
                    {/* Floating Search Bar */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-full max-w-xl bg-white/10 backdrop-blur-3xl border-2 border-white/20 p-2 rounded-3xl shadow-2xl flex items-center gap-2"
                    >
                        <div className="flex-1 relative flex items-center px-4">
                            <Search className="text-[#B4E567]" size={20} />
                            <input 
                                type="text"
                                placeholder="Find your workout program..."
                                className="w-full bg-transparent border-none focus:ring-0 py-3 px-4 text-white font-black text-sm placeholder:text-white/40 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="bg-[#B4E567] text-gray-900 h-12 px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-xl">Start Browsing</button>
                    </motion.div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent z-[11]" />
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 relative z-20 -mt-10">
                
                {/* Modern Filter Rail */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-[1.8rem] shadow-sm border border-gray-100 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap
                                    ${activeCategory === cat ? 'bg-[#215b33] text-white shadow-xl shadow-green-900/10' : 'text-gray-400 hover:text-gray-600'}
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                         <div className="flex gap-2 items-center bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:border-[#B4E567] transition-all">
                             <Filter size={16} className="text-[#B4E567]" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Show Advanced Filters</span>
                             <ChevronDown size={14} className="text-gray-400" />
                         </div>
                    </div>
                </div>

                {/* Grid Layout - 3D Card Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loading ? (
                        [1,2,3].map(i => <div key={i} className="h-[450px] bg-white rounded-[3rem] animate-pulse shadow-sm" />)
                    ) : filteredExercises.length > 0 ? (
                        filteredExercises.map((ex, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                key={ex.id} 
                                className="group bg-white rounded-[3rem] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col hover:shadow-2xl hover:shadow-[#B4E567]/10 transition-all hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4E567]/5 rounded-full blur-3xl -z-10" />
                                
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
                                    <img src={ex.image} alt={ex.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <div className="flex gap-4 text-white/90 text-[10px] font-black uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#B4E567]"/> {ex.duration} min</span>
                                            <span className="flex items-center gap-1.5"><Flame size={14} className="text-[#B4E567]"/> {ex.intensity}</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                                            {ex.category}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2 flex-1">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-4 group-hover:text-[#215b33] transition-colors">{ex.title}</h3>
                                    <p className="text-gray-400 font-bold text-sm line-clamp-3 mb-8 leading-relaxed">
                                        {ex.description}
                                    </p>
                                </div>

                                <div className="mt-auto px-2 pb-2">
                                     <Link 
                                        href={`/exercises/${ex.slug}`}
                                        className="w-full py-5 bg-[#FCFAEF] border border-[#B4E567]/30 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-gray-900 hover:bg-[#B4E567] hover:border-[#B4E567] transition-all group/btn group-hover:shadow-[0_10px_30px_rgba(180,229,103,0.3)] shadow-sm"
                                    >
                                        Explore Program <ArrowRight size={18} className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center">
                            <Activity size={60} className="mx-auto text-gray-200 mb-6" />
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">No Workout Programs Found</h3>
                            <p className="text-gray-400 font-bold mt-2">Try adjusting your filters or check back for new custom programs.</p>
                        </div>
                    )}
                </div>

                {/* Bottom Trust Section */}
                <div className="mt-32 bg-[#215b33] rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#B4E567] rounded-full blur-[160px] opacity-10 -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <div className="flex gap-2 items-center text-[#B4E567] font-black text-[10px] uppercase tracking-widest mb-6 justify-center md:justify-start">
                            <ShieldCheck size={16} /> Certified Quality
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mb-8">Ready to Build the Best Version of <span className="text-[#B4E567]">Yourself?</span></h2>
                        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                             <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 bg-[#B4E567] rounded-full" />
                                 <span className="text-white font-bold text-xs">Medical Approval</span>
                             </div>
                             <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 bg-[#B4E567] rounded-full" />
                                 <span className="text-white font-bold text-xs">Custom Progress Tracking</span>
                             </div>
                             <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 bg-[#B4E567] rounded-full" />
                                 <span className="text-white font-bold text-xs">Certified Mentors</span>
                             </div>
                        </div>
                    </div>

                    <div className="relative z-10 w-full md:w-auto">
                         <div className="bg-white p-1.5 rounded-[2.5rem] shadow-2xl flex items-center gap-6 overflow-hidden max-w-sm mx-auto">
                              <div className="aspect-square w-24 rounded-[2rem] overflow-hidden">
                                  <img src="https://images.unsplash.com/photo-1548690312-e3b507d17a4d?w=100" className="w-full h-full object-cover" />
                              </div>
                              <div className="pr-10">
                                  <p className="text-[10px] font-black text-[#22aa4f] uppercase tracking-widest mb-1">Join the community</p>
                                  <h4 className="text-lg font-black text-gray-900 leading-tight">Start with 14-days for free.</h4>
                                  <Link href="/signup" className="text-[#215b33] font-black text-[10px] flex items-center gap-1 mt-2 uppercase tracking-widest hover:gap-2 transition-all">Sign Up Now <ArrowRight size={14} /></Link>
                              </div>
                         </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
