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
    const mappedCategory = initialCategory.toLowerCase() === "fruits" ? "Fruit"
        : initialCategory.toLowerCase() === "vegetables" ? "Vegetable"
            : initialCategory;

    // Capitalize season
    const mappedSeason = initialSeason.charAt(0).toUpperCase() + initialSeason.slice(1).toLowerCase();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(mappedCategory);
    const [season, setSeason] = useState(mappedSeason === "All" ? "All" : mappedSeason);
    const [search, setSearch] = useState(urlSearch);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('API Error Response:', errorText);
                    throw new Error(`API error: ${res.status}`);
                }

                const data = await res.json();
                if (data.success) {
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

    // Update search state when URL changes
    useEffect(() => {
        setSearch(urlSearch);
    }, [urlSearch]);

    useEffect(() => {
        if (loading) return;

        let temp = [...products];

        if (category !== "All") {
            // Flexible matching for singular/plural
            const catLower = category.toLowerCase();
            temp = temp.filter(p => {
                const pCat = p.category ? p.category.toLowerCase() : "";
                return pCat === catLower || pCat + 's' === catLower || pCat === catLower + 's';
            });
        }

        if (season !== "All") {
            temp = temp.filter(p => p.season === season);
        }

        if (search) {
            temp = temp.filter(p =>
                (p.name && p.name.toLowerCase().includes(search.toLowerCase())) ||
                (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
            );
        }

        setFilteredProducts(temp);
    }, [category, season, search, products, loading]);

    const categories = ["Shop All", "All", "Doctors", "Offers", "Other", "Blog", "Videos", "Pro", "Doctors", "Offers", "Other"];
    const seasons = ["All", "Summer", "Winter"];

    return (
        <div className="min-h-screen bg-[#fffffd] font-sans scroll-mt-20">
            {/* Hero Header */}
            <div className="relative py-12 overflow-hidden bg-[#f3f9f3]">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 rounded-bl-[10rem] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-50/50 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-5xl mx-auto px-4">
                    <div className="max-w-2xl">
                        <div className="text-green-600 px-3 py-1.5 rounded-full text-[10px] font-bold mb-2">
                            Ilaj Bil Ghiza
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                            Organic freshness <span className="text-green-600">every season.</span>
                        </h1>
                        <p className="text-sm text-gray-500 font-bold leading-relaxed mb-8">
                            A curation of nature's best. Brewed with care. Delivered for your health.
                        </p>

                        {/* Search & Apply Item */}
                        <div className="flex flex-col md:flex-row gap-0 items-center bg-white rounded-xl shadow-sm border border-stone-100 p-1 w-full max-w-xl">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search organic items..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl border-none focus:ring-0 transition-all font-bold text-xs outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2 px-4 border-l border-stone-200">
                                <Image src="/leaf-icon.png" alt="leaf" width={16} height={16} className="opacity-50" />
                                <button className="text-xs font-bold text-gray-900 whitespace-nowrap">Apply Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Filters Bar */}
            <div className="sticky top-20 z-30 bg-white border-b border-stone-100 py-4 mb-8">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="relative flex-1 overflow-hidden">
                            <motion.div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {categories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-2 rounded-full font-bold transition-all duration-300 text-[11px] whitespace-nowrap border ${idx === 0
                                            ? 'bg-[#22aa4f] text-white border-[#22aa4f]'
                                            : cat === "App" ? 'bg-orange-50 text-orange-600 border-orange-100'
                                                : 'bg-white text-gray-500 border-stone-100 hover:border-[#22aa4f]/30 hover:text-[#22aa4f]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-5xl mx-auto px-4 pb-20">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-stone-50 rounded-2xl h-80 animate-pulse border border-stone-100" />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product, idx) => (
                            <ProductItem key={product.id || product._id || idx} product={product} index={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-stone-50 rounded-3xl border border-stone-100">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                            <Search className="text-stone-200" size={32} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-1">No items found</h3>
                        <p className="text-gray-500 text-sm font-medium">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => { setCategory("All"); setSeason("All"); setSearch(""); }}
                            className="mt-6 bg-[#21492f] text-white px-6 py-2.5 rounded-xl font-bold text-xs"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-12 pb-10">
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <ChevronDown size={20} className="rotate-90" />
                    </button>
                    <button className="w-8 h-8 rounded-md bg-[#22aa4f] text-white text-xs font-bold">1</button>
                    <button className="w-8 h-8 rounded-md bg-white border border-stone-100 text-gray-500 text-xs font-bold hover:bg-stone-50">2</button>
                    <button className="w-8 h-8 rounded-md bg-white border border-stone-100 text-gray-500 text-xs font-bold hover:bg-stone-50">3</button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <ChevronDown size={20} className="-rotate-90" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CategoryPage(props) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#22aa4f]"></div>
            </div>
        }>
            <ProductsContent {...props} />
        </Suspense>
    );
}
