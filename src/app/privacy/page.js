"use client";

import React, { useState, useEffect } from 'react';
import PageHeader from '../../component/PageHeader';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Share2, UserCheck, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState("info");

    const sections = [
        { id: "info", title: "Information We Collect", icon: Database },
        { id: "usage", title: "How We Use Your Info", icon: Eye },
        { id: "ai", title: "AI Diet Planner Data", icon: Shield },
        { id: "sharing", title: "Data Sharing", icon: Share2 },
        { id: "security", title: "Data Security", icon: Lock },
        { id: "rights", title: "User Rights", icon: UserCheck }
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
        <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-[#22aa4f]/20">
            <PageHeader
                title="Privacy Policy"
                description="Your privacy is extremely important to us. Learn how we protect your data."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Sidebar - Navigation */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-32 bg-white p-6 rounded-[32px] shadow-[0_20px_50px_rgba(33,73,47,0.06)] border border-stone-100">
                            <h3 className="text-xl font-black text-[#21492f] mb-6">Contents</h3>
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

                            <div className="mt-8 p-6 bg-[#21492f] rounded-[24px] text-white overflow-hidden relative group">
                                <div className="relative z-10">
                                    <Shield size={32} className="text-[#22aa4f] mb-4" />
                                    <p className="font-bold mb-2">Need help with your data?</p>
                                    <p className="text-white/70 text-xs mb-4">Contact our DPO for any privacy related queries.</p>
                                    <button className="text-[10px] font-black uppercase tracking-wider bg-white text-[#21492f] px-4 py-2 rounded-full hover:bg-[#22aa4f] hover:text-white transition-colors">
                                        Email Support
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-[#22aa4f]/20 transition-all duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-8 space-y-16">
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-black text-[#21492f] mb-6 tracking-tight">Our Commitment to <span className="text-[#22aa4f]">Privacy</span></h1>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                At IlajbilGhiza, your privacy is extremely important to us. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our website, mobile application, AI diet planner, and related services.
                            </p>
                            <div className="mt-8 relative h-[300px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(33,73,47,0.1)]">
                                <Image
                                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2064&auto=format&fit=crop"
                                    alt="Privacy Concept"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Section 1 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="info" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-2xl bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f]">
                                    <Database size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-[#21492f]">Information We Collect</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 hover:shadow-xl hover:border-[#22aa4f]/30 transition-all">
                                    <h3 className="text-xl font-black text-[#21492f] mb-4">Personal Data</h3>
                                    <ul className="space-y-3">
                                        {['Full name & Email', 'Phone number', 'Age and gender'].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-center text-gray-600 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100 hover:shadow-xl hover:border-[#22aa4f]/30 transition-all">
                                    <h3 className="text-xl font-black text-[#21492f] mb-4">Health & Lifestyle</h3>
                                    <ul className="space-y-3">
                                        {['Height and weight', 'Dietary preferences', 'Health conditions'].map((item, i) => (
                                            <li key={i} className="flex gap-3 items-center text-gray-600 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 2 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="usage" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-2xl bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f]">
                                    <Eye size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-[#21492f]">How We Use Your Info</h2>
                            </div>

                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-stone-100">
                                <ul className="space-y-4">
                                    {[
                                        "To generate personalized AI diet plans",
                                        "To recommend suitable organic foods",
                                        "To connect you with doctors or nutritionists",
                                        "To improve our services and user experience"
                                    ].map((item, index) => (
                                        <li key={index} className="flex gap-4 items-start bg-stone-50 p-4 rounded-2xl">
                                            <div className="mt-1 size-6 rounded-full bg-[#22aa4f] text-white flex items-center justify-center shrink-0 text-xs font-bold">{index + 1}</div>
                                            <span className="font-bold text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Section 3 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="ai" className="scroll-mt-32">
                            <div className="bg-gradient-to-br from-[#21492f] to-[#163321] rounded-[40px] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#22aa4f]/20 rounded-full blur-[80px]" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#22aa4f] backdrop-blur-md">
                                            <Shield size={24} />
                                        </div>
                                        <h2 className="text-3xl font-black text-white">AI Diet Planner Data</h2>
                                    </div>
                                    <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                        Health-related data entered into the AI Diet Planner is processed incredibly securely. We understand the sensitive nature of this information.
                                    </p>
                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                                            <p className="font-bold text-sm">Used only for diet guidance</p>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                                            <p className="font-bold text-sm">Processed confidentially</p>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                                            <p className="font-bold text-sm">Never shared without consent</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 4 & 5 */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="sharing" className="scroll-mt-32">
                                <h2 className="text-2xl font-black text-[#21492f] mb-6 flex items-center gap-3">
                                    <Share2 className="text-[#22aa4f]" /> Data Sharing
                                </h2>
                                <p className="text-gray-600 mb-6 font-medium">We only share limited information with trusted service providers or doctors (with your consent). We never sell your data.</p>
                                <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-xl text-amber-800 font-bold text-sm">
                                    <AlertTriangle size={20} className="shrink-0" />
                                    No data is shared with advertisers.
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="security" className="scroll-mt-32">
                                <h2 className="text-2xl font-black text-[#21492f] mb-6 flex items-center gap-3">
                                    <Lock className="text-[#22aa4f]" /> Data Security
                                </h2>
                                <p className="text-gray-600 mb-6 font-medium">We implement appropriate security measures to protect your data, including secure servers and encrypted transmission.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-[#21492f] text-white p-4 rounded-xl text-center text-xs font-bold tracking-widest uppercase">Secure Servers</div>
                                    <div className="bg-[#21492f] text-white p-4 rounded-xl text-center text-xs font-bold tracking-widest uppercase">Encryption</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Section 6 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} id="rights" className="scroll-mt-32">
                            <div className="bg-stone-100 p-8 md:p-12 rounded-[40px] border border-stone-200">
                                <h2 className="text-3xl font-black text-[#21492f] mb-8 flex items-center gap-4">
                                    <UserCheck className="text-[#22aa4f]" size={32} /> Your Rights
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {['Access your personal data', 'Update or correct information', 'Request account deletion', 'Opt out of communications'].map((right, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
                                            <div className="size-8 rounded-full bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f] shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-[#22aa4f]" />
                                            </div>
                                            <p className="font-bold text-[#21492f]">{right}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
}
