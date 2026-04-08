"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Notebook, Search, Plus, Clock, Flame, ChevronLeft, ChevronRight,
    Calendar, ArrowUpRight, ArrowDownRight, Utensils, Filter,
    Activity, Settings2, X, Save, Trash2, Edit2, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const CATEGORIES = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];
const CAT_STYLES = {
    Breakfast: 'bg-amber-50 text-amber-600',
    Lunch: 'bg-[#a4d9bc] text-[#214a32]',
    Snacks: 'bg-rose-50 text-rose-600',
    Dinner: 'bg-indigo-50 text-indigo-600',
};

const DEFAULT_ENTRIES = [
    { id: 1, date: new Date().toISOString().split('T')[0], time: '7:30 AM', category: 'Breakfast', name: 'Scrambled Eggs with Spinach', amount: '1 bowl', calories: 250, carbs: 10, protein: 20, fat: 12 },
    { id: 2, date: new Date().toISOString().split('T')[0], time: '12:30 PM', category: 'Lunch', name: 'Grilled Chicken with Brown Rice', amount: '1 plate', calories: 550, carbs: 60, protein: 45, fat: 10 },
    { id: 3, date: new Date().toISOString().split('T')[0], time: '4:00 PM', category: 'Snacks', name: 'Greek Yogurt with Berries', amount: '1 cup', calories: 150, carbs: 20, protein: 12, fat: 3 },
    { id: 4, date: new Date().toISOString().split('T')[0], time: '7:00 PM', category: 'Dinner', name: 'Baked Salmon with Broccoli', amount: '1 plate', calories: 450, carbs: 15, protein: 40, fat: 18 },
];

