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

    // Simulated simple data for the activity charts/lines
    const barHeights = [20, 60, 40, 80, 50, 90, 70, 30];
    
    return (
        <div className="font-sans text-gray-800 bg-[#FDFBF7] min-h-screen flex flex-col lg:flex-row pb-6">
            
            {/* Center Content */}
            <div className="flex-1 px-6 pt-6 flex flex-col gap-5 w-full lg:w-3/4">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#214a32] flex items-center gap-2">
                            Hello, {currentUser?.name?.split(' ')[0] || 'Adam'}! <span className="text-xl">👋</span>
                        </h1>
                        <p className="text-sm text-gray-500 font-medium italic">Welcome to IlajBilGhiza Admin Portal</p>
                    </div>
                    
                    <div className="relative w-[300px] hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search logs, users..." 
                            className="w-full bg-white rounded-[1rem] py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-1 border border-transparent shadow-sm text-gray-700 ring-[#a4d9bc]"
                        />
                    </div>
                </div>

                {/* Top Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                    {/* Card 1: Revenue (Updated Colors) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">Total Revenue</span>
                            <div className="w-6 h-6 border bg-[#a4d9bc]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#214a32]">
                                <DollarSign size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gray-900">${activeStats.revenue}</span>
                            <div className="w-full relative h-10 mt-3 pt-5">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-[3px] border-[#214a32] bg-white z-10"></div>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-[#214a32]"></div>
                                <div className="flex justify-between w-full border-t border-gray-100 pt-1 relative">
                                    {[1,2,3,4,5,6,7].map(i => <div key={i} className={`w-0.5 h-1.5 ${i===4 ? 'bg-[#214a32]' : 'bg-gray-200'}`}></div>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Active Users (Updated Colors) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">Active Users</span>
                            <div className="w-6 h-6 border bg-[#a4d9bc]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#214a32]">
                                <Users size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-900">{activeStats.users}</span>
                            <div className="mt-4 flex h-3 gap-1 w-full">
                                <div className="h-full bg-[#214a32] rounded-l-full w-[76%]"></div>
                                <div className="h-full bg-[#989a69] rounded-r-full flex-1 border-r-2 border-dashed border-white"></div>
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                <span>76% Target reached</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Consults (Updated Colors) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">Total Consults</span>
                            <div className="w-6 h-6 border bg-[#a4d9bc]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#214a32]">
                                <Activity size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-900">{activeStats.consults}</span>
                            <div className="flex items-end justify-between h-8 mt-2 w-full gap-1">
                                {barHeights.map((h, i) => (
                                    <div key={i} className={`w-1.5 rounded-full ${h > 60 ? 'bg-[#989a69]' : 'bg-[#989a69]/40'}`} style={{ height: '100%' }}>
                                        <div className="w-full rounded-full bg-[#989a69]" style={{ height: `${h}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Platform Uptime (Updated Colors) */}
                    <div className="bg-white p-5 rounded-[1.5rem] flex flex-col justify-between relative shadow-sm border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-bold text-gray-900">System Uptime</span>
                            <div className="w-6 h-6 border bg-[#a4d9bc]/20 border-gray-100/50 rounded-md flex items-center justify-center text-[#214a32]">
                                <TrendingUp size={14} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold text-gray-900">99.8%</span>
                            <div className="w-full h-8 bg-[#989a69] rounded-md mt-2 relative overflow-hidden flex items-center px-3">
                                <span className="text-[10px] font-bold text-white z-10 italic">OPTIMAL</span>
                                <div className="absolute top-1 right-0 bottom-0 w-8 bg-[#214a32]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Data Charts */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2">
                    
                    {/* Growth Gauge */}
                    <div className="bg-white p-6 rounded-[2rem] md:col-span-4 shadow-sm border border-gray-50 flex flex-col relative text-center items-center">
                         <div className="w-full flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-tighter">Global Growth</span>
                            <span className="text-gray-400">...</span>
                        </div>
                        
                        <div className="w-48 h-24 overflow-hidden relative mb-2">
                             <div className="w-48 h-48 rounded-full border-[18px] border-gray-100 absolute top-0 left-0"></div>
                             <div 
                                className="w-48 h-48 rounded-full border-[18px] border-[#214a32] absolute top-0 left-0 border-b-transparent border-l-transparent -rotate-45"
                             ></div>
                             <div className="absolute top-4 right-10 w-4 h-4 bg-white border-[4px] border-[#a4d9bc] rounded-full shadow-md z-10"></div>
                             <div className="absolute bottom-1 w-full text-center flex flex-col items-center">
                                 <h2 className="text-3xl font-black text-[#214a32] tracking-tight leading-none">78%</h2>
                                 <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Efficiency</p>
                             </div>
                        </div>
                        <div className="flex justify-between w-full max-w-[190px] px-2 text-[10px] text-gray-400 font-bold mt-1">
                            <span>0</span>
                            <span>100</span>
                        </div>
                        
                        <p className="text-[10px] text-gray-400 font-medium mt-6 max-w-[200px] leading-relaxed uppercase tracking-tighter">
                            System performance is stable and scaling as expected within parameters.
                        </p>
                    </div>

                    {/* Traffic Donut (Ecosystem Section Rename/Update) */}
                    <div className="bg-white p-6 rounded-[2rem] md:col-span-8 shadow-sm border border-gray-50 flex flex-col relative">
                        <div className="w-full flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-tighter">Portal Usage Analysis</span>
                            <span className="text-gray-400">...</span>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-around h-full gap-6">
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-[12px] border-gray-100"></div>
                                <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full -rotate-90">
                                    <path className="text-[#214a32]" strokeDasharray="65 100" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="text-[#a4d9bc]" strokeDasharray="15 100" strokeDashoffset="-65" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="flex flex-col items-center justify-center">
                                    <h3 className="text-2xl font-black text-gray-900 leading-none tracking-tight">1240</h3>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Requests</span>
                                </div>
                            </div>

                            <div className="flex-1 w-full max-w-xs space-y-5">
                                <div className="flex items-center gap-6 pb-4 border-b border-gray-50">
                                    <div className="flex gap-2 items-center">
                                         <div className="w-6 h-6 rounded-md bg-[#a4d9bc]/20 flex items-center justify-center text-[#214a32] font-bold text-xs uppercase">D</div>
                                         <div className="flex flex-col leading-tight">
                                            <span className="text-xs font-black text-gray-900 tracking-tight">1750 <span className="text-[9px] text-gray-400 font-medium">hits</span></span>
                                            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">Desktop</span>
                                         </div>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                         <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">M</div>
                                         <div className="flex flex-col leading-tight">
                                            <span className="text-xs font-black text-gray-900 tracking-tight">510 <span className="text-[9px] text-gray-400 font-medium">hits</span></span>
                                            <span className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">Mobile</span>
                                         </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                     <div className="flex items-center justify-between text-[11px] font-bold">
                                         <span className="text-[#214a32] w-8">Web</span>
                                         <span className="text-gray-400 flex-1 ml-2">App Traffic</span>
                                         <span className="text-[#214a32]">37%</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gray-300 w-[37%]"></div></div>
                                     
                                     <div className="flex items-center justify-between text-[11px] font-bold">
                                         <span className="text-[#214a32] w-8">API</span>
                                         <span className="text-gray-400 flex-1 ml-2">Integrations</span>
                                         <span className="text-[#214a32]">93%</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#a4d9bc] w-[93%]"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Tasks */}
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-[#214a32] uppercase tracking-widest">Ongoing Operations</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#a4d9bc] text-[#214a32] rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm border border-transparent hover:border-[#214a32]/10 transition-all cursor-pointer">
                            <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="w-10 h-10 border border-[#214a32]/10 text-[#214a32] rounded-xl flex items-center justify-center">
                                    <Activity size={18} />
                                </div>
                                <div className="flex-1 pr-2">
                                    <p className="text-[11px] font-bold tracking-wide text-[#214a32] uppercase italic">System Sync</p>
                                    <div className="flex justify-between items-end mt-1 w-full text-[#214a32]">
                                        <p className="text-xs font-black tracking-widest">75%</p>
                                        <p className="text-[9px] opacity-70 font-black">CORE</p>
                                    </div>
                                    <div className="h-1 w-full bg-[#214a32]/10 rounded-full mt-1.5"><div className="h-full bg-[#214a32] rounded-full w-[75%]"></div></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#989a69] text-white rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm relative overflow-hidden group hover:opacity-90 transition-all cursor-pointer">
                            <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="w-10 h-10 border border-white/20 text-white rounded-xl flex items-center justify-center">
                                    <Activity size={18} />
                                </div>
                                <div className="flex-1 pr-2">
                                    <p className="text-[11px] font-bold tracking-wide text-white uppercase italic">Security Shield</p>
                                    <div className="flex justify-between items-end mt-1 w-full text-white">
                                        <p className="text-xs font-black tracking-widest">60%</p>
                                        <p className="text-[9px] opacity-70 font-black">ACTIVE</p>
                                    </div>
                                    <div className="h-1 w-full bg-white/20 rounded-full mt-1.5"><div className="h-full bg-white rounded-full w-[60%]"></div></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#214a32] text-white rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm hover:bg-[#1a3b28] transition-all cursor-pointer">
                             <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="w-10 h-10 border border-white/20 text-white rounded-xl flex items-center justify-center">
                                    <Activity size={18} />
                                </div>
                                <div className="flex-1 pr-2">
                                    <p className="text-[11px] font-bold tracking-wide text-white uppercase italic">Data Processing</p>
                                    <div className="flex justify-between items-end mt-1 w-full text-white">
                                        <p className="text-xs font-black tracking-widest">50%</p>
                                        <p className="text-[9px] opacity-70 font-black">TASKS</p>
                                    </div>
                                    <div className="h-1 w-full bg-white/20 rounded-full mt-1.5"><div className="h-full bg-white rounded-full w-[50%]"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Logs Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {/* High Priority Tasks */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 text-gray-900 border-l-[6px] border-l-[#a4d9bc]">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#214a32]">Security Overviews</span>
                            <span className="text-gray-400">...</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-[1.5rem] p-4 flex flex-col cursor-pointer border border-gray-100 shadow-sm hover:border-[#a4d9bc] transition-all">
                                <div className="flex items-center justify-between mb-4">
                                     <span className="px-2 py-1 bg-[#214a32] text-white rounded-lg text-[9px] font-bold uppercase tracking-widest">Urgent</span>
                                     <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><Activity size={10} /> 2h left</span>
                                </div>
                                <div className="h-24 bg-gray-100 rounded-[1rem] mb-4 overflow-hidden">
                                     <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-xs tracking-tight mb-1 text-[#214a32]">Server Audit X1</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Node 4 compliance check in progress.</p>
                            </div>
                            <div className="bg-white rounded-[1.5rem] p-4 flex flex-col cursor-pointer border border-gray-100 shadow-sm hover:border-[#989a69] transition-all">
                                <div className="flex items-center justify-between mb-4">
                                     <span className="px-2 py-1 bg-[#989a69] text-white rounded-lg text-[9px] font-bold uppercase tracking-widest">Wait</span>
                                     <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><Activity size={10} /> Tmrw</span>
                                </div>
                                <div className="h-24 bg-gray-100 rounded-[1rem] mb-4 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-xs tracking-tight mb-1 text-[#214a32]">System Backup</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Scheduled full repository sync.</p>
                            </div>
                        </div>
                    </div>

                    {/* Staff Activity */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 text-gray-900 border-l-[6px] border-l-[#214a32] flex flex-col">
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#214a32]">Admin Activity</span>
                            <span className="text-gray-400">...</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-3 justify-center">
                            {[
                                { name: 'Audit Logs', count: '12 new', time: '10 min', color: 'bg-[#a4d9bc] text-[#214a32]', lvl: 'SECURE' },
                                { name: 'Support Queue', count: '5 open', time: '1 hr', color: 'bg-[#989a69] text-white', lvl: 'READY' },
                                { name: 'Billing Portal', count: '8 tasks', time: '30 min', color: 'bg-[#214a32] text-white', lvl: 'URGENT' },
                            ].map((a, i) => (
                                <div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-100 transition-all">
                                    <div className="w-12 h-12 bg-[#FDFBF7] rounded-xl flex-shrink-0 border border-gray-100 flex items-center justify-center text-[#214a32]">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full rounded-xl object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-xs text-[#214a32]">{a.name}</h4>
                                        <div className="flex gap-3 text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-tighter">
                                            <span>{a.count}</span>
                                            <span>{a.time} ago</span>
                                        </div>
                                        <div className={`mt-1.5 px-2 py-0.5 inline-block rounded text-[8px] font-black tracking-widest ${a.color}`}>{a.lvl}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between text-[11px] font-black text-gray-400 mt-4 px-2 uppercase tracking-widest">
                    <p>ILAJBILGHIZA • Admin Operations</p>
                    <div className="flex gap-4">
                        <span className="opacity-50">Portal v2.0.1</span>
                    </div>
                </div>

            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-1/4 bg-[#FDFBF7] min-h-screen border-l border-white/50 lg:sticky lg:top-0 p-8 flex flex-col text-gray-800">
                
                <div className="flex items-center justify-between mb-10 w-full cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-sm border border-[#a4d9bc]/30">
                            <span className="text-[#214a32] font-black">A</span>
                        </div>
                        <div>
                            <p className="text-sm font-black text-[#214a32] tracking-tighter uppercase">{currentUser?.name || 'Administrator'}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Admin</p>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#214a32] shadow-sm relative transition-all bg-white">
                        <Bell size={14} />
                        <span className="w-1.5 h-1.5 bg-[#a4d9bc] rounded-full absolute top-2 right-2.5"></span>
                    </div>
                </div>

                <div className="mb-6 w-full">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black text-[#214a32] uppercase tracking-widest">System Calendar</span>
                        <div className="flex gap-1">
                            <button className="w-6 h-6 flex items-center justify-center bg-white shadow-sm rounded text-gray-400 hover:text-[#214a32]"><ChevronLeft size={14} /></button>
                            <button className="w-6 h-6 flex items-center justify-center bg-white shadow-sm rounded text-gray-400 hover:text-[#214a32]"><ChevronRight size={14} /></button>
                        </div>
                    </div>
                    <div className="flex justify-between w-full">
                        {['M','T','W','T','F','S'].map((d, i) => (
                            <div key={i} className={`flex flex-col items-center justify-center w-8 h-12 rounded-xl cursor-pointer ${i === 1 ? 'bg-[#214a32] text-white shadow-md' : 'hover:bg-white text-gray-400'}`}>
                                <span className="text-[9px] font-black mb-1">{d}</span>
                                <span className="text-xs font-black tracking-tighter">{i + 4}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar w-full relative">
                    <div className="absolute left-[29px] top-4 bottom-4 w-px bg-gray-200 opacity-50"></div>
                    <div className="space-y-6 mt-4">
                        <div className="relative pl-12 border-b border-gray-100 pb-6">
                            <div className="absolute left-6 top-1 w-3 h-3 bg-[#a4d9bc] border-2 border-white rounded-[4px] z-10 shadow-sm"></div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-0.5 bg-white border border-gray-100 text-[#214a32] font-black text-[9px] rounded uppercase tracking-widest">Maintenance</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-50"><Activity size={20} className="text-[#a4d9bc]" /></div>
                                <div>
                                    <h4 className="text-[11px] font-black text-[#214a32] mb-1 uppercase tracking-tighter">Security Cache Refresh</h4>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em]">All endpoints updated.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative pl-12 border-b border-gray-100 pb-6">
                            <div className="absolute left-6 top-1 w-3 h-3 bg-white border-2 border-[#989a69] rounded-[4px] z-10"></div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-0.5 bg-[#989a69] text-white font-black text-[9px] rounded uppercase tracking-widest">Reporting</span>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-50"><TrendingUp size={20} className="text-[#989a69]" /></div>
                                <div>
                                    <h4 className="text-[11px] font-black text-[#214a32] mb-1 uppercase tracking-tighter">User Growth Report</h4>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em]">Weekly summary available.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
