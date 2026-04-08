"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart, Search, Plus, Filter, DollarSign, Flame, Layers,
    CheckCircle2, TrendingUp, TrendingDown, Trash2, Edit2, PieChart,
    BarChart3, X, Save, AlertCircle
} from 'lucide-react';

const CATEGORIES = ['Protein', 'Grains', 'Fruits', 'Veggies', 'Dairy', 'Others'];
const CATEGORY_COLORS = {
    Protein: 'bg-[#214a32]', Grains: 'bg-amber-500',
    Fruits: 'bg-rose-500', Veggies: 'bg-indigo-500',
    Dairy: 'bg-sky-500', Others: 'bg-gray-400',
};
const DEFAULT_ITEMS = [
    { id: 1, name: 'Oats', category: 'Grains', qty: '500g', calories: 1850, cost: 4.50, purchased: false },
    { id: 2, name: 'Almond Butter', category: 'Others', qty: '1 jar', calories: 2400, cost: 12.00, purchased: true },
    { id: 3, name: 'Mixed Berries', category: 'Fruits', qty: '200g', calories: 120, cost: 6.50, purchased: false },
    { id: 4, name: 'Chicken Breast', category: 'Protein', qty: '1 kg', calories: 1650, cost: 15.00, purchased: true },
    { id: 5, name: 'Avocado', category: 'Fruits', qty: '3 units', calories: 960, cost: 5.50, purchased: false },
    { id: 6, name: 'Spinach', category: 'Veggies', qty: '300g', calories: 70, cost: 3.50, purchased: true },
    { id: 7, name: 'Sweet Potatoes', category: 'Veggies', qty: '1.5 kg', calories: 1350, cost: 4.50, purchased: false },
    { id: 8, name: 'Greek Yogurt', category: 'Dairy', qty: '500g', calories: 450, cost: 5.00, purchased: true },
];

const EMPTY_FORM = { name: '', category: 'Fruits', qty: '', calories: '', cost: '' };

