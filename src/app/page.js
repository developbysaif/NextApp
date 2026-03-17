"use client"

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Leaf, Heart, Shield, Truck, Zap, Activity, Brain, Bone, Star, Quote } from 'lucide-react';
import Header from '../component/Header';
import CategoryCard from '../component/CategoryCard';
import Subscribe from '../component/Subscribe';
import ProductItem from '../component/ProductItem';
import BlogSlider from '../component/BlogSlider';
import NewsUpdate from '../component/NewsUpdate';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Custom Product Data for IlajbilGhiza
  // Updated with verifiable paths in public folder
  const initialProducts = [
    {
      id: 1,
      name: "Organic Mango (Aam)",
      image: "/P1.png",
      price: 4.50,
      rating: 5,
      reviews: 158,
      description: "Vitamin A aur C se bharpoor, immunity aur digestion ke liye behtareen.",
      bestFor: "Weakness, immunity, skin health",
      recommendedQty: "1 medium mango daily",
      badge: "Seasonal"
    },
    {
      id: 2,
      name: "Organic Peach (Aaroo)",
      image: "/P2.png",
      price: 3.20,
      rating: 5,
      reviews: 94,
      description: "Fiber-rich fruit jo digestion aur weight control mein madad karta hai.",
      bestFor: "Constipation, heart health",
      recommendedQty: "2-3 peaches daily",
      discount: "10%"
    },
    {
      id: 3,
      name: "Premium Orange (Malta)",
      image: "/P3.png",
      price: 2.50,
      rating: 4,
      reviews: 210,
      description: "Vitamin C ka behtareen source, immunity booster.",
      bestFor: "Cold, flu, skin glow",
      recommendedQty: "1 glass juice or 2 oranges"
    },
    {
      id: 4,
      name: "Fresh Banana (Kela)",
      image: "/P4.png",
      price: 1.50,
      rating: 5,
      reviews: 430,
      description: "Instant energy aur potassium se bharpoor.",
      bestFor: "Weakness, muscle cramps",
      recommendedQty: "2 bananas daily"
    },
    {
      id: 5,
      name: "Watermelon (Tarbooz)",
      image: "/P5.png",
      price: 8.00,
      rating: 5,
      reviews: 88,
      description: "Hydration aur detox ke liye ideal fruit.",
      bestFor: "Heat control, kidney health",
      recommendedQty: "250g daily",
      badge: "Fresh"
    },
    {
      id: 6,
      name: "Organic Papaya (Papita)",
      image: "/P6.png",
      price: 5.50,
      rating: 4,
      reviews: 67,
      description: "Digestive enzymes se bharpoor, gut health ke liye best.",
      bestFor: "Constipation, bloating",
      recommendedQty: "1 bowl daily"
    },
    {
      id: 7,
      name: "Red Apple (Saib)",
      image: "/P7.png",
      price: 3.00,
      rating: 5,
      reviews: 520,
      description: "Daily health aur heart protection ke liye ideal.",
      bestFor: "Cholesterol, weight management",
      recommendedQty: "1 apple daily"
    },
    {
      id: 8,
      name: "Strawberries",
      image: "/P8.png",
      price: 6.00,
      rating: 5,
      reviews: 142,
      description: "Antioxidants aur skin health ke liye mashhoor.",
      bestFor: "Anti-aging, immunity",
      recommendedQty: "5-6 berries daily"
    }
  ];

  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
<<<<<<< HEAD
    if (!loading && !user) {
      router.push('/signup');
    }
=======
    // No longer forcing redirect to signup on home page
>>>>>>> 87b965e (initial commit)
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#22aa4f]"></div>
      </div>
    );
  }

<<<<<<< HEAD
  if (!user) return null;
=======
  // Allow rendering home page even if user is not logged in
  // if (!user) return null;

