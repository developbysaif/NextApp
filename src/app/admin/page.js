"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Users,
    DollarSign,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Package,
    Calendar,
    MoreHorizontal,
    Globe,
    MousePointer2,
    ChevronDown
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

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalRevenue: 52,
        totalOrders: 4,
        totalVisitors: 237782,
        recentActivity: [
            { id: '1', orderId: 'ORD-7HF', user: { name: 'GUEST USER' }, totalAmount: 21.00, status: 'PENDING' },
            { id: '2', orderId: 'ORD-2KH', user: { name: 'GUEST USER' }, totalAmount: 18.00, status: 'PENDING' },
            { id: '3', orderId: 'ORD-9XY', user: { name: 'GUEST USER' }, totalAmount: 5.00, status: 'PENDING' },
            { id: '4', orderId: 'ORD-3PO', user: { name: 'GUEST USER' }, totalAmount: 7.00, status: 'PENDING' },
        ]
    });
    const [loading, setLoading] = useState(false);

    // Hardcoded stats based on the exact image to ensure pixel-perfect reproduction
    const revenueData = [
        { name: '12 Aug', revenue: 4500, orders: 3200 },
        { name: '13 Aug', revenue: 5200, orders: 3800 },
        { name: '14 Aug', revenue: 4800, orders: 4100 },
        { name: '16 Aug', revenue: 6100, orders: 4800 },
        { name: '17 Aug', revenue: 13500, orders: 8500 },
        { name: '18 Aug', revenue: 8200, orders: 5200 },
        { name: '19 Aug', revenue: 9400, orders: 6100 },
        { name: '19 Aug', revenue: 8300, orders: 5800 },
    ];

    const categoryData = [
        { name: 'Organic Seeds', value: 40, color: '#1A5A3B', amount: 20.8 },
        { name: 'Herbal Oils', value: 25, color: '#6A7147', amount: 13 },
        { name: 'Health Supplements', value: 20, color: '#975E38', amount: 10.4 },
        { name: 'Beauty Care', value: 15, color: '#323E37', amount: 7.5 },
    ];

    const activeUsersByCountry = [
        { country: 'United States', percentage: 36, color: 'bg-[#183220]' },
        { country: 'United Kingdom', percentage: 24, color: 'bg-[#183220]' },
        { country: 'Indonesia', percentage: 17.5, color: 'bg-[#183220]' },
        { country: 'Russia', percentage: 15, color: 'bg-[#183220]' },
    ];

    return (
        <div className="relative font-sans text-[#203626] pb-20">
            {/* Dark Green Background Header Block */}
            <div className="absolute top-0 left-[-40px] right-[-40px] h-[260px] bg-[#122A1A] z-0 px-10"></div>

            <div className="relative z-10 pt-4 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-[28px] font-bold tracking-tight text-white">Dashboard</h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#E1E1DA] rounded-lg text-xs font-bold text-[#455A4B] transition-all shadow-sm">
                        <Calendar size={14} />
                        Filter Date
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-[#EAE5D9] p-3 rounded-[32px] shadow-lg border border-[#A5C3A5]/20">
                        <div className="bg-white rounded-[24px] p-6 h-full flex flex-col justify-between border-b-2 border-r-2 border-[#D1D9CA]/50 shadow-inner">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[13px] font-semibold text-[#546458] mb-1">Total Sales</p>
                                    <h3 className="text-[34px] font-bold text-[#142A1D] tracking-tight leading-none">${stats.totalRevenue}</h3>
                                </div>
                                <div className="p-3 bg-[#E9E4DB] rounded-2xl border border-white shadow-sm flex items-center justify-center">
                                    <DollarSign size={20} className="text-[#6C8472]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <span className="flex items-center gap-1 text-[11px] font-bold text-[#3B925D]">
                                    <TrendingUp size={14} strokeWidth={2.5} />
                                    +3.34%
                                </span>
                                <span className="text-[9px] font-bold text-[#8D9F91] uppercase tracking-widest">vs last week</span>
                                <div className="flex-1"></div>
                                {/* Mini sparkline approx svg */}
                                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="ml-auto">
                                    <path d="M0 15C5 15 8 10 15 12C20 14 25 5 30 5C35 5 38 0 40 0" stroke="#3B925D" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#EAE5D9] p-3 rounded-[32px] shadow-lg border border-[#A5C3A5]/20">
                        <div className="bg-white rounded-[24px] p-6 h-full flex flex-col justify-between border-b-2 border-r-2 border-[#D1D9CA]/50 shadow-inner">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[13px] font-semibold text-[#546458] mb-1">Total Orders</p>
                                    <h3 className="text-[34px] font-bold text-[#142A1D] tracking-tight leading-none">{stats.totalOrders}</h3>
                                </div>
                                <div className="p-3 bg-[#E9E4DB] rounded-2xl border border-white shadow-sm flex items-center justify-center">
                                    <ShoppingBag size={20} className="text-[#6C8472]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <span className="flex items-center gap-1 text-[11px] font-bold text-[#C16A54]">
                                    <TrendingDown size={14} strokeWidth={2.5} />
                                    -2.88%
                                </span>
                                <span className="text-[9px] font-bold text-[#8D9F91] uppercase tracking-widest">vs last week</span>
                                <div className="flex-1"></div>
                                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="ml-auto">
                                    <path d="M0 5C5 5 8 10 15 8C20 6 25 15 30 15C35 15 38 20 40 20" stroke="#C16A54" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#EAE5D9] p-3 rounded-[32px] shadow-lg border border-[#A5C3A5]/20">
                        <div className="bg-white rounded-[24px] p-6 h-full flex flex-col justify-between border-b-2 border-r-2 border-[#D1D9CA]/50 shadow-inner">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[13px] font-semibold text-[#546458] mb-1">Total Visitors</p>
                                    <h3 className="text-[34px] font-bold text-[#142A1D] tracking-tight leading-none">{stats.totalVisitors.toLocaleString()}</h3>
                                </div>
                                <div className="p-3 bg-[#E9E4DB] rounded-2xl border border-white shadow-sm flex items-center justify-center">
                                    <Users size={20} className="text-[#6C8472]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <span className="flex items-center gap-1 text-[11px] font-bold text-[#3B925D]">
                                    <TrendingUp size={14} strokeWidth={2.5} />
                                    +8.02%
                                </span>
                                <span className="text-[9px] font-bold text-[#8D9F91] uppercase tracking-widest">vs last week</span>
                                <div className="flex-1"></div>
                                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="ml-auto">
                                    <path d="M0 18C5 18 8 15 15 17C20 19 25 10 30 10C35 10 38 2 40 0" stroke="#3B925D" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid Below Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">

                    {/* Left Column (8 units) */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Revenue Analytics Chart */}
                        <div className="bg-[#EFECE0] p-8 rounded-[40px] shadow-sm flex flex-col border border-white">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-[17px] font-bold font-sans text-[#1F3325]">Revenue Analytics</h3>
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#1A5A3B]">
                                            <span className="w-8 h-1 bg-[#1A5A3B] rounded-full"></span> REVENUE
                                        </div>
                                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#8D9F91]">
                                            <span className="w-8 h-1 border-t-2 border-dashed border-[#8D9F91]"></span> ORDERS
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#B7CCA6]/50 flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer shadow-inner">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F3325]">Last 5 Days</span>
                                    <ChevronDown size={14} className="text-[#1F3325]" />
                                </div>
                            </div>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                                            tickFormatter={(value) => `$${value / 1000}k`}
                                            dx={-10}
                                        />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="revenue" stroke="#1A5A3B" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                        <Area type="monotone" dataKey="orders" stroke="#546458" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Conversion Rate Bottom Area */}
                        <div className="bg-[#EFECE0] p-8 rounded-[40px] shadow-sm flex flex-col border border-white">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-[17px] font-bold font-sans text-[#1F3325]">Conversion Rate</h3>
                                <div className="bg-[#B7CCA6]/50 flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer shadow-inner shadow-black/5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1F3325]">This Week</span>
                                    <ChevronDown size={14} className="text-[#1F3325]" />
                                </div>
                            </div>

                            <div className="h-[180px] flex items-end justify-between px-6 gap-6 relative">
                                {/* Horizontal grid line approximation */}
                                <div className="absolute top-[85%] left-0 right-0 h-px bg-[#D1D9CA] z-0"></div>

                                {[
                                    { val: 70, h: '85%' },
                                    { val: 49, h: '60%' },
                                    { val: 30, h: '40%' },
                                    { val: 20, h: '30%' },
                                    { val: 10, h: '20%' }
                                ].map((bar, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 relative z-10 w-full">
                                        <div
                                            className="w-full rounded-[10px] shadow-[inset_-2px_-5px_10px_rgba(0,0,0,0.3)] bg-gradient-to-t from-[#B05B1E] via-[#DFA170] to-[#E3A877] relative"
                                            style={{ height: bar.h }}
                                        >
                                            <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 shadow-[0_10px_15px_rgba(176,91,30,0.5)] w-3/4 h-[5px] rounded-[50%] blur-[4px]"></div>
                                        </div>
                                        <span className="text-[11px] font-bold text-[#1F3325] mt-1">{bar.val}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (4 units) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Top Categories Card */}
                        <div className="bg-[#EFECE0] p-8 rounded-[40px] shadow-sm flex flex-col border border-white h-auto relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[17px] font-bold text-[#1F3325]">Top Categories</h3>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#3B925D] hover:underline cursor-pointer">SEE ALL</span>
                            </div>

                            <div className="relative w-full h-[220px] flex items-center justify-center -mt-2 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={95}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    {/* The inner shadow effect of pie chart ring */}
                                    <div className="w-[130px] h-[130px] rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center">
                                        <p className="text-[9px] font-bold text-[#546458] uppercase tracking-widest leading-none mb-1">Total Sales</p>
                                        <h4 className="text-[26px] font-bold font-sans text-[#142A1D] leading-none">${stats.totalRevenue}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {categoryData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-[10px] h-[10px] rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-[12px] font-semibold text-[#546458]">{item.name}</span>
                                        </div>
                                        <span className="text-[12px] font-bold text-[#142A1D]">${item.amount.toFixed(1)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active User / Map Card */}
                        <div className="bg-[#EFECE0] p-8 rounded-[40px] shadow-sm flex flex-col border border-white">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-[17px] font-bold text-[#1F3325] leading-tight mb-1">Active User</h3>
                                    <p className="text-[11px] font-bold text-[#546458]">3,758 Users</p>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#E4EFE3] px-3 py-1.5 rounded-full mt-1 border border-[#3B925D]/20 shadow-inner">
                                    <div className="w-1.5 h-1.5 bg-[#3B925D] rounded-full animate-pulse"></div>
                                    <span className="text-[12px] font-bold text-[#1F3325]">Live</span>
                                </div>
                            </div>

                            {/* Faded World Map Background */}
                            <div className="relative pt-6 pb-6">
                                <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none grayscale"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%23183220' d='M250,150 L260,160 L240,170 Z M700,100 L710,120 L680,110 Z M500,200 L550,210 L520,240 Z M800,300 L850,280 L820,320 Z'/%3E%3C/svg%3E")`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    {/* Placeholder simple mapped dots for the visual to mimic world map */}
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" className="w-full opacity-60 grayscale filter" alt="" />
                                </div>

                                <div className="relative z-10 space-y-5">
                                    {activeUsersByCountry.map((item) => (
                                        <div key={item.country} className="space-y-1.5">
                                            <div className="flex justify-between items-center px-1">
                                                <span className="text-[11px] font-bold text-[#1F3325]">{item.country}</span>
                                                <span className="text-[11px] font-black text-[#1F3325]">{item.percentage}%</span>
                                            </div>
                                            <div className="h-[6px] w-full bg-[#D1D9CA] rounded-full overflow-hidden shadow-inner flex">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-end mt-4 pt-2">
                                <div className="flex gap-1.5 items-center">
                                    <TrendingUp size={12} strokeWidth={3} className="text-[#3B925D]" />
                                    <span className="text-[10px] font-black tracking-widest text-[#3B925D]">+8.02%</span>
                                </div>
                                <span className="text-[8px] font-bold text-[#8D9F91] uppercase tracking-[0.1em]">FROM LAST MONTH</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Black Box Area exactly like mockup floating over right edge overlapping? No, it looks like a card on the bottom right. */}
                <div className="absolute right-0 bottom-0 lg:bottom-10 lg:w-[360px] w-full flex justify-end z-20">
                    <div className="bg-[#202220] p-6 lg:rounded-l-[40px] lg:rounded-br-[40px] rounded-t-[40px] w-full max-w-[400px] border border-[#2A312C] shadow-2xl relative overflow-hidden">
                        {/* Top-right subtle glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-900/40 blur-[40px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8 opacity-80 pl-2">
                                <h3 className="text-[11px] font-bold text-[#A5C3A5] uppercase tracking-widest flex items-center gap-1">
                                    RECENT ACTIVITY
                                </h3>
                                <ArrowUpRight size={16} className="text-[#A5C3A5]" />
                            </div>

                            <div className="space-y-3">
                                {stats.recentActivity.map((order, i) => (
                                    <div key={i} className="bg-[#292D2A] p-4 rounded-[20px] flex items-center justify-between border border-white/5 shadow-md">
                                        <div className="flex items-center gap-4">
                                            <div className="w-[38px] h-[38px] bg-[#222523] rounded-2xl flex items-center justify-center border border-white/5 shadow-inner">
                                                <ShoppingBag size={16} className="text-[#3B925D]" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-bold text-[#D1D9CA] uppercase tracking-wider mb-0.5">
                                                    ORDER {order.orderId}
                                                </p>
                                                <p className="text-[9px] font-semibold text-[#8D9F91] uppercase tracking-[0.1em]">
                                                    {order.user.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end">
                                            <p className="text-[12px] font-bold text-white mb-0.5">${order.totalAmount.toFixed(2)}</p>
                                            <span className="text-[8px] font-bold text-[#E18D5E] uppercase tracking-widest">{order.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <button className="w-full bg-transparent border border-white/10 text-[#8D9F91] hover:text-white py-4 rounded-[20px] text-[9px] font-bold uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2">
                                    VIEW FULL AUDIT LOG
                                    <div className="w-4 h-4 rounded-full bg-white/20 blur-sm"></div>
                                </button>
                                {/* Star overlay graphic on the button */}
                                <div className="absolute bottom-4 right-10 pointer-events-none rotate-45 transform scale-150">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#8D9F91" className="opacity-20" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
