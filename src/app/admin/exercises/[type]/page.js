"use client"

import React, { useState, useEffect, use } from 'react';
import { Plus, Trash2, Dumbbell, Timer } from 'lucide-react';
import Link from 'next/link';

export default function AdminExerciseCategoryPage({ params }) {
    const { type } = use(params);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    const titles = {
        home: 'Daily Home Exercises',
        walk: 'Daily Walk Time',
        gym: 'Gym Exercises'
    };

    const fetchExercises = async () => {
        try {
            const res = await fetch(`/api/exercises?type=${type}`);
            const data = await res.json();
            if (Array.isArray(data)) setExercises(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, [type]);

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
                    <h1 className="text-2xl font-black text-[#214a32] tracking-tight">{titles[type]}</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage {type} workout routines</p>
                </div>
                <Link href="/admin/exercises/add" className="bg-[#214a32] text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#1a3a28] transition-all shadow-lg shadow-[#214a32]/10">
                    <Plus size={18} /> Add Exercise
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <div className="col-span-full py-10 text-center text-gray-400 font-bold text-sm">Loading...</div>
                ) : exercises.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-gray-400 font-bold text-sm">
                        <Dumbbell size={48} className="mx-auto mb-4 text-gray-200" />
                        No routine found. Click "Add Exercise" to create one.
                    </div>
                ) : (
                    exercises.map(ex => (
                         <div key={ex._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-[#a4d9bc] hover:shadow-xl transition-all h-full">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:-rotate-6 transition-transform shadow-inner ${ex.type === 'home' ? 'bg-orange-50 text-orange-600' : ex.type === 'gym' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        <Dumbbell size={24} />
                                    </div>
                                    <button onClick={() => handleDelete(ex._id)} className="p-2 text-gray-300 hover:text-rose-500 bg-gray-50 hover:bg-rose-50 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 group-hover:text-[#214a32] transition-colors mb-2 tracking-tight">
                                    {ex.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-4 rounded-xl line-clamp-3">
                                    {ex.instructions}
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className={`px-2 py-1 rounded-md ${ex.difficulty === 'beginner' ? 'bg-emerald-50 text-emerald-600' : ex.difficulty === 'intermediate' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {ex.difficulty}
                                </span>
                                <span className="text-gray-400 flex items-center gap-1"><Timer size={14}/> {ex.duration}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
