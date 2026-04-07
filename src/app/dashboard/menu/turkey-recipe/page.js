"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Clock, 
    Flame, 
    Star, 
    ChevronLeft, 
    Heart, 
    Share2, 
    Users, 
    Printer,
    ChefHat,
    ShoppingBasket,
    CheckCircle2,
    MessageSquare,
    Zap,
    Plus
} from 'lucide-react';
import Link from 'next/link';

export default function RecipeDetailPage() {
    const [activeTab, setActiveTab] = useState('directions'); // directions, nutrition, reviews

    const recipe = {
        name: 'Grilled Turkey Breast with Steamed Asparagus',
        rating: 4.8,
        reviews: 125,
        servings: 2,
        time: '10 min',
        calories: 450,
        description: 'This high-protein, low-carb meal is perfect for post-workout recovery or a healthy weight-loss dinner. The turkey is seasoned with herbs and grilled to perfection, served alongside tender steamed asparagus and a side of brown rice for energy.',
        ingredients: [
            { item: 'Turkey Breast', qty: '400g', note: 'Skinless, sliced' },
            { item: 'Asparagus', qty: '200g', note: 'Fresh, trimmed' },
            { item: 'Brown Rice', qty: '1 cup', note: 'Cooked' },
            { item: 'Olive Oil', qty: '2 tbsp', note: 'Extra virgin' },
            { item: 'Garlic', qty: '2 cloves', note: 'Minced' },
            { item: 'Lemon Juice', qty: '1 tbsp', note: 'Freshly squeezed' },
            { item: 'Herbs', qty: 'to taste', note: 'Thyme, Rosemary, Salt, Pepper' }
        ],
        nutrition: [
            { label: 'Calories', val: '450', unit: 'kcal' },
            { label: 'Protein', val: '42', unit: 'g' },
            { label: 'Carbs', val: '38', unit: 'g' },
            { label: 'Fat', val: '12', unit: 'g' },
            { label: 'Fiber', val: '6', unit: 'g' },
            { label: 'Sodium', val: '220', unit: 'mg' },
            { label: 'Vitamin C', val: '25', unit: '%' },
        ],
        tools: ['Grill pan', 'Steamer basket', 'Mixing bowl', 'Chef knife'],
        directions: [
            'Season turkey breast slices with minced garlic, herbs, salt, and pepper.',
            'Lightly brush the grill pan with olive oil and heat over medium-high heat.',
            'Place turkey on the pan and grill for 4-5 minutes per side until fully cooked.',
            'While turkey is grilling, place asparagus in a steamer basket over boiling water.',
            'Steam asparagus for 4 minutes until vibrant green and tender-crisp.',
            'Squeeze fresh lemon juice over the turkey and asparagus before serving.',
            'Plat with 1/2 cup of brown rice and serve immediately.'
        ]
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header / Nav */}
            <div className="flex items-center justify-between">
                <Link href="/dashboard/menu" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2E7D32] group">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:-translate-x-1 transition-transform"><ChevronLeft size={16} /></div>
                    Back to Menu
                </Link>
                <div className="flex items-center gap-2">
                    <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-rose-500 hover:shadow-lg transition-all"><Heart size={20} /></button>
                    <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-blue-500 hover:shadow-lg transition-all"><Share2 size={20} /></button>
                    <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-lg transition-all"><Printer size={20} /></button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative rounded-[4rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm"
                >
                    <img src="/P1.png" className="w-full aspect-square object-cover p-10 hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-10 left-10 p-4 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl flex items-center gap-2">
                        <Star size={18} className="text-amber-400" fill="currentColor" />
                        <span className="text-sm font-black font-outfit">{recipe.rating}</span>
                        <span className="text-[10px] font-bold text-gray-400">({recipe.reviews} Reviews)</span>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col justify-center space-y-8"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tight leading-tight text-gray-900">{recipe.name}</h1>
                        <p className="mt-6 text-gray-500 font-medium leading-relaxed tracking-tight">{recipe.description}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { label: 'Servings', val: recipe.servings, icon: Users, color: 'text-emerald-500' },
                            { label: 'Cook Time', val: recipe.time, icon: Clock, color: 'text-indigo-500' },
                            { label: 'Calories', val: recipe.calories, unit: 'kcal', icon: Flame, color: 'text-rose-500' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center flex flex-col items-center">
                                <div className={`${stat.color} p-3 rounded-2xl bg-gray-50 shadow-inner mb-3`}><stat.icon size={20} /></div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-black font-outfit leading-none">{stat.val}</span>
                                    {stat.unit && <span className="text-[10px] font-bold text-gray-400 capitalize">{stat.unit}</span>}
                                </div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex-1 bg-[#2E7D32] text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-green-900 transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-2">
                            <Plus size={18} /> Add to Meal Plan
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Recipe Content Tabs & Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10">
                <div className="lg:col-span-2 space-y-8">
                    {/* Floating Tabs */}
                    <div className="flex items-center gap-2 bg-gray-50/50 p-2 rounded-[2rem] w-fit">
                        {['directions', 'ingredients', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all
                                    ${activeTab === tab ? 'bg-white text-green-700 shadow-sm' : 'text-gray-400 hover:text-gray-600'}
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'directions' && (
                        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-green-50 text-green-700 rounded-3xl shadow-inner"><ChefHat size={28} /></div>
                                <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">Step-by-Step Directions</h3>
                            </div>
                            <div className="space-y-10">
                                {recipe.directions.map((step, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="shrink-0">
                                            <div className="size-10 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center font-black text-sm shadow-xl shadow-green-900/10 relative z-10 transition-transform group-hover:scale-110">
                                                {i + 1}
                                            </div>
                                            {i !== recipe.directions.length - 1 && (
                                                <div className="w-px h-16 bg-gray-100 mx-auto mt-4" />
                                            )}
                                        </div>
                                        <p className="text-gray-500 font-bold leading-relaxed tracking-tight py-2 uppercase text-[11px] group-hover:text-gray-900 transition-colors">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'ingredients' && (
                        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-green-50 text-green-700 rounded-3xl shadow-inner"><ShoppingBasket size={28} /></div>
                                <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">Ingredients List</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recipe.ingredients.map((ing, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="size-3 rounded-full bg-green-500" />
                                            <span className="text-[11px] font-black uppercase text-gray-800">{ing.item}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[11px] font-black text-[#2E7D32] block">{ing.qty}</span>
                                            <span className="text-[9px] font-bold text-gray-400 italic block">{ing.note}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                         <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-green-50 text-green-700 rounded-3xl shadow-inner"><MessageSquare size={28} /></div>
                                <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">User Reviews</h3>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { user: 'Sarah Murad', rating: 5, date: '2 days ago', body: 'This meal was so easy to prep and tastes so fresh! Perfect for weight loss.', avatar: 'https://i.pravatar.cc/150?u=sara' },
                                    { user: 'Linda Rawls', rating: 4.7, date: '1 week ago', body: 'The turkey was so juicy. Definitely a regular in my meal plan now.', avatar: 'https://i.pravatar.cc/150?u=linda' },
                                ].map((rev, i) => (
                                    <div key={i} className="flex gap-6 pb-8 border-b border-gray-50 last:border-none">
                                        <img src={rev.avatar} className="size-16 rounded-[1.5rem] shadow-md shrink-0" />
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4">
                                                <h4 className="text-sm font-black uppercase font-outfit">{rev.user}</h4>
                                                <span className="text-[10px] font-bold text-gray-400">{rev.date}</span>
                                            </div>
                                            <div className="flex gap-0.5 text-amber-400">
                                                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={12} fill={j < Math.floor(rev.rating) ? 'currentColor' : 'none'} />)}
                                            </div>
                                            <p className="text-[11px] font-bold text-gray-500 leading-relaxed uppercase tracking-tight">{rev.body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Nutrition Facts */}
                    <div className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 p-8 text-black/5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                            <Zap size={120} strokeWidth={1} />
                        </div>
                        <h3 className="text-xl font-black font-outfit uppercase mb-8 relative z-10">Nutrition Facts</h3>
                        <div className="space-y-5 relative z-10">
                            {recipe.nutrition.map((nut, i) => (
                                <div key={i} className="flex items-end justify-between border-b border-gray-50 pb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{nut.label}</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-black font-outfit">{nut.val}</span>
                                        <span className="text-[9px] font-bold text-gray-400">{nut.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-10 w-full py-4 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#2E7D32] hover:bg-green-50 transition-colors">
                            Full Daily Analysis
                        </button>
                    </div>

                    {/* Tools & Note */}
                    <div className="bg-[#2E7D32] p-8 rounded-[3.5rem] text-white shadow-xl shadow-green-900/10">
                        <h3 className="text-md font-black font-outfit uppercase mb-6 flex items-center gap-2">
                            <ChefHat size={20} /> Tools Needed
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {recipe.tools.map((tool, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                    <CheckCircle2 size={12} className="text-green-300" /> {tool}
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10 italic">
                            <p className="text-[10px] font-bold text-white/60 leading-relaxed uppercase tracking-tighter">
                                <b>Chef's Note:</b> For best flavor, marinate the turkey for at least 30 minutes before grilling. You can also use a Panini press if a grill pan is not available.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
