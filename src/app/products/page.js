"use client";
import React, { useState, useEffect, Suspense } from 'react';
import ProductItem from '@/component/ProductItem';
import { Search, Filter, Leaf, Sun, Wind, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function ProductsContent({ initialCategory = "All", initialSeason = "All" }) {
    const searchParams = useSearchParams();
    const urlSearch = searchParams.get('search') || "";

    // Map plural to singular for data matching
    const mappedCategory = initialCategory && initialCategory.toLowerCase() === "fruits" ? "Fruit"
        : initialCategory && initialCategory.toLowerCase() === "vegetables" ? "Vegetable"
            : initialCategory || "All";

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(mappedCategory);
    const [search, setSearch] = useState(urlSearch);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    setProducts(data.data);
                    setFilteredProducts(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setSearch(urlSearch);
    }, [urlSearch]);

    useEffect(() => {
        if (loading) return;

        let temp = [...products];

        if (category !== "All") {
            const catLower = category.toLowerCase();
            temp = temp.filter(p => {
                const pCat = p.category ? p.category.toLowerCase() : "";
                return pCat === catLower || pCat + 's' === catLower || pCat === catLower + 's';
            });
        }

        if (search) {
            temp = temp.filter(p =>
                (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
                (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
            );
        }

        setFilteredProducts(temp);
    }, [category, search, products, loading]);

    const categories = ["All", "Fruit", "Vegetable", "Meat", "Seafood", "Dairy", "Bakery", "Drinks", "Dry Nuts", "Oil and Vinegar", "Breads"];

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Premium Dynamic Hero Section */}
            <section className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
                {/* Background Image Header */}
                <div 
                    className="absolute inset-0 z-0 scale-105"
                    style={{
                        backgroundImage: `url("/organic_foods.png")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Dark Gradient Overlay for contrast and depth without white blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#122a1a]/80 via-black/40 to-black/20" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-start pt-[5vh]">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-[#B4E567] px-5 py-2 rounded-full border border-white/40 mb-6 font-bold text-[9px] uppercase tracking-[0.25em] text-[#122a1a] shadow-lg"
                    >
                        <Leaf size={12} className="text-[#122a1a]" /> Ilaj Bil Ghiza Quality
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6 drop-shadow-xl"
                    >
                        Organic Freshness <br />
                        <span className="text-[#B4E567]">Every Season.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-xl text-white/90 font-bold text-sm md:text-base leading-relaxed mb-10 drop-shadow-md"
                    >
                        A curation of nature's best. Brewed with care. Delivered for your health. Natural remedies and seasonal organic foods for a better life.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col md:flex-row gap-0 items-center bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-2 w-full max-w-2xl"
                    >
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#215b33]" size={20} />
                            <input
                                type="text"
                                placeholder="Search for healing foods..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 bg-transparent border-none focus:ring-0 font-bold text-sm outline-none text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                        <div className="px-8 py-4 bg-[#215b33] rounded-[1.5rem] flex items-center gap-2 cursor-pointer group text-white hover:bg-[#1a4a29] transition-colors w-full md:w-auto mt-2 md:mt-0 justify-center">
                            <span className="font-black text-xs uppercase tracking-widest">Search Filter</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filters Bar */}
            <div className="sticky top-[70px] z-40 bg-white/90 backdrop-blur-lg border-b border-stone-100 py-6">
                <div className="max-w-7xl mx-auto px-6 uppercase tracking-widest text-[10px]">
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-6 py-2.5 rounded-full font-bold transition-all text-[11px] whitespace-nowrap border ${category === cat
                                    ? 'bg-[#214a32] text-white border-[#214a32] shadow-md shadow-green-200'
                                    : 'bg-white text-gray-600 border-stone-200 hover:border-green-300 hover:text-green-600'
                                    }`}
                            >
                                {cat === "All" ? "Shop All" : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-80 bg-stone-50 rounded-3xl animate-pulse border border-stone-100" />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((p, idx) => (
                            <ProductItem key={p._id || p.id || idx} product={p} index={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-stone-50 rounded-3xl border border-stone-100">
                        <Search size={40} className="mx-auto text-stone-300 mb-4" />
                        <h3 className="text-xl font-black text-gray-900 mb-2">No matching products</h3>
                        <p className="text-gray-500 mb-8">Try a different category or search term.</p>
                        <button
                            onClick={() => { setCategory("All"); setSearch(""); }}
                            className="bg-green-600 text-white px-8 py-3 rounded-full font-bold text-xs hover:bg-green-700 transition-colors"
                        >
                            View All Products
                        </button>
                    </div>
                )}

                {/* Pagination Placeholder */}
                <div className="flex justify-center items-center gap-3 mt-16">
                    <button className="w-10 h-10 rounded-xl bg-green-600 text-white font-black text-xs shadow-lg shadow-green-100">1</button>
                    <button className="w-10 h-10 rounded-xl bg-white border border-stone-100 text-gray-400 font-bold text-xs hover:bg-stone-50">2</button>
                    <button className="w-10 h-10 rounded-xl bg-white border border-stone-100 text-gray-400 font-bold text-xs hover:bg-stone-50">3</button>
                </div>
            </div>
        </div>
    );
}

export default function CategoryPage(props) {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ProductsContent {...props} />
        </Suspense>
    );
}
