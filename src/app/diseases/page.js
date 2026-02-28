"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/component/PageHeader';
import { ArrowRight, Activity, Heart, Scale } from 'lucide-react';

export default function DiseasesPage() {
    const diseases = [
        {
            slug: 'diabetes',
            title: 'Diabetes (Sugar) Management',
            description: 'Natural ways to balance insulin levels with organic diet.',
            icon: Activity,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            image: '/P1.png' // Using existing placeholder images
        },
        {
            slug: 'blood-pressure',
            title: 'Blood Pressure Control',
            description: 'Maintain healthy BP with potassium-rich foods.',
            icon: Heart,
            color: 'text-red-600',
            bg: 'bg-red-50',
            image: '/P7.png'
        },
        {
            slug: 'obesity',
            title: 'Obesity & Weight Loss',
            description: 'Sustainable weight loss with metabolism-boosting foods.',
            icon: Scale,
            color: 'text-green-600',
            bg: 'bg-green-50',
            image: '/P6.png'
        },
        {
            slug: 'digestion',
            title: 'Digestive Health',
            description: 'Heal your gut with fiber and natural probiotics.',
            icon: Activity,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            image: '/P3.png'
        },
        {
            slug: 'joint-pain',
            title: 'Joint & Bone Health',
            description: 'Anti-inflammatory foods for bone and joint health.',
            icon: Heart,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            image: '/P4.png'
        },
        {
            slug: 'immunity',
            title: 'Immunity Boost',
            description: 'Boost defense system with Vitamin C and natural herbs.',
            icon: Activity,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            image: '/P5.png'
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-sans scroll-mt-20">
            <PageHeader
                title="Treatments by condition"
                description="Explore natural food-based solutions for common health conditions."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {diseases.map((disease, idx) => (
                        <Link
                            href={`/diseases/${disease.slug}`}
                            key={idx}
                            className="group relative bg-white rounded-3xl p-6 border border-stone-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500"
                        >
                            <div className={`size-14 rounded-xl ${disease.bg} ${disease.color} flex items-center justify-center mb-6 transition-transform`}>
                                <disease.icon size={24} strokeWidth={2} />
                            </div>

                            <h3 className="text-xl font-black text-[#21492f] mb-3 leading-tight group-hover:text-[#22aa4f] transition-colors">
                                {disease.title}
                            </h3>

                            <p className="text-gray-500 font-medium mb-6 leading-relaxed text-sm">
                                {disease.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[#22aa4f] font-bold text-xs">Learn more</span>
                                <div className="size-8 rounded-full bg-[#f8faf9] flex items-center justify-center text-[#21492f] group-hover:bg-[#21492f] group-hover:text-white transition-all">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