>>>>>>> 87b965e (initial commit)

  const categoriesData = [
    { title: "Organic Fruits", subtitle: "Enjoy", bg: "#a6763f", image: "/Fruits.png", href: "/grocery/category/vegetables-fruits" },
    { title: "Healthy Snacks", subtitle: "New", bg: "#ffffff", image: "/Poradge.png", href: "/products" },
    { title: "Dry Fruits", subtitle: "Popular", bg: "#a6763f", image: "/Dry Fruit.png", href: "/grocery/category/dry-nuts" },
    { title: "Fresh Herbs", subtitle: "Fresh", bg: "#22aa4f", image: "/Herbs.png", href: "/products" },
    { title: "Moringa Powder", subtitle: "Superfood", bg: "#8c8c4f", image: "/mor.png", href: "/products?search=moringa" },
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans">

      <Header />

      {/* Categories Grid Section */}
      <section className="px-4 py-8 mx-auto scroll-mt-20 max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {categoriesData.map((cat, idx) => (
            <CategoryCard key={idx} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#f8faf9] py-12 px-4 best-seller-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-[#21492f] leading-tight">
                Nature's Finest Harvest
              </h2>
              <p className="text-gray-500 mt-2 text-base md:text-lg">
                Handpicked organic goodness for your family.
              </p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-[#22aa4f] font-extrabold text-sm uppercase tracking-widest hover:translate-x-1 transition-transform">
              Explore all harvest <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {products.map((product, index) => (
              <ProductItem key={index} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/products" className="flex items-center gap-2 text-[#22aa4f] font-bold text-sm">
              Explore all harvest <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* First Order Deal Section */}
      <section className="py-4">
        <div className="bg-gradient-to-r from-amber-400 to-amber-300 rounded-3xl mx-auto p-8 md:p-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-xl shadow-amber-200/50 group">
          <div className="text-white max-w-xl relative z-10 text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-green-900 font-bold text-xs mb-3">A Gift For You</h3>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              A New Beginning For <br /><span className="text-[#21492f]">Your Healthy Life</span>
            </h2>
            <p className="text-green-900 text-base md:text-lg font-medium mb-6 leading-relaxed">
              Take the first step towards a pain-free future. Start your healing journey today with a special welcome gift.
            </p>
            <Link href="/products" className="inline-block bg-[#21492f] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-black/10">
              Shop now
            </Link>
          </div>

          <div className="relative z-10 w-full max-w-[300px] md:max-w-sm transition-transform duration-700 group-hover:scale-105">
            <Image src="/desk.png" alt="First Order" width={400} height={400} className="w-full drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* AI Diet Plan Promo Section */}
      <section className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative bg-[#21492f] rounded-3xl p-8 md:p-10 overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/5">
                <Zap size={150} strokeWidth={8} />
              </div>
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Age', 'Weight', 'Health', 'Routine'].map(tag => (
                    <span key={tag} className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10">{tag}</span>
                  ))}
                </div>
                <h3 className="text-white text-2xl md:text-4xl font-black mb-6 leading-tight">Science That Understands You</h3>
                <div className="space-y-3">
                  {[
                    { t: "Exact food quantity", i: Activity },
                    { t: "Scientific calories count", i: Zap },
                    { t: "Balanced micro-nutrients", i: Leaf },
                    { t: "Weight gain/loss target", i: Activity }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-medium">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <feat.i size={16} />
                      </div>
                      <span>{feat.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <span className="text-[#22aa4f] font-bold text-xs mb-3 block">Technology Meets Nature</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#21492f] mb-6 leading-tight">A Healthier You, <br /> Every Single Day</h2>
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed mb-8">
              Personalized nutrition plans powered by AI, designed uniquely for your body's needs and health goals.
            </p>
            <Link href="/diet-plan" className="inline-block bg-[#22aa4f] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#21492f] transition-all shadow-lg shadow-green-500/10">
              Transform My Life
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Slider Section */}
      <section className="py-4">
        <BlogSlider />
      </section>

      <NewsUpdate />

      <Subscribe />

    </div>
  );
}
