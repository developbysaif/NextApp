"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
    Clock, Gauge, Flame, Dumbbell, ArrowLeft, CheckCircle2, 
    Zap, Target, ShieldCheck, PlayCircle, BarChart, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ExerciseDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercise = () => {
            const savedExercises = JSON.parse(localStorage.getItem("adminExercises") || "[]");
            let found = savedExercises.find(ex => ex.slug === slug);
            
            // Fallback for sample demo data if not found in local storage
            if (!found) {
                const sampleData = [
                    { 
                        id: 1, 
                        title: "Morning Flow Yoga", 
                        slug: "morning-flow-yoga",
                        category: "Yoga", 
                        duration: 30, 
                        intensity: "Low", 
                        calories: 150, 
                        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000",
                        description: "Deep stretch and breathing exercises for a perfect morning start.",
                        steps: ["Begin in mountain pose", "Slowly lower into child's pose", "Transition to downward-facing dog", "Perform sun salutation A"],
                        benefits: ["Improves flexibility", "Relieves stress", "Increases morning focus"]
                    },
                    { 
                        id: 2, 
                        title: "Full Body Strength", 
                        slug: "full-body-strength",
                        category: "Strength", 
                        duration: 45, 
                        intensity: "High", 
                        calories: 450, 
                        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000",
                        description: "Target all major muscle groups with compound movements and resistance training.",
                        steps: ["Warm up with bodyweight squats", "Perform 3 sets of bench press", "Move to deadlifts with barbell", "Finish with core planks"],
                        benefits: ["Increases muscle mass", "Boosts metabolic rate", "Improves bone density"]
                    }
                ];
                found = sampleData.find(ex => ex.slug === slug);
            }
            
            if (found) {
                setExercise(found);
            }
            setLoading(false);
        };
        fetchExercise();
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-black text-[#215b33]">LOADING PROGRAM...</div>;
    if (!exercise) return <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center font-black text-gray-900 gap-4">
        <h2 className="text-4xl text-black">Exercise Not Found</h2>
        <Link href="/exercises" className="text-[#B4E567] uppercase tracking-widest text-xs">Return to Explorer</Link>
    </div>;

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans pb-24">
            
            {/* Split Type Hero Header */}
            <section className="relative h-[45vh] md:h-[55vh] flex items-end">
                <div className="absolute inset-0 z-0">
                    <img src={exercise.image} alt={exercise.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/40 to-black/30" />
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pb-12 flex flex-col items-start">
                    <Link href="/exercises" className="inline-flex items-center gap-2 text-[#215b33] font-black text-[13px] uppercase tracking-widest mb-10 hover:gap-3 transition-all bg-white/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-[#B4E567]/30 shadow-2xl">
                        <ArrowLeft size={16}/> Back to Programs
                    </Link>
                    
                    <div className="inline-flex items-center gap-2 bg-[#B4E567] text-[#215b33] px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest mb-6">
                        <Dumbbell size={14}/> {exercise.category} Program
                    </div>
                    
                    <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-[0.95] tracking-tight max-w-4xl">{exercise.title}</h1>
                </div>
            </section>

            {/* Main Content Layout */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
                
                {/* Left Column: Instructions & Details */}
                <div className="lg:col-span-8 flex flex-col gap-20">
                    
                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="w-10 h-10 bg-[#B4E567]/20 rounded-xl flex items-center justify-center text-[#215b33] mb-4"><Clock size={20}/></div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Duration</p>
                             <p className="text-xl font-black text-gray-900">{exercise.duration} MIN</p>
                         </div>
                         <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="w-10 h-10 bg-[#FFD166]/20 rounded-xl flex items-center justify-center text-[#8f680d] mb-4"><Gauge size={20}/></div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Intensity</p>
                             <p className="text-xl font-black text-gray-900">{exercise.intensity?.toUpperCase()}</p>
                         </div>
                         <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="w-10 h-10 bg-[#FF9F43]/20 rounded-xl flex items-center justify-center text-[#8c4d0f] mb-4"><Flame size={20}/></div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Calories</p>
                             <p className="text-xl font-black text-gray-900">{exercise.calories} KCAL</p>
                         </div>
                         <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                             <div className="w-10 h-10 bg-[#215b33]/10 rounded-xl flex items-center justify-center text-[#215b33] mb-4"><Zap size={20}/></div>
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Equipment</p>
                             <p className="text-xl font-black text-gray-900 line-clamp-1">{exercise.equipment || 'NONE'}</p>
                         </div>
                    </div>

                    {/* About Content */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="w-8 h-1 bg-[#B4E567] rounded-full inline-block" />
                            Program Overview
                        </h2>
                        <p className="text-lg text-gray-500 font-bold leading-relaxed max-w-4xl tracking-tight">
                            {exercise.description}
                        </p>
                    </div>

                    {/* Instructions List */}
                    <div className="flex flex-col gap-10 bg-white rounded-[4rem] p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Instructions</h2>
                        <div className="space-y-12">
                            {exercise.steps?.map((step, idx) => (
                                <div key={idx} className="flex gap-8 group">
                                    <div className="w-12 h-12 bg-[#FCFAEF] border-2 border-[#B4E567] rounded-2xl flex items-center justify-center font-black text-lg text-[#215b33] shrink-0 shadow-lg group-hover:bg-[#B4E567] transition-all duration-500">{idx + 1}</div>
                                    <div>
                                        <h4 className="text-xl font-black text-gray-900 mb-2 leading-tight">Step {idx + 1}</h4>
                                        <p className="text-base text-gray-500 font-bold leading-relaxed tracking-tight">{step}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Benefits & CTA */}
                <div className="lg:col-span-4 flex flex-col gap-10">
                    
                    {/* Benefits Card */}
                    <div className="bg-[#215b33] rounded-[3.5rem] p-10 text-white relative overflow-hidden flex flex-col gap-8 shadow-2xl">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#B4E567] rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                         
                         <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                             <Target size={24} className="text-[#B4E567]"/> Key Benefits
                         </h3>
                         
                         <div className="space-y-6">
                            {exercise.benefits?.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <CheckCircle2 size={24} className="text-[#B4E567] shrink-0" />
                                    <span className="text-[15px] font-black tracking-tight text-white/90">{benefit}</span>
                                </div>
                            ))}
                         </div>
                    </div>

                    {/* Mentors Card */}
                    <div className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-gray-50 flex flex-col gap-8">
                         <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                             <BarChart size={24} className="text-[#215b33]"/> Program Stats
                         </h3>
                         <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Medical Safety</span>
                                  <span className="text-xs font-black text-[#22aa4f] uppercase tracking-widest">High</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden"><div className="h-full bg-[#B4E567] w-[95%]"></div></div>
                              
                              <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Fat Loss Potential</span>
                                  <span className="text-xs font-black text-[#FF9F43] uppercase tracking-widest">Master</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden"><div className="h-full bg-[#FF9F43] w-[88%]"></div></div>

                              <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Core Engagement</span>
                                  <span className="text-xs font-black text-[#215b33] uppercase tracking-widest">Intense</span>
                              </div>
                              <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden"><div className="h-full bg-[#215b33] w-[92%]"></div></div>
                         </div>
                    </div>

                    {/* Start CTA */}
                    <button className="w-full py-6 bg-[#B4E567] text-gray-900 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-[#B4E567]/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group">
                         <PlayCircle size={22} className="group-hover:rotate-12 transition-transform duration-500" /> Start Training Now
                    </button>
                    
                    <div className="flex items-center justify-center gap-4 text-gray-400">
                         <ShieldCheck size={18} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Verified Program Guidance</span>
                    </div>
                </div>

            </section>
        </div>
    );
}
