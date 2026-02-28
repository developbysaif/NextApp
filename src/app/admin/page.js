"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Users,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    Package,
    Activity,
    Calendar
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
    Area
} from 'recharts';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalUsers: 0,
        pendingOrders: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch orders from API
                const response = await fetch('/api/orders');
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Admin Stats Fetch Error:', errorText);
                    throw new Error(`Stats fetch failed: ${response.status}`);
                }
                const data = await response.json();

                // Get other data from localStorage
                const users = JSON.parse(localStorage.getItem("users") || "[]");
                const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

                if (data.success) {
                    const orders = data.orders;
                    const revenue = orders.filter(o => o.status !== 'Cancelled').reduce((acc, o) => acc + o.totalAmount, 0);
                    const pending = orders.filter(o => o.status === 'Pending').length;

                    setStats({
                        totalRevenue: revenue,
                        totalOrders: orders.length,
                        totalUsers: users.length, // More accurate
                        pendingOrders: pending,
                        totalBlogs: blogs.length,
                        recentActivity: orders.slice(0, 5)
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

    const chartData = [
        { name: 'Mon', revenue: 400 },
        { name: 'Tue', revenue: 300 },
        { name: 'Wed', revenue: 600 },
        { name: 'Thu', revenue: 800 },
        { name: 'Fri', revenue: 500 },
        { name: 'Sat', revenue: 900 },
        { name: 'Sun', revenue: 700 },
    ];

    const cards = [
        { name: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Registered Users', value: stats.totalUsers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Medical Blogs', value: stats.totalBlogs || 0, icon: Package, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    ];

    if (loading) return <div className="p-8 animate-pulse grid grid-cols-4 gap-6"><div className="h-32 bg-white rounded-3xl" /><div className="h-32 bg-white rounded-3xl" /><div className="h-32 bg-white rounded-3xl" /><div className="h-32 bg-white rounded-3xl" /></div>;

    return (
        <div className="space-y-10">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <motion.div
                        key={card.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-gray-100 transition-all duration-500"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 ${card.bg} ${card.color} rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                                <card.icon size={24} />
                            </div>
                            <span className="text-green-500 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                                <TrendingUp size={12} /> +12%
                            </span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{card.name}</p>
                        <h3 className="text-4xl font-black font-outfit text-gray-900 tracking-tighter">{card.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">Revenue Analytics</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Weekly performance overview</p>
                        </div>
                        <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#22C55E" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders Side List */}
                <div className="bg-[#1A1C1E] p-10 rounded-[3rem] text-white shadow-2xl flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Recent Activity</h3>
                        <ArrowUpRight size={20} className="text-green-500" />
                    </div>
                    <div className="space-y-6 flex-1">
                        {stats.recentActivity.map((order, i) => (
                            <div key={order._id} className="flex gap-4 items-center group cursor-pointer">
                                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-green-500 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all">
                                    <ShoppingBag size={20} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-black text-xs uppercase truncate">Order {order.orderId}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{order.user?.name || 'Guest'}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="font-black text-xs">${order.totalAmount.toFixed(2)}</p>
                                    <p className="text-[9px] font-black uppercase text-green-500">{order.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white transition-all">
                        View System Logs
                    </button>
                </div>
            </div>
        </div>
    );
}
