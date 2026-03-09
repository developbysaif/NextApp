"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingBag,
    Search,
    Filter,
    Calendar,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    XCircle,
    Truck,
    Eye,
    MoreVertical,
    Download,
    Loader2
} from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders || []);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-50 text-green-600';
            case 'Pending': return 'bg-orange-50 text-orange-600';
            case 'Processing': return 'bg-blue-50 text-blue-600';
            case 'Cancelled': return 'bg-red-50 text-red-600';
            default: return 'bg-gray-50 text-gray-600';
        }
    };

    const filteredOrders = orders.filter(o =>
        o.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Accessing Ledger...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black font-outfit tracking-tight text-[#21492f]">Order Fulfillment</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                        Tracking {orders.length} active shipments
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-xs uppercase tracking-widest text-[#21492f] hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={18} />
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100">
                        <Truck size={18} />
                        Dispatch Batch
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pending', count: orders.filter(o => o.status === 'Pending').length, icon: Clock, color: 'text-orange-500' },
                    { label: 'Processing', count: orders.filter(o => o.status === 'Processing').length, icon: Loader2, color: 'text-blue-500' },
                    { label: 'Completed', count: orders.filter(o => o.status === 'Delivered').length, icon: CheckCircle2, color: 'text-green-500' },
                    { label: 'Rejected', count: orders.filter(o => o.status === 'Cancelled').length, icon: XCircle, color: 'text-red-500' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                        <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                            <stat.icon size={20} className={stat.label === 'Processing' ? 'animate-spin' : ''} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
                            <h4 className="text-xl font-black text-[#21492f] mt-0.5">{stat.count}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                            type="text"
                            placeholder="Find order by number or customer name..."
                            className="w-full bg-[#F8F7F4] border-transparent rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#F8F7F4] rounded-2xl font-bold text-xs uppercase tracking-widest text-gray-400 hover:text-green-600 transition-colors">
                        <Filter size={18} />
                        Status: Any
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8F7F4] border-b border-gray-50">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order Ref</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Date & Time</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <motion.tr
                                    key={order._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-green-50/20 transition-colors group"
                                >
                                    <td className="px-8 py-6 font-black text-xs text-green-600">
                                        #{order.orderId}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-[#21492f]">{order.user?.name || 'Guest'}</span>
                                            <span className="text-[10px] text-gray-400 uppercase font-medium">{order.shippingDetails?.phone || 'No phone'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-xs text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-gray-300 font-medium">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-black text-sm text-[#21492f]">
                                        ${(order.totalAmount || 0).toFixed(2)}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-400 font-black text-[9px] uppercase tracking-widest rounded-lg hover:bg-green-50 hover:text-green-600 transition-all">
                                                <Eye size={14} />
                                                Review
                                            </button>
                                            <button className="p-2 text-gray-300 hover:text-[#21492f] transition-colors rounded-lg">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredOrders.length === 0 && (
                    <div className="p-20 text-center">
                        <ShoppingBag size={48} className="text-gray-100 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-400">No orders match your criteria</h3>
                        <p className="text-sm font-medium text-gray-300 mt-2">Try adjusting your filters or search terms</p>
                    </div>
                )}
            </div>
        </div>
    );
}
