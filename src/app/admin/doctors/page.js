"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, 
    Search, 
    Plus, 
    MoreVertical, 
    Stethoscope, 
    Star, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    FileText, 
    Globe, 
    TrendingUp,
    Filter,
    Calendar,
    MessageSquare,
    Zap,
    Award
} from 'lucide-react';

export default function AdminDoctorsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeStatus, setActiveStatus] = useState('All');

    const doctors = [
        { id: 'DOC-001', name: 'Dr. Sarah Khan', specialty: 'Senior Nutritionist', experience: '12 Years', rating: 4.9, consultations: 1240, status: 'VERIFIED', image: 'https://i.pravatar.cc/150?u=sarah' },
        { id: 'DOC-002', name: 'Dr. Amin Jafari', specialty: 'Cardiologist', experience: '8 Years', rating: 4.8, consultations: 850, status: 'VERIFIED', image: 'https://i.pravatar.cc/150?u=amin' },
        { id: 'DOC-003', name: 'Dr. Emily Lawson', specialty: 'Wellness Coach', experience: '5 Years', rating: 4.7, consultations: 420, status: 'PENDING', image: 'https://i.pravatar.cc/150?u=emily' },
        { id: 'DOC-004', name: 'Dr. Zaid Malik', specialty: 'Herbal Specialist', experience: '15 Years', rating: 5.0, consultations: 2100, status: 'VERIFIED', image: 'https://i.pravatar.cc/150?u=zaid' },
        { id: 'DOC-005', name: 'Dr. Fatima Ali', specialty: 'Pediatrician', experience: '6 Years', rating: 4.6, consultations: 310, status: 'PENDING', image: 'https://i.pravatar.cc/150?u=fatima' },
    ];

    const stats = [
        { label: 'Total Doctors', val: '156', icon: Stethoscope, color: 'text-[#122A1A]' },
        { label: 'Active Sessions', val: '42', icon: Clock, color: 'text-indigo-600' },
        { label: 'Pending Apps', val: '12', icon: ShieldCheck, color: 'text-amber-500' },
        { label: 'Top Rated', val: '84%', icon: Star, color: 'text-rose-500' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#122A1A] text-white rounded-[2rem] shadow-xl shadow-green-900/10 transition-transform hover:rotate-12">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Clinician Registry</h2>
                        <p className="text-gray-500 font-medium tracking-tight">Verification and management of global medical experts.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-4 bg-white border border-gray-100 rounded-3xl text-gray-400 hover:text-[#122A1A] transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><Award size={18} /> Credentials Review</button>
                    <button className="bg-[#122A1A] text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10">
                        <Plus size={18} /> Invite Clinician
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:scale-[1.02] transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 bg-gray-50 rounded-2xl group-hover:bg-[#122A1A] group-hover:text-white transition-all`}><stat.icon size={20} /></div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Global</span>
                        </div>
                        <h3 className="text-2xl font-black font-outfit uppercase">{stat.val}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Table Section */}
            <div className="bg-white p-8 md:p-12 rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div className="relative group/search flex-1 lg:max-w-md w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#122A1A] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find clinician by specialty or name..." 
                            className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-inner focus:ring-2 focus:ring-[#122A1A] transition-all placeholder:text-gray-300"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {['All', 'VERIFIED', 'PENDING'].map(status => (
                            <button
                                key={status}
                                onClick={() => setActiveStatus(status)}
                                className={`px-8 py-3 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest transition-all ${activeStatus === status ? 'bg-[#122A1A] text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="bg-white p-8 rounded-[3.5rem] border border-gray-50 hover:border-gray-200 transition-all group flex flex-col justify-between">
                            <div className="flex items-start justify-between mb-8">
                                <div className="relative">
                                    <div className="size-24 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform">
                                        <img src={doc.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-50 text-emerald-500">
                                        {doc.status === 'VERIFIED' ? <CheckCircle2 size={18} /> : <Clock size={18} className="text-amber-500" />}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl text-amber-600">
                                        <Star size={12} fill="currentColor" />
                                        <span className="text-[10px] font-black">{doc.rating}</span>
                                    </div>
                                    <button className="p-3 bg-gray-50 rounded-xl text-gray-300 hover:text-[#122A1A] hover:bg-white shadow-sm transition-all"><MoreVertical size={16} /></button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xl font-black font-outfit uppercase tracking-tight text-gray-900 group-hover:text-[#122A1A] transition-colors">{doc.name}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#122A1A] mt-2 flex items-center gap-2">
                                        <Award size={14} className="text-gray-300" /> {doc.specialty}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-6 border-t border-gray-50 border-dashed">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Consultations</p>
                                        <h5 className="text-[11px] font-black text-[#122A1A]">{doc.consultations.toLocaleString()} Sessions</h5>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Experience</p>
                                        <h5 className="text-[11px] font-black text-[#122A1A]">{doc.experience}</h5>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {doc.status === 'PENDING' ? (
                                        <button className="flex-1 bg-emerald-600 text-white py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2">
                                            <CheckCircle2 size={16} /> Verify Credentials
                                        </button>
                                    ) : (
                                        <button className="flex-1 bg-gray-50 text-[#122A1A] py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-sm">
                                            <FileText size={16} /> View Full Profile
                                        </button>
                                    )}
                                    <button className="p-4 bg-gray-50 rounded-[1.5rem] text-[#122A1A] hover:bg-green-50 transition-all border border-transparent hover:border-green-100"><MessageSquare size={18} /></button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Invite New Doctor Card */}
                    <div className="border-4 border-dashed border-gray-50 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center group hover:bg-gray-50 hover:border-gray-100 transition-all cursor-pointer">
                        <div className="size-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6 text-gray-200 group-hover:rotate-12 transition-transform">
                            <Plus size={42} strokeWidth={1} />
                        </div>
                        <h4 className="text-[11px] font-black text-gray-100 group-hover:text-gray-400 uppercase tracking-[0.2em] transition-colors">Onboard New Medical Expert</h4>
                    </div>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-50 pt-10">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Showing 5 out of 156 clinicians</p>
                    <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="p-4 bg-gray-100 rounded-2xl text-[#122A1A] cursor-pointer">01</span>
                        <span className="p-4 rounded-2xl hover:bg-gray-50 cursor-pointer">02</span>
                        <span className="p-4 rounded-2xl hover:bg-gray-50 cursor-pointer">03</span>
                        <span className="px-4">...</span>
                        <span className="p-4 rounded-2xl hover:bg-gray-50 cursor-pointer">12</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
