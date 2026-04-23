"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import PageHeader from '../../components/PageHeader';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import NewsUpdate from '../../components/NewsUpdate';
import Subscribe from '../../components/Subscribe';
import { useCart } from '@/context/CartContext';
import ProductItem from '../../components/ProductItem';

export default function Store() {
    const { addToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Go Organic!",
            subtitle: "If a bug won't bite it, why should you?",
            tagline: "Embrace Your Choices!",
            image: "/Blue_and_Pink_Illustrative_International_Day_of_Education_Square_Instagram_Post-removebg-preview.png",
            description: "The purpose of this website is to promote and sell fresh, organic, and chemical-free fruits directly from trusted farms."
        },
        {
            title: "Eat Natural!",
            subtitle: "Choose freshness and quality!",
            tagline: "Healthy is Happy!",
            image: "/3-removebg-preview.png",
            description: "It aims to encourage a healthy lifestyle by providing customers with naturally grown produce that is both sustainable and nutritious."
        },
        {
            title: "Eat Natural!",
            subtitle: "Choose freshness and quality!",
            tagline: "Healthy is Happy!",
            image: "/4-removebg-preview.png",
            description: "It aims to encourage a healthy lifestyle by providing customers with naturally grown produce that is both sustainable and nutritious."
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="bg-white overflow-x-hidden font-[Poppins]">

            {/* Hero Section (Slider) */}
            <section className="relative w-full h-auto bg-[#AFEBE8] flex items-center justify-center p-0 overflow-hidden md:h-[600px]">

                {/* Slider Container */}
                <div className="relative w-full h-full max-w-6xl mx-auto overflow-hidden">
                    <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>

                        {slides.map((slide, index) => (
                            <div key={index} className="min-w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 md:py-12 h-full">

                                <div className="flex flex-col items-center space-y-2 hidden md:flex">
                                    <span className="text-xs tracking-widest rotate-180 [writing-mode:vertical-rl] text-cyan-900">SCROLL DOWN</span>
                                    <div className="h-32 border-l-2 border-cyan-900"></div>
                                </div>

                                <div className="max-w-md text-blue-900 mb-10 md:mb-0">
                                    <h3 className="text-xl md:text-2xl mb-2 font-medium">{slide.subtitle}</h3>
                                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">{slide.title}</h1>
                                    <h2 className="text-2xl md:text-3xl mb-6 font-semibold">{slide.tagline}</h2>
                                    <div className="flex items-center space-x-4">
                                        <button className="bg-blue-900 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-800 transition">
                                            VIEW PRODUCTS
                                        </button>
                                        <p className="text-sm leading-tight text-gray-700">{slide.description}</p>
                                    </div>
                                </div>

                                <div className="relative flex justify-center items-center mt-8 md:mt-0">
                                    <div className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] absolute -z-10"></div>
                                    <Image
                                        src={slide.image}
                                        alt="Slide Image"
                                        width={400}
                                        height={400}
                                        className="relative object-contain w-[300px] md:w-[450px]"
                                    />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Navigation arrows */}
                <div className="absolute bottom-6 right-6 md:right-20 flex items-center space-x-6 text-blue-900 z-10">
                    <div className="text-sm font-semibold">
                        <span className="font-bold">0{currentSlide + 1}</span>
                        <span className="opacity-70"> / 0{slides.length}</span>
                    </div>
                    <div className="flex space-x-4">
                        <button onClick={prevSlide} className="border border-blue-900 rounded-full p-2 hover:bg-blue-900 hover:text-white transition">
                            <ArrowRight className="rotate-180 w-4 h-4" />
                        </button>
                        <button onClick={nextSlide} className="border border-blue-900 rounded-full p-2 hover:bg-blue-900 hover:text-white transition">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="px-6 py-10 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto justify-center items-center mt-12">
                <div className="flex flex-col gap-4 w-full">
                    {/* Left Side */}
                    <div className="flex flex-col md:flex-row gap-4 flex-1 justify-center items-center">
                        {/* Box 1 */}
                        <div className="bg-[#f44336] text-white rounded-xl flex items-center justify-between p-6 w-full md:w-1/2">
                            <div>
                                <p className="text-sm opacity-80">Enjoy</p>
                                <h2 className="text-2xl font-bold">Organic Meals</h2>
                                <a href="#" className="mt-2 inline-block text-sm underline">Browse</a>
                            </div>
                            <Image src="/Fruits.png" alt="Organic Meals" width={112} height={112} className="w-28 h-28 object-contain" />
                        </div>

                        {/* Box 2 */}
                        <div className="bg-[#ffeb3b] text-gray-800 rounded-xl flex items-center justify-between p-6 w-full md:w-1/2">
                            <div>
                                <p className="text-sm font-semibold">NEW</p>
                                <h2 className="text-2xl font-bold">Organic Snacks</h2>
                                <a href="#" className="mt-2 inline-block text-sm underline">Browse</a>
                            </div>
                            <Image src="/Poradge.png" alt="Organic Snacks" width={112} height={112} className="w-28 h-28 object-contain" />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                        {/* Box 3 */}
                        <div className="bg-[#ffcc80] text-gray-800 rounded-xl flex items-center justify-between p-6 w-full md:w-1/3">
                            <div>
                                <p className="text-sm opacity-80">Enjoy</p>
                                <h2 className="text-2xl font-bold">Dry Fruits</h2>
                                <a href="#" className="mt-2 inline-block text-sm underline">Browse</a>
                            </div>
                            <Image src="/Dry Fruit.png" alt="Dry Fruits" width={96} height={96} className="w-24 h-24 object-contain" />
                        </div>

                        {/* Box 4 */}
                        <div className="bg-[#b3e5fc] text-gray-800 rounded-xl flex items-center justify-between p-6 w-full md:w-1/3">
                            <div>
                                <p className="text-sm font-semibold">New</p>
                                <h2 className="text-2xl font-bold">Organic Herbs</h2>
                                <a href="#" className="mt-2 inline-block text-sm underline">Browse</a>
                            </div>
                            <Image src="/Herbs.png" alt="Organic Herbs" width={96} height={96} className="w-24 h-24 object-contain" />
                        </div>

                        {/* Box 5 */}
                        <div className="bg-[#ff9800] text-white rounded-xl flex items-center justify-between p-6 w-full md:w-1/3">
                            <div>
                                <p className="text-sm font-semibold">New</p>
                                <h2 className="text-2xl font-bold">Organic Drinks</h2>
                                <a href="#" className="mt-2 inline-block text-sm underline">Browse</a>
                            </div>
                            <Image src="/Shake.png" alt="Organic Drinks" width={96} height={96} className="w-24 h-24 object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner Section */}
            <section className="bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-3xl mx-4 md:mx-12 p-8 md:p-12 flex flex-col md:flex-row justify-evenly items-center my-12 relative overflow-hidden max-w-7xl md:mx-auto">

                <div className="relative mt-8 md:mt-0 order-2 md:order-1">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-green-700 rounded-full absolute -z-10 opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <Image src="/Green Tea.png" alt="green tea" width={320} height={320} className="relative w-64 md:w-80 h-auto drop-shadow-2xl" />
                </div>

                <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full -translate-x-16 -translate-y-16 opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-900 rounded-full translate-x-20 translate-y-20 opacity-20"></div>

                <div className="text-white max-w-lg relative z-10 order-1 md:order-2 text-center md:text-left mb-8 md:mb-0">
                    <h3 className="text-lg font-semibold text-green-200 mb-2">Eriny</h3>
                    <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                        <span className="block text-green-700">BEST</span>
                        <span className="block">GREEN TEA</span>
                    </h2>
                    <p className="text-green-100 text-lg mb-6 leading-relaxed">
                        Our Forest and Fresh Green Tea<br />
                        Collection is Available in Our Store
                    </p>
                    <button className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        SHOP NOW
                    </button>
                </div>
            </section>

            {/* Best Seller Products */}
            <section className="bg-white py-12 md:py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
                        Best Seller Products
                    </h2>
                    <p className="text-lg sm:text-xl font-light text-neutral-950 text-center mb-8">
                        Explore our top-selling organic products, carefully selected for their quality and popularity among our customers.
                    </p>
                    <div className="flex justify-end mb-6">
                        <a href="#" className="text-sm decoration-current text-black font-bold hover:underline flex items-center">
                            Show More <ArrowRight size={14} className="ml-1" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { id: 101, name: "Skin care", price: 21.00, img: "/P-1.png", images: ["/P-1.png", "/P-2.png", "/P-3.png"] },
                            { id: 102, name: "VITAITY", price: 44.00, img: "/P-2.png" },
                            { id: 103, name: "EARLYBIRD", price: 44.00, img: "/P-3.png" },
                            { id: 104, name: "MARIO BADESCU", price: 14.00, img: "/P-4.png" },
                            { id: 105, name: "MITZE", price: 32.23, img: "/P-5.png" },
                            { id: 106, name: "MICRO PLANTS", price: 10.19, img: "/P-6.png" },
                            { id: 107, name: "BODY OIL", price: 40.12, img: "/P-7.png" },
                            { id: 108, name: "EX PRINIS", price: 22.00, img: "/P-8.png" },
                        ].map((product, index) => (
                            <ProductItem
                                key={index}
                                product={{
                                    _id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.img,
                                    images: product.images,
                                    rating: 5,
                                    reviews: 128
                                }}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lemon Image Section */}
            <section className="max-w-6xl mx-auto my-10 bg-[#1cc5a2] rounded-2xl py-10 px-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden md:mx-auto mx-4">
                <div className="text-white md:w-1/2 text-center md:text-left">
                    <p className="text-sm font-light">Enjoy</p>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">BEST <br /> GREEN TEA</h2>
                    <p className="mt-3 text-white/90 text-sm md:text-base">
                        Our Natural and Fresh Green Tea Collection is Available in Our Store
                    </p>
                    <button className="mt-5 bg-white text-[#1cc5a2] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition">
                        Shop Now
                    </button>
                </div>

                <div className="relative md:w-1/2 flex justify-center">
                    <Image src="/Limes.png" alt="Green Tea with Lemon" width={320} height={320} className="w-64 md:w-80 object-contain drop-shadow-lg" />
                </div>
            </section>

            <NewsUpdate />

            <Subscribe />

        </div>
    );
}