const EMPTY_FORM = {
    name: '', category: 'Breakfast', amount: '',
    calories: '', carbs: '', protein: '', fat: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const ITEMS_PER_PAGE = 8;

export default function FoodDiaryPage() {
    const { user } = useAuth();
    const [entries, setEntries] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editEntry, setEditEntry] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [formError, setFormError] = useState('');
    const [page, setPage] = useState(1);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('foodDiaryEntries_v2');
        setEntries(stored ? JSON.parse(stored) : DEFAULT_ENTRIES);
    }, []);

    const persist = (updated) => {
        setEntries(updated);
        localStorage.setItem('foodDiaryEntries_v2', JSON.stringify(updated));
    };

    // Computed stats from all entries
    const totalCals = entries.reduce((s, e) => s + Number(e.calories || 0), 0);
    const totalCarbs = entries.reduce((s, e) => s + Number(e.carbs || 0), 0);
    const totalProtein = entries.reduce((s, e) => s + Number(e.protein || 0), 0);
    const totalFat = entries.reduce((s, e) => s + Number(e.fat || 0), 0);

    // Filtered & paginated
    const filtered = entries.filter(e =>
        (activeCategory === 'All' || e.category === activeCategory) &&
        (e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const openAdd = () => {
        setEditEntry(null);
        setForm({
            ...EMPTY_FORM,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setFormError('');
        setShowModal(true);
    };

    const openEdit = (entry) => {
        setEditEntry(entry);
        setForm({
            name: entry.name, category: entry.category, amount: entry.amount,
            calories: entry.calories, carbs: entry.carbs || '', protein: entry.protein || '', fat: entry.fat || '',
            date: entry.date, time: entry.time
        });
        setFormError('');
        setShowModal(true);
    };

    const handleDelete = (id) => {
        persist(entries.filter(e => e.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.amount.trim()) {
            setFormError('Food name and amount are required.');
            return;
        }
        const entry = {
            ...form,
            calories: Number(form.calories) || 0,
            carbs: Number(form.carbs) || 0,
            protein: Number(form.protein) || 0,
            fat: Number(form.fat) || 0,
        };
        if (editEntry) {
            persist(entries.map(e => e.id === editEntry.id ? { ...e, ...entry } : e));
        } else {
            persist([{ ...entry, id: Date.now() }, ...entries]);
            setPage(1);
        }
        setShowModal(false);
    };

    const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'you';

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">Food Diary</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Track every bite and understand your nutrition better.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white border border-gray-100 p-4 rounded-2xl text-gray-400 hover:text-[#214a32] shadow-sm transition-all">
                        <Calendar size={18} />
                    </button>
                    <button
                        onClick={openAdd}
                        className="bg-[#214a32] text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-green-900/10"
                    >
                        <Plus size={18} /> Add Entry
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { name: 'Total Calories', value: totalCals.toLocaleString(), unit: 'kcal', icon: Flame, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { name: 'Total Carbs', value: totalCarbs.toLocaleString(), unit: 'gr', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                    { name: 'Total Proteins', value: totalProtein.toLocaleString(), unit: 'gr', icon: Utensils, color: 'text-[#214a32]', bg: 'bg-[#a4d9bc]' },
                    { name: 'Total Fats', value: totalFat.toLocaleString(), unit: 'gr', icon: Flame, color: 'text-rose-500', bg: 'bg-rose-50' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <h3 className="text-2xl font-black font-outfit uppercase">{stat.value}</h3>
                            <span className="text-[10px] font-black text-gray-400 uppercase">{stat.unit}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.name}</p>
                    </motion.div>
                ))}
            </div>

            {/* Entries Table */}
            <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2 bg-gray-50/50 p-2 rounded-[2rem]">
                        {['All', ...CATEGORIES].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => { setActiveCategory(cat); setPage(1); }}
                                className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all
                                    ${activeCategory === cat ? 'bg-white text-[#214a32] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-3">
                        <div className="relative group/search">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#214a32] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search entries..."
                                value={searchTerm}
                                onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                                className="pl-12 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-green-500 transition-all w-64 placeholder:text-gray-300"
                            />
                        </div>
                        <button className="p-4 bg-gray-50 rounded-3xl text-gray-400 hover:text-[#214a32] transition-all border border-transparent hover:border-gray-100">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                                <th className="pb-8 text-left px-4">Date</th>
                                <th className="pb-8 text-left px-4">Time</th>
                                <th className="pb-8 text-left px-4">Category</th>
                                <th className="pb-8 text-left px-4">Food Item</th>
                                <th className="pb-8 text-left px-4">Amount</th>
                                <th className="pb-8 text-right px-4">Calories</th>
                                <th className="pb-8 text-right px-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence>
                                {paginated.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
                                            <p className="text-[11px] font-black uppercase text-gray-300 mb-4">No entries found</p>
                                            <button
                                                onClick={openAdd}
                                                className="text-[10px] font-black text-[#214a32] underline"
                                            >
                                                Add your first meal entry
                                            </button>
                                        </td>
                                    </tr>
                                ) : paginated.map((entry) => (
                                    <motion.tr
                                        key={entry.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="py-6 px-4 text-[11px] font-black text-gray-400 font-outfit uppercase">{entry.date}</td>
                                        <td className="py-6 px-4 text-[11px] font-black text-gray-400 font-outfit uppercase">
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} className="text-gray-200" /> {entry.time}
                                            </div>
                                        </td>
                                        <td className="py-6 px-4">
                                            <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${CAT_STYLES[entry.category] || 'bg-gray-100 text-gray-500'}`}>
                                                {entry.category}
                                            </span>
                                        </td>
                                        <td className="py-6 px-4 text-[11px] font-black text-gray-900 uppercase group-hover:text-[#214a32] transition-colors">
                                            {entry.name}
                                        </td>
                                        <td className="py-6 px-4 text-[11px] font-black text-gray-500 uppercase tracking-widest">{entry.amount}</td>
                                        <td className="py-6 px-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-black font-outfit text-gray-900">{Number(entry.calories).toLocaleString()} kcal</span>
                                                <div className="h-1 w-12 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                    <div className="h-full bg-[#214a32] rounded-full" style={{ width: `${Math.min((Number(entry.calories) / 800) * 100, 100)}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEdit(entry)}
                                                    className="p-2 hover:bg-[#a4d9bc] rounded-lg text-gray-300 hover:text-[#214a32] transition-colors"
                                                >
                                                    <Edit2 size={12} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(entry.id)}
                                                    className="p-2 hover:bg-rose-50 rounded-lg text-gray-300 hover:text-rose-600 transition-colors"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-50 pt-10">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Showing {Math.min(filtered.length, (page - 1) * ITEMS_PER_PAGE + 1)}–{Math.min(filtered.length, page * ITEMS_PER_PAGE)} of {filtered.length} entries
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:text-[#214a32] group transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={16} className="inline mr-1 group-hover:-translate-x-1 transition-transform" /> Previous
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase text-gray-400 hover:text-[#214a32] group transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next <ChevronRight size={16} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Weekly Insight Card */}
            <div className="bg-[#214a32] p-8 md:p-12 rounded-[3.5rem] text-white shadow-2xl shadow-green-900/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 text-white/5 rotate-12 transition-transform duration-700 group-hover:rotate-0">
                    <Notebook size={180} strokeWidth={1} />
                </div>
                <div className="space-y-4 relative z-10 max-w-xl">
                    <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">Your Weekly Insight</h3>
                    <p className="text-white/60 text-xs font-bold leading-relaxed uppercase tracking-widest">
                        Great work, {userName}! You have logged {entries.length} meal{entries.length !== 1 ? 's' : ''} with a total of {totalProtein}g protein and {totalCals.toLocaleString()} kcal. Keep tracking to stay on your health goals!
                    </p>
                    <div className="flex gap-4 pt-2">
                        <button className="px-10 py-5 bg-white text-green-900 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-[#a4d9bc] transition-all shadow-xl shadow-black/10">
                            Download Monthly Report
                        </button>
                        <button className="p-5 bg-white/10 backdrop-blur-md text-white rounded-[2rem] hover:bg-white/20 transition-all border border-white/10">
                            <Settings2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add / Edit Modal */}
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
                            className="bg-white rounded-[2.5rem] p-10 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                                    {editEntry ? 'Edit Entry' : 'Add Diary Entry'}
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {formError && (
                                <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-3 rounded-xl mb-6 text-[11px] font-black">
                                    <AlertCircle size={14} /> {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Food Name */}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Food Name *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        placeholder="e.g. Grilled Chicken"
                                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                    />
                                </div>

                                {/* Category & Amount */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Meal Type</label>
                                        <select
                                            value={form.category}
                                            onChange={e => setForm({ ...form, category: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        >
                                            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Amount *</label>
                                        <input
                                            type="text"
                                            value={form.amount}
                                            onChange={e => setForm({ ...form, amount: e.target.value })}
                                            placeholder="e.g. 1 plate"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Date</label>
                                        <input
                                            type="date"
                                            value={form.date}
                                            onChange={e => setForm({ ...form, date: e.target.value })}
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Time</label>
                                        <input
                                            type="text"
                                            value={form.time}
                                            onChange={e => setForm({ ...form, time: e.target.value })}
                                            placeholder="e.g. 7:30 AM"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                </div>

                                {/* Nutrition */}
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
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Carbs (g)</label>
                                        <input
                                            type="number"
                                            value={form.carbs}
                                            onChange={e => setForm({ ...form, carbs: e.target.value })}
                                            placeholder="0"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Protein (g)</label>
                                        <input
                                            type="number"
                                            value={form.protein}
                                            onChange={e => setForm({ ...form, protein: e.target.value })}
                                            placeholder="0"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Fat (g)</label>
                                        <input
                                            type="number"
                                            value={form.fat}
                                            onChange={e => setForm({ ...form, fat: e.target.value })}
                                            placeholder="0"
                                            className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#214a32] border-none"
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 bg-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 bg-[#214a32] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"
                                    >
                                        <Save size={16} /> {editEntry ? 'Save Changes' : 'Add Entry'}
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
