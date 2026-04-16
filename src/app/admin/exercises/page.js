"use client"

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Dumbbell, Activity, Timer, Layers, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    
    // Form state
    const [form, setForm] = useState({
        title: '',
        type: 'home',
        duration: '',
        instructions: '',
        difficulty: 'beginner',
        status: 'published'
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
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setForm({ title: '', type: 'home', duration: '', instructions: '', difficulty: 'beginner', status: 'published' });
                fetchExercises();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Delete this exercise?")) return;
        try {
            await fetch(`/api/exercises?id=${id}`, { method: 'DELETE' });
            setExercises(exercises.filter(e => e._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#214a32] tracking-tight">Exercise Management</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Configure Workout Routines</p>
                </div>
                <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                    {['all', 'home', 'walk', 'gym'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-white text-[#214a32] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6">
                {/* Form */}
                <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm h-fit sticky top-24">
                    <h2 className="text-sm font-black text-[#214a32] uppercase tracking-widest flex items-center gap-2 mb-6">
                        <Plus size={16}/> Add Exercise
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                            <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full mt-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#a4d9bc]" placeholder="e.g. Morning Stretch" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full mt-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#a4d9bc] outline-none">
                                    <option value="home">Home</option>
                                    <option value="walk">Walk</option>
                                    <option value="gym">Gym</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Duration</label>
                                <input type="text" required value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full mt-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#a4d9bc]" placeholder="e.g. 15 mins" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Difficulty</label>
                                <select value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})} className="w-full mt-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#a4d9bc] outline-none">
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Int.</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full mt-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#a4d9bc] outline-none">
                                    <option value="published">Publish</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Instructions</label>
                            <textarea required value={form.instructions} onChange={e => setForm({...form, instructions: e.target.value})} className="w-full mt-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#a4d9bc] h-24 resize-none" placeholder="Step by step..."></textarea>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-[#214a32] text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#1a3a28] transition-colors mt-2">
                            {loading ? 'Saving...' : 'Save Routine'}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
                    {exercises.length === 0 && <div className="col-span-full py-10 text-center text-gray-400 font-bold text-sm">No exercises found.</div>}
                    {exercises.map(ex => (
                        <div key={ex._id} className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <div className={`p-3 rounded-xl ${ex.type === 'home' ? 'bg-orange-50 text-orange-500' : ex.type === 'gym' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                        <Dumbbell size={20} />
                                    </div>
                                    <button onClick={() => handleDelete(ex._id)} className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{ex.title}</h3>
                                <p className="text-xs text-gray-500 line-clamp-2">{ex.instructions}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className={ex.difficulty === 'beginner' ? 'text-emerald-500' : ex.difficulty === 'intermediate' ? 'text-amber-500' : 'text-rose-500'}>{ex.difficulty}</span>
                                <span className="text-gray-400 flex items-center gap-1"><Timer size={12}/> {ex.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
