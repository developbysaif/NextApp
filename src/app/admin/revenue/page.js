"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    DollarSign, 
    TrendingUp, 
    TrendingDown, 
    Search, 
    Download, 
    Filter, 
    CreditCard, 
    Smartphone, 
    Globe, 
    MoreHorizontal,
    ShoppingCart,
    Crown,
    Stethoscope,
    Calendar,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    User
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

export default function AdminRevenuePage() {
    const revenueData = [
        { name: 'Mon', revenue: 4500, subscriptions: 2100, products: 2400 },
        { name: 'Tue', revenue: 5200, subscriptions: 2300, products: 2900 },
        { name: 'Wed', revenue: 4800, subscriptions: 2000, products: 2800 },
        { name: 'Thu', revenue: 6100, subscriptions: 2800, products: 3300 },
        { name: 'Fri', revenue: 7500, subscriptions: 3500, products: 4000 },
        { name: 'Sat', revenue: 8200, subscriptions: 4000, products: 4200 },
        { name: 'Sun', revenue: 9400, subscriptions: 4500, products: 4900 },
    ];

    const distributionData = [
        { name: 'E-Shop', value: 55, color: '#1A5A3B' },
        { name: 'Subscriptions', value: 30, color: '#DFA170' },
        { name: 'Consultations', value: 15, color: '#6A7147' },
    ];

    const transactions = [
        { id: 'TXN-1024', customer: 'Adam Ahmed', email: 'adam@example.com', amount: 45.00, method: 'Stripe', status: 'COMPLETED', date: 'Sept 20, 2028', type: 'Product' },
        { id: 'TXN-1025', customer: 'Fatima Ali', email: 'fatima@test.pk', amount: 12.00, method: 'JazzCash', status: 'COMPLETED', date: 'Sept 20, 2028', type: 'Subscription' },
        { id: 'TXN-1026', customer: 'Zaid Malik', email: 'zaid@health.com', amount: 25.00, method: 'EasyPaisa', status: 'PENDING', date: 'Sept 19, 2028', type: 'Consultation' },
        { id: 'TXN-1027', customer: 'Sara Khan', email: 'sara@test.com', amount: 150.00, method: 'Stripe', status: 'COMPLETED', date: 'Sept 18, 2028', type: 'Product' },
        { id: 'TXN-1028', customer: 'Omar Farooq', email: 'omar@example.com', amount: 5.00, method: 'JazzCash', status: 'FAILED', date: 'Sept 18, 2028', type: 'Subscription' },
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#122A1A] text-white rounded-[2rem] shadow-xl shadow-green-900/10">
                        <DollarSign size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Revenue Wall</h2>
                        <p className="text-gray-500 font-medium tracking-tight">Real-time financial analytics and transaction tracking.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-gray-100 p-4 rounded-2xl text-gray-400 hover:text-green-600 shadow-sm transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Calendar size={18} /> Last 7 Days</button>
                    <button onClick={() => {
                        const csvStr = "ID,Customer,Email,Type,Method,Amount,Status,Date\n" + transactions.map(t => `${t.id},${t.customer},${t.email},${t.type},${t.method},${t.amount},${t.status},${t.date}`).join("\n");
                        const blob = new Blob([csvStr], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'revenue_report.csv';
                        a.click();
                    }} className="bg-[#122A1A] text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10">
                        <Download size={18} strokeWidth={2.5} /> Export Report
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Net Revenue', val: '$5,248.50', change: '+12.5%', isPos: true, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'E-Shop Sales', val: '$3,120.00', change: '+8.2%', isPos: true, icon: ShoppingCart, color: 'text-[#2E7D32]', bg: 'bg-green-50' },
                    { label: 'Subscriptions', val: '$2,128.50', change: '-2.4%', isPos: false, icon: Crown, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Avg Order Value', val: '$45.20', change: '+4.8%', isPos: true, icon: TrendingUp, color: 'text-rose-500', bg: 'bg-rose-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm group">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`${stat.color} ${stat.bg} p-3 rounded-2xl group-hover:rotate-12 transition-transform`}><stat.icon size={20} /></div>
                            <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${stat.isPos ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.isPos ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-2xl font-black font-outfit uppercase">{stat.val}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Revenue Chart Column */}
                <div className="lg:col-span-8 bg-[#EFECE0] p-8 md:p-12 rounded-[4rem] border border-white shadow-sm space-y-10 relative overflow-hidden group">
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h3 className="text-xl font-black font-outfit uppercase tracking-tight text-[#1F3325]">Revenue Over Time</h3>
                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#1A5A3B]">
                                    <span className="w-8 h-1 bg-[#1A5A3B] rounded-full"></span> Subscriptions
                                </div>
                                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#DFA170]">
                                    <span className="w-8 h-1 border-t-2 border-dashed border-[#DFA170]"></span> Products
                                </div>
                            </div>
                        </div>
                        <div className="bg-black/5 flex items-center gap-2 px-6 py-3 rounded-full cursor-pointer hover:bg-black/10 transition-all shadow-inner">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1F3325]">Weekly View</span>
                            <ChevronDown size={14} className="text-[#1F3325]" />
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10 mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1A5A3B" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#1A5A3B" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D1D9CA" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 700, fill: '#8D9F91' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fontWeight: 700, fill: '#8D9F91' }}
                                    tickFormatter={(value) => `$${value}`}
                                    dx={-10}
                                />
                                <Tooltip />
                                <Area type="monotone" dataKey="subscriptions" stroke="#1A5A3B" strokeWidth={3} fillOpacity={1} fill="url(#colorSubs)" />
                                <Area type="monotone" dataKey="products" stroke="#DFA170" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Summary Column */}
                <div className="lg:col-span-4 bg-white p-8 md:p-12 rounded-[4rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                    <h3 className="text-sm font-black font-outfit uppercase tracking-wider mb-10">Revenue Streams</h3>
                    <div className="relative w-full h-[220px] flex items-center justify-center -mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="size-32 rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center bg-gray-50/50">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Net</p>
                                <h4 className="text-[22px] font-black font-outfit text-[#142A1D] leading-none">$5.2k</h4>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 mt-8">
                        {distributionData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-[11px] font-black uppercase text-gray-400 tracking-tight">{item.name}</span>
                                </div>
                                <span className="text-[12px] font-black text-[#142A1D]">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transactions List Section */}
            <div className="bg-white p-8 md:p-12 rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div className="relative group/search flex-1 lg:max-w-md w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-green-600 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Find transactions..." 
                            className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#122A1A] transition-all placeholder:text-gray-300 shadow-inner"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-8 py-3 rounded-[1.5rem] bg-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest hover:text-[#122A1A] transition-all">Today</button>
                        <button className="px-8 py-3 rounded-[1.5rem] bg-[#122A1A] text-white text-[9px] font-black uppercase tracking-widest shadow-lg">Weekly</button>
                        <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-green-600 transition-all border border-transparent hover:border-gray-100"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] lg:min-w-0">
                        <thead>
                            <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                                <th className="pb-8 text-left px-4">Transaction ID</th>
                                <th className="pb-8 text-left px-4">Customer Details</th>
                                <th className="pb-8 text-left px-4">Type</th>
                                <th className="pb-8 text-left px-4">Method / Proof</th>
                                <th className="pb-8 text-left px-4">Net Amount</th>
                                <th className="pb-8 text-right px-4">Status</th>
                                <th className="pb-8 text-right px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((txn) => (
                                <tr key={txn.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-8 px-4 text-[11px] font-black text-gray-400 font-outfit uppercase tracking-widest">{txn.id}</td>
                                    <td className="py-8 px-4">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 bg-gray-100 rounded-xl flex items-center justify-center shadow-inner shrink-0"><User size={16} className="text-gray-400" /></div>
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase text-gray-900 group-hover:text-[#122A1A] transition-colors">{txn.customer}</h4>
                                                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{txn.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4">
                                        <span className={`
                                            px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest
                                            ${txn.type === 'Product' ? 'bg-purple-50 text-purple-600' : ''}
                                            ${txn.type === 'Subscription' ? 'bg-amber-50 text-amber-600' : ''}
                                            ${txn.type === 'Consultation' ? 'bg-emerald-50 text-emerald-600' : ''}
                                        `}>
                                            {txn.type}
                                        </span>
                                    </td>
                                    <td className="py-8 px-4">
                                        <div className="flex items-center gap-3">
                                            {txn.method === 'Stripe' && <Globe size={14} className="text-[#635BFF]" />}
                                            {txn.method === 'JazzCash' && <Smartphone size={14} className="text-rose-600" />}
                                            {txn.method === 'EasyPaisa' && <Smartphone size={14} className="text-emerald-500" />}
                                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500">{txn.method}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black font-outfit text-gray-900">${txn.amount.toFixed(2)}</span>
                                            <span className="text-[8px] font-black text-gray-300 uppercase">incl. tax</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4 text-right">
                                        <span className={`
                                            px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest
                                            ${txn.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                            ${txn.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : ''}
                                            ${txn.status === 'FAILED' ? 'bg-rose-50 text-rose-600' : ''}
                                        `}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="py-8 px-4 text-right text-[10px] font-black text-gray-300 uppercase tracking-widest">{txn.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-50 pt-10">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Showing 5 out of 1,248 transactions</p>
                    <div className="flex gap-1">
                        <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#122A1A] transition-all"><ArrowUpRight size={18} className="rotate-180" /></button>
                        <button className="p-4 bg-[#122A1A] text-white rounded-2xl transition-all shadow-lg shadow-black/10"><ArrowUpRight size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