export default function GroceryListPage() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [formError, setFormError] = useState('');

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('groceryItems_v2');
        setItems(stored ? JSON.parse(stored) : DEFAULT_ITEMS);
    }, []);

    const save = (updated) => {
        setItems(updated);
        localStorage.setItem('groceryItems_v2', JSON.stringify(updated));
    };

    // Computed stats
    const totalCost = items.reduce((s, i) => s + Number(i.cost || 0), 0);
    const totalItems = items.length;
    const totalCals = items.reduce((s, i) => s + Number(i.calories || 0), 0);
    const purchasedCount = items.filter(i => i.purchased).length;

    const breakdown = CATEGORIES.map(cat => {
        const catCost = items.filter(i => i.category === cat).reduce((s, i) => s + Number(i.cost || 0), 0);
        return { name: cat, percentage: totalCost > 0 ? Math.round((catCost / totalCost) * 100) : 0, color: CATEGORY_COLORS[cat] };
    }).filter(b => b.percentage > 0);

    const filteredItems = items.filter(item =>
        (activeCategory === 'All' || item.category === activeCategory) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const togglePurchased = (id) => {
        save(items.map(i => i.id === id ? { ...i, purchased: !i.purchased } : i));
    };

    const deleteItem = (id) => {
        save(items.filter(i => i.id !== id));
    };

    const openAdd = () => {
        setEditItem(null);
        setForm(EMPTY_FORM);
        setFormError('');
        setShowModal(true);
    };

    const openEdit = (item) => {
        setEditItem(item);
        setForm({ name: item.name, category: item.category, qty: item.qty, calories: item.calories, cost: item.cost });
        setFormError('');
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.qty.trim()) {
            setFormError('Name and quantity are required.');
            return;
        }
        if (editItem) {
            save(items.map(i => i.id === editItem.id ? { ...i, ...form, calories: Number(form.calories) || 0, cost: Number(form.cost) || 0 } : i));
        } else {
            const newItem = { ...form, id: Date.now(), purchased: false, calories: Number(form.calories) || 0, cost: Number(form.cost) || 0 };
            save([...items, newItem]);
        }
        setShowModal(false);
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Grocery List</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Manage your food budget and nutrition inventory.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={openAdd}
                        className="bg-[#214a32] text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-green-900/10"
                    >
                        <Plus size={18} /> Add New Item
                    </button>
                    <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#214a32] transition-all">
                        <BarChart3 size={20} />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Estimated Cost', value: `$${totalCost.toFixed(2)}`, icon: DollarSign, color: 'text-rose-500', bg: 'bg-rose-50' },
                    { name: 'Total Items', value: totalItems, icon: ShoppingCart, color: 'text-[#214a32]', bg: 'bg-[#a4d9bc]' },
                    { name: 'Total Calories', value: totalCals.toLocaleString(), icon: Flame, color: 'text-amber-500', bg: 'bg-amber-50' },
                ].map((stat, idx) => (
                    <motion.div key={idx} whileHover={{ y: -5 }} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group">
                        <div className={`${stat.bg} ${stat.color} p-4 rounded-3xl shadow-inner transition-transform group-hover:rotate-12`}>
                            <stat.icon size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-black font-outfit">{stat.value}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.name}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Table */}
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
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 flex-wrap">
                                {['All', ...CATEGORIES].slice(0, 5).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#214a32] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
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
                                        {filteredItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="py-16 text-center">
                                                    <p className="text-[11px] font-black uppercase text-gray-300">No items found</p>
                                                    <button onClick={openAdd} className="mt-4 text-[10px] font-black text-[#214a32] underline">Add your first item</button>
                                                </td>
                                            </tr>
                                        ) : filteredItems.map(item => (
                                            <motion.tr
                                                layout
                                                key={item.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="group hover:bg-gray-50/50 transition-colors"
                                            >
                                                <td className="py-6 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => togglePurchased(item.id)} className="shrink-0">
                                                            {item.purchased
                                                                ? <CheckCircle2 size={18} className="text-[#214a32]" />
                                                                : <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-200 hover:border-[#214a32] transition-colors" />
                                                            }
                                                        </button>
                                                        <h4 className={`text-[11px] font-black uppercase ${item.purchased ? 'line-through text-gray-300' : ''}`}>{item.name}</h4>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-4">
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#214a32] px-3 py-1 bg-[#a4d9bc] rounded-lg">{item.category}</span>
                                                </td>
                                                <td className="py-6 px-4 text-[11px] font-black text-gray-500 uppercase">{item.qty}</td>
                                                <td className="py-6 px-4 text-[11px] font-black text-gray-500 uppercase">{Number(item.calories).toLocaleString()}</td>
                                                <td className="py-6 px-4 text-[11px] font-black text-gray-900 uppercase">${Number(item.cost).toFixed(2)}</td>
                                                <td className="py-6 px-4 text-right">
                                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.purchased ? 'bg-[#a4d9bc] text-[#214a32]' : 'bg-amber-50 text-amber-600'}`}>
                                                        {item.purchased ? 'Purchased' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="py-6 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openEdit(item)} className="p-2 hover:bg-[#a4d9bc] rounded-lg text-gray-300 hover:text-[#214a32]"><Edit2 size={12} /></button>
                                                        <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-rose-50 rounded-lg text-gray-300 hover:text-rose-600"><Trash2 size={12} /></button>
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

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 p-8 text-black/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                            <PieChart size={150} strokeWidth={1} />
                        </div>
                        <h3 className="text-xl font-black font-outfit uppercase tracking-tight mb-8 relative z-10">Expense Overview</h3>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-center py-4">
                                <div className="relative size-40">
                                    <svg className="size-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="64" fill="transparent" stroke="#f3f4f6" strokeWidth="20" />
                                        <circle cx="80" cy="80" r="64" fill="transparent" stroke="#214a32" strokeWidth="20"
                                            strokeDasharray={402} strokeDashoffset={402 * (1 - (purchasedCount / (totalItems || 1)))}
                                            strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black font-outfit">${totalCost.toFixed(0)}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase">Estimated</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {breakdown.map((item, i) => (
                                    <div key={i} className="space-y-1.5">
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
                                <span className="text-4xl font-black font-outfit">{purchasedCount}</span>
                                <span className="text-xs font-black text-white/60">OUT OF {totalItems}</span>
                            </div>
                            <div className="w-full h-2 bg-white/20 rounded-full mt-6 overflow-hidden">
                                <div className="h-full bg-white rounded-full shadow-lg transition-all" style={{ width: `${totalItems > 0 ? (purchasedCount / totalItems) * 100 : 0}%` }} />
                            </div>
                            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Complete List Processing</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                                    {editItem ? 'Edit Item' : 'Add New Item'}
                                </h3>
                                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {formError && (
                                <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-3 rounded-xl mb-6 text-[11px] font-black">
                                    <AlertCircle size={14} /> {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Item Name *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        placeholder="e.g. Brown Rice"
                                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</label>
                                        <select
                                            value={form.category}
                                            onChange={e => setForm({ ...form, category: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        >
                                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Quantity *</label>
                                        <input
                                            type="text"
                                            value={form.qty}
                                            onChange={e => setForm({ ...form, qty: e.target.value })}
                                            placeholder="e.g. 500g"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Calories (kcal)</label>
                                        <input
                                            type="number"
                                            value={form.calories}
                                            onChange={e => setForm({ ...form, calories: e.target.value })}
                                            placeholder="0"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Cost ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={form.cost}
                                            onChange={e => setForm({ ...form, cost: e.target.value })}
                                            placeholder="0.00"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-200 transition-all">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 py-4 bg-[#214a32] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
                                        <Save size={16} /> {editItem ? 'Save Changes' : 'Add Item'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
