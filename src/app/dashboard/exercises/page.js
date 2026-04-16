"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Dumbbell, Timer, Target, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
        title: '',
        type: 'home',
        duration: '',
        instructions: '',
        difficulty: 'beginner'
    });

    const fetchExercises = async () => {
        try {
            const res = await fetch(`/api/exercises${filter !== 'all' ? `?type=${filter}` : ''}`);
            const data = await res.json();
            if (Array.isArray(data)) setExercises(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, [filter]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/exercises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, status: 'published' })
            });
            if (res.ok) {
                setForm({ title: '', type: 'home', duration: '', instructions: '', difficulty: 'beginner' });
                fetchExercises();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Delete this routine from your list?")) return;
        try {
            await fetch(`/api/exercises?id=${id}`, { method: 'DELETE' });
            setExercises(exercises.filter(e => e._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">My Workout Routines</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Manage your physical activity plans</p>
                </div>
                <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    {['all', 'home', 'walk', 'gym'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-[#214a32] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-8 px-4">
                {/* Add Exercise Form */}
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm h-fit">
                    <h2 className="text-sm font-black text-[#214a32] uppercase tracking-widest flex items-center gap-3 mb-8">
                        <Plus size={18}/> New Exercise
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Routine Title</label>
                            <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc]" placeholder="Morning Yoga..." />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc] outline-none">
                                    <option value="home">Home</option>
                                    <option value="walk">Walk</option>
                                    <option value="gym">Gym</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                                <input type="text" required value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc]" placeholder="20 min" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Difficulty</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['beginner', 'intermediate', 'advanced'].map(lvl => (
                                    <button 
                                        type="button"
                                        key={lvl}
                                        onClick={() => setForm({...form, difficulty: lvl})}
                                        className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all border ${form.difficulty === lvl ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-gray-100 text-gray-400'}`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Step-by-step Instructions</label>
                            <textarea required value={form.instructions} onChange={e => setForm({...form, instructions: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#a4d9bc] h-32 resize-none" placeholder="Describe the steps..."></textarea>
                        </div>
                        
                        <button type="submit" disabled={loading} className="w-full bg-[#214a32] text-white py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#214a32]/20 hover:scale-[1.02] active:scale-95 transition-all">
                            {loading ? 'Processing...' : 'Add to My List'}
                        </button>
                    </form>
                </div>

                {/* Exercise List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-fit">
                    {exercises.length === 0 && (
                        <div className="col-span-full py-20 bg-white rounded-[3rem] border border-gray-100 text-center flex flex-col items-center">
                            <div className="size-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-200 mb-4">
                                <Dumbbell size={40} />
                            </div>
                            <h3 className="text-lg font-black text-gray-900">No Routines Yet</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Start by adding your favorite exercise</p>
                        </div>
                    )}
                    {exercises.map(ex => (
                        <motion.div 
                            layout
                            key={ex._id} 
                            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-500"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`size-12 rounded-2xl flex items-center justify-center ${ex.type === 'home' ? 'bg-orange-50 text-orange-500' : ex.type === 'gym' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                        <Dumbbell size={24} />
                                    </div>
                                    <button onClick={() => handleDelete(ex._id)} className="p-3 text-gray-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3">{ex.title}</h3>
                                <p className="text-xs font-bold text-gray-500 leading-relaxed line-clamp-3">{ex.instructions}</p>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${ex.difficulty === 'beginner' ? 'bg-emerald-50 text-emerald-600' : ex.difficulty === 'intermediate' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {ex.difficulty}
                                    </span>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Timer size={14} className="text-[#214a32]"/> {ex.duration}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
