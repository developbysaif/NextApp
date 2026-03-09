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
    Activity,
    Calendar,
    MoreHorizontal,
    Globe,
    MousePointer2
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalUsers: 0,
        pendingOrders: 0,
        totalBlogs: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/orders');
                if (!response.ok) throw new Error('Stats fetch failed');
                const data = await response.json();

                const users = JSON.parse(localStorage.getItem("users") || "[]");
                const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

                if (data.success && data.orders) {
                    const orders = data.orders || [];
                    const revenue = orders.filter(o => o && o.status !== 'Cancelled').reduce((acc, o) => acc + (o.totalAmount || 0), 0);
                    const pending = orders.filter(o => o && o.status === 'Pending').length;

                    setStats({
                        totalRevenue: revenue,
                        totalOrders: orders.length,
                        totalUsers: users.length,
                        pendingOrders: pending,
                        totalBlogs: blogs.length,
                        recentActivity: orders.slice(0, 6)
                    });
                }
            } catch (error) {
                console.error("Fetch stats error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const revenueData = [
        { name: '12 Aug', revenue: 4500, orders: 3200 },
        { name: '13 Aug', revenue: 5200, orders: 3800 },
        { name: '14 Aug', revenue: 4800, orders: 4100 },
        { name: '15 Aug', revenue: 6100, orders: 4800 },
        { name: '16 Aug', revenue: 14521, orders: 9500 },
        { name: '17 Aug', revenue: 8200, orders: 5200 },
        { name: '18 Aug', revenue: 9400, orders: 6100 },
        { name: '19 Aug', revenue: 8800, orders: 5800 },
    ];

    const categoryData = [
        { name: 'Organic Seeds', value: 40, color: '#22C55E' },
        { name: 'Herbal Oils', value: 25, color: '#8c8c4f' },
        { name: 'Health Supplements', value: 20, color: '#a6763f' },
        { name: 'Beauty Care', value: 15, color: '#21492f' },
    ];

    const trafficSources = [
        { name: 'Direct Traffic', value: 40, color: 'bg-green-500' },
        { name: 'Organic Search', value: 30, color: 'bg-green-400' },
        { name: 'Social Media', value: 15, color: 'bg-green-300' },
        { name: 'Referral Traffic', value: 10, color: 'bg-green-200' },
        { name: 'Email Campaigns', value: 5, color: 'bg-green-100' },
    ];

    const activeUsersByCountry = [
        { country: 'United States', users: 2758, percentage: 36, color: 'bg-green-600' },
        { country: 'United Kingdom', users: 1842, percentage: 24, color: 'bg-green-500' },
        { country: 'Indonesia', users: 1341, percentage: 17.5, color: 'bg-green-400' },
        { country: 'Russia', users: 1150, percentage: 15, color: 'bg-green-300' },
    ];

    const cards = [
        { name: 'Total Sales', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+3.34%', isUp: true, icon: DollarSign, color: 'text-green-600', bg: 'bg-[#FDF3E7]' },
        { name: 'Total Orders', value: stats.totalOrders, trend: '-2.89%', isUp: false, icon: ShoppingBag, color: 'text-gray-600', bg: 'bg-white' },
        { name: 'Total Visitors', value: '237,782', trend: '+8.02%', isUp: true, icon: Users, color: 'text-gray-600', bg: 'bg-white' },
    ];

    if (loading) return <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white rounded-[2rem]"></div>)}
        </div>
    </div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black font-outfit tracking-tight text-[#21492f]">Dashboard</h1>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
                        <Calendar size={18} />
                        Filter Date
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`${card.bg} p-8 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-sm font-bold text-gray-400 mb-1">{card.name}</p>
                                <h3 className="text-4xl font-black font-outfit text-[#21492f] tracking-tight">{card.value}</h3>
                            </div>
                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-500">
                                <card.icon size={22} className={card.color} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`flex items-center gap-1 text-xs font-black ${card.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {card.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {card.trend}
                            </span>
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">vs last week</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Revenue Analytics */}
                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-xl font-black font-outfit text-[#21492f]">Revenue Analytics</h3>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-600">
                                    <span className="w-3 h-0.5 bg-green-600 rounded-full"></span> Revenue
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300">
                                    <span className="w-3 h-0.5 bg-gray-200 rounded-full"></span> Orders
                                </div>
                            </div>
                        </div>
                        <select className="bg-[#F8F7F4] border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer hover:bg-[#efede8] transition-colors">
                            <option>Last 8 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#22C55E', strokeWidth: 2, strokeDasharray: '5 5' }}
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                                    itemStyle={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#22C55E"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#E2E8F0"
                                    strokeWidth={3}
                                    strokeDasharray="8 8"
                                    fill="transparent"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Categories */}
                <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black font-outfit text-[#21492f]">Top Categories</h3>
                        <button className="text-[10px] font-black uppercase text-green-600 hover:underline">See All</button>
                    </div>

                    <div className="flex-1 relative min-h-[250px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={() => null} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Sales</p>
                            <h4 className="text-2xl font-black text-[#21492f] mt-1">${stats.totalRevenue.toLocaleString()}</h4>
                        </div>
                    </div>

                    <div className="space-y-4 mt-8">
                        {categoryData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs font-bold text-gray-500 group-hover:text-[#21492f] transition-colors">{item.name}</span>
                                </div>
                                <span className="text-xs font-black text-[#21492f]">${(stats.totalRevenue * (item.value / 100)).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* World Map / Countries Stats */}
                <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black font-outfit text-[#21492f]">Active User</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase mt-1">2,758 Users</p>
                        </div>
                        <button className="p-2 text-gray-300 hover:text-green-600 transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {activeUsersByCountry.map((item) => (
                            <div key={item.country} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-600">{item.country}</span>
                                    <span className="text-sm font-black text-[#21492f]">{item.percentage}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-[10px] font-black uppercase text-green-500">+8.02%</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-300 uppercase">From last month</span>
                    </div>
                </div>

                {/* Conversion Rate Widgets */}
                <div className="lg:col-span-12 lg:grid lg:grid-cols-3 gap-6">
                    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black font-outfit text-[#21492f]">Conversion Rate</h3>
                            <select className="bg-orange-500 text-white border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none shadow-lg shadow-orange-100 cursor-pointer">
                                <option>This Week</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-5 gap-4 h-64 items-end">
                            {[
                                { label: 'Product Views', val: 70, col: 'bg-orange-100' },
                                { label: 'Add to Cart', val: 45, col: 'bg-orange-200' },
                                { label: 'Proceed to Checkout', val: 30, col: 'bg-orange-300' },
                                { label: 'Completed Purchases', val: 20, col: 'bg-orange-400' },
                                { label: 'Abandoned Carts', val: 10, col: 'bg-orange-500' }
                            ].map((bar) => (
                                <div key={bar.label} className="flex flex-col items-center gap-4 group">
                                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-tighter text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                        {bar.label}
                                    </div>
                                    <div className={`w-full ${bar.col} rounded-2xl transition-all duration-500 group-hover:scale-105`} style={{ height: `${bar.val * 2}px` }}></div>
                                    <span className="text-[10px] font-black text-[#21492f]">{bar.val}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#1A1C1E] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-green-500/20 transition-all duration-700"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Recent Activity</h3>
                                <ArrowUpRight size={22} className="text-green-500" />
                            </div>

                            <div className="space-y-8 flex-1">
                                {stats.recentActivity.map((order, i) => (
                                    <div key={order._id} className="flex gap-4 items-center group cursor-pointer">
                                        <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-green-500 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                                            <ShoppingBag size={20} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="font-black text-xs uppercase truncate group-hover:text-green-400 transition-colors">Order {order.orderId}</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{order.user?.name || 'Guest User'}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-black text-xs">${(order.totalAmount || 0).toFixed(2)}</p>
                                            <div className="flex items-center gap-1 justify-end mt-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Pending' ? 'bg-orange-500' : 'bg-green-500 animation-pulse'}`}></div>
                                                <p className={`text-[8px] font-black uppercase ${order.status === 'Pending' ? 'text-orange-500' : 'text-green-500'}`}>{order.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {stats.recentActivity.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px]">No recent orders</p>
                                    </div>
                                )}
                            </div>

                            <button className="mt-10 w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all border border-white/5">
                                View Full Audit Log
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
