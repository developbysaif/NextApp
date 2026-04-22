"use client"

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, ArrowRight, Leaf, Heart, Shield, Truck, Zap, Activity, Brain, Bone, Star, Quote } from 'lucide-react';
import Header from '../components/Header';
import Disease from '../components/diseases-semtum';
import Calcuateindex from '../components/Calculateindex';
import ServicesCards from '../components/services';
import CategoryCard from '../components/CategoryCard';
import Subscribe from '../components/Subscribe';
import ProductItem from '../components/ProductItem';
import BlogSlider from '../components/BlogSlider';
import NewsUpdate from '../components/NewsUpdate';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import WeeklyDietPlan from '../components/WeeklyDietPlan';
import StatsCounter from '../components/StatsCounter';
import AppointmentForm from '../components/AppointmentForm';

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
    // No longer forcing redirect to signup on home page
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#214a32]"></div>
      </div>
    );
  }

  // Allow rendering home page even if user is not logged in
  // if (!user) return null;


  const categoriesData = [
    { title: "Organic Fruits", subtitle: "Enjoy", bg: "#a6763f", image: "/Fruits.png", href: "/grocery/category/vegetables-fruits" },
    { title: "Healthy Snacks", subtitle: "New", bg: "#ffffff", image: "/Poradge.png", href: "/products" },
    { title: "Dry Fruits", subtitle: "Popular", bg: "#a6763f", image: "/Dry Fruit.png", href: "/grocery/category/dry-nuts" },
    { title: "Fresh Herbs", subtitle: "Fresh", bg: "#214a32", image: "/Herbs.png", href: "/products" },
    { title: "Moringa Powder", subtitle: "Superfood", bg: "#8c8c4f", image: "/mor.png", href: "/products?search=moringa" },
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans">

      <Header />
      <Disease />

      {/* Featured Products - Moved Up */}
      <section className="bg-[#f8faf9] py-14 md:py-20 px-8 md:px-14 best-seller-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-[#214a32] leading-tight">
                Nature's Finest Harvest
              </h2>
              <p className="text-gray-500 mt-2 text-base md:text-lg">
                Handpicked organic goodness for your family.
              </p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-[#214a32] font-extrabold text-sm uppercase tracking-widest hover:translate-x-1 transition-transform">
              Explore all harvest <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 8).map((product, index) => (
              <ProductItem key={index} product={product} index={index} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/products" className="flex items-center gap-3 bg-[#214a32] text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#214a32] transition-all shadow-xl shadow-green-200">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <ServicesCards />

      {/* First Order Deal Section */}
      <section className="py-10 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-400 to-amber-300 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-xl shadow-amber-200/50 group">
          <div className="text-white max-w-xl relative z-10 text-center md:text-left mb-8 md:mb-0">
            <h3 className="text-green-900 font-bold text-xs mb-3">A Gift For You</h3>
            <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              A New Beginning For <br /><span className="text-[#214a32]">Your Healthy Life</span>
            </h2>
            <p className="text-green-900 text-base md:text-lg font-medium mb-6 leading-relaxed">
              Take the first step towards a pain-free future. Start your healing journey today with a special welcome gift.
            </p>
            <Link href="/products" className="inline-block bg-[#214a32] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-black/10">
              Shop now
            </Link>
          </div>

          <div className="relative z-10 w-full max-w-[300px] md:max-w-sm transition-transform duration-700 group-hover:scale-105">
            <Image src="/desk.png" alt="First Order" width={400} height={400} className="w-full drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <WeeklyDietPlan />
      <AppointmentForm />

      <section className="py-10 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <BlogSlider />
      </section>

      {/* Secondary Sections */}
      <Calcuateindex />
      <StatsCounter />
      <NewsUpdate />
      <Subscribe />

    </div>
  );
}
