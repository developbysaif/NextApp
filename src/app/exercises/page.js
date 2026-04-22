"use client"

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Dumbbell, Timer, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExercisesPublicPage() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await fetch('/api/exercises');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setExercises(data.filter(d => d.status === 'published'));
                }
            } catch (error) {
                console.error("Error fetching exercises:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExercises();
    }, []);

    const filtered = filter === 'all' ? exercises : exercises.filter(e => e.type === filter);

    return (
        <div className="bg-[#FDFBF7] min-h-screen text-gray-800 font-sans">
            <Header />

            {/* Hero Section */}
            <div className="bg-[#214a32] pt-32 pb-20 px-6 sm:px-12 relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6 mt-4">
                        Fitness <span className="text-[#a4d9bc]">& Recovery</span>
                    </h1>
                    <p className="text-[#a4d9bc] max-w-2xl mx-auto text-lg mb-10">
                        Explore daily home workouts, walking routines, and gym exercises designed for holistic health.
                    </p>
                    
                    <div className="flex justify-center flex-wrap gap-4">
                        {['all', 'home', 'walk', 'gym'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-[#a4d9bc] text-[#214a32] shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
                            >
                                {f} Exercises
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 sm:px-12 py-20">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#214a32]"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <Dumbbell size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800">No exercises found</h3>
                        <p className="text-gray-500 mt-2">Check back later for updated routines.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((ex, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={ex._id} 
                                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#a4d9bc] transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:-rotate-6 transition-transform ${ex.type === 'home' ? 'bg-orange-50 text-orange-600' : ex.type === 'gym' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        <Dumbbell size={24} />
                                    </div>
                                    <div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${ex.difficulty === 'beginner' ? 'bg-emerald-50 text-emerald-600' : ex.difficulty === 'intermediate' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {ex.difficulty}
                                        </span>
                                        <div className="text-xs font-bold text-gray-400 flex items-center gap-1 mt-2">
                                            <Timer size={14}/> {ex.duration}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 group-hover:text-[#214a32] transition-colors mb-3">
                                    {ex.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed bg-gray-50 p-4 rounded-xl">
                                    {ex.instructions}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
