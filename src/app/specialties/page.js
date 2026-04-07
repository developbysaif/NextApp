"use client";

import React, { useState, useEffect } from 'react';
import ProductItem from '@/component/ProductItem';
import { Search, Flame, Droplets, Leaf, ArrowRight, CheckCircle2, ChevronRight, Activity, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SpecialtiesPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentWeekPlan, setCurrentWeekPlan] = useState(null);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    // Only show first 8 products for the specialties showcase
                    setProducts(data.data.slice(0, 8));
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Fetch Admin's Weekly Diet Plan Connection from Local Storage
    useEffect(() => {
        const getMealPlan = () => {
            const storedData = localStorage.getItem('adminWeeklyMealPlan');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                
                let weekToDisplay = null;
                if (Array.isArray(parsedData)) {
                    weekToDisplay = parsedData.find(w => w.status === 'Current') || parsedData[0];
                } else if (parsedData && Array.isArray(parsedData.data)) {
                    weekToDisplay = parsedData.data.find(w => w.status === 'Current') || parsedData.data[0];
                } else if (parsedData && parsedData.days) {
                    weekToDisplay = parsedData; // Single week format fallback
                }
                
                setCurrentWeekPlan(weekToDisplay);
            } else {
                // Default gracefully if admin hasn't configured it yet
                setCurrentWeekPlan(null);
            }
        };
        
        getMealPlan();
        
        // Listen to any cross-tab changes made by the Admin Panel
        window.addEventListener('storage', getMealPlan);
        return () => window.removeEventListener('storage', getMealPlan);
    }, []);

    const daysToShow = currentWeekPlan ? currentWeekPlan.days.slice(0, 4) : []; // Show first 4 days for UI balance

    return (
        <div className="min-h-screen bg-[#FCFAEF] font-sans pb-24">
            
            {/* Elegant Premium Hero Section */}
            <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
                {/* Background Image Header */}
                <div 
                    className="absolute inset-0 z-0 scale-105"
                    style={{
                        backgroundImage: `url("/organics-banner.png")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Dark gradient for text legibility without white blur */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a25]/80 via-black/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-[#B4E567] px-6 py-2 rounded-full border-2 border-white/40 mb-8 font-bold text-[10px] uppercase tracking-[0.25em] text-[#214a32] shadow-2xl"
                    >
                        <Leaf size={14} className="text-[#214a32]" /> Curated Health &amp; Vitality
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.9] mb-8"
                    >
                        DAILY ORGANIC <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B4E567] via-white to-white/60">SPECIALTIES</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl text-white/90 font-bold text-base md:text-lg tracking-tight mb-8 drop-shadow-lg"
                    >
                        Discover the purest ingredients hand-picked from fertile soil, designed to work in harmony with your personalized nutrition goals.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 px-8 py-4 rounded-3xl"
                    >
                         <div className="flex -space-x-3">
                             {[1,2,3].map(i => <div key={i} className="size-8 rounded-full border-2 border-[#214a32] bg-stone-200 overflow-hidden shadow-lg"><img src={`https://i.pravatar.cc/100?u=${i+10}`} className="size-full object-cover" /></div>)}
                         </div>
                         <p className="text-[11px] font-black uppercase tracking-widest text-white">Joined by 2.4k+ Health Enthusiasts</p>
                    </motion.div>
                </div>
                
                {/* Image is fully visible now without white blur transition */}
            </section>

            {/* Admin Connected Weekly Diet Plan Feature */}
            <section className="relative z-20 -mt-10 px-4 max-w-7xl mx-auto">
                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-[#FFD166]/10 transition-colors duration-1000" />
                    
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 border-b border-gray-50 pb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-[#B4E567]/20 text-[#214a32] p-2 rounded-xl"><Calendar size={18} /></span>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Weekly Diet Plan</h2>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">Synced instantly from your diet administrator via our portal.</p>
                        </div>
                        {currentWeekPlan && (
                            <div className="flex items-center gap-6 bg-gray-50 px-6 py-4 rounded-3xl border border-gray-100 shadow-inner">
                                <div className="text-center border-r border-gray-200 pr-6">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Week Status</p>
                                    <p className="text-[#214a32] font-black text-sm">{currentWeekPlan.status}</p>
                                </div>
                                <div className="text-center border-r border-gray-200 pr-6">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Duration</p>
                                    <p className="text-gray-800 font-black text-sm">{currentWeekPlan.startDate} - {currentWeekPlan.endDate}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Daily Goal</p>
                                    <p className="text-[#FF9F43] font-black text-sm">{currentWeekPlan.metrics?.dailyCalories || 2100} kcal</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {!currentWeekPlan ? (
                         <div className="text-center py-16 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                            <Activity size={40} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-black text-gray-900">No Weekly Diet Plan Found</h3>
                            <p className="text-sm font-medium tracking-wide text-gray-500 mb-6 max-w-md mx-auto">It looks like the admin hasn't generated your weekly diet plan yet. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {daysToShow.map((day, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={day.id} 
                                    className="bg-[#FCFAEF] rounded-[2rem] p-6 border border-[#214a32]/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
                                        <h4 className="font-black text-gray-900 text-lg">{day.name}</h4>
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${day.status === 'Completed' ? 'bg-[#B4E567] text-[#214a32]' : day.status === 'Today' ? 'bg-[#FFD166] text-[#856312]' : 'bg-white border border-gray-200 text-gray-500'}`}>
                                            {day.status}
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {day.meals.slice(0,2).map((meal, mIdx) => (
                                            <div key={mIdx} className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                                <div className="relative size-12 shrink-0 rounded-xl overflow-hidden shadow-sm">
                                                    <img src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&fit=crop"} className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-700" alt={meal.name} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{meal.type}</p>
                                                    <p className="text-xs font-black text-gray-800 leading-tight">{meal.name}</p>
                                                    <p className="text-[10px] font-bold text-[#FF9F43] mt-0.5 flex items-center gap-1"><Flame size={10} /> {meal.calories} kcal</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-8">
                                         <Link href="/dashboard/meal-plan" className="w-full py-3 bg-white border border-gray-100 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#214a32] hover:bg-[#214a32] hover:text-white transition-colors shadow-sm">
                                            View Full Plan <ChevronRight size={14} />
                                         </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Specialties Products Grid */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-end justify-between mb-12 border-b border-gray-200 pb-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Hand-Picked Organics</h2>
                        <p className="text-gray-500 font-medium mt-2">Recommended ingredients for your diet regimens.</p>
                    </div>
                     <Link href="/products" className="hidden md:flex items-center gap-2 text-[#214a32] font-bold hover:text-[#1a7a36] transition-colors">
                        Explore Shop <ArrowRight size={18} />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="h-80 bg-stone-50 rounded-3xl animate-pulse border border-stone-100" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((p, idx) => (
                            <ProductItem key={p._id || idx} product={p} index={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-stone-50 rounded-[2rem] border border-stone-100">
                        <Search size={40} className="mx-auto text-stone-300 mb-4" />
                        <h3 className="text-xl font-black text-gray-900">No products available</h3>
                        <p className="text-gray-500">Check back later for fresh organics.</p>
                    </div>
                )}
            </section>

        </div>
    );
}
