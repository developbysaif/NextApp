"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Search, ShoppingCart, Menu, X, Leaf, Minus, Plus,
    Trash2, ChevronRight, Apple, Beef, Fish, Droplet,
    Croissant, CupSoda, Bean, Milk, Star, Sparkles, Brain,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { products as allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

// --- Theme Colors ---
const COLORS = {
    primary: '#2E7D32', // Organic Green
    accent: '#FFB703',  // Soft Orange
    background: '#F9FAF7', // Off-white
    text: '#2B2B2B',   // Dark Gray
    lightText: '#6B7280',
};

// --- Categories Configuration ---
const CATEGORIES = [
    { id: 'veg-fruit', name: 'Vegetables and Fruits', icon: Apple, slug: 'Vegetable', detailSlug: 'vegetables-fruits' },
    { id: 'meat', name: 'Fresh Meat', icon: Beef, slug: 'Meat', detailSlug: 'fresh-meat' },
    { id: 'seafood', name: 'Fish and Seafood', icon: Fish, slug: 'Seafood', detailSlug: 'fish-seafood' },
    { id: 'dairy', name: 'Butter and Cream', icon: Milk, slug: 'Dairy', detailSlug: 'butter-cream' },
    { id: 'oil', name: 'Oil and Vinegar', icon: Droplet, slug: 'Oil', detailSlug: 'oil-vinegar' },
    { id: 'bakery', name: 'Breads', icon: Croissant, slug: 'Bakery', detailSlug: 'breads' },
    { id: 'juice', name: 'Apple Juice', icon: CupSoda, slug: 'Juice', detailSlug: 'apple-juice' },
    { id: 'nuts', name: 'Dry Nuts', icon: Bean, slug: 'Nuts', detailSlug: 'dry-nuts' },
];

export default function GroceryPage() {
    const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [reviewProduct, setReviewProduct] = useState(null); // Product being reviewed
    const [aiRecommendations, setAiRecommendations] = useState(null);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for header shadow
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filter products based on search only for the main page
    const filteredProducts = allProducts.filter(product => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleAddToCart = (product) => {
        addToCart(product, product.quantity || 1);
        setToast(`${product.name} added to cart!`);
        setTimeout(() => setToast(null), 3000);
    };

    const getAiRecommendations = async () => {
        setIsAiLoading(true);
        try {
            const res = await fetch('/api/ai/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartItems: cart,
                    searchHistory: searchQuery
                })
            });
            const result = await res.json();
            if (result.success) {
                setAiRecommendations(result.data);
            }
        } catch (error) {
            console.error("AI Fetch Error:", error);
            setToast("AI is currently taking a break. Try again later!");
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-inter" style={{ backgroundColor: COLORS.background, color: COLORS.text }}>

            {/* --- HEADER --- */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-white py-5'}`}>
                <div className="container mx-auto px-4 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white shadow-lg shadow-green-900/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                            <Leaf size={24} fill="currentColor" />
                        </div>
                        <span className="text-xl font-black tracking-tighter hidden sm:block font-outfit uppercase">
                            Organic<span style={{ color: COLORS.primary }}>Fresh</span>
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2E7D32] transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search fresh products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-transparent shadow-inner rounded-full py-3 pl-12 pr-4 outline-none focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-green-50 transition-all text-sm font-medium"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-3 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md hover:border-green-100 transition-all active:scale-95 group"
                        >
                            <ShoppingCart size={24} className="group-hover:text-[#2E7D32]" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFB703] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-3 bg-gray-50 rounded-full hover:bg-green-50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* --- PAGE CONTENT --- */}
            <main className="container mx-auto px-4 pt-32 pb-20 flex flex-col lg:flex-row gap-8">

                {/* --- SIDEBAR --- */}
                <aside className={`
          lg:w-72 flex-shrink-0
          lg:sticky lg:top-32 h-fit
          ${isMobileMenuOpen ? 'fixed inset-0 z-[60] bg-white p-8 overflow-y-auto pt-24' : 'hidden lg:block'}
        `}>
                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div
                            className="px-6 py-5 font-black text-white flex items-center gap-2 uppercase tracking-widest text-xs"
                            style={{ backgroundColor: COLORS.primary }}
                        >
                            <Menu size={18} />
                            ALL CATEGORIES
                        </div>
                        <nav className="p-3">
                            {CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/grocery/${cat.detailSlug}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group hover:bg-green-50 text-gray-500 hover:translate-x-1"
                                >
                                    <cat.icon size={20} className="group-hover:text-[#2E7D32]" />
                                    <span className="text-[13px] font-bold uppercase tracking-wide group-hover:text-[#2E7D32] transition-colors">{cat.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-8 relative rounded-[2rem] overflow-hidden group shadow-2xl hidden lg:block aspect-[3/4]">
                        <Image
                            src="/header.jpg"
                            alt="Promo"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                            <span className="text-[#FFB703] text-xs font-black tracking-widest uppercase mb-3">Fresh Arrivals</span>
                            <h3 className="text-white font-black text-2xl leading-tight font-outfit">Get 20% Off on Fresh Veggies</h3>
                            <p className="text-gray-300 text-xs mt-3 font-medium">Valid until end of the month</p>
                            <button className="mt-6 bg-white text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#FFB703] hover:text-white transition-all transform active:scale-95 shadow-lg shadow-white/10">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN GRID --- */}
                <section className="flex-1">
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2E7D32] bg-green-50 w-fit px-3 py-1 rounded-full mb-3">
                                <span>Grocery</span>
                                <ChevronRight size={10} />
                                <span>Marketplace</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-black font-outfit text-gray-900 leading-none">
                                All Products
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-3">
                                <span className="text-xs font-black tracking-widest text-gray-400 uppercase">{filteredProducts.length} Products</span>
                            </div>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={handleAddToCart}
                                    onReview={() => setReviewProduct(product)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-24 text-center shadow-xl shadow-gray-100/50 border border-gray-50">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                                <Search size={48} />
                            </div>
                            <h3 className="text-2xl font-black mb-3 font-outfit">No items found</h3>
                            <p className="text-gray-400 font-medium max-w-xs mx-auto">Try adjusting your category or search terms to find what you're looking for.</p>
                            <button
                                onClick={() => { setSearchQuery(''); }}
                                className="mt-8 px-10 py-4 bg-[#2E7D32] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:bg-gray-900 transition-all active:scale-95"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}

                    {/* --- AI RECOMMENDATIONS SECTION --- */}
                    <div className="mt-20">
                        <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                            {/* Decorative Sparkles */}
                            <div className="absolute top-0 right-0 p-12 text-white/10 group-hover:rotate-12 transition-transform duration-1000">
                                <Sparkles size={160} />
                            </div>

                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                                <div className="flex-1 text-center lg:text-left">
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                        <Brain size={14} /> AI Shop Assistant
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white font-outfit leading-none mb-6">
                                        Smart Organic <span className="text-[#FFB703]">Suggestions</span>
                                    </h2>
                                    <p className="text-white/80 font-medium text-sm md:text-base max-w-lg mb-8">
                                        Our AI analyzes your cart and preferences to suggest perfect organic pairings for your healthy lifestyle.
                                    </p>
                                    <button
                                        onClick={getAiRecommendations}
                                        disabled={isAiLoading}
                                        className="bg-[#FFB703] text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all transform active:scale-95 disabled:opacity-50 flex items-center gap-3 mx-auto lg:mx-0 shadow-xl shadow-black/20"
                                    >
                                        {isAiLoading ? "Analyzing..." : "Get AI Suggestions"}
                                        <Sparkles size={18} className={isAiLoading ? 'animate-spin' : ''} />
                                    </button>
                                </div>

                                <div className="flex-1 w-full">
                                    <AnimatePresence mode="wait">
                                        {aiRecommendations ? (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                            >
                                                {aiRecommendations.recommendations.map((item, idx) => (
                                                    <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all">
                                                        <h4 className="text-[#FFB703] font-black uppercase tracking-tight text-sm mb-2">{item.name}</h4>
                                                        <p className="text-white/70 text-xs font-medium leading-relaxed">{item.reason}</p>
                                                    </div>
                                                ))}
                                                <div className="sm:col-span-2 bg-white/5 border border-white/10 p-5 rounded-2xl">
                                                    <p className="text-white/60 text-[10px] italic leading-tight">"{aiRecommendations.summary}"</p>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="h-48 border-2 border-dashed border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center text-white/30 gap-3">
                                                <Sparkles size={32} />
                                                <p className="text-[10px] font-black uppercase tracking-widest">Ready to analyze your cart</p>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- CART DRAWER --- */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
                        >
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32]">
                                        <ShoppingCart size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black font-outfit uppercase tracking-tight">Your Cart</h2>
                                        <p className="text-xs text-gray-400 font-bold">{getCartCount()} Items</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all active:scale-95">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <div key={item._id || item.id} className="flex gap-6 group">
                                            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] overflow-hidden flex-shrink-0 relative border border-gray-100 group-hover:border-green-100 transition-colors">
                                                <Image src={item.image} alt={item.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <h4 className="font-black text-sm uppercase tracking-tight group-hover:text-[#2E7D32] transition-colors">{item.name}</h4>
                                                    <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">{item.weight || 'Premium Case'}</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 bg-gray-50 px-3 py-2 rounded-xl">
                                                        <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} className="text-gray-400 hover:text-red-500 transition-colors"><Minus size={14} /></button>
                                                        <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} className="text-gray-400 hover:text-green-500 transition-colors"><Plus size={14} /></button>
                                                    </div>
                                                    <span className="font-black text-lg" style={{ color: COLORS.primary }}>${((item.price || 0) * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item._id || item.id)}
                                                className="text-gray-200 hover:text-red-500 self-start p-2 transition-all hover:scale-110"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                        <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mb-8 relative">
                                            <ShoppingCart size={64} className="text-gray-100" />
                                            <div className="absolute inset-0 border-4 border-dashed border-gray-100 rounded-full animate-[spin_10s_linear_infinite]" />
                                        </div>
                                        <h3 className="text-2xl font-black font-outfit mb-3">Cart is Empty</h3>
                                        <p className="text-gray-400 font-medium max-w-[200px] text-sm leading-relaxed">Looks like you haven't added anything to your cart yet.</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-10 bg-[#2E7D32] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl transition-all active:scale-95"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-8 border-t border-gray-50 bg-gray-50/30 space-y-5">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-gray-400 text-xs font-black uppercase tracking-widest">
                                            <span>Subtotal</span>
                                            <span className="text-gray-900">${getCartTotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-400 text-xs font-black uppercase tracking-widest">
                                            <span>Delivery</span>
                                            <span className="text-[#2E7D32]">Calculated at next step</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-2xl font-black font-outfit pt-2 uppercase tracking-tighter border-t border-gray-100/50">
                                        <span>Total</span>
                                        <span style={{ color: COLORS.primary }}>${getCartTotal().toFixed(2)}</span>
                                    </div>
                                    <Link
                                        href="/checkout"
                                        className="w-full bg-[#2E7D32] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-green-900/30 hover:bg-gray-900 transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
                                    >
                                        Go To Checkout
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* --- REVIEW MODAL --- */}
            <AnimatePresence>
                {reviewProduct && (
                    <ReviewModal
                        product={reviewProduct}
                        onClose={() => setReviewProduct(null)}
                        onSubmit={(review) => {
                            setToast("Review submitted successfully!");
                            setReviewProduct(null);
                            setTimeout(() => setToast(null), 3000);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* --- TOAST MESSAGE --- */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ y: 100, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 100, opacity: 0, scale: 0.8 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 z-[200] bg-gray-900/95 backdrop-blur-md text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-5 border border-white/10"
                    >
                        <div className="w-10 h-10 bg-[#2E7D32] rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/40">
                            <ShoppingCart size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFB703] mb-1">Success</p>
                            <span className="font-bold text-sm">{toast}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

// --- REVIEW MODAL COMPONENT (Internal) ---
function ReviewModal({ product, onClose, onSubmit }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black font-outfit uppercase tracking-tight">Write a Review</h2>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{product.name}</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Your Rating</label>
                        <div className="flex gap-3">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setRating(s)}
                                    className="transition-transform active:scale-90"
                                >
                                    <Star
                                        size={32}
                                        className={s <= rating ? 'fill-[#FFB703] text-[#FFB703]' : 'text-gray-100'}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Your Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this product..."
                            className="w-full bg-gray-50 border-transparent rounded-2xl p-5 text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-[#2E7D32] transition-all min-h-[120px] resize-none"
                        />
                    </div>

                    <button
                        onClick={() => onSubmit({ rating, comment })}
                        className="w-full bg-[#2E7D32] text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-green-900/10 hover:bg-gray-900 transition-all active:scale-[0.98]"
                    >
                        Submit Review
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
