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

    const categories = ["All", "Fruit", "Vegetable", "Meat", "Seafood", "Dairy", "Bakery", "Drinks", "Dry Nuts", "Oil and Vinegar", "Breads", "Apple Juice", "Moringa Powder"];
    const seasons = ["All", "Summer", "Winter"];

    return (
        <div className="min-h-screen bg-[#FBFBF9] font-sans scroll-mt-20">
            {/* Hero Header */}
            <div className="relative py-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-green-50/50 rounded-bl-[10rem] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-50/50 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-5xl mx-auto px-4">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-bold mb-4">
                            <Leaf size={12} />
                            Redefining pure food
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                            Organic freshness <span className="text-green-600">every season</span>
                        </h1>
                        <p className="text-base text-gray-500 font-medium leading-relaxed mb-8">
                            Discover our curated collection of natural, farm-picked fruits and vegetables
                            delivered straight to your doorstep.
                        </p>

                        {/* Search & Simple Stats */}
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search organic items..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-sm border-transparent focus:border-green-500 focus:ring-0 transition-all font-bold text-sm outline-none"
                                />
                            </div>
                            <div className="hidden md:flex items-baseline gap-1.5">
                                <span className="text-2xl font-black text-gray-900">{filteredProducts.length}</span>
                                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Products found</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Filters Bar */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-y border-stone-100 py-3 mb-8">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="relative flex-1 overflow-hidden">
                            <motion.div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-5 py-2 rounded-lg font-bold transition-all duration-300 text-[11px] whitespace-nowrap border ${category === cat
                                            ? 'bg-[#22aa4f] text-white border-[#22aa4f]'
                                            : 'bg-white text-gray-500 border-stone-100 hover:border-[#22aa4f]/30 hover:text-[#22aa4f]'
                                            }`}
                                    >
                                        {cat === "All" ? "Everything" : cat.toLowerCase() + "s"}
                                    </button>
                                ))}
                            </motion.div>
                        </div>

                        {/* Season Filter */}
                        <div className="hidden lg:flex gap-1 bg-stone-50 p-1 rounded-lg border border-stone-100">
                            {seasons.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSeason(s)}
                                    className={`px-4 py-1.5 rounded-md font-bold transition-all duration-300 text-xs flex items-center gap-1.5 ${season === s
                                        ? 'bg-amber-100 text-amber-700'
                                        : 'text-gray-500 hover:bg-white'
                                        }`}
                                >
                                    {s === "Summer" && <Sun size={12} />}
                                    {s === "Winter" && <Wind size={12} />}
                                    {s}
                                </button>
                            ))}
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
