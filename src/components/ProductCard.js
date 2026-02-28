"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Plus, Minus, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product, theme = { primary: '#AFEBE8', text: '#064E3B', cardBg: '#ECFEFF' } }) => {
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Construct detailed URL
    const categorySlug = product.category ? product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') : 'general';
    const detailUrl = `/grocery/${categorySlug}/${product.slug || product.id}`;

    return (
        <div
            className="group relative rounded-[2rem] p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full"
            style={{ backgroundColor: theme.cardBg }}
        >
            {/* Image Section */}
            <div className="relative aspect-[4/4] mb-4 bg-white rounded-[1.5rem] overflow-hidden flex items-center justify-center p-6">
                <Image
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = '/placeholder.png';
                    }}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.season && (
                        <span className="bg-white/90 backdrop-blur text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm" style={{ color: theme.text }}>
                            {product.season}
                        </span>
                    )}
                    {product.isOrganic && (
                        <span className="bg-[#2E7D32] text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                            <Leaf size={10} /> Organic
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3
                        className="font-bold text-lg mb-1 leading-tight group-hover:opacity-80 transition-opacity"
                        style={{ color: theme.text }}
                    >
                        {product.name}
                    </h3>
                    <p className="text-sm font-medium opacity-60 line-clamp-2" style={{ color: theme.text }}>
                        {product.weight || '1kg'}
                    </p>
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-black" style={{ color: theme.text }}>${product.price?.toFixed(2)}</span>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-3 bg-white/50 backdrop-blur rounded-xl px-2 py-1 border border-white/60">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-6 h-6 flex items-center justify-center transition-colors hover:scale-110 active:scale-95"
                                style={{ color: theme.text }}
                            >
                                <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="text-sm font-black w-3 text-center" style={{ color: theme.text }}>{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="w-6 h-6 flex items-center justify-center transition-colors hover:scale-110 active:scale-95"
                                style={{ color: theme.text }}
                            >
                                <Plus size={12} strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href={`/productdetail?id=${product.id || product._id}`}
                            className="py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 transition-all flex items-center justify-center gap-2 hover:bg-white/50"
                            style={{ borderColor: theme.text, color: theme.text }}
                        >
                            View Detail <Eye size={14} />
                        </Link>
                        <button
                            onClick={handleAddToCart}
                            className="py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
                            style={{
                                backgroundColor: added ? '#22c55e' : theme.text,
                                color: '#ffffff'
                            }}
                        >
                            {added ? 'Added!' : 'Add'}
                            {!added && <ShoppingCart size={14} className="group-hover/btn:translate-x-1 transition-transform" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

