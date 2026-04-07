"use client"

import React, { useState, useEffect } from 'react';
import { 
    Search, Filter, Plus, ShoppingBag, PieChart, BarChart3, 
    MoreHorizontal, CheckCircle2, Clock, Package, DollarSign, Flame,
    TrendingUp, ArrowUpRight, ArrowDownRight, Tag, X, Edit3, Trash2,
    Truck, Loader2, Globe
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart as RePieChart, Pie, Cell
} from 'recharts';

export default function AdminGroceryPage() {
    const [items, setItems] = useState([]); // This will hold combined data (Products + Orders)
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Current Website Products (Inventory)
                const prodRes = await fetch('/api/products');
                const prodData = await prodRes.json();
                const catalog = prodData.success ? prodData.data : [];
                setProducts(catalog);

                // 2. Fetch Website Orders (Logistics)
                const orderRes = await fetch('/api/orders');
                const orderData = await orderRes.json();
                const currentOrders = orderData.success ? orderData.orders : [];
                setOrders(currentOrders);

                // 3. Combine into a Logistics View
                // Map orders into individual product lines for logistics tracking
                const logisticsEntries = currentOrders.flatMap((order, oIdx) => 
                    (order.items || []).map((item, iIdx) => ({
                        id: `log-${order.orderId || oIdx}-${iIdx}`,
                        name: item.name || 'Unknown Product',
                        cat: item.category || 'Ecommerce',
                        qty: item.quantity || 1,
                        unit: 'units',
                        cal: item.calories || 0,
                        cost: item.price || 0,
                        actual: order.totalAmount || 0,
                        status: order.status || 'Pending',
                        orderId: order.orderId,
                        user: order.user?.name || 'Guest'
                    }))
                );

                // Also include core products as "Inventory Stock" if needed, 
                // but usually Logistics focus on movement (Orders).
                setItems(logisticsEntries);
            } catch (error) {
                console.error("Error syncing website data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusStyles = (status) => {
        switch(status) {
            case 'Delivered': return 'bg-[#B4E567] text-[#215b33]';
            case 'Packaged': return 'bg-[#FFD166] text-[#8f680d]';
            case 'Pending': return 'bg-white border border-gray-100 text-[#FF9F43]';
            default: return 'bg-gray-50 text-gray-400';
        }
    };

    const filteredItems = items.filter(it => 
        it.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        it.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        it.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
            <Loader2 className="animate-spin text-[#B4E567] mb-4" size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Syncing with Website Data...</p>
        </div>
    );

    return (
        <div className="p-4 bg-[#FDFBF7] min-h-screen font-sans pb-24">
            {/* Header (Heading removed) */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-end mb-10 gap-8">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            type="text" 
                            placeholder="Search by ID, User, or Item..." 
                            className="bg-white border border-gray-100 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:ring-1 focus:ring-[#214a32] shadow-sm outline-none w-[300px]" 
                        />
                    </div>
                    <button className="bg-[#214a32] text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-green-900/20 flex items-center gap-2 hover:bg-black transition-all">
                        <Truck size={18}/> Manage All Shipments
                    </button>
                </div>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                {[
                    { label: 'Website Sales', val: `$${orders.reduce((a, b) => a + (b.totalAmount || 0), 0).toFixed(0)}`, icon: DollarSign, color: 'bg-green-50 text-green-600' },
                    { label: 'Inventory SKU', val: products.length, icon: Package, color: 'bg-amber-50 text-amber-600' },
                    { label: 'Active Shipments', val: orders.length, icon: Truck, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Pending Dispatch', val: orders.filter(o => o.status === 'Pending').length, icon: Clock, color: 'bg-orange-50 text-orange-600' }
                ].map((stat, i) => (
                    <div key={`stat-${i}-${stat.label}`} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex items-center gap-5 group hover:shadow-md transition-all">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                            <h4 className="text-xl font-black text-gray-900">{stat.val}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Logistics Ledger */}
            <div className="bg-white rounded-[4rem] p-10 shadow-sm border border-gray-50 overflow-hidden">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-black text-gray-900">Current Order Logistics</h2>
                    <div className="flex bg-gray-50 p-1 rounded-xl">
                        <button className="px-6 py-2 rounded-lg bg-white shadow-sm text-[10px] font-black uppercase text-gray-900">Live Traffic</button>
                        <button className="px-6 py-2 text-[10px] font-black uppercase text-gray-400">Archives</button>
                    </div>
                </div>

                <div className="overflow-x-auto w-full no-scrollbar">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="pb-8 pl-4">Product Catalog</th>
                                <th className="pb-8">Order ID / User</th>
                                <th className="pb-8">Quantities</th>
                                <th className="pb-8 text-center">Calories</th>
                                <th className="pb-8 text-center">Unit Price</th>
                                <th className="pb-8 text-right pr-4">Logistics Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50/50">
                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-20 text-center">
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No active logistics data found from the website</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map(it => (
                                    <tr key={it.id} className="group hover:bg-[#f8fafc]/50 transition-all">
                                        <td className="py-8 pl-4">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-white shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                    <Package className="text-gray-300" size={20}/>
                                                </div>
                                                <div className="min-w-0 pr-4">
                                                    <p className="text-[13px] font-black text-gray-900 uppercase tracking-tight truncate">{it.name}</p>
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{it.cat}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex flex-col">
                                                <span className="font-black text-[12px] text-gray-900 tracking-wider font-mono opacity-80">#{it.orderId}</span>
                                                <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">{it.user}</span>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center gap-2">
                                                <div className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-[12px] font-black text-gray-900">
                                                    {it.qty}
                                                </div>
                                                <span className="text-[9px] font-bold text-gray-400 uppercase">{it.unit}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 text-center">
                                            <p className="text-[12px] font-black text-gray-700 tracking-tighter">{it.cal} <span className="text-[8px] opacity-40 ml-0.5">KCAL</span></p>
                                        </td>
                                        <td className="py-8 text-center text-[12px] font-black text-gray-900 px-6 tracking-tighter">${it.cost.toFixed(2)}</td>
                                        <td className="py-8 text-right pr-4">
                                            <div className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 justify-center ml-auto w-fit
                                                ${getStatusStyles(it.status)}`}>
                                                {it.status === 'Delivered' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                                                {it.status === 'Packaged' ? 'I-PACK' : it.status.toUpperCase()}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* External Data Sources Info */}
            <div className="mt-12 flex justify-between items-center text-[10px] font-black uppercase text-gray-300 tracking-[0.3em] px-8">
                <span>Integrated API: /api/orders</span>
                <span>Active Server Sync: 100%</span>
                <span>Corpus: Current Database</span>
            </div>
        </div>
    );
}
