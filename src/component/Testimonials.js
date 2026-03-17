"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Amina Siddiqui',
        role: 'Diabetic Patient',
        location: 'Lahore, Pakistan',
        avatar: '/placeholder.png',
        rating: 5,
        text: 'Ilaj Bil Ghiza ne meri zindagi badal di. 3 mahine mein mera sugar level normal ho gaya. Yeh products waqai qudrati aur asardaar hain. Main dil se shukriya ada karna chahti hoon.',
        product: 'Moringa Powder & Kalonji Oil',
    },
    {
        id: 2,
        name: 'Dr. Tariq Mehmood',
        role: 'Nutritionist',
        location: 'Karachi, Pakistan',
        avatar: '/placeholder.png',
        rating: 5,
        text: 'As a nutritionist, I recommend Ilaj Bil Ghiza to my patients. Their herbal products are pure, lab-tested, and follow sunnah principles. The results I have seen in my patients are outstanding.',
        product: 'Black Seed Oil',
    },
    {
        id: 3,
        name: 'Fatima Zahra',
        role: 'Homemaker',
        location: 'Islamabad, Pakistan',
        avatar: '/placeholder.png',
        rating: 5,
        text: 'Mere baalon ki sehat aur skin itni achhi ho gayi hai. Honey aur herbal products use karne se mujhe bahut faida hua. Bilkul natural aur side-effect free treatment. Bohot khush hoon.',
        product: 'Organic Sidr Honey',
    },
    {
        id: 4,
        name: 'Muhammad Bilal',
        role: 'Fitness Trainer',
        location: 'Rawalpindi, Pakistan',
        avatar: '/placeholder.png',
        rating: 5,
        text: 'I use these organic superfoods daily as part of my fitness regime. The energy and recovery improvement is incredible. Pure quality, no chemicals, just nature\'s best. Highly recommended!',
        product: 'Superfood Blend',
    },
    {
        id: 5,
        name: 'Zainab Malik',
        role: 'Teacher',
        location: 'Faisalabad, Pakistan',
        avatar: '/placeholder.png',
        rating: 5,
        text: 'Merey joints ka dard khatam ho gaya aur immunity bhi mazboot ho gayi. Yeh company sachchi dawat-e-sehat de rahi hai. Qudrat ka ye tohfa Allah ka shukar hai. Bohot acha kaam hai.',
        product: 'Turmeric & Ginger Blend',
    },
    {
        id: 6,
        name: 'Hassan Raza',
        role: 'Software Engineer',
        location: 'Multan, Pakistan',
        avatar: '/placeholder.png',
        rating: 5,
        text: 'Long working hours had weakened my health. After using their brain health products for 2 months, my focus, energy, and sleep quality have dramatically improved. Great natural solution!',
        product: 'Brain Health Supplement',
    },
];

const StarRating = ({ count }) => (
    <div className="flex items-center gap-0.5">
        {Array(count).fill(0).map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
        ))}
    </div>
);

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null);
    const visibleCards = 3;
    const maxIndex = TESTIMONIALS.length - visibleCards;

    const goNext = useCallback(() => {
        setCurrent(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const goPrev = () => {
        setCurrent(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    useEffect(() => {
        if (!isHovered) {
            intervalRef.current = setInterval(goNext, 4500);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHovered, goNext]);

    return (
        <section className="py-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                    <span className="text-[#22aa4f] font-black text-[10px] tracking-[0.25em] uppercase mb-3 block">
                        Real People, Real Results
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#21492f] leading-tight">
                        What Our <span className="text-[#22aa4f]">Community</span> Says
                    </h2>
                    <p className="text-gray-400 text-sm font-medium mt-2">
                        Hazaron khushaal customers ki gawahi — qudrat ki taqat ka saboot
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 shrink-0">
                    {[
                        { value: '10K+', label: 'Happy Customers' },
                        { value: '4.9★', label: 'Average Rating' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-black text-[#21492f]">{stat.value}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Slider */}
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Left Arrow */}
                <button
                    onClick={goPrev}
                    className={`absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#21492f] shadow-lg text-white hover:bg-[#22aa4f] transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Cards track */}
                <div className="overflow-hidden">
                    <div
                        className="flex gap-5 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{ transform: `translateX(calc(-${current * (100 / visibleCards)}% - ${current * 20 / visibleCards}px))` }}
                    >
                        {TESTIMONIALS.map((t) => (
                            <div
                                key={t.id}
                                className="flex-shrink-0 group"
                                style={{ width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 20 / visibleCards}px)` }}
                            >
                                <div className="relative bg-white rounded-[1.5rem] p-6 shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 h-full flex flex-col">
                                    {/* Big quote icon */}
                                    <div className="absolute top-5 right-5 text-[#edf7ef]">
                                        <Quote size={48} fill="currentColor" className="text-[#edf7ef]" />
                                    </div>

                                    {/* Stars */}
                                    <StarRating count={t.rating} />

                                    {/* Testimonial text */}
                                    <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6 flex-grow relative z-10">
                                        "{t.text}"
                                    </p>

                                    {/* Product used */}
                                    <div className="mb-5">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] bg-[#edf7ef] px-3 py-1 rounded-full">
                                            Used: {t.product}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-stone-100 pt-4 flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#edf7ef] border-2 border-[#c8e6d0] flex-shrink-0">
                                            <div className="w-full h-full flex items-center justify-center text-[#21492f] font-black text-lg">
                                                {t.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm text-[#21492f]">{t.name}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.role} • {t.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={goNext}
                    className={`absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[#21492f] shadow-lg text-white hover:bg-[#22aa4f] transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-300 rounded-full ${current === i ? 'w-6 h-2 bg-[#22aa4f]' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'}`}
                    />
                ))}
            </div>
        </section>
    );
}
