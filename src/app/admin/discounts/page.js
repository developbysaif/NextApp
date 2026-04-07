"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Percent,
    Tag,
    Clock,
    Search,
    Filter,
    ArrowUpRight,
    Loader2,
    Calendar,
    CheckCircle2,
    XCircle,
    ShoppingBag,
    TrendingUp,
    Zap
} from 'lucide-react';

export default function AdminDiscountsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDiscountedProducts();
    }, []);

    const fetchDiscountedProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            if (data.success) {
                // Filter products that have a discount > 0
                const discounted = (data.data || []).filter(p => p.discount > 0);
                setProducts(discounted);
            }
        } catch (error) {
            console.error('Error fetching discounted products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Optimizing Offers...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-6 pt-4">
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-4 bg-[#214a32] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-green-100">
                        <Zap size={20} />
                        Bulk discount adjust
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                        <Percent size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Avg Markdown</p>
                        <h3 className="text-2xl font-black text-[#214a32]">
                            {products.length > 0 ? (products.reduce((acc, curr) => acc + curr.discount, 0) / products.length).toFixed(1) : 0}%
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-[#214a32]">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Promo Value</p>
                        <h3 className="text-2xl font-black text-[#214a32]">
                            ${products.reduce((acc, curr) => acc + (curr.price * (curr.discount / 100)), 0).toFixed(2)}
                        </h3>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                        <ShoppingBag size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Active Items</p>
                        <h3 className="text-2xl font-black text-[#214a32]">{products.length} Items</h3>
                    </div>
                </div>
            </div>

            {/* Discounted Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex"
                    >
                        <div className="w-1/3 p-6">
                            <div className="aspect-square rounded-[2rem] bg-gray-50 overflow-hidden relative group">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ShoppingBag size={40} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg">
                                    {product.discount}% OFF
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black uppercase text-[#214a32] tracking-widest">{product.category}</span>
                                    <div className="flex items-center gap-1 text-[9px] font-bold text-gray-300">
                                        <Clock size={12} />
                                        <span>EXPIRES SOON</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black font-outfit text-[#214a32] tracking-tight">{product.name}</h3>
                                <div className="mt-4 flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter line-through">${product.price.toFixed(2)}</p>
                                        <p className="text-2xl font-black text-[#214a32] tracking-tighter">${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                                    </div>
                                    <div className="h-10 w-[1px] bg-gray-100"></div>
                                    <div className="flex flex-col">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Savings</p>
                                        <p className="text-xl font-black text-green-500 tracking-tighter">${(product.price * (product.discount / 100)).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-[#F8F7F4] hover:bg-[#214a32] hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#214a32]">
                                Manage Campaign
                            </button>
                        </div>
                    </motion.div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-gray-100 border-dashed">
                        <Tag size={64} className="text-gray-100 mx-auto mb-6" />
                        <h3 className="text-xl font-black text-gray-300 uppercase tracking-widest">No active markdowns detected</h3>
                        <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Launch your first promotional campaign from the inventory lab</p>
                    </div>
                )}
            </div>
        </div>
    );
}
