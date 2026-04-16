"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    Tag,
    CheckCircle2,
    Loader2,
    X,
    FolderOpen,
    AlertCircle,
    Edit2,
    Save,
    Layers,
    RefreshCw
} from 'lucide-react';

const FRONTEND_CATEGORIES = [
    { name: 'Fruit', description: 'Fresh seasonal fruits', color: '#ef4444' },
    { name: 'Vegetable', description: 'Organic vegetables', color: '#22c55e' },
    { name: 'Meat', description: 'Fresh meat & poultry', color: '#b45309' },
    { name: 'Seafood', description: 'Fresh fish & seafood', color: '#0ea5e9' },
    { name: 'Dairy', description: 'Milk, cheese & dairy', color: '#f59e0b' },
    { name: 'Bakery', description: 'Fresh baked goods', color: '#d97706' },
    { name: 'Drinks', description: 'Juices & beverages', color: '#8b5cf6' },
    { name: 'Dry Nuts', description: 'Nuts & dry fruits', color: '#a16207' },
    { name: 'Oil and Vinegar', description: 'Cooking oils & vinegar', color: '#ca8a04' },
    { name: 'Breads', description: 'Artisan breads', color: '#92400e' },
];

export default function ProductCategoryPage() {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDesc, setNewCategoryDesc] = useState('');
    const [newCategoryColor, setNewCategoryColor] = useState('#214a32');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');

    const colors = [
        '#214a32', '#a4d9bc', '#989a69', '#208b82',
        '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6',
        '#0ea5e9', '#ec4899', '#14b8a6', '#f97316'
    ];

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/categories');
            const data = await response.json();
            
            // The API returns an array directly or an error object
            if (Array.isArray(data)) {
                setCategories(data);
            } else if (data.data && Array.isArray(data.data)) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
            showToast('Failed to load categories', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newCategoryName.trim(),
                    description: newCategoryDesc.trim(),
                    color: newCategoryColor
                })
            });

            const result = await response.json();
            if (response.ok) {
                setNewCategoryName('');
                setNewCategoryDesc('');
                loadCategories();
                showToast(`Category "${newCategoryName}" added successfully!`);
            } else {
                showToast(result.error || 'Failed to add category', 'error');
            }
        } catch (error) {
            showToast('Connection error', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            const response = await fetch(`/api/categories?name=${encodeURIComponent(name)}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadCategories();
                showToast(`Category "${name}" deleted.`, 'error');
            } else {
                showToast('Failed to delete', 'error');
            }
        } catch (error) {
            showToast('Connection error', 'error');
        }
    };

    const handleResetToDefaults = async () => {
        if (!confirm('This will try to add all default categories. Continue?')) return;
        
        setIsSubmitting(true);
        try {
            for (const cat of FRONTEND_CATEGORIES) {
                await fetch('/api/categories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cat)
                });
            }
            loadCategories();
            showToast('Defaults loaded (skipped duplicates)');
        } catch (error) {
            showToast('Error resetting defaults', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl font-bold text-sm ${
                            toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#214a32] text-white'
                        }`}
                    >
                        {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#214a32] tracking-tight">Product Categories</h1>
                    <p className="text-sm text-gray-400 font-medium mt-1">Manage product categories in MongoDB</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleResetToDefaults}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-gray-500 rounded-2xl text-xs font-black shadow-sm hover:text-[#214a32] hover:border-[#a4d9bc] transition-all"
                    >
                        <RefreshCw size={13} className={isSubmitting ? 'animate-spin' : ''} />
                        Sync Defaults
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#a4d9bc]/20 rounded-2xl">
                        <Layers size={16} className="text-[#214a32]" />
                        <span className="text-sm font-black text-[#214a32]">{categories.length} Categories</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#214a32] to-[#208b82] px-10 py-8">
                    <h2 className="text-xl font-black text-white flex items-center gap-3">
                        <Plus size={22} /> Add New Category
                    </h2>
                </div>

                <form onSubmit={handleAddCategory} className="p-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category Name *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Supplements"
                                className="w-full bg-[#F8F7F4] rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none border border-transparent focus:border-[#a4d9bc]"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-3 px-10 py-4 bg-[#214a32] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                            Add Category
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">All Categories ({categories.length})</h3>
                {loading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#214a32]" size={40} /></div>
                ) : categories.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-dashed border-gray-200 py-20 flex flex-col items-center justify-center">
                        <FolderOpen size={48} className="text-gray-200 mb-4" />
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No Categories in MongoDB</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <motion.div
                                key={cat._id}
                                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden p-6"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-[#a4d9bc]/20 flex items-center justify-center text-[#214a32]">
                                            <Tag size={16} />
                                        </div>
                                        <div>
                                            <p className="font-black text-[#214a32]">{cat.name}</p>
                                            <p className="text-[10px] text-gray-400 uppercase">MongoDB Record</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(cat._id, cat.name)}
                                        className="p-2 text-gray-300 hover:text-red-500 rounded-xl transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
