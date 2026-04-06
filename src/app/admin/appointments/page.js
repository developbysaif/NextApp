"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar as CalendarIcon, 
    Search, 
    Plus, 
    MoreHorizontal, 
    Clock, 
    Video, 
    Phone, 
    MessageSquare, 
    ChevronLeft, 
    ChevronRight, 
    CheckCircle2, 
    XCircle, 
    AlertCircle,
    User,
    Stethoscope,
    Filter,
    FilterX
} from 'lucide-react';

export default function AdminAppointmentsPage() {
    const [view, setView] = useState('weekly'); // monthly, weekly, daily
    const [searchTerm, setSearchTerm] = useState('');

    const appointments = [
        { id: 'APT-1001', doctor: 'Dr. Sarah Khan', patient: 'Adam Ahmed', time: '10:00 AM', status: 'CONFIRMED', type: 'VIDEO', date: 'Sept 20, 2028' },
        { id: 'APT-1002', doctor: 'Dr. Emily Lawson', patient: 'Fatima Ali', time: '11:30 AM', status: 'PENDING', type: 'AUDIO', date: 'Sept 20, 2028' },
        { id: 'APT-1003', doctor: 'Dr. Amin Jafari', patient: 'Zaid Malik', time: '02:00 PM', status: 'CONFIRMED', type: 'CHAT', date: 'Sept 20, 2028' },
        { id: 'APT-1004', doctor: 'Dr. Sarah Khan', patient: 'Omar Farooq', time: '04:15 PM', status: 'CANCELED', type: 'VIDEO', date: 'Sept 21, 2028' },
        { id: 'APT-1005', doctor: 'Dr. Daniel Green', patient: 'Linda Rawls', time: '09:00 AM', status: 'CONFIRMED', type: 'VIDEO', date: 'Sept 21, 2028' },
    ];

    const stats = [
        { label: 'Today Totals', val: '24', sub: 'Appointments', color: 'text-[#122A1A]' },
        { label: 'Success Rate', val: '92.4%', sub: 'Attendance', color: 'text-emerald-600' },
        { label: 'Avg Feedback', val: '4.8', sub: 'Star rating', color: 'text-amber-500' },
        { label: 'New Requests', val: '12', sub: 'Pending', color: 'text-indigo-600' },
    ];

    const weekDays = [
        { day: 'Sun', date: '19' },
        { day: 'Mon', date: '20' },
        { day: 'Tue', date: '21' },
        { day: 'Wed', date: '22' },
        { day: 'Thu', date: '23' },
        { day: 'Fri', date: '24' },
        { day: 'Sat', date: '25' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#122A1A] text-white rounded-[2rem] shadow-xl shadow-green-900/10">
                        <CalendarIcon size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Admin Consultations</h2>
                        <p className="text-gray-500 font-medium tracking-tight">Managing global doctor-patient scheduling.</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm relative z-10">
                        {['Monthly', 'Weekly', 'Daily'].map(v => (
                            <button
                                key={v}
                                onClick={() => setView(v.toLowerCase())}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === v.toLowerCase() ? 'bg-[#122A1A] text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                    <a href="/admin/portal" className="bg-[#122A1A] text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10">
                        <Plus size={18} /> Book Session
                    </a>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group">
                        <h3 className={`text-3xl font-black font-outfit uppercase ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100 transition-opacity">({stat.sub})</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Calendar View Column */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white p-10 md:p-14 rounded-[4rem] border border-gray-100 shadow-sm space-y-10 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 text-black/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <CalendarIcon size={250} strokeWidth={1} />
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tight">September 2028</h3>
                            <div className="flex gap-2">
                                <button className="p-3 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-[#122A1A] hover:text-white transition-all"><ChevronLeft size={16} /></button>
                                <button className="p-3 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-[#122A1A] hover:text-white transition-all"><ChevronRight size={16} /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-6 relative z-10">
                            {weekDays.map(day => (
                                <div key={day.date} className={`text-center space-y-2 p-4 rounded-[2rem] transition-all cursor-pointer group/day ${day.date === '20' ? 'bg-[#122A1A] text-white shadow-xl shadow-green-900/10' : 'hover:bg-gray-50'}`}>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${day.date === '20' ? 'text-white/60' : 'text-gray-400'}`}>{day.day}</p>
                                    <h4 className="text-xl font-black font-outfit uppercase tracking-tighter leading-none">{day.date}</h4>
                                    <div className={`size-1.5 rounded-full mx-auto ${day.date === '20' ? 'bg-white' : 'bg-[#122A1A]/10'} group-hover/day:scale-150 transition-transform`} />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 pt-10 border-t border-gray-50 relative z-10">
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 px-1">Ongoing & Upcoming <ArrowRight size={14} className="text-gray-200" /></h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {appointments.slice(0, 4).map((apt, i) => (
                                    <div key={i} className="p-8 rounded-[3rem] border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer group shadow-inner">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white shadow-sm rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
                                                    {apt.type === 'VIDEO' && <Video size={20} />}
                                                    {apt.type === 'AUDIO' && <Phone size={20} />}
                                                    {apt.type === 'CHAT' && <MessageSquare size={20} />}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full animate-pulse bg-emerald-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#122A1A]">{apt.time}</span>
                                                </div>
                                            </div>
                                            <button className="text-gray-300 hover:text-indigo-600"><MoreHorizontal size={18} /></button>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <img src={`https://i.pravatar.cc/150?u=${apt.doctor}`} className="size-12 rounded-2xl border-4 border-white shadow-sm" />
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Clinician</p>
                                                    <h5 className="text-[11px] font-black uppercase tracking-tight text-gray-900">{apt.doctor}</h5>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 pl-4 border-l-4 border-indigo-100">
                                                <img src={`https://i.pravatar.cc/150?u=${apt.patient}`} className="size-10 rounded-xl border-2 border-white shadow-sm" />
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Patient</p>
                                                    <h5 className="text-[10px] font-black uppercase tracking-tight text-gray-900">{apt.patient}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                                            <span className={`
                                                px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest
                                                ${apt.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                                ${apt.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : ''}
                                                ${apt.status === 'CANCELED' ? 'bg-rose-50 text-rose-600' : ''}
                                            `}>
                                                {apt.status}
                                            </span>
                                            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:scale-105 transition-transform flex items-center gap-1">Open Session <ArrowUpRight size={12} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient / Request Management Sidebar Column */}
                <div className="space-y-10">
                     {/* Search Article / Search System Sidebar */}
                    <div className="bg-white p-8 md:p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-10 relative overflow-hidden group">
                        <h3 className="text-sm font-black font-outfit uppercase tracking-wider mb-6">Patient Master Search</h3>
                        <div className="relative group/search">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#122A1A] transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Patient name or UID..." 
                                className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-inner focus:ring-2 focus:ring-[#122A1A] transition-all"
                            />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 px-1">Recently Booked</h4>
                            {appointments.slice(0, 3).map((apt, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer group/pat">
                                    <img src={`https://i.pravatar.cc/150?u=${apt.patient}`} className="size-12 rounded-2xl border-4 border-white shadow-sm group-hover/pat:scale-110 transition-transform" />
                                    <div className="flex-1">
                                        <h5 className="text-[11px] font-black uppercase tracking-tight text-gray-900">{apt.patient}</h5>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Confirmed • {apt.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-5 bg-gray-50 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-sm">View Full Patient List <ChevronRight size={14} /></button>
                    </div>

                    {/* Pending Approvals Card */}
                    <div className="bg-[#B05B1E] p-10 rounded-[4rem] text-white shadow-xl shadow-orange-900/10 space-y-8 group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-rose-600 opacity-20" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-md font-black uppercase tracking-tight">Pending Requests</h4>
                                <div className="p-3 bg-white/10 rounded-2xl border border-white/5"><AlertCircle size={20} className="text-white" /></div>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-black font-outfit">12</span>
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Awaiting Admin Approval</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-white text-orange-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all shadow-xl shadow-black/10">Approve All</button>
                                <button className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/5"><FilterX size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Fixed import naming collision (Calendar is also a icon from lucide-react)
import { ArrowUpRight, ArrowRight } from 'lucide-react';
