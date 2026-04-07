"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingCart, 
    Search, 
    Plus, 
    Filter, 
    ArrowUpDown, 
    DollarSign, 
    Flame, 
    Layers, 
    CheckCircle2, 
    Circle,
    TrendingUp,
    TrendingDown,
    MoreVertical,
    Trash2,
    Edit2,
    PieChart,
    BarChart3
} from 'lucide-react';

export default function GroceryListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const stats = [
        { name: 'Estimated Cost', value: '$157.00', trend: '+2.08%', isPositive: false, icon: DollarSign, color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Total Items', value: '40', trend: 'Items count', isPositive: true, icon: ShoppingCart, color: 'text-[#214a32]', bg: 'bg-[#a4d9bc]' },
        { name: 'Total Calories', value: '21,615', trend: '-3.56%', isPositive: true, icon: Flame, color: 'text-amber-500', bg: 'bg-amber-50' },
    ];

    const breakdown = [
        { name: 'Protein', percentage: 30, color: 'bg-[#214a32]' },
        { name: 'Grains', percentage: 25, color: 'bg-amber-500' },
        { name: 'Fruits', percentage: 18, color: 'bg-rose-500' },
        { name: 'Veggies', percentage: 15, color: 'bg-indigo-500' },
        { name: 'Dairy', percentage: 7, color: 'bg-sky-500' },
        { name: 'Others', percentage: 5, color: 'bg-gray-400' },
    ];

    const groceryItems = [
        { id: 1, name: 'Oats', category: 'Grains', qty: '500g', calories: 1850, cost: 4.50, status: 'Pending' },
        { id: 2, name: 'Almond Butter', category: 'Others', qty: '1 jar', calories: 2400, cost: 12.00, status: 'Purchased' },
        { id: 3, name: 'Mixed Berries', category: 'Fruits', qty: '200g', calories: 120, cost: 6.50, status: 'Pending' },
        { id: 4, name: 'Chicken Breast', category: 'Protein', qty: '1 kg', calories: 1650, cost: 15.00, status: 'Purchased' },
        { id: 5, name: 'Avocado', category: 'Fruits', qty: '3 units', calories: 960, cost: 5.50, status: 'Pending' },
        { id: 6, name: 'Spinach', category: 'Veggies', qty: '300g', calories: 70, cost: 3.50, status: 'Purchased' },
        { id: 7, name: 'Sweet Potatoes', category: 'Veggies', qty: '1.5 kg', calories: 1350, cost: 4.50, status: 'Pending' },
        { id: 8, name: 'Greek Yogurt', category: 'Dairy', qty: '500g', calories: 450, cost: 5.00, status: 'Purchased' },
    ];

    const categories = ['All', 'Protein', 'Grains', 'Fruits', 'Veggies', 'Dairy', 'Others'];

    const filteredItems = groceryItems.filter(item => 
        (activeCategory === 'All' || item.category === activeCategory) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header & Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Grocery List</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Manage your food budget and nutrition inventory.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#214a32] text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-green-900/10">
                        <Plus size={18} /> Add New Item
                    </button>
                    <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#214a32] transition-all"><BarChart3 size={20} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group"
                    >
                        <div className={`${stat.bg} ${stat.color} p-4 rounded-3xl shadow-inner transition-transform group-hover:rotate-12`}>
                            <stat.icon size={24} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black font-outfit">{stat.value}</h3>
                                <div className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-widest ${stat.isPositive ? 'text-[#214a32]' : 'text-rose-500'}`}>
                                    {stat.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.name}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Table Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div className="relative group/search flex-1">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#214a32] transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search your list..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-green-500 transition-all placeholder:text-gray-300"
                                />
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                                {categories.slice(0, 4).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#214a32] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                                <button className="p-3 bg-gray-100 rounded-xl text-gray-400 hover:text-[#214a32]"><Filter size={14} /></button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                                        <th className="pb-6 text-left px-4">Item Name</th>
                                        <th className="pb-6 text-left px-4">Category</th>
                                        <th className="pb-6 text-left px-4">Qty</th>
                                        <th className="pb-6 text-left px-4">Cal</th>
                                        <th className="pb-6 text-left px-4">Cost</th>
                                        <th className="pb-6 text-right px-4">Status</th>
                                        <th className="pb-6 text-right px-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <AnimatePresence>
                                        {filteredItems.map(item => (
                                            <motion.tr 
                                                layout
                                                key={item.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="group hover:bg-gray-50/50 transition-colors"
                                            >
                                                <td className="py-6 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:text-green-500 transition-colors`}>
                                                            <Layers size={14} />
                                                        </div>
                                                        <h4 className="text-[11px] font-black uppercase">{item.name}</h4>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-4">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#214a32] px-3 py-1 bg-[#a4d9bc] rounded-lg">{item.category}</span>
                                                </td>
                                                <td className="py-6 px-4 text-[11px] font-black text-gray-500 uppercase">{item.qty}</td>
                                                <td className="py-6 px-4 text-[11px] font-black text-gray-500 uppercase">{item.calories}</td>
                                                <td className="py-6 px-4 text-[11px] font-black text-gray-900 uppercase">${item.cost.toFixed(2)}</td>
                                                <td className="py-6 px-4 text-right">
                                                    <span className={`
                                                        px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest
                                                        ${item.status === 'Purchased' ? 'bg-[#a4d9bc] text-[#214a32]' : 'bg-amber-50 text-amber-600'}
                                                    `}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-6 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 hover:bg-[#a4d9bc] rounded-lg text-gray-300 hover:text-[#214a32]"><Edit2 size={12} /></button>
                                                        <button className="p-2 hover:bg-rose-50 rounded-lg text-gray-300 hover:text-rose-600"><Trash2 size={12} /></button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Expense Breakdown Column */}
                <div className="space-y-6">
                    <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 p-8 text-black/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <PieChart size={150} strokeWidth={1} />
                        </div>
                        
                        <h3 className="text-xl font-black font-outfit uppercase tracking-tight mb-8 relative z-10">Expense Overview</h3>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-center py-8">
                                <div className="relative size-48">
                                    <svg className="size-full transform -rotate-90">
                                        <circle cx="96" cy="96" r="80" fill="transparent" stroke="#f3f4f6" strokeWidth="24" />
                                        <circle 
                                            cx="96" cy="96" r="80" 
                                            fill="transparent" 
                                            stroke="#214a32" 
                                            strokeWidth="24" 
                                            strokeDasharray={502.4} 
                                            strokeDashoffset={502.4 * (1 - 0.7)} 
                                            strokeLinecap="round" 
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black font-outfit">$157</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase">Estimated</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {breakdown.map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                            <div className="flex items-center gap-2">
                                                <div className={`size-2.5 rounded-full ${item.color}`} />
                                                <span>{item.name}</span>
                                            </div>
                                            <span className="text-gray-400">{item.percentage}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#214a32] p-8 rounded-[3.5rem] shadow-xl shadow-green-900/10 text-white group cursor-pointer relative overflow-hidden">
                         <div className="absolute -right-4 -bottom-4 p-8 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                            <CheckCircle2 size={120} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-md font-black uppercase tracking-tight mb-2">Purchased Items</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black font-outfit">20</span>
                                <span className="text-xs font-black text-white/60">OUT OF 40</span>
                            </div>
                            <div className="w-full h-2 bg-white/20 rounded-full mt-6 overflow-hidden">
                                <div className="w-1/2 h-full bg-white rounded-full shadow-lg" />
                            </div>
                            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Complete List Processing</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
