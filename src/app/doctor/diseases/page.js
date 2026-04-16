"use client"

import React, { useState, useEffect } from 'react';
import { Activity, Plus, Search, Trash2, Edit3, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DoctorDiseaseManager() {
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', category: 'Chronic', description: '', symptoms: '' });

    useEffect(() => {
        fetchDiseases();
    }, []);

    const fetchDiseases = async () => {
        try {
            const res = await fetch('/api/diseases');
            const data = await res.json();
            if (data.success) setDiseases(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDisease = async (e) => {
        e.preventDefault();
        try {
            const sympArray = formData.symptoms.split(',').map(s => s.trim()).filter(s => s !== '');
            const res = await fetch('/api/diseases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, symptoms: sympArray })
            });
            if (res.ok) {
                setIsModalOpen(false);
                setFormData({ name: '', category: 'Chronic', description: '', symptoms: '' });
                fetchDiseases();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Disease & Symptom Database</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage platform diagnostic intelligence</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#125B50] text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#0d453c] transition-all shadow-lg shadow-[#125B50]/20"
                >
                    <Plus size={16} /> Add New Disease
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diseases.map((d, idx) => (
                    <motion.div 
                        key={d._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#125B50]/5 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-[#eaf1ef] text-[#125B50] p-3 rounded-2xl">
                                <Activity size={20} />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-gray-400 hover:text-[#125B50] bg-gray-50 rounded-lg"><Edit3 size={14} /></button>
                                <button className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"><Trash2 size={14} /></button>
                            </div>
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">{d.name}</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-3 py-1 rounded-full">{d.category}</span>
                        
                        <div className="mt-6 pt-6 border-t border-gray-50">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <ShieldAlert size={12} className="text-amber-500" /> Linked Symptoms
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {d.symptoms?.map((s, i) => (
                                    <span key={i} className="text-[9px] font-bold text-[#125B50] bg-[#eaf1ef] px-2.5 py-1 rounded-lg">
                                        {s}
                                    </span>
                                ))}
                                {(!d.symptoms || d.symptoms.length === 0) && <p className="text-[10px] text-gray-400 italic font-medium">No symptoms linked.</p>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[3rem] w-full max-w-xl p-10 relative z-10 shadow-2xl border border-gray-100"
                        >
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Add New Condition</h2>
                            <form onSubmit={handleAddDisease} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Disease Name</label>
                                    <input 
                                        type="text" required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="e.g. Type 2 Diabetes"
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#125B50] outline-none" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#125B50] outline-none appearance-none"
                                    >
                                        <option>Chronic</option>
                                        <option>Infection</option>
                                        <option>Mental Health</option>
                                        <option>General</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Symptoms (Comma separated)</label>
                                    <textarea 
                                        rows="3"
                                        value={formData.symptoms}
                                        onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                                        placeholder="Thirst, Fatigue, Blurred Vision..."
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#125B50] outline-none resize-none" 
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all">Cancel</button>
                                    <button type="submit" className="flex-1 py-4 bg-[#125B50] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#0d453c] transition-all shadow-lg shadow-[#125B50]/20">Save Database</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
