"use client"

import React, { useState } from 'react';
import { Plus, ArrowLeft, Save, ShieldAlert, Layers } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddExercisePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        type: 'home',
        duration: '',
        instructions: '',
        difficulty: 'beginner',
        status: 'published'
    });

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
                alert("Exercise added successfully!");
                router.push(`/admin/exercises/${form.type}`);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/admin/exercises/home" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#214a32] transition-colors mb-2">
                        <ArrowLeft size={14} /> Back to Exercises
                    </Link>
                    <h1 className="text-3xl font-black text-[#122A1A] uppercase tracking-tight">Add Exercise Routine</h1>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest max-w-lg">
                        Select a category and create a new workout for the fitness module.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">
                <div className="space-y-8 bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#a4d9bc]/30"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Exercise Title <span className="text-rose-500">*</span></label>
                            <input 
                                type="text"
                                required
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="e.g. Morning Stretch"
                                className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-2xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Exercise Type (Category) <span className="text-rose-500">*</span></label>
                            <select 
                                value={form.type}
                                required
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-2xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all outline-none"
                            >
                                <option value="home">Daily Home Exercises</option>
                                <option value="walk">Daily Walk Time</option>
                                <option value="gym">Gym Exercise</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Duration <span className="text-rose-500">*</span></label>
                            <input 
                                type="text"
                                required
                                value={form.duration}
                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                placeholder="e.g. 15 mins"
                                className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-2xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all outline-none"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Instructions <span className="text-rose-500">*</span></label>
                            <textarea
                                required
                                value={form.instructions}
                                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                                className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-2xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all outline-none resize-none h-40"
                                placeholder="Step by step instructions..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Difficulty */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert size={18} className="text-amber-500" />
                            <h3 className="text-[11px] font-black text-[#122A1A] uppercase tracking-widest">Difficulty</h3>
                        </div>
                        <div className="space-y-3">
                            {['beginner', 'intermediate', 'advanced'].map(level => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setForm({ ...form, difficulty: level })}
                                    className={`w-full py-4 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${form.difficulty === level ? 'bg-[#214a32] text-white border-transparent' : 'bg-gray-50 text-gray-400 border-gray-50 hover:bg-gray-100'}`}
                                >
                                    {level} Level
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Layers size={18} className="text-[#a4d9bc]" />
                            <h3 className="text-[11px] font-black text-[#122A1A] uppercase tracking-widest">Visibility</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {['published', 'draft'].map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setForm({ ...form, status })}
                                    className={`py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${form.status === status ? 'bg-[#214a32] text-white border-transparent shadow shadow-black/10' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-[#214a32] text-white py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#214a32]/20 hover:bg-[#1a3a28] transition-all flex items-center justify-center gap-3">
                            <Save size={18} /> {loading ? 'Saving...' : 'Save Exercise'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
