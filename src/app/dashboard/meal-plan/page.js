"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar as CalendarIcon, 
    ChevronLeft, 
    ChevronRight, 
    Plus, 
    Settings2, 
    Zap, 
    Utensils, 
    CheckCircle2, 
    Clock, 
    Flame,
    Share2,
    Download,
    Trash2,
    BarChart3
} from 'lucide-react';

export default function MealPlanPage() {
    const [view, setView] = useState('weekly'); // weekly, daily
    const [currentWeek, setCurrentWeek] = useState('Week 1'); 
    const [days, setDays] = useState([
        { name: 'Sunday', date: 'Oct 1', meals: { breakfast: 'Scrambled Eggs with Spinach', lunch: 'Grilled Chicken Wrap', snack: 'Mixed Nuts', dinner: 'Baked Salmon with Broccoli' } },
        { name: 'Monday', date: 'Oct 2', meals: { breakfast: 'Avocado Toast', lunch: 'Quinoa Salad', snack: 'Apple with Peanut Butter', dinner: 'Grilled Turkey Breast' } },
        { name: 'Tuesday', date: 'Oct 3', meals: { breakfast: 'Blueberry Protein Smoothie', lunch: 'Greek Salad', snack: 'Greek Yogurt', dinner: 'Shrimp Tacos' } },
        { name: 'Wednesday', date: 'Oct 4', meals: { breakfast: 'Oatmeal with Berries', lunch: 'Veggie Stir-Fry with Tofu', snack: 'Hummus & Carrots', dinner: 'Roasted Veggie Bowl' } },
        { name: 'Thursday', date: 'Oct 5', meals: { breakfast: 'Chia Seed Pudding', lunch: 'Tuna Salad wrap', snack: 'Cottage Cheese', dinner: 'Grilled Steak with Asparagus' } },
        { name: 'Friday', date: 'Oct 6', meals: { breakfast: 'Protein Pancakes', lunch: 'Lentil Soup', snack: 'Dark Chocolate', dinner: 'Lemon Herb Chicken' } },
        { name: 'Saturday', date: 'Oct 7', meals: { breakfast: 'Western Omelette', lunch: 'Turkey Sandwich', snack: 'Smoothie', dinner: 'Cod with Roasted Potatoes' } },
    ]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const adminPlan = JSON.parse(localStorage.getItem("adminWeeklyMealPlan") || "{}");
        if (adminPlan[currentWeek]) {
            const formatted = Object.keys(adminPlan[currentWeek]).map((dayName, idx) => {
                const dayData = adminPlan[currentWeek][dayName];
                const weekNum = parseInt(currentWeek.split(' ')[1]) - 1;
                const baseDate = 1 + (weekNum * 7);
                return {
                    name: dayName,
                    date: `Oct ${baseDate + idx}`,
                    meals: {
                        breakfast: dayData.breakfast.title,
                        lunch: dayData.lunch.title,
                        snack: dayData.snack.title,
                        dinner: dayData.dinner.title
                    }
                };
            });
            setDays(formatted);
        }
    }
}, [currentWeek]);

    const mealCategories = [
        { name: 'Breakfast', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
        { name: 'Lunch', icon: Utensils, color: 'text-[#214a32]', bg: 'bg-[#a4d9bc]' },
        { name: 'Snack', icon: Zap, color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Dinner', icon: Flame, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Weekly Meal Plan</h2>
                    <p className="text-gray-500 font-medium tracking-tight">October 2028, {currentWeek}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm">
                        {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(w => (
                            <button 
                                key={w}
                                onClick={() => setCurrentWeek(w)}
                                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentWeek === w ? "bg-[#214a32] text-white shadow-md" : "text-gray-400 hover:bg-gray-50"}`}
                            >
                                {w.split(' ')[1]}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#214a32] shadow-sm transition-all"><Share2 size={18} /></button>
                        <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#214a32] shadow-sm transition-all"><Download size={18} /></button>
                    </div>
                </div>
            </div>

            {/* Weekly Overview - Grid */}
            <div className="overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                <div className="flex lg:grid lg:grid-cols-7 gap-6 min-w-[1200px] lg:min-w-0">
                    {days.map((day, dIdx) => (
                        <motion.div 
                            key={`${currentWeek}-${day.name}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: dIdx * 0.05 }}
                            className={`
                                flex-1 rounded-[3rem] p-6 border transition-all flex flex-col gap-6
                                ${day.name === 'Tuesday' ? 'bg-[#214a32] border-transparent shadow-2xl shadow-green-900/20 text-white' : 'bg-white border-gray-100 shadow-sm'}
                            `}
                        >
                            <div className="text-center space-y-1">
                                <h4 className="text-sm font-black uppercase font-outfit tracking-tight leading-none">{day.name}</h4>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${day.name === 'Tuesday' ? 'text-white/60' : 'text-gray-400'}`}>{day.date}</p>
                            </div>

                            <div className="flex-1 space-y-6">
                                {mealCategories.map((cat, cIdx) => (
                                    <div key={cIdx} className="space-y-3 group/meal">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-2 rounded-xl bg-gray-50/10 backdrop-blur-md ${day.name === 'Tuesday' ? 'text-white/80' : 'text-gray-300'} group-hover/meal:text-[#214a32] transition-colors`}>
                                                    <cat.icon size={14} />
                                                </div>
                                                <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${day.name === 'Tuesday' ? 'text-white/50' : 'text-gray-400'}`}>{cat.name}</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] font-black leading-tight uppercase tracking-tight group-hover/meal:scale-105 transition-transform origin-left cursor-pointer">
                                            {day.meals[cat.name.toLowerCase()]}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {day.name === 'Tuesday' && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span>Nutrition Goal</span>
                                        <CheckCircle2 size={14} className="text-green-300" />
                                    </div>
                                    <div className="h-1.5 w-full bg-white/20 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full w-[85%] bg-white rounded-full shadow-lg" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Nutrition Overview & Quick Add */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#214a32] p-8 md:p-12 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-green-900/20 relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 p-10 text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                        <BarChart3 size={150} strokeWidth={1} />
                    </div>
                    
                    <div className="space-y-6 flex-1 relative z-10">
                        <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">Weekly Macro Targets</h3>
                        <p className="text-white/60 text-xs font-bold leading-relaxed uppercase tracking-widest mb-8">You are currently hitting 88% of your nutritional goals this week. Keep up the consistency!</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {[
                                { name: 'Protein', val: '240g/300g', prog: 80, color: 'bg-[#214a32]' },
                                { name: 'Carbs', val: '450g/500g', prog: 90, color: 'bg-amber-500' },
                                { name: 'Fats', val: '80g/100g', prog: 80, color: 'bg-rose-500' },
                                { name: 'Fiber', val: '35g/40g', prog: 87, color: 'bg-indigo-500' },
                            ].map((macro, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                        <span>{macro.name}</span>
                                        <span className="opacity-60">{macro.prog}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${macro.prog}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className={`h-full ${macro.color} rounded-full`}
                                        />
                                    </div>
                                    <p className="text-[11px] font-black tracking-tight">{macro.val}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase font-outfit">Quick Add to Grocery</h3>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#214a32] flex items-center gap-1 cursor-pointer">
                            Select All <Settings2 size={12} />
                        </label>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Oats for smoothies', cat: 'Grains', checked: true },
                            { name: 'Spinach for omelette', cat: 'Vegetables', checked: false },
                            { name: 'Salmon fillets', cat: 'Protein', checked: false },
                            { name: 'Almond Milk', cat: 'Dairy', checked: true },
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${item.checked ? 'bg-[#a4d9bc] border-green-100 text-[#214a32]' : 'bg-white border-gray-50 text-gray-500'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`size-5 rounded-lg border-2 flex items-center justify-center transition-all ${item.checked ? 'bg-[#a4d9bc]0 border-green-500' : 'border-gray-100'}`}>
                                        {item.checked && <CheckCircle2 size={12} className="text-white" />}
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black uppercase leading-tight">{item.name}</p>
                                        <span className="text-[9px] font-bold opacity-40 uppercase">{item.cat}</span>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white rounded-xl transition-all"><Plus size={14} /></button>
                            </div>
                        ))}
                    </div>
                    <button className="w-full py-5 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-[#a4d9bc] hover:text-[#214a32] transition-all">
                        Edit Full Grocery List
                    </button>
                </div>
            </div>
        </div>
    );
}
