"use client";

import React, { useState, useEffect } from 'react';
import PageHeader from '../../component/PageHeader';
import { motion } from 'framer-motion';
import { FileText, ShieldAlert, UserPlus, ShoppingCart, MessageSquare, AlertTriangle, PhoneCall, Mail } from 'lucide-react';
import Image from 'next/image';

export default function TermsAndConditions() {
    const [activeSection, setActiveSection] = useState("disclaimer");

    const sections = [
        { id: "disclaimer", title: "Medical Disclaimer", icon: ShieldAlert },
        { id: "account", title: "Account Registration", icon: UserPlus },
        { id: "purchases", title: "Purchases & Returns", icon: ShoppingCart },
        { id: "content", title: "User Content", icon: MessageSquare },
        { id: "liability", title: "Limitation of Liability", icon: AlertTriangle },
        { id: "contact", title: "Contact Info", icon: PhoneCall }
    ];

    const scrollTo = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-[Poppins] text-gray-800 selection:bg-[#22aa4f]/20">
            <PageHeader
                title="Terms of Service"
                description="Please read these terms and conditions carefully before using our service."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Sidebar - Navigation */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 bg-white p-6 rounded-[32px] shadow-[0_20px_50px_rgba(33,73,47,0.06)] border border-stone-100">
                            <h3 className="text-xl font-black text-[#21492f] mb-6 flex items-center gap-2">
                                <FileText size={20} className="text-[#22aa4f]" /> Contents
                            </h3>
                            <nav className="space-y-2">
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollTo(section.id)}
                                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-left transition-all ${activeSection === section.id ? 'bg-[#22aa4f] text-white shadow-lg shadow-[#22aa4f]/20' : 'text-gray-500 hover:bg-stone-50 hover:text-[#21492f]'}`}
                                        >
                                            <Icon size={18} className={activeSection === section.id ? 'text-white' : 'text-gray-400'} />
                                            <span className="font-bold text-sm">{section.title}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-8 space-y-16">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-black text-[#21492f] mb-4 tracking-tight">Terms and <span className="text-[#22aa4f]">Conditions</span></h1>
                            <p className="text-[#22aa4f] font-bold text-sm tracking-widest uppercase mb-8">Last Updated: January 2026</p>

                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 text-lg leading-relaxed font-medium text-gray-600">
                                <p className="mb-4">
                                    Welcome to <strong className="text-[#21492f]">IlajbilGhiza</strong>. By accessing our website, using our AI Diet Planner, or purchasing our organic products, you agree to be bound by these Terms of Service.
                                </p>
                                <p>
                                    If you do not agree with any part of these terms, please do not use our services.
                                </p>
                            </div>
                        </div>

                        {/* Section 1 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="disclaimer" className="scroll-mt-32">
                            <div className="bg-red-50/50 p-8 md:p-10 rounded-[32px] border border-red-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500">
                                    <ShieldAlert size={120} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                        <div className="size-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                                            <span className="font-black">01</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-[#21492f]">Medical Disclaimer</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed font-medium mb-6">
                                        IlajbilGhiza is a platform for nutritional guidance and organic food. Content provided by our AI, blogs, or product descriptions is for informational purposes only.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "We do not provide medical diagnosis or treatment.",
                                            "Always consult a qualified healthcare provider for any medical condition.",
                                            "Do not disregard professional medical advice because of something you have read on this site."
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-red-50">
                                                <div className="mt-1 size-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                                    <AlertTriangle size={12} />
                                                </div>
                                                <span className="font-bold text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sections 2 to 6 */}
                        <div className="space-y-12">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="account" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-10 rounded-xl bg-stone-100 flex items-center justify-center text-gray-400 font-black">02</div>
                                    <h2 className="text-2xl font-black text-[#21492f]">Account Registration</h2>
                                </div>
                                <div className="pl-14">
                                    <p className="text-gray-600 leading-relaxed font-medium mb-4">
                                        To use certain features like the AI Diet Planner or to place an order, you may be required to register an account. You agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 font-bold ml-4 marker:text-[#22aa4f]">
                                        <li>Provide accurate and current information.</li>
                                        <li>Maintain the security of your password.</li>
                                        <li>Accept responsibility for all activities under your account.</li>
                                    </ul>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="purchases" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-10 rounded-xl bg-stone-100 flex items-center justify-center text-gray-400 font-black">03</div>
                                    <h2 className="text-2xl font-black text-[#21492f]">Product Purchases & Returns</h2>
                                </div>
                                <div className="pl-14 grid gap-4">
                                    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                                        <h4 className="font-black text-[#22aa4f] mb-2 uppercase tracking-wider text-xs">Availability</h4>
                                        <p className="text-gray-600 font-medium text-sm">All organic products are subject to seasonal availability. We reserve the right to discontinue any product at any time.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                                        <h4 className="font-black text-[#22aa4f] mb-2 uppercase tracking-wider text-xs">Pricing</h4>
                                        <p className="text-gray-600 font-medium text-sm">Prices are subject to change without notice. We strive for accuracy but are not liable for pricing errors.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                                        <h4 className="font-black text-[#22aa4f] mb-2 uppercase tracking-wider text-xs">Returns</h4>
                                        <p className="text-gray-600 font-medium text-sm">Due to the perishable nature of organic foods, we only accept returns if the product is damaged or spoiled upon delivery. Claims must be made within 24 hours of receipt.</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="content" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-10 rounded-xl bg-stone-100 flex items-center justify-center text-gray-400 font-black">04</div>
                                    <h2 className="text-2xl font-black text-[#21492f]">User Content</h2>
                                </div>
                                <div className="pl-14">
                                    <p className="text-gray-600 font-medium leading-relaxed bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                        You retain ownership of any reviews or comments you post. However, by posting, you grant IlajbilGhiza a non-exclusive license to use, reproduce, and display such content.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="liability" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="size-10 rounded-xl bg-stone-100 flex items-center justify-center text-gray-400 font-black">05</div>
                                    <h2 className="text-2xl font-black text-[#21492f]">Limitation of Liability</h2>
                                </div>
                                <div className="pl-14">
                                    <p className="text-gray-600 font-medium leading-relaxed bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                        IlajbilGhiza shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our service or products.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="contact" className="scroll-mt-32">
                                <div className="bg-[#21492f] p-8 md:p-12 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#22aa4f] rounded-full blur-[80px] opacity-40" />
                                    <div className="relative z-10 w-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="size-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black">06</div>
                                            <h2 className="text-2xl font-black">Contact Information</h2>
                                        </div>
                                        <p className="text-white/80 font-medium pl-14 mb-6">
                                            Questions about the Terms of Service should be sent to us.
                                        </p>
                                        <div className="pl-14">
                                            <a href="mailto:support@ilajbilghiza.com" className="inline-flex items-center gap-3 bg-white text-[#21492f] px-6 py-3 rounded-xl font-bold hover:bg-[#22aa4f] hover:text-white transition-all">
                                                <Mail size={18} /> support@ilajbilghiza.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
