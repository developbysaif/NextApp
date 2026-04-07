"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Loader2,
    ChevronDown,
    Package,
    ArrowRight
} from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingId, setUpdatingId] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            if (data.success) {
                // Sort by newest first
                const sorted = (data.orders || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sorted);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, status) => {
        setUpdatingId(orderId);
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            const data = await response.json();
            if (data.success) {
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setUpdatingId(null);
            setActiveDropdown(null);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-[#E4EFE3] text-[#1A5A3B] border-[#1A5A3B]/10';
            case 'Pending': return 'bg-[#FEF1E9] text-[#E18D5E] border-[#E18D5E]/10';
            case 'Packaged': return 'bg-[#F2F2F2] text-[#546458] border-[#546458]/10';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-400 border-gray-100';
        }
    };

    const statusOptions = ['Pending', 'Packaged', 'Delivered'];

    const filteredOrders = orders.filter(o =>
        o.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-[#142A1D] mb-4" size={40} />
            <p className="text-[10px] font-bold text-[#8D9F91] uppercase tracking-[0.2em]">Syncing Shipping Ledger...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-20 relative font-sans text-[#203626]">
            {/* Header Area (Heading removed as per request) */}
            <div className="flex flex-col md:flex-row md:items-end justify-end gap-8 mb-4">
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#D1D9CA] rounded-2xl font-bold text-[11px] uppercase tracking-widest text-[#546458] hover:bg-[#F8F7F4] transition-all shadow-sm">
                        <Download size={16} strokeWidth={2} />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#214a32] text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-[0_10px_20px_rgba(20,42,29,0.2)]">
                        <Truck size={16} strokeWidth={2} />
                        Create Shipment
                    </button>
                </div>
            </div>

            {/* Stats Cards (Mini Styles matching Dashboard) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pending Orders', count: orders.filter(o => o.status === 'Pending').length, icon: Clock, color: 'text-[#E18D5E]', bg: 'bg-[#FEF1E9]' },
                    { label: 'Packaged / Ready', count: orders.filter(o => o.status === 'Packaged').length, icon: Package, color: 'text-[#546458]', bg: 'bg-[#F2F2F2]' },
                    { label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, icon: CheckCircle2, color: 'text-[#3B925D]', bg: 'bg-[#E4EFE3]' },
                    { label: 'Total Revenue', count: `$${orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0).toFixed(0)}`, icon: ArrowUpRight, color: 'text-[#142A1D]', bg: 'bg-[#E9E4DB]' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-[#D1D9CA]/40 flex items-center gap-5 shadow-sm group hover:shadow-md transition-all">
                        <div className={`p-4 rounded-[20px] ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                            <stat.icon size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase text-[#8D9F91] tracking-[0.1em]">{stat.label}</p>
                            <h4 className="text-[22px] font-bold text-[#142A1D] tracking-tight">{stat.count}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Table Container */}
            <div className="bg-[#EFECE0] rounded-[48px] shadow-sm border border-white overflow-hidden">
                <div className="p-8 border-b border-white flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8D9F91] group-focus-within:text-[#142A1D] transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by ID, User, or Location..."
                            className="w-full bg-white/60 border-transparent rounded-[24px] pl-16 pr-6 py-4 text-[13px] font-medium text-[#142A1D] focus:bg-white focus:shadow-inner transition-all outline-none placeholder:text-[#8D9F91]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-3 px-6 py-4 bg-white/60 rounded-[24px] font-bold text-[10px] uppercase tracking-widest text-[#546458] hover:bg-white transition-all shadow-sm">
                            <Filter size={16} />
                            All Channels
                        </button>
                        <button className="flex items-center gap-3 px-6 py-4 bg-white/60 rounded-[24px] font-bold text-[10px] uppercase tracking-widest text-[#546458] hover:bg-white transition-all shadow-sm">
                            <Calendar size={16} />
                            Today
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-transparent">
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8D9F91]">ID Ref</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8D9F91]">Carrier / User</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8D9F91]">Timestamp</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8D9F91]">Amount</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8D9F91]">Status</th>
                                <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8D9F91] text-right">Utility</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/40">
                            {filteredOrders.map((order) => (
                                <motion.tr
                                    key={order._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="hover:bg-white/30 transition-all group"
                                >
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-3">
                                            <div className="w-[30px] h-[30px] rounded-full bg-[#142A1D]/5 flex items-center justify-center">
                                                <ShoppingBag size={12} className="text-[#142A1D]" />
                                            </div>
                                            <span className="font-bold text-[12px] text-[#142A1D] tracking-wider">#{order.orderId}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[13px] text-[#142A1D]">{order.user?.name || 'Guest'}</span>
                                            <span className="text-[10px] text-[#8D9F91] font-bold tracking-tight">{order.shippingDetails?.location || 'Digital Delivery'}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[12px] text-[#546458]">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-[#8D9F91] font-bold uppercase tracking-tighter opacity-70">
                                                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <span className="font-black text-[13px] text-[#142A1D]">${(order.totalAmount || 0).toFixed(2)}</span>
                                    </td>
                                    <td className="px-10 py-7 relative">
                                        {/* Status Hover Selectable Pill */}
                                        <div className="relative inline-block group/status"
                                            onMouseEnter={() => setActiveDropdown(order._id)}
                                            onMouseLeave={() => setActiveDropdown(null)}>
                                            <button
                                                disabled={updatingId === order._id}
                                                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${getStatusStyle(order.status)} ${updatingId === order._id ? 'opacity-50' : 'hover:shadow-md'}`}
                                            >
                                                {updatingId === order._id ? <Loader2 size={12} className="animate-spin" /> : order.status}
                                                <ChevronDown size={12} className="opacity-40 group-hover/status:rotate-180 transition-transform" />
                                            </button>

                                            <AnimatePresence>
                                                {activeDropdown === order._id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-[#D1D9CA]/30 p-2 z-[60] min-w-[140px]"
                                                    >
                                                        {statusOptions.map(opt => (
                                                            <button
                                                                key={opt}
                                                                onClick={() => updateStatus(order._id, opt)}
                                                                className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] transition-colors ${order.status === opt ? 'bg-[#142A1D] text-white' : 'text-[#546458] hover:bg-[#F8F7F4]'}`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#142A1D] font-bold text-[9px] uppercase tracking-widest rounded-xl hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all border border-[#D1D9CA]/30">
                                                <Eye size={14} />
                                                View
                                            </button>
                                            <button className="p-2.5 bg-white text-[#8D9F91] hover:text-[#142A1D] transition-colors rounded-xl border border-[#D1D9CA]/30">
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
                    <div className="p-24 text-center">
                        <div className="w-16 h-16 bg-[#142A1D]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={32} className="text-[#D1D9CA]" />
                        </div>
                        <h3 className="text-[17px] font-bold text-[#142A1D]">Zero Shipments Found</h3>
                        <p className="text-[13px] font-medium text-[#8D9F91] mt-2">We couldn't locate any records matching your search terms.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-8 text-[11px] font-black uppercase text-[#3B925D] hover:underline"
                        >
                            Reset Search Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination / Load More Simulation */}
            <div className="flex justify-center mt-12">
                <button className="group flex items-center gap-4 px-10 py-5 bg-[#142A1D]/5 rounded-[32px] text-[#142A1D] font-bold text-[12px] uppercase tracking-[0.2em] transition-all hover:bg-[#142A1D] hover:text-white">
                    Load Archive
                    <ArrowDown className="group-hover:translate-y-1 transition-transform" size={16} />
                </button>
            </div>
        </div>
    );
}

function ArrowDown({ className, size }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
    );
}
