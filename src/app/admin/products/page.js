"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    Package,
    AlertCircle,
    CheckCircle2,
    X,
    Image as ImageIcon,
    Loader2,
    Upload,
    Tag,
    DollarSign,
    Percent
} from 'lucide-react';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        tags: '',
        image: '',
        discount: '0'
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            if (data.success) {
                setCategories(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            if (data.success) {
                setProducts(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (result.success) {
                setFormData(prev => ({ ...prev, image: result.url }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const productToSave = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                discount: parseFloat(formData.discount),
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            };

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSave)
            });

            const result = await response.json();
            if (result.success) {
                setShowModal(false);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    stock: '',
                    category: '',
                    tags: '',
                    image: '',
                    discount: '0'
                });
                fetchProducts();
            }
        } catch (error) {
            console.error('Failed to save product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Catalog...</p>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-6">
                <button
                    onClick={() => {
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-8 py-4 bg-[#214a32] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-green-100"
                >
                    <Plus size={20} />
                    Add New Product
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        className="w-full bg-[#F8F7F4] border-transparent rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#F8F7F4] border-b border-gray-100">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Disc.</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredProducts.map((product) => (
                            <motion.tr
                                key={product._id || product.id}
                                className="hover:bg-green-50/30 transition-colors group"
                            >
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={20} className="text-gray-300" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#214a32] leading-tight">{product.name}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase mt-1">ID: {product.id || 'N/A'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-xs font-bold text-gray-500">
                                    {product.category || 'General'}
                                </td>
                                <td className="px-8 py-5 font-bold text-[#214a32]">
                                    ${product.price?.toLocaleString()}
                                </td>
                                <td className="px-8 py-5 text-xs font-black text-red-500">
                                    {product.discount > 0 ? `${product.discount}%` : '-'}
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`text-[10px] font-black uppercase ${parseInt(product.stock) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {parseInt(product.stock) > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-gray-300 hover:text-blue-500 rounded-lg transition-all">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-2 text-gray-300 hover:text-red-500 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#214a32]/20 backdrop-blur-md"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden"
                        >
                            <div className="flex h-[80vh]">
                                {/* Left Content: Preview / Images */}
                                <div className="hidden lg:block w-1/3 bg-[#F8F7F4] p-10 border-r border-gray-100">
                                    <h3 className="text-xl font-black font-outfit text-[#214a32] mb-8 group-hover:tracking-tighter transition-all">Product Media</h3>
                                    <div className="aspect-square bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer transition-all hover:border-green-400">
                                        {formData.image ? (
                                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <Upload size={40} className="text-gray-300 group-hover:text-green-500 transition-colors mb-4" />
                                                <p className="text-[10px] font-black uppercase text-gray-400 text-center tracking-widest px-6">Upload principal product image</p>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                        />
                                        {uploading && (
                                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                                <Loader2 className="animate-spin text-green-600" size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-400 mt-4 leading-relaxed uppercase tracking-widest">Supports JPG, PNG, WEBP. Max size 2MB.</p>
                                </div>

                                {/* Right Content: Form */}
                                <div className="flex-1 p-10 overflow-y-auto no-scrollbar">
                                    <div className="flex items-center justify-between mb-10">
                                        <h2 className="text-2xl font-black font-outfit text-[#214a32]">Add New Product</h2>
                                        <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <X size={24} className="text-gray-400" />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. Organic Moringa Powder"
                                                        className="w-full bg-[#F8F7F4] border-transparent rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Description</label>
                                                    <textarea
                                                        required
                                                        rows={4}
                                                        placeholder="Deep nutrition for health..."
                                                        className="w-full bg-[#F8F7F4] border-transparent rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none resize-none"
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Price ($)</label>
                                                    <div className="relative">
                                                        <DollarSign size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="number"
                                                            required
                                                            placeholder="0.00"
                                                            className="w-full bg-[#F8F7F4] border-transparent rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                                            value={formData.price}
                                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Discount (%)</label>
                                                    <div className="relative">
                                                        <Percent size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            className="w-full bg-[#F8F7F4] border-transparent rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                                            value={formData.discount}
                                                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Stock Inventory</label>
                                                    <input
                                                        type="number"
                                                        required
                                                        placeholder="Qty"
                                                        className="w-full bg-[#F8F7F4] border-transparent rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                                        value={formData.stock}
                                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category</label>
                                                    <div className="relative">
                                                        <select
                                                            className="w-full bg-[#F8F7F4] border-transparent rounded-2xl px-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none appearance-none"
                                                            value={isAddingNewCategory ? 'other' : formData.category}
                                                            onChange={(e) => {
                                                                if (e.target.value === 'other') {
                                                                    setIsAddingNewCategory(true);
                                                                    setFormData({ ...formData, category: '' });
                                                                } else {
                                                                    setIsAddingNewCategory(false);
                                                                    setFormData({ ...formData, category: e.target.value });
                                                                }
                                                            }}
                                                        >
                                                            <option value="">Select Category</option>
                                                            {categories.map((cat) => (
                                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                            ))}
                                                            <option value="other">+ Add New Category</option>
                                                        </select>
                                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            <Filter size={14} className="text-gray-400" />
                                                        </div>
                                                    </div>

                                                    {isAddingNewCategory && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                placeholder="Enter category name..."
                                                                className="w-full bg-green-50 border-2 border-green-200 rounded-2xl px-6 py-3 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                                                value={formData.category}
                                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                                autoFocus
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Tags (comma separated)</label>
                                                <div className="relative">
                                                    <Tag size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="organic, healthy, superfood"
                                                        className="w-full bg-[#F8F7F4] border-transparent rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                                        value={formData.tags}
                                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-green-600 text-white rounded-2xl py-5 font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                                                Initialize Product Listing
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
