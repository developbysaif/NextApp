"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Utensils, Calendar, ChevronRight, Clock, Flame, Apple } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserDietPlanManage() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState('Monday');

    const [form, setForm] = useState({
        name: '',
        mealType: 'Breakfast',
        calories: '',
        time: '',
        ingredients: '',
        day: 'Monday'
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const fetchPlans = async () => {
        try {
            const res = await fetch('/api/diet-plans');
            const data = await res.json();
            if (data.success) setPlans(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/diet-plans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setForm({ ...form, name: '', calories: '', time: '', ingredients: '' });
                fetchPlans();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Remove this meal from your plan?")) return;
        try {
            await fetch(`/api/diet-plans?id=${id}`, { method: 'DELETE' });
            fetchPlans();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Diet Planner</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Design your personalized nutritional routine</p>
                </div>
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex overflow-x-auto no-scrollbar max-w-full">
                    {days.map(d => (
                        <button 
                            key={d}
                            onClick={() => setSelectedDay(d)}
                            className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedDay === d ? 'bg-[#214a32] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {d.substring(0, 3)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-8 px-4">
                {/* Meal Form */}
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm h-fit">
                    <h2 className="text-sm font-black text-[#214a32] uppercase tracking-widest flex items-center gap-3 mb-8">
                        <Plus size={18}/> Add Weekly Meal
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Day of Week</label>
                                <select value={form.day} onChange={e => setForm({...form, day: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc] outline-none">
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meal Type</label>
                                <select value={form.mealType} onChange={e => setForm({...form, mealType: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc] outline-none">
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dish Name</label>
                            <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc]" placeholder="Avocado Toast..." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Calories</label>
                                <div className="relative">
                                    <input type="number" required value={form.calories} onChange={e => setForm({...form, calories: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-6 pr-12 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc]" placeholder="350" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-400 uppercase">kcal</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Serve Time</label>
                                <input type="text" required value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc]" placeholder="08:30 AM" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ingredients / Notes</label>
                            <textarea value={form.ingredients} onChange={e => setForm({...form, ingredients: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc] h-32 resize-none" placeholder="2 Eggs, Whole wheat bread..."></textarea>
                        </div>
                        
                        <button type="submit" disabled={loading} className="w-full bg-[#214a32] text-white py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#214a32]/20 hover:scale-[1.02] active:scale-95 transition-all">
                            {loading ? 'Saving Plan...' : 'Add to Schedule'}
                        </button>
                    </form>
                </div>

                {/* Plan View */}
                <div className="space-y-6">
                    <div className="bg-[#214a32] p-8 rounded-[3rem] shadow-xl shadow-green-900/10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 transform translate-x-8 -translate-y-8 opacity-10">
                            <Apple size={140} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a4d9bc] mb-2">{selectedDay}</p>
                            <h3 className="text-2xl font-black font-outfit uppercase">Scheduled Meals</h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {plans.filter(p => p.day === selectedDay).length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="py-20 bg-white rounded-[3rem] border border-gray-100 text-center flex flex-col items-center"
                                >
                                    <Utensils size={40} className="text-gray-100 mb-4" />
                                    <p className="text-sm font-black text-gray-400 uppercase">No meals planned for this day</p>
                                </motion.div>
                            ) : (
                                plans.filter(p => p.day === selectedDay).map(meal => (
                                    <motion.div 
                                        layout
                                        key={meal._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-6 group hover:border-[#a4d9bc] transition-all"
                                    >
                                        <div className={`size-16 rounded-[1.2rem] flex items-center justify-center shrink-0 ${
                                            meal.mealType === 'Breakfast' ? 'bg-amber-50 text-amber-600' :
                                            meal.mealType === 'Lunch' ? 'bg-orange-50 text-orange-600' :
                                            meal.mealType === 'Dinner' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                            <Utensils size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{meal.mealType}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#214a32] flex items-center gap-1">
                                                    <Clock size={10} /> {meal.time}
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-black text-gray-900 mt-1">{meal.name}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 line-clamp-1">{meal.ingredients}</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-3">
                                            <span className="flex items-center gap-1 text-xs font-black text-orange-600">
                                                <Flame size={14} /> {meal.calories}
                                            </span>
                                            <button 
                                                onClick={() => handleDelete(meal._id)}
                                                className="p-2 text-gray-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
