"use client"

import React, { useState, useEffect } from 'react';
import { 
    Users, 
    ClipboardList, 
    Activity, 
    TrendingUp, 
    ArrowUpRight, 
    Clock,
    CheckCircle2,
    Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorDashboard() {
    const metrics = [
        { name: 'Total Patients', value: '1,280', icon: Users, trend: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Active Diets', value: '842', icon: ClipboardList, trend: '+5%', color: 'text-[#125B50]', bg: 'bg-[#eaf1ef]' },
        { name: 'Pending Review', value: '12', icon: Activity, trend: '-2', color: 'text-amber-600', bg: 'bg-amber-50' },
        { name: 'Consultations', value: '86', icon: Calendar, trend: '+8%', color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Clinical Intelligence</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Welcome back, Dr. Saif</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Last Update</p>
                    <p className="text-sm font-black text-[#125B50]">15:45 PM Today</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#125B50]/5 transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`${m.bg} ${m.color} p-4 rounded-2xl`}>
                                <m.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                                <ArrowUpRight size={10} /> {m.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-1">{m.value}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">{m.name}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Patient Updates</h3>
                        <button className="text-[10px] font-black text-[#125B50] uppercase tracking-widest hover:underline">View All Patients</button>
                    </div>
                    <div className="space-y-8">
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div key={idx} className="flex items-center justify-between group cursor-pointer pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="flex items-center gap-6">
                                    <div className="size-14 rounded-[1.8rem] bg-[#eaf1ef] text-[#125B50] flex items-center justify-center font-black text-lg transition-transform group-hover:scale-105">
                                        AZ
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 text-sm">Ahmad Zeeshan</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Diabetes Control Plan Assigned</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-900">12:40 PM</p>
                                    <p className="text-[10px] text-green-500 font-bold uppercase mt-1">Success</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#125B50] p-10 rounded-[3.5rem] shadow-2xl shadow-[#125B50]/20 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-700">
                        <TrendingUp size={200} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black uppercase tracking-tight mb-10">System Status</h3>
                        
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <CheckCircle2 size={24} className="text-[#a4d9bc]" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest">API Engine</p>
                                    <p className="text-[10px] font-bold text-white/60">Operational</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <Clock size={24} className="text-[#a4d9bc]" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest">Auto-Diet AI</p>
                                    <p className="text-[10px] font-bold text-white/60">v4.2 Active</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 pt-10 border-t border-white/10">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Storage Usage</p>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '65%' }}
                                    transition={{ duration: 1.5 }}
                                    className="h-full bg-[#a4d9bc] rounded-full"
                                />
                            </div>
                            <p className="text-[10px] font-bold text-white/60 mt-4">2.4 TB of 5.0 TB used</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
