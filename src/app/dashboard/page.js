"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    Package,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        totalSpent: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;
            try {
                const response = await fetch(`/api/orders?userId=${user._id || user.id}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Dashboard Data Fetch Error:', errorText);
                    throw new Error(`Data fetch failed: ${response.status}`);
                }
                const data = await response.json();
                if (data.success) {
                    const orders = data.orders;
                    const totalSpent = orders.reduce((acc, order) => acc + (parseFloat(order.totalAmount) || 0), 0);
                    const pending = orders.filter(o => o.status === 'Pending').length;

                    setStats({
                        totalOrders: orders.length,
                        pendingOrders: pending,
                        totalSpent: totalSpent,
                        recentOrders: orders.slice(0, 5)
                    });
                }
            } catch (error) {
                console.error("Fetch dashboard data error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    const statCards = [
        { name: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
        { name: 'Pending', value: stats.pendingOrders, icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
        { name: 'Total Spent', value: `$${stats.totalSpent.toFixed(2)}`, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-40 bg-white rounded-[2rem]" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-xl hover:shadow-gray-100 transition-all duration-500"
                    >
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{stat.name}</p>
                            <h3 className="text-3xl font-black font-outfit text-gray-900">{stat.value}</h3>
                        </div>
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                            <stat.icon size={28} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Recent Orders</h3>
                    <Link href="/dashboard/orders" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2E7D32] hover:gap-3 transition-all">
                        View All <ArrowUpRight size={16} />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-50">
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order) => (
                                    <tr key={order._id} className="group transition-colors hover:bg-gray-50/50">
                                        <td className="py-4 font-black text-xs font-outfit text-gray-900 group-hover:text-[#2E7D32] transition-colors">{order.orderId}</td>
                                        <td className="py-4 text-xs font-medium text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4">
                                            <span className={`
                                                px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                                                ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : ''}
                                                ${order.status === 'Processing' ? 'bg-blue-50 text-blue-600' : ''}
                                                ${order.status === 'Shipped' ? 'bg-purple-50 text-purple-600' : ''}
                                                ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : ''}
                                                ${order.status === 'Cancelled' ? 'bg-red-50 text-red-600' : ''}
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right font-black text-sm text-gray-900">${(parseFloat(order.totalAmount) || 0).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-gray-400">
                                            <Package size={48} strokeWidth={1} />
                                            <p className="text-xs font-black uppercase tracking-widest">No orders found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
