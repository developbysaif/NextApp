"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Leaf,
    Shield,
    Heart,
    Activity,
    Brain,
    Users,
    Stethoscope,
    Clock,
    CheckCircle2,
    ArrowRight,
    GraduationCap,
    Briefcase,
    Lightbulb,
    Home
} from 'lucide-react';
import PageHeader from '../../component/PageHeader';

export default function AboutPage() {
    return (
        <div className="text-gray-900 antialiased bg-[#fdfdfd] font-sans scroll-mt-20">
            {/* Logo & Hero Section */}
            <section className="relative py-12 overflow-hidden bg-white">
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative h-20 w-48 md:w-56 hover:scale-105 transition-all duration-300">
                            <Image
                                src="/desk-top.png"
                                alt="IlajbilGhiza logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-[#21492f] mb-6 leading-tight max-w-4xl mx-auto">
                        About <span className="text-[#22aa4f]">IlajbilGhiza</span> – natural treatment through organic food
                    </h1>

                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                        IlajbilGhiza is Pakistan’s AI-powered nutrition and organic food platform focused on healing, prevention, and long-term wellness through food. We believe that the right ghiza can help manage diseases and improve lifestyle health.
                    </p>
                </div>

                <div className="absolute top-0 right-0 w-80 h-80 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 opacity-50"></div>
            </section>

            {/* Who We Are & Our Philosophy */}
            <section className="py-12 bg-stone-50/50">
                <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-[#21492f] mb-4 flex items-center gap-3">
                                <span className="w-10 h-1 bg-[#22aa4f] rounded-full"></span>
                                Who we are
                            </h2>
                            <p className="text-gray-700 text-base leading-relaxed">
                                IlajbilGhiza is built on the philosophy of “Dawai se pehle ghiza”. Our platform connects organic food knowledge and artificial intelligence to provide smarter, safer, and more natural health solutions.
                            </p>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-100">
                            <h2 className="text-2xl md:text-3xl font-black text-[#21492f] mb-1">Our philosophy</h2>
                            <h3 className="text-[#22aa4f] text-lg font-bold mb-4 italic">Dawai se pehle ghiza</h3>
                            <p className="text-gray-700 text-base leading-relaxed mb-6">
                                We believe food is the body’s first and most powerful form of medicine. By returning to organic, seasonal, and locally available foods, the body can restore balance and heal naturally.
                            </p>
                            <div className="flex gap-3 mb-8">
                                <span className="bg-[#21492f] text-white p-2 rounded-lg"><Leaf size={20} /></span>
                                <span className="bg-[#22aa4f] text-white p-2 rounded-lg"><Heart size={20} /></span>
                                <span className="bg-[#a6763f] text-white p-2 rounded-lg"><Shield size={20} /></span>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/diet-plan" className="bg-[#22aa4f] text-white px-6 py-3 rounded-xl font-bold text-xs">
                                    Get AI diet plan
                                </Link>
                                <Link href="/products" className="bg-white text-[#21492f] border border-stone-200 px-6 py-3 rounded-xl font-bold text-xs hover:bg-stone-50 transition-all">
                                    View products
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative group lg:px-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-stone-100 aspect-[4/5] max-w-sm mx-auto">
                            <Image
                                src="/Fruits.png"
                                alt="Natural healing"
                                fill
                                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#21492f] mb-4">What we offer</h2>
                        <p className="text-gray-500 text-sm max-w-xl mx-auto font-medium">A comprehensive ecosystem designed for your natural health and wellness.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Organic & natural foods",
                                desc: "We provide information and access to organic fruits, vegetables, and traditional foods.",
                                icon: Leaf,
                                color: "bg-green-50 text-[#22aa4f]"
                            },
                            {
                                title: "Disease-based nutrition",
                                desc: "Food-based guidance for conditions such as diabetes, blood pressure, and obesity.",
                                icon: Activity,
                                color: "bg-blue-50 text-blue-600"
                            },
                            {
                                title: "AI-powered diet planning",
                                desc: "Our AI analyzes health goals to generate daily meal plans with exact food quantities.",
                                icon: Brain,
                                color: "bg-purple-50 text-purple-600"
                            },
                            {
                                title: "Doctor support",
                                desc: "Certified doctors and nutrition experts review and guide nutrition plans for safety.",
                                icon: Stethoscope,
                                color: "bg-red-50 text-red-600"
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-md transition-all">
                                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-[#21492f] mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-xs leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality, Mission, Vision */}
            <section className="py-16 bg-stone-50/50">
                <div className="max-w-5xl mx-auto px-4 space-y-16">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-black text-[#21492f] mb-6">Our commitment to quality & trust</h2>
                            <p className="text-gray-700 text-base leading-relaxed font-medium">
                                IlajbilGhiza is committed to transparency, ethical nutrition guidance, and user privacy. All health recommendations are science-backed and designed for real-world application.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#22aa4f] p-8 md:p-12 rounded-3xl text-white">
                            <h2 className="text-2xl md:text-3xl font-black mb-4">Our mission</h2>
                            <p className="text-white/90 text-sm leading-relaxed font-medium">
                                Our mission is to educate people about the healing power of food, combine tradition with modern science, and make personalized nutrition accessible to everyone through technology.
                            </p>
                        </div>
                        <div className="bg-[#a6763f] p-8 md:p-12 rounded-3xl text-white">
                            <h2 className="text-2xl md:text-3xl font-black mb-4">Our vision</h2>
                            <p className="text-white/90 text-sm leading-relaxed font-medium">
                                IlajbilGhiza aims to become Pakistan’s most trusted platform for organic food-based health solutions, empowering individuals to live healthier lives.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto bg-[#21492f] rounded-3xl p-8 md:p-16 text-center text-white relative shadow-xl overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                            Start your healing journey <br />
                            with <span className="text-[#22aa4f]">IlajbilGhiza</span>
                        </h2>
                        <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto font-medium">
                            Good health starts with informed choices. Take a step toward natural healing, smarter nutrition, and a healthier future.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/diet-plan"
                                className="inline-flex items-center gap-2 bg-white text-[#21492f] px-8 py-4 rounded-xl font-bold text-xs hover:bg-[#a6763f] hover:text-white transition-all shadow-md"
                            >
                                Get your AI diet plan
                                <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/book-appointment"
                                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-xs hover:bg-white hover:text-[#21492f] transition-all"
                            >
                                Contact experts
                                <Stethoscope size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
