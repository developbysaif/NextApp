"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Calendar,
    ArrowUpRight,
    Download,
    Filter,
    FileText,
    PieChart as PieIcon,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Loader2
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
    Cell,
    PieChart,
    Pie
} from 'recharts';

export default function AdminReportsPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders || []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate Report Data
    const totalSales = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

    const statusStats = [
        { name: 'Completed', value: completedOrders, color: '#22C55E' },
        { name: 'Pending', value: pendingOrders, color: '#F97316' },
        { name: 'Processing', value: orders.filter(o => o.status === 'Processing').length, color: '#3B82F6' },
        { name: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length, color: '#EF4444' },
    ].filter(s => s.value > 0);

    // Group sales by day (last 7 days simulation for now)
    const salesHistory = [
        { day: 'Mon', sales: totalSales * 0.1 },
        { day: 'Tue', sales: totalSales * 0.15 },
        { day: 'Wed', sales: totalSales * 0.12 },
        { day: 'Thu', sales: totalSales * 0.18 },
        { day: 'Fri', sales: totalSales * 0.2 },
        { day: 'Sat', sales: totalSales * 0.15 },
        { day: 'Sun', sales: totalSales * 0.1 },
    ];

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Generating Analytics...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black font-outfit tracking-tight text-[#21492f]">Financial Intelligence</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                        Detailed reporting & revenue breakdown
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest text-[#21492f] hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={20} />
                        Download CSV
                    </button>
                    <button className="flex items-center gap-2 px-6 py-4 bg-[#21492f] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-gray-200">
                        <FileText size={20} />
                        Print PDF
                    </button>
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: `$${totalSales.toLocaleString()}`, trend: '+14.5%', isUp: true, color: 'text-green-600' },
                    { label: 'Avg Order Value', value: `$${averageOrderValue.toFixed(2)}`, trend: '-2.1%', isUp: false, color: 'text-gray-600' },
                    { label: 'Success Rate', value: `${((completedOrders / orders.length) * 100 || 0).toFixed(1)}%`, trend: '+5.2%', isUp: true, color: 'text-blue-600' },
                    { label: 'Active Sessions', value: '1,280', trend: '+12%', isUp: true, color: 'text-orange-600' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-black font-outfit text-[#21492f] tracking-tighter">{stat.value}</h3>
                        <div className="mt-4 flex items-center gap-2">
                            <span className={`text-[10px] font-black flex items-center gap-1 ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.trend}
                            </span>
                            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">since last period</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sales Velocity */}
                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-xl font-black font-outfit text-[#21492f]">Sales Velocity</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase mt-1">Weekly transaction volume</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Live Flow</span>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesHistory}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#F8F7F4" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                                <Tooltip
                                    cursor={{ stroke: '#22C55E', strokeWidth: 2 }}
                                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#22C55E" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center">
                    <h3 className="text-xl font-black font-outfit text-[#21492f] self-start mb-8 text-left w-full">Order Integrity</h3>
                    <div className="h-64 w-full relative mb-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusStats}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {statusStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <h4 className="text-2xl font-black text-[#21492f]">{orders.length}</h4>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Tx</p>
                        </div>
                    </div>

                    <div className="w-full space-y-4">
                        {statusStats.map((status) => (
                            <div key={status.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                                    <span className="text-xs font-bold text-gray-500">{status.name}</span>
                                </div>
                                <span className="text-xs font-black text-[#21492f]">{status.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Detailed Reports */}
            <div className="bg-[#1A1C1E] p-10 rounded-[3rem] text-white overflow-hidden shadow-2xl relative">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Recent Transaction Log</h3>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Audit trail of last 5 orders</p>
                    </div>
                    <button className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest hover:underline">
                        View Full History <ArrowRight size={14} />
                    </button>
                </div>

                <div className="space-y-6">
                    {orders.slice(0, 5).map((order) => (
                        <div key={order._id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-default group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tight">#{order.orderId}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{order.user?.name || 'Guest User'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black">${(order.totalAmount || 0).toFixed(2)}</p>
                                <p className="text-[9px] font-black text-green-500 uppercase tracking-tighter mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && (
                        <div className="text-center py-10 opacity-30 italic font-bold">No transactions found to report.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
