"use client"

import React, { useState, useEffect } from 'react';
import { 
    Plus, 
    Trash2, 
    Edit2, 
    Layers, 
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function AddCategoryPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [toast, setToast] = useState(null);

    // Load categories from Database
    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            if (Array.isArray(data)) {
                // Return just the names for the list
                setCategories(data.map(c => c.name));
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const trimmed = newCategory.trim();
        if (!trimmed) return;
        
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: trimmed })
            });
            const data = await res.json();
            if (res.ok) {
                setNewCategory('');
                showToast("New category added to database!");
                fetchCategories();
            } else {
                showToast(data.error || "Failed to add category");
            }
        } catch (error) {
            showToast("Network error");
        }
    };

    const handleDelete = async (catName) => {
        try {
            const res = await fetch(`/api/categories?name=${encodeURIComponent(catName)}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                showToast("Category deleted from database.");
                fetchCategories();
            } else {
                showToast("Failed to delete category");
            }
        } catch (error) {
            showToast("Network error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {toast && (
                <div className="fixed top-24 right-10 z-[500] animate-in slide-in-from-right-10 duration-300">
                    <div className="bg-[#214a32] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20">
                        <CheckCircle2 size={20} className="text-[#a4d9bc]" />
                        <span className="text-sm font-bold tracking-tight">{toast}</span>
                    </div>
                </div>
            )}

            {/* Breadcrumbs/Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <Link href="/admin/diseases" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#214a32] transition-colors mb-2">
                        <ArrowLeft size={14} /> Back to Database
                    </Link>
                    <h1 className="text-2xl font-black text-[#122A1A] uppercase tracking-tight">Disease Taxonomy</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Add Category Form */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-fit">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#f0f9f4] text-[#214a32] rounded-xl flex items-center justify-center">
                            <Plus size={20} />
                        </div>
                        <h3 className="text-lg font-black text-[#122A1A] uppercase">Add New Category</h3>
                    </div>

                    <form onSubmit={handleAdd} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Category Name</label>
                            <input 
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="e.g. Neurological"
                                className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-xl text-[12px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:bg-white transition-all placeholder:text-gray-300"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-4 bg-[#214a32] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-[#214a32]/10 hover:bg-[#1a3a28] transition-all"
                        >
                            Create Taxonomy Node
                        </button>
                    </form>
                </div>

                {/* Categories List */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <Layers size={18} className="text-[#a4d9bc]" />
                            <h3 className="text-lg font-black text-[#122A1A] uppercase">Existing Nodes</h3>
                        </div>
                        <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-black">{categories.length} Total</span>
                    </div>

                    <div className="space-y-3">
                        {categories.map((cat, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 hover:bg-white border hover:border-[#a4d9bc]/30 rounded-xl transition-all group">
                                <span className="text-[12px] font-bold text-[#214a32]">{cat}</span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-300 hover:text-rose-500 rounded-lg transition-colors"><Trash2 size={14} onClick={() => handleDelete(cat)} /></button>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="py-10 text-center text-gray-300 italic text-[12px]">No categories defined yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
