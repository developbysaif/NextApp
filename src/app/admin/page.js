"use client"

import React, { useEffect, useState } from 'react';
import { 
    Search, Bell, Plus, ChevronLeft, ChevronRight, Activity, TrendingUp, Users, DollarSign, ChevronUp, BellRing
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AdminDashboardPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [activeStats, setActiveStats] = useState({ users: 8452, consults: 156, revenue: "5.2k" });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (user) setCurrentUser(user);

        // Load dynamic system interactions
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const events = JSON.parse(localStorage.getItem("myCalendarEvents") || "[]");
        
        let appointmentsAmt = events.filter(e => e.type === 'appointment').length;
        
        setActiveStats({
            users: users.length > 5 ? users.length : 8452,
            consults: appointmentsAmt > 0 ? appointmentsAmt : 156,
            revenue: ((Math.random() * 5) + 3).toFixed(1) + 'k'
        });
    }, []);

    // Simulated simple data for the activity charts/lines to mimic the image
    const barHeights = [20, 60, 40, 80, 50, 90, 70, 30];
    
    return (
        <div className="font-sans text-gray-800 bg-[#FDFBF7] min-h-screen flex flex-col lg:flex-row pb-10">
            
            {/* Center Content (Takes up majority width) */}
            <div className="flex-1 px-8 pt-8 flex flex-col gap-6 w-full lg:w-3/4">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            Hello, {currentUser?.name?.split(' ')[0] || 'Adam'}! <span className="text-xl">👋</span>
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Let's begin our journey to better health today</p>
                    </div>
                    
                    <div className="relative w-[300px] hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search anything" 
                            className="w-full bg-white rounded-[1rem] py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-1 border border-transparent shadow-sm text-gray-700"
                        />
                    </div>
                </div>

                {/* 4 Top Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                    {/* Card 1: Revenue (Like Weight) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">Revenue</span>
                            <div className="w-6 h-6 border bg-[#B4E567]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#B4E567]">
                                <DollarSign size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gray-900">${activeStats.revenue}</span>
                            {/* Visual slider track */}
                            <div className="w-full relative h-10 mt-3 pt-5">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-[3px] border-[#215b33] bg-white z-10"></div>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#215b33]"></div>
                                <div className="flex justify-between w-full border-t border-gray-100 pt-1 relative">
                                    {[1,2,3,4,5,6,7].map(i => <div key={i} className={`w-0.5 h-1.5 ${i===4 ? 'bg-[#215b33]' : 'bg-gray-200'}`}></div>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Users (Like Steps) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">Users</span>
                            <div className="w-6 h-6 border bg-[#B4E567]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#B4E567]">
                                <Users size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-900">{activeStats.users} <span className="text-[10px] text-gray-400 font-medium">active</span></span>
                            <div className="mt-4 flex h-3 gap-1 w-full">
                                <div className="h-full bg-[#215b33] rounded-l-full w-[76%]"></div>
                                <div className="h-full bg-[#FFD166] rounded-r-full flex-1 border-r-2 border-dashed border-white"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                                <span>76%</span>
                                <span>Target reached</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Consults (Like Sleep) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">Consults</span>
                            <div className="w-6 h-6 border bg-[#B4E567]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#B4E567]">
                                <Activity size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-900">{activeStats.consults} <span className="text-[10px] text-gray-400 font-medium">total</span></span>
                            <div className="flex items-end justify-between h-8 mt-2 w-full gap-1">
                                {barHeights.map((h, i) => (
                                    <div key={i} className={`w-1.5 rounded-full ${h > 60 ? 'bg-[#FFD166]' : 'bg-[#FFD166]/40'}`} style={{ height: '100%' }}>
                                        <div className="w-full rounded-full bg-[#FFD166]" style={{ height: `${h}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Uptime (Like Water) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">Uptime</span>
                            <div className="w-6 h-6 border bg-[#B4E567]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#B4E567]">
                                <TrendingUp size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-900">99.8%</span>
                            <div className="w-full h-8 bg-[#FFD166] rounded-md mt-2 relative overflow-hidden flex items-center px-3">
                                <span className="text-[10px] font-bold text-gray-800 z-10">Optimal</span>
                                {/* wave effect fake */}
                                <div className="absolute top-1 right-0 bottom-0 w-8 bg-[#215b33]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Charts */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2">
                    
                    {/* Gauge Half Donut (Like Weight Data) */}
                    <div className="bg-white p-6 rounded-[2rem] md:col-span-4 shadow-sm border border-gray-50 flex flex-col relative text-center items-center">
                         <div className="w-full flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-gray-900">Growth Data</span>
                            <span className="text-gray-400">...</span>
                        </div>
                        
                        {/* Half Donut Native Implementation */}
                        <div className="w-48 h-24 overflow-hidden relative mb-2">
                             <div className="w-48 h-48 rounded-full border-[18px] border-gray-100 absolute top-0 left-0"></div>
                             <div 
                                className="w-48 h-48 rounded-full border-[18px] border-[#215b33] absolute top-0 left-0 border-b-transparent border-l-transparent -rotate-45"
                             ></div>
                             {/* Indicator dot */}
                             <div className="absolute top-4 right-10 w-4 h-4 bg-white border-[4px] border-[#B4E567] rounded-full shadow-md z-10"></div>
                             <div className="absolute bottom-1 w-full text-center flex flex-col items-center">
                                 <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">78%</h2>
                                 <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Goal Reached</p>
                             </div>
                        </div>
                        <div className="flex justify-between w-full max-w-[190px] px-2 text-[10px] text-gray-400 font-bold mt-1">
                            <span>0</span>
                            <span>100</span>
                        </div>
                        
                        <p className="text-[10px] text-gray-400 font-medium mt-6 max-w-[200px] leading-relaxed">
                            Progress is progress, no matter how slow. Keep building, you're getting closer to your goal every day! 🎯
                        </p>
                    </div>

                    {/* Full Donut (Like Calories Intake) */}
                    <div className="bg-white p-6 rounded-[2rem] md:col-span-8 shadow-sm border border-gray-50 flex flex-col relative">
                        <div className="w-full flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-gray-900">Ecosystem Traffic</span>
                            <span className="text-gray-400">...</span>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-around h-full gap-6">
                            
                            {/* Circular graphic */}
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[12px] border-gray-100"></div>
                                {/* Primary Orange */}
                                <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full -rotate-90">
                                    <path className="text-[#215b33]" strokeDasharray="65 100" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    {/* Small Green piece */}
                                    <path className="text-[#B4E567]" strokeDasharray="15 100" strokeDashoffset="-65" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-black text-gray-900 leading-none tracking-tight">1240</h3>
                                    <span className="text-[10px] text-gray-400 font-medium">Daily visits</span>
                                </div>
                            </div>

                            {/* Stats block */}
                            <div className="flex-1 w-full max-w-xs space-y-5">
                                <div className="flex items-center gap-6 pb-4 border-b border-gray-50">
                                    <div className="flex gap-2 items-center">
                                         <div className="w-6 h-6 rounded-md bg-[#B4E567]/20 flex items-center justify-center text-[#B4E567] font-bold text-xs">P</div>
                                         <div className="flex flex-col leading-tight">
                                            <span className="text-xs font-black text-gray-900 tracking-tight">1750 <span className="text-[9px] text-gray-400 font-medium">users</span></span>
                                            <span className="text-[9px] text-gray-400 font-medium">Desktop</span>
                                         </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                         <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">M</div>
                                         <div className="flex flex-col leading-tight">
                                            <span className="text-xs font-black text-gray-900 tracking-tight">510 <span className="text-[9px] text-gray-400 font-medium">users</span></span>
                                            <span className="text-[9px] text-gray-400 font-medium">Mobile</span>
                                         </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                     <div className="flex items-center justify-between text-[11px] font-bold">
                                         <span className="text-gray-900 w-8">120</span>
                                         <span className="text-gray-400 flex-1 ml-2">Web App</span>
                                         <span className="text-gray-900">37%</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gray-300 w-[37%]"></div></div>
                                     
                                     <div className="flex items-center justify-between text-[11px] font-bold">
                                         <span className="text-gray-900 w-8">70</span>
                                         <span className="text-gray-400 flex-1 ml-2">Patient App</span>
                                         <span className="text-gray-900">93%</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#B4E567] w-[93%]"></div></div>

                                     <div className="flex items-center justify-between text-[11px] font-bold">
                                         <span className="text-gray-900 w-8">20</span>
                                         <span className="text-gray-400 flex-1 ml-2">API</span>
                                         <span className="text-gray-900">45%</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#B4E567] w-[45%]"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Progress Bars */}
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-gray-900">System Tasks</span>
                        <select className="text-[10px] text-gray-400 bg-transparent border-none font-bold outline-none cursor-pointer">
                            <option>This Week</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Green Pill */}
                        <div className="bg-[#B4E567] text-gray-900 rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:bg-[#a6d85a] transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="w-10 h-10 border border-gray-900/10 text-gray-900 rounded-xl flex items-center justify-center">
                                    <Activity size={18} />
                                </div>
                                <div className="flex-1 pr-2">
                                    <p className="text-[11px] font-bold tracking-wide text-gray-800">Optimization 10x</p>
                                    <div className="flex justify-between items-end mt-1 w-full text-gray-900">
                                        <p className="text-xs font-black tracking-widest">75% <span className="text-[9px] font-medium opacity-80">(7/10)</span></p>
                                        <p className="text-[9px] opacity-70 font-medium">Core</p>
                                    </div>
                                    <div className="h-1 w-full bg-white/40 rounded-full mt-1.5"><div className="h-full bg-white rounded-full w-[75%]"></div></div>
                                </div>
                            </div>
                        </div>
                        {/* Yellow Pill */}
                        <div className="bg-[#FFD166] text-gray-900 rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:bg-[#eec054] transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="w-10 h-10 border border-gray-900/10 text-gray-900 rounded-xl flex items-center justify-center">
                                    <Activity size={18} />
                                </div>
                                <div className="flex-1 pr-2">
                                    <p className="text-[11px] font-bold tracking-wide text-gray-800">Backup Sync</p>
                                    <div className="flex justify-between items-end mt-1 w-full text-gray-900">
                                        <p className="text-xs font-black tracking-widest">60% <span className="text-[9px] font-medium opacity-80">(5/8)</span></p>
                                        <p className="text-[9px] opacity-70 font-medium">Storage</p>
                                    </div>
                                    <div className="h-1 w-full bg-white/40 rounded-full mt-1.5"><div className="h-full bg-white rounded-full w-[60%]"></div></div>
                                </div>
                            </div>
                        </div>
                        {/* Orange Pill */}
                        <div className="bg-[#215b33] text-gray-900 rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:bg-[#1a4a29] transition-colors cursor-pointer">
                             <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="w-10 h-10 border border-gray-900/10 text-gray-900 rounded-xl flex items-center justify-center">
                                    <Activity size={18} />
                                </div>
                                <div className="flex-1 pr-2">
                                    <p className="text-[11px] font-bold tracking-wide text-gray-800">Security Patch</p>
                                    <div className="flex justify-between items-end mt-1 w-full text-gray-900">
                                        <p className="text-xs font-black tracking-widest">50% <span className="text-[9px] font-medium opacity-80">(3/6)</span></p>
                                        <p className="text-[9px] opacity-70 font-medium">Updates</p>
                                    </div>
                                    <div className="h-1 w-full bg-white/40 rounded-full mt-1.5"><div className="h-full bg-white rounded-full w-[50%]"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Lists Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {/* Left List */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 text-gray-900 border-l-[6px] border-l-[#B4E567]">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold">High Priority Tasks</span>
                            <span className="text-gray-400">...</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-[1.5rem] p-4 flex flex-col cursor-pointer border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                     <span className="px-2 py-1 bg-[#B4E567] text-gray-900 rounded-lg text-[9px] font-bold">Urgent</span>
                                     <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><Activity size={10} /> 2h left</span>
                                </div>
                                <div className="h-24 bg-gray-100 rounded-[1rem] mb-4 overflow-hidden">
                                     <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-xs tracking-tight mb-1">Server Migration X2</h4>
                                <p className="text-[9px] text-gray-400 font-medium leading-relaxed">Transitioning primary clusters to secondary zone.</p>
                            </div>
                            <div className="bg-white rounded-[1.5rem] p-4 flex flex-col cursor-pointer border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                     <span className="px-2 py-1 bg-[#FFD166] text-gray-900 rounded-lg text-[9px] font-bold">Planned</span>
                                     <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><Activity size={10} /> Tmrw</span>
                                </div>
                                <div className="h-24 bg-gray-100 rounded-[1rem] mb-4 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-xs tracking-tight mb-1">Data Review Sprints</h4>
                                <p className="text-[9px] text-gray-400 font-medium leading-relaxed">Quarterly compliance check for all integrations.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right List */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 text-gray-900 border-l-[6px] border-l-[#215b33] flex flex-col">
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold">Staff Activity</span>
                            <span className="text-gray-400">...</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-3 justify-center">
                            {[
                                { name: 'Support Tickets', count: '12 open', time: '10 min', color: 'bg-[#B4E567] text-gray-900', lvl: 'High' },
                                { name: 'Onboarding Calls', count: '5 scheduled', time: '1 hr', color: 'bg-[#FFD166] text-gray-900', lvl: 'Routine' },
                                { name: 'Billing Review', count: '8 pending', time: '30 min', color: 'bg-[#215b33] text-gray-900', lvl: 'Critical' },
                            ].map((a, i) => (
                                <div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-all">
                                    <div className="w-12 h-12 bg-[#FDFBF7] rounded-xl flex-shrink-0 border border-gray-100 flex items-center justify-center text-[#215b33]">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full rounded-xl object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xs">{a.name}</h4>
                                        <div className="flex gap-3 text-[10px] font-bold text-gray-400 mt-0.5">
                                            <span>{a.count}</span>
                                            <span>{a.time}</span>
                                        </div>
                                        <div className={`mt-1.5 px-2 py-0.5 inline-block rounded text-[8px] font-bold ${a.color}`}>{a.lvl}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Docs */}
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mt-4 px-2">
                    <p>Copyright © 2024 ILAJBILGHIZA</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600">Term and conditions</a>
                        <a href="#" className="hover:text-gray-600">Contact</a>
                    </div>
                </div>

            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-1/4 bg-[#FDFBF7] min-h-screen border-l border-white/50 lg:sticky lg:top-0 p-8 flex flex-col text-gray-800">
                
                {/* Profile Top */}
                <div className="flex items-center justify-between mb-10 w-full cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                            <span className="text-[#B4E567] font-bold">A</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 transition-colors">Adam Vasylenko</p>
                            <p className="text-[10px] font-medium text-gray-400">Member</p>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm relative transition-all bg-white hover:bg-gray-50">
                        <Bell size={14} />
                        <span className="w-1.5 h-1.5 bg-[#215b33] rounded-full absolute top-2 right-2.5"></span>
                    </div>
                </div>

                {/* Calendar Widget */}
                <div className="mb-10 w-full">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-900">September 2028</span>
                        <div className="flex gap-1">
                            <button className="w-6 h-6 flex items-center justify-center bg-white shadow-sm rounded text-gray-400 hover:bg-gray-50"><ChevronLeft size={14} /></button>
                            <button className="w-6 h-6 flex items-center justify-center bg-white shadow-sm rounded text-gray-400 hover:bg-gray-50"><ChevronRight size={14} /></button>
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        {['Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => (
                            <div key={d} className={`flex flex-col items-center justify-center w-10 h-14 rounded-xl cursor-pointer ${i === 1 ? 'bg-[#B4E567] text-gray-900 shadow-sm' : 'hover:bg-white text-gray-400'}`}>
                                <span className="text-[9px] font-bold mb-1">{d}</span>
                                <span className={`text-xs font-black ${i === 1 ? 'text-gray-900' : 'text-gray-600'}`}>{i + 4}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vertical Event Timeline */}
                <div className="flex-1 overflow-y-auto no-scrollbar w-full relative">
                    {/* Line behind */}
                    <div className="absolute left-[29px] top-4 bottom-4 w-px bg-gray-200"></div>

                    <div className="space-y-6 mt-4">
                        
                        {/* Box Type Timeline Event 1 */}
                        <div className="relative pl-12 border-b border-gray-100 pb-6">
                            <div className="absolute left-6 top-1 w-3 h-3 bg-[#B4E567] border-2 border-white rounded-[4px] z-10 shadow-sm"></div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-0.5 bg-white border border-gray-100 text-gray-900 font-bold text-[10px] rounded flex items-center gap-1"><div className="w-1.5 h-1.5 bg-[#B4E567] rounded-full"></div> Breakfast</span>
                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Activity size={10} /> 300 kcal</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <img src="https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=50" className="w-10 h-10 rounded-xl object-cover" />
                                <div>
                                    <h4 className="text-[11px] font-bold text-gray-900 mb-2 leading-tight">Scrambled Eggs with Spinach & Toast</h4>
                                    <div className="flex gap-3 text-[9px] font-bold text-gray-400">
                                        <span>C 25g</span>
                                        <span>P 20g</span>
                                        <span>F 12g</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Box Type Timeline Event 2 */}
                        <div className="relative pl-12 border-b border-gray-100 pb-6">
                            <div className="absolute left-6 top-1 w-3 h-3 bg-white border-2 border-[#B4E567] outline outline-1 outline-offset-[2px] outline-[#B4E567] rounded-[4px] z-10"></div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-0.5 bg-[#B4E567] text-gray-900 font-bold text-[10px] rounded flex items-center gap-1"> Lunch</span>
                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Activity size={10} /> 450 kcal</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=50" className="w-10 h-10 rounded-xl object-cover" />
                                <div>
                                    <h4 className="text-[11px] font-bold text-gray-900 mb-2 leading-tight">Grilled Chicken Salad with Quinoa</h4>
                                    <div className="flex gap-3 text-[9px] font-bold text-gray-400">
                                        <span>C 40g</span>
                                        <span>P 35g</span>
                                        <span>F 20g</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                         {/* Box Type Timeline Event 3 */}
                         <div className="relative pl-12 border-b border-gray-100 pb-6">
                            <div className="absolute left-6 top-1 w-3 h-3 bg-white border-2 border-orange-200 rounded-[4px] z-10"></div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-0.5 bg-white border border-gray-100 text-gray-500 font-bold text-[10px] rounded">Snack</span>
                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Activity size={10} /> 200 kcal</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=50" className="w-10 h-10 rounded-xl object-cover" />
                                <div>
                                    <h4 className="text-[11px] font-bold text-gray-900 mb-2 leading-tight">Greek Yogurt with Berries</h4>
                                    <div className="flex gap-3 text-[9px] font-bold text-gray-400">
                                        <span>C 18g</span>
                                        <span>P 12g</span>
                                        <span>F 10g</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
