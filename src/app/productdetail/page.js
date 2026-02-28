"use client";

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Home, ChevronRight, Star, Minus, Plus, ShoppingCart, Zap,
    Check, Heart, Eye, Shield, Brain, Bone, Sprout,
    TriangleAlert, X, Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import '@/component/productcard.css';

function ProductDetailContent() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const { addToCart } = useCart();

    // State
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'description');
    const [mainImage, setMainImage] = useState('/placeholder.png');
    const [quantity, setQuantity] = useState(1);
    const [showStockPopup, setShowStockPopup] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                if (data.success) {
                    const found = data.data.find(p => (p.id == productId || p._id == productId));
                    if (found) {
                        setProduct(found);
                        setMainImage(found.image || '/placeholder.png');
                    }
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        if (quantity < (product?.stock || 10)) setQuantity(quantity + 1);
    };

    const renderStars = (count) => {
        return Array(5).fill(0).map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(count) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
            />
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"
                ></motion.div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
                <p className="text-xl font-bold mb-4">Product not found</p>
                <Link href="/products" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                    Back to Products
                </Link>
            </div>
        );
    }

    const productImages = product.images && product.images.length > 0 ? product.images : [product.image || '/placeholder.png'];

    return (
        <div className="font-[Poppins] text-gray-800 overflow-x-hidden bg-[#f8faf9] min-h-screen pb-20 premium-product-detail">

            {/* Breadcrumb Navigation */}
            <section className="py-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition">
                                    <Home className="mr-2 w-4 h-4" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                                    <Link href="/products" className="ml-1 text-sm font-medium text-gray-500 hover:text-green-600 md:ml-2">
                                        Shop
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                                    <span className="ml-1 text-sm font-semibold text-green-700 md:ml-2">{product.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </section>

            {/* Product Details Section */}
            <section className="px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Product Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Main Image */}
                            <div className="main-image-card bg-white h-[500px] flex items-center justify-center p-8 mb-8 overflow-hidden relative">
                                <motion.div
                                    key={mainImage}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={mainImage}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-4">
                                {productImages.map((img, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setMainImage(img)}
                                        className={`thumbnail-card bg-white h-24 flex items-center justify-center p-2 border-2 transition-all
                                            ${mainImage === img ? 'border-green-500 ring-4 ring-green-100 active' : 'border-transparent hover:border-green-200'}`}
                                    >
                                        <Image src={img} alt={`Thumb ${index}`} width={80} height={80} className="w-full h-full object-contain" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Information */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col"
                        >
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                        100% Organic
                                    </span>
                                    {product.season && (
                                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                            {product.season} Collection
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-[#21492f] mb-4 leading-tight">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1">
                                        {renderStars(product.rating || 5)}
                                    </div>
                                    <span className="text-gray-500 font-medium">
                                        {product.rating || 5.0} • <button onClick={() => setActiveTab('reviews')} className="underline hover:text-green-600 transition">{product.reviews || 0} Reviews</button>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-end gap-4 mb-2">
                                    <p className="text-4xl font-black text-green-700">${(parseFloat(product.price) || 0).toFixed(2)}</p>
                                    {product.originalPrice && (
                                        <p className="text-xl text-gray-400 line-through mb-1">${(parseFloat(product.originalPrice) || 0).toFixed(2)}</p>
                                    )}
                                    {product.discount && (
                                        <span className="mb-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">{product.discount} OFF</span>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm font-medium">Free shipping on orders over $50</p>
                            </div>

                            <div className="mb-10 text-gray-600 leading-relaxed text-lg italic">
                                "{product.description || product.shortDescription || "Pure, fresh, and naturally grown. Our organic produce is harvested at the peak of ripeness to ensure maximum nutritional value and exceptional taste."}"
                            </div>

                            {/* Quantity & Actions */}
                            <div className="space-y-6 mb-12">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select Quantity</h3>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm">
                                        <button onClick={handleDecrease} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition">
                                            <Minus size={20} />
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            readOnly
                                            className="w-16 text-center font-bold text-xl bg-transparent outline-none"
                                        />
                                        <button onClick={handleIncrease} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl transition">
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <p className="text-gray-500 font-medium lowercase">
                                        Only <span className={product.stock < 10 ? "text-red-500 font-bold" : "text-green-600 font-bold"}>{product.stock || 'Not'}</span> in stock
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => addToCart({ ...product, image: mainImage }, quantity)}
                                        disabled={!product.stock || product.stock < 1}
                                        className="premium-btn-primary flex-1 py-5 px-8 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ShoppingCart size={24} />
                                        {(!product.stock || product.stock < 1) ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                    <button
                                        className="bg-white border-2 border-gray-100 p-5 rounded-2xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all duration-300"
                                    >
                                        <Heart size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
                                {[
                                    { icon: Shield, t: "Pure Organic", c: "bg-blue-50 text-blue-600" },
                                    { icon: Sprout, t: "Farm Fresh", c: "bg-green-50 text-green-600" },
                                    { icon: Zap, t: "Instant Energy", c: "bg-amber-50 text-amber-600" },
                                    { icon: Check, t: "Strict Quality", c: "bg-purple-50 text-purple-600" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.c}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-bold text-gray-700 text-sm">{item.t}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="mt-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-[3rem] shadow-xl shadow-green-900/5 overflow-hidden border border-gray-50">
                        <div className="flex border-b border-gray-100 bg-gray-50/50 overflow-x-auto px-8">
                            {['description', 'nutrition', 'benefits', 'reviews'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`tab-btn py-8 px-8 font-black text-sm uppercase tracking-widest transition-all
                                        ${activeTab === tab ? 'active text-green-700' : 'text-gray-400 hover:text-green-600'}`}
                                >
                                    {tab} {tab === 'reviews' && `(${product.reviews || 0})`}
                                </button>
                            ))}
                        </div>

                        <div className="p-12 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {activeTab === 'description' && (
                                        <div className="max-w-4xl">
                                            <h3 className="text-3xl font-black text-[#21492f] mb-6">Discover Nature's Best</h3>
                                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                                {product.description || "Our organic selection brings you the freshest flavors directly from sustainable farms. Every item is hand-picked to ensure it meets our rigorous standards for quality, taste, and nutritional value."}
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="bg-green-50 p-6 rounded-3xl border border-green-100/50">
                                                    <h4 className="font-bold text-green-800 mb-2">Sustainable Sourcing</h4>
                                                    <p className="text-sm text-green-700/80">We partner with local farmers who use regenerative practices to protect our soil and ecosystem.</p>
                                                </div>
                                                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100/50">
                                                    <h4 className="font-bold text-amber-800 mb-2">Maximum Nutrition</h4>
                                                    <p className="text-sm text-amber-700/80">Grown without synthetic pesticides or fertilizers, preserving the natural vitamins and minerals.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'nutrition' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                            <div>
                                                <h3 className="text-3xl font-black text-[#21492f] mb-8">Nutritional Value</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { l: "Calories", v: "45 kcal", p: 40 },
                                                        { l: "Vitamin C", v: "85%", p: 85 },
                                                        { l: "Potassium", v: "12%", p: 60 },
                                                        { l: "Fiber", v: "4g", p: 70 },
                                                    ].map((n, i) => (
                                                        <div key={i} className="space-y-2">
                                                            <div className="flex justify-between font-bold text-sm">
                                                                <span className="text-gray-500">{n.l}</span>
                                                                <span className="text-green-700">{n.v}</span>
                                                            </div>
                                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    whileInView={{ width: `${n.p}%` }}
                                                                    transition={{ duration: 1, delay: i * 0.1 }}
                                                                    className="h-full bg-green-500 rounded-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-8 rounded-3xl flex justify-center">
                                                <div className="w-64 h-64 rounded-full border-[12px] border-green-500/10 flex flex-col items-center justify-center text-center">
                                                    <span className="text-4xl font-black text-green-700">100%</span>
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Natural</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'benefits' && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {[
                                                { i: Heart, t: "Heart Health", d: "Rich in antioxidants that protect your cardiovascular system.", c: "text-red-500 bg-red-50" },
                                                { i: Brain, t: "Mind Boosting", d: "Essential vitamins that support cognitive function and focus.", c: "text-blue-500 bg-blue-50" },
                                                { i: Shield, t: "Immunity", d: "Boosts your natural defense against common seasonals.", c: "text-green-500 bg-green-50" },
                                                { i: Sprout, t: "Natural Growth", d: "Pure energy source for physical development.", c: "text-indigo-500 bg-indigo-50" },
                                                { i: Bone, t: "Bone Strength", d: "Contains minerals vital for bone density and joint health.", c: "text-amber-500 bg-amber-50" },
                                                { i: Eye, t: "Vision Support", d: "Carotenoids that help maintain healthy eyesight.", c: "text-cyan-500 bg-cyan-50" },
                                            ].map((b, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ y: -5 }}
                                                    className="p-8 bg-white border border-gray-100 rounded-[2.5rem] hover:shadow-xl hover:shadow-green-900/5 transition-all"
                                                >
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${b.c}`}>
                                                        <b.i size={32} />
                                                    </div>
                                                    <h4 className="text-xl font-extrabold text-[#21492f] mb-3">{b.t}</h4>
                                                    <p className="text-gray-500 leading-relaxed text-sm">{b.d}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                                            <div className="lg:col-span-1">
                                                <div className="sticky top-8">
                                                    <h3 className="text-2xl font-black text-[#21492f] mb-8">Overall Rating</h3>
                                                    <div className="flex items-center gap-6 mb-8">
                                                        <span className="text-7xl font-black text-green-700">{product.rating || 5.0}</span>
                                                        <div>
                                                            <div className="flex gap-1 mb-2">
                                                                {renderStars(product.rating || 5)}
                                                            </div>
                                                            <span className="font-bold text-gray-400 text-sm uppercase tracking-widest">{product.reviews || 0} reviews</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {[5, 4, 3, 2, 1].map((s) => (
                                                            <div key={s} className="flex items-center gap-4">
                                                                <span className="text-xs font-bold text-gray-500 min-w-[12px]">{s}</span>
                                                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-amber-400 rounded-full" style={{ width: s === 5 ? '92%' : s === 4 ? '5%' : '1%' }} />
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-400">{(s === 5 ? 92 : s === 4 ? 5 : 1)}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:col-span-3 space-y-12">
                                                <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                                                    <h4 className="text-xl font-black text-[#21492f] mb-6">Write a Review</h4>
                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-4">
                                                            <span className="font-bold text-gray-500">Your Rating:</span>
                                                            <div className="flex gap-2">
                                                                {[1, 2, 3, 4, 5].map((s) => (
                                                                    <button
                                                                        key={s}
                                                                        onClick={() => setRating(s)}
                                                                        onMouseEnter={() => setHoverRating(s)}
                                                                        onMouseLeave={() => setHoverRating(0)}
                                                                        className="p-1 transition-transform hover:scale-125"
                                                                    >
                                                                        <Star className={`w-8 h-8 ${(hoverRating || rating) >= s ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <textarea
                                                            placeholder="Describe your experience..."
                                                            className="w-full h-40 bg-white border-2 border-transparent focus:border-green-500/20 focus:ring-4 focus:ring-green-500/5 rounded-3xl p-6 outline-none transition-all font-medium text-lg"
                                                            id="review-comment"
                                                        />
                                                        <button
                                                            className="premium-btn-secondary px-12 py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs"
                                                            onClick={async () => {
                                                                const comment = document.getElementById('review-comment').value;
                                                                if (!rating) return alert('Please select a rating');
                                                                if (!comment) return alert('Please enter a comment');

                                                                const newReview = {
                                                                    name: "Guest User",
                                                                    rating,
                                                                    comment,
                                                                    date: new Date().toLocaleDateString()
                                                                };

                                                                const updatedReviews = [...(product.reviewsList || []), newReview];
                                                                const updatedProduct = {
                                                                    ...product,
                                                                    reviewsList: updatedReviews,
                                                                    reviews: updatedReviews.length,
                                                                    rating: (updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length).toFixed(1)
                                                                };

                                                                try {
                                                                    const res = await fetch(`/api/products/${product.id || product._id}`, {
                                                                        method: 'PUT',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify(updatedProduct)
                                                                    });
                                                                    if (res.ok) {
                                                                        setProduct(updatedProduct);
                                                                        setRating(0);
                                                                        document.getElementById('review-comment').value = '';
                                                                        alert('Review submitted successfully!');
                                                                    }
                                                                } catch (err) {
                                                                    console.error(err);
                                                                }
                                                            }}
                                                        >
                                                            Submit Feedback
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-8">
                                                    {(product.reviewsList || []).map((rev, idx) => (
                                                        <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 font-black text-xl">
                                                                        {rev.name.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <h5 className="font-extrabold text-[#21492f]">{rev.name}</h5>
                                                                        <div className="flex gap-1">
                                                                            {renderStars(rev.rating)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{rev.date || 'Jan 20, 2026'}</span>
                                                            </div>
                                                            <p className="text-gray-600 leading-relaxed italic">"{rev.comment}"</p>
                                                        </div>
                                                    ))}
                                                    {(!product.reviewsList || product.reviewsList.length === 0) && (
                                                        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[3rem]">
                                                            <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">No reviews yet. Be the first!</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function ProductDetailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductDetailContent />
        </Suspense>
    );
}
