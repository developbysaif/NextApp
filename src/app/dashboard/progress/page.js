"use client"

import React from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    AreaChart, 
    Area 
} from 'recharts';
import { TrendingDown, Flame, CheckCircle2, Target, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const weightData = [
    { day: 'Mon', weight: 80 },
    { day: 'Tue', weight: 79.5 },
    { day: 'Wed', weight: 79.2 },
    { day: 'Thu', weight: 78.8 },
    { day: 'Fri', weight: 78.5 },
    { day: 'Sat', weight: 78.2 },
    { day: 'Sun', weight: 78.0 },
];

const caloriesData = [
    { day: 'Mon', calories: 1800 },
    { day: 'Tue', calories: 2100 },
    { day: 'Wed', calories: 1750 },
    { day: 'Thu', calories: 1900 },
    { day: 'Fri', calories: 2200 },
    { day: 'Sat', calories: 1850 },
    { day: 'Sun', calories: 1700 },
];

export default function UserProgress() {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Your Progress</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Consistency is key to recovery</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Weekly Avg</p>
                        <p className="text-xl font-black text-emerald-600">78.8 kg</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weight Trend */}
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Weight Trend</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Past 7 Days</p>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                            <TrendingDown size={20} />
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weightData}>
                                <defs>
                                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#214a32" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#214a32" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9ca3af'}} />
                                <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="weight" stroke="#214a32" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Calories History */}
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-lg font-black text-gray-900">Calories History</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Intake vs Target</p>
                        </div>
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                            <Flame size={20} />
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={caloriesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9ca3af'}} />
                                <YAxis hide />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold', fontSize: '12px' }}
                                />
                                <Line type="monotone" dataKey="calories" stroke="#ea580c" strokeWidth={3} dot={{ r: 4, fill: '#ea580c' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-[#f0f9f4] p-8 rounded-[2.5rem] border border-[#dcfce7] flex flex-col items-center text-center">
                    <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-sm mb-4">
                        <CheckCircle2 size={28} />
                    </div>
                    <h4 className="text-sm font-black text-gray-900 mb-1">92% Completion</h4>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Diet Adherence</p>
                 </div>

                 <div className="bg-[#fff7ed] p-8 rounded-[2.5rem] border border-[#ffedd5] flex flex-col items-center text-center">
                    <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-orange-600 shadow-sm mb-4">
                        <Target size={28} />
                    </div>
                    <h4 className="text-sm font-black text-gray-900 mb-1">2.4 kg Lost</h4>
                    <p className="text-[10px] font-bold text-orange-700 uppercase tracking-widest">Monthly Goal</p>
                 </div>

                 <div className="bg-[#eef2ff] p-8 rounded-[2.5rem] border border-[#e0e7ff] flex flex-col items-center text-center">
                    <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm mb-4">
                        <Calendar size={28} />
                    </div>
                    <h4 className="text-sm font-black text-gray-900 mb-1">14 Days Streak</h4>
                    <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Consistent Logging</p>
                 </div>
            </div>
        </div>
    );
}
