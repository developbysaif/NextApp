"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Package,
    AlertCircle,
    CheckCircle2,
    X,
    Image as ImageIcon,
    Loader2,
    Tag,
    DollarSign,
    Layers,
    ChevronDown,
    Filter,
    ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [prodRes, catRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/categories')
            ]);
            
            const prodData = await prodRes.json();
            const catData = await catRes.json();
            
            if (prodData.success) setProducts(prodData.data || []);
            
            if (Array.isArray(catData)) {
                setCategories(catData);
            } else if (catData.data && Array.isArray(catData.data)) {
                setCategories(catData.data);
            }
        } catch (error) {
            console.error('Failed to load MongoDB data:', error);
            showToast('Failed to load from MongoDB', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleDelete = async (id, name) => {
        if (!confirm(`Permanently delete "${name}" from MongoDB?`)) return;

        try {
            const response = await fetch(`/api/products?id=${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            if (result.success) {
                setProducts(products.filter(p => p._id !== id));
                showToast(`"${name}" deleted from MongoDB.`, 'error');
            } else {
                showToast(result.message || 'Delete failed', 'error');
            }
        } catch (error) {
            showToast('Connection error', 'error');
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch =
            p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory ? p.category === filterCategory : true;
        return matchesSearch && matchesCategory;
    });

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-[#214a32] mb-4" size={40} />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest text-center">Fetching from MongoDB...</p>
        </div>
    );

    return (
        <div className="space-y-6">
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

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#214a32]">MongoDB Product Catalog</h1>
                    <p className="text-sm text-gray-400">{products.length} live products found</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/products/add" className="flex items-center gap-2 px-7 py-3 bg-[#214a32] text-white rounded-2xl font-black text-sm shadow-lg shadow-green-100"><Plus size={18} /> Add Product</Link>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#214a32]/10 rounded-2xl flex items-center justify-center text-[#214a32]"><Package size={20}/></div>
                    <div>
                        <p className="text-xl font-black text-[#214a32]">{products.length}</p>
                        <p className="text-[10px] font-black uppercase text-gray-400">Database Records</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search MongoDB..."
                        className="w-full bg-[#F8F7F4] rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 shadow-sm transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="pl-4 pr-10 py-3 bg-[#F8F7F4] rounded-xl text-sm font-bold text-gray-600 outline-none w-full md:w-auto"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-[3rem] border border-dashed border-gray-200 py-24 text-center">
                    <ShoppingBag size={52} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-sm font-black text-gray-400 uppercase">No Products in Database</p>
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F8F7F4] border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400">Product</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400">Price</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-green-50/20 transition-colors group">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border shrink-0">
                                                {product.image ? <img src={product.image} className="w-full h-full object-cover" /> : <ImageIcon size={18} className="text-gray-300" />}
                                            </div>
                                            <p className="font-black text-[#214a32] text-sm">{product.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4"><span className="px-3 py-1 bg-[#a4d9bc]/20 text-[#214a32] rounded-lg text-[10px] font-black uppercase">{product.category}</span></td>
                                    <td className="px-8 py-4 font-black">${product.price}</td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleDelete(product._id, product.name)} className="p-2 text-gray-300 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
