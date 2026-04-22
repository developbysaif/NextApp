"use client";

import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';
import Image from 'next/image';

const faqs = [
    {
        question: "What is IlajbilGhiza?",
        answer: "IlajbilGhiza is a health and nutrition platform based on the concept of treatment through organic food. We help users identify the right foods, provide personalized daily diet plans, and offer consultations with certified doctors to minimize medicine dependency."
    },
    {
        question: "Is IlajbilGhiza a medical service?",
        answer: "No. IlajbilGhiza is a nutrition and preventive health platform. We do not replace doctors or emergency medical treatment. Our role is to support healing through food, improve lifestyle, and assist recovery alongside medical advice."
    },
    {
        question: "How does the AI diet planner work?",
        answer: "Our AI platform analyzes your profile to generate meal plans, quantities, and nutrients specifically tailored for your health status."
    },
    {
        question: "Who can use IlajbilGhiza?",
        answer: "Absolutely everyone. We offer special diet plans tailored for different lifestyles including students, professionals, teachers, and homemakers."
    }
];

export default function FAQPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-[#214a32]/20">
            <PageHeader
                title="FAQs & Support"
                description="Find answers to your questions and learn how we can help you."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column - Contact Info & Image */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative h-[400px] rounded-[32px] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                alt="Support team"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#214a32] to-transparent/20" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <h3 className="text-2xl font-black mb-2">We're here to help!</h3>
                                <p className="text-white/80 text-sm">Our support team is available 24/7 to assist you with any questions or medical inquiries.</p>
                            </div>
                        </motion.div>

                        <div className="bg-white p-8 rounded-[32px] shadow-[0_20px_50px_rgba(33,73,47,0.06)] border border-stone-100">
                            <h4 className="text-lg font-black text-[#214a32] mb-6">Quick Contact</h4>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-[#214a32]/10 flex items-center justify-center text-[#214a32]">
                                        <MessageCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live Chat</p>
                                        <p className="font-bold text-[#214a32]">Talk to an agent</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-[#214a32]/10 flex items-center justify-center text-[#214a32]">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Support</p>
                                        <p className="font-bold text-[#214a32]">+92 300 1234567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-[#214a32]/10 flex items-center justify-center text-[#214a32]">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Us</p>
                                        <p className="font-bold text-[#214a32]">support@ilajbilghiza.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - FAQs */}
                    <div className="lg:col-span-7">
                        <div className="mb-10">
                            <h2 className="text-4xl md:text-5xl font-black text-[#214a32] mb-6 tracking-tight">How can we <span className="text-[#214a32]">help you?</span></h2>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search for answers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border-2 border-stone-100 rounded-full py-5 pl-14 pr-6 focus:outline-none focus:border-[#214a32] focus:ring-4 focus:ring-[#214a32]/10 transition-all font-bold text-gray-700 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={idx}
                                    className={`bg-white rounded-[24px] border-2 transition-all duration-300 overflow-hidden ${activeIndex === idx ? 'border-[#214a32] shadow-[0_10px_40px_rgba(34,170,79,0.12)]' : 'border-stone-100 hover:border-gray-300'}`}
                                >
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                                    >
                                        <span className={`text-lg font-black pr-8 ${activeIndex === idx ? 'text-[#214a32]' : 'text-gray-700'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`shrink-0 size-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === idx ? 'bg-[#214a32] text-white rotate-180' : 'bg-stone-100 text-gray-500'}`}>
                                            {activeIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {activeIndex === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-8 pb-6"
                                            >
                                                <p className="text-gray-600 font-medium leading-relaxed">
                                                    {faq.answer}
                                                </p>

                                                {/* If it's the first question, add the bullet points from the original */}
                                                {idx === 0 && (
                                                    <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm font-bold text-[#214a32]">
                                                        <li className="flex gap-3 items-center bg-stone-50 p-3 rounded-xl"><div className="w-1.5 h-1.5 rounded-full bg-[#214a32]" /> Identify the right foods</li>
                                                        <li className="flex gap-3 items-center bg-stone-50 p-3 rounded-xl"><div className="w-1.5 h-1.5 rounded-full bg-[#214a32]" /> Personalized daily diet plans</li>
                                                        <li className="flex gap-3 items-center bg-stone-50 p-3 rounded-xl"><div className="w-1.5 h-1.5 rounded-full bg-[#214a32]" /> Consult certified doctors</li>
                                                        <li className="flex gap-3 items-center bg-stone-50 p-3 rounded-xl"><div className="w-1.5 h-1.5 rounded-full bg-[#214a32]" /> Minimal medicine dependency</li>
                                                    </ul>
                                                )}
                                                {/* If it's the AI diet planner question */}
                                                {idx === 2 && (
                                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-[10px] font-bold">
                                                        <div className="bg-[#214a32] text-white p-2.5 rounded-xl">Meal plans</div>
                                                        <div className="bg-[#214a32] text-white p-2.5 rounded-xl">Quantities</div>
                                                        <div className="bg-[#214a32] text-white p-2.5 rounded-xl">Nutrients</div>
                                                        <div className="bg-[#214a32] text-white p-2.5 rounded-xl">Progress</div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )) : (
                                <div className="text-center py-12 bg-white rounded-[24px] border border-stone-100">
                                    <HelpCircle size={48} className="mx-auto text-stone-300 mb-4" />
                                    <p className="font-bold text-gray-500">No FAQs found matching your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
