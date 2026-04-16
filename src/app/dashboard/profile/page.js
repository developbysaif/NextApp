"use client"

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Calendar, Ruler, Weight, History, Save, Camera, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserProfile() {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        age: user?.age || '',
        gender: user?.gender || 'Male',
        height: user?.height || '',
        weight: user?.weight || '',
        medicalHistory: user?.medicalHistory || ''
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateProfile(formData);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left: Avatar and Bio */}
                <div className="w-full md:w-80 space-y-6">
                    <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="relative group">
                            <div className="size-32 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-3xl text-[#214a32] overflow-hidden">
                                 <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-3 bg-[#214a32] text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                <Camera size={16} />
                            </button>
                        </div>
                        <h2 className="mt-6 text-xl font-black text-gray-900">{user?.name}</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Patient Member</p>
                        
                        <div className="mt-8 pt-8 border-t border-gray-50 w-full grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-gray-900">{user?.age || '--'}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Age</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-gray-900">{user?.weight || '--'}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Weight (kg)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Personal Details</h3>
                            {saved && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl text-xs font-bold">
                                    <CheckCircle2 size={16} /> Changes Saved!
                                </motion.div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input 
                                        type="text" 
                                        value={formData.name} 
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#214a32] transition-all" 
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input 
                                        type="email" 
                                        value={formData.email} 
                                        disabled
                                        className="w-full bg-gray-50/50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-400 cursor-not-allowed" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Age</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input 
                                        type="number" 
                                        value={formData.age} 
                                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#214a32] transition-all" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                                <select 
                                    value={formData.gender} 
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#214a32] transition-all appearance-none"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Height (cm)</label>
                                <div className="relative">
                                    <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input 
                                        type="number" 
                                        value={formData.height} 
                                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#214a32] transition-all" 
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                                <div className="relative">
                                    <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input 
                                        type="number" 
                                        value={formData.weight} 
                                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                        className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#214a32] transition-all" 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Medical History / Notes</label>
                            <div className="relative">
                                <History className="absolute left-4 top-5 text-gray-300" size={18} />
                                <textarea 
                                    value={formData.medicalHistory} 
                                    onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                                    rows="4"
                                    placeholder="List any past surgeries, chronic conditions, or allergies..."
                                    className="w-full bg-gray-50 border-none rounded-2xl pt-5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#214a32] transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={saving}
                            className="w-full bg-[#214a32] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#214a32]/20 hover:bg-[#1a3a28] hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                        >
                            <Save size={18} /> {saving ? 'Updating...' : 'Save Profile Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
