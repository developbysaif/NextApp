"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Stethoscope,
    Star,
    Calendar,
    ArrowRight,
    Clock,
    Award,
    ShieldCheck,
    Search,
    ChevronRight,
    HeartPulse
} from 'lucide-react';
import PageHeader from '@/component/PageHeader';

export default function SpecialDietPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch users from local storage and filter for verified doctors
        const fetchVerifiedDoctors = () => {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const verifiedDoctors = users.filter(u => u.role === "doctor" && u.isVerified);
            setDoctors(verifiedDoctors);
            setLoading(false);
        };
        fetchVerifiedDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-[#22aa4f]/20">
            <PageHeader
                title="Specialized Diet Plans"
                description="Verified experts se personalized nutrition aur health guidance hasil karein."
                backgroundImage="/header.jpg"
            />

            {/* Hero Section */}
            <section className="relative px-6 py-20 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_center,#22aa4f10,transparent_70%)] -translate-y-1/2 pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 bg-[#22aa4f]/10 px-4 py-2 rounded-full text-[#22aa4f] font-bold text-xs uppercase tracking-widest mb-6 border border-[#22aa4f]/20">
                                <HeartPulse size={16} /> Premium Nutrition
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-[#21492f] leading-[1.1] mb-6">
                                Expert dietary guidance for <span className="text-[#22aa4f]">special conditions.</span>
                            </h1>
                            <p className="text-gray-600 text-lg md:text-xl font-medium mb-10 leading-relaxed">
                                Connect with verified medical nutritionists who understand your unique health requirements and can create targeted, organic meal plans to support your healing journey.
                            </p>

                            <div className="bg-white p-4 rounded-[24px] shadow-[0_20px_50px_rgba(33,73,47,0.08)] border border-stone-100 flex items-center w-full max-w-md relative z-20">
                                <Search className="text-gray-400 ml-4 shrink-0" size={24} />
                                <input
                                    type="text"
                                    placeholder="Search by doctor name or specialty..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-transparent border-none px-4 py-3 focus:outline-none focus:ring-0 font-bold text-gray-700 placeholder:text-gray-400"
                                />
                                <button className="bg-[#21492f] text-white h-12 px-6 rounded-xl font-bold flex items-center justify-center hover:bg-[#22aa4f] transition-colors shrink-0">
                                    Search
                                </button>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
                                alt="Healthy Organic Food"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#21492f]/80 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 flex gap-4">
                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white flex-1">
                                    <h4 className="font-bold text-lg">PCOS Management</h4>
                                    <p className="text-white/70 text-xs">Hormonal balance diet</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white flex-1 hidden sm:block">
                                    <h4 className="font-bold text-lg">Thyroid Support</h4>
                                    <p className="text-white/70 text-xs">Metabolism boosting</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Network Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#21492f] mb-4">Our Verified Specialists</h2>
                        <p className="text-gray-500 font-medium">Aap ki sehat hamari awaleen tarjih hai.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] bg-white rounded-[32px] animate-pulse border border-stone-100 shadow-sm"></div>
                        ))}
                    </div>
                ) : filteredDoctors.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDoctors.map((doc, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-[0_10px_40px_rgba(33,73,47,0.04)] hover:shadow-2xl hover:-translate-y-2 hover:border-[#22aa4f]/30 transition-all duration-300 group flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="relative size-20 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shadow-inner">
                                        {doc.profilePhoto ? (
                                            <Image src={doc.profilePhoto} alt={doc.name} fill className="object-cover" />
                                        ) : (
                                            <div className="size-full flex items-center justify-center bg-gradient-to-br from-[#21492f] to-[#22aa4f] text-white text-3xl font-black">
                                                {doc.name?.charAt(0)}
                                            </div>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 z-10">
                                            <div className="bg-[#22aa4f] text-white p-1 rounded-full shadow-sm">
                                                <ShieldCheck size={12} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full flex items-center gap-1 font-bold text-xs border border-amber-100">
                                        <Star size={12} fill="currentColor" /> 4.9
                                    </div>
                                </div>

                                <div className="mb-6 flex-grow">
                                    <h3 className="text-2xl font-black text-[#21492f] mb-1 group-hover:text-[#22aa4f] transition-colors">Dr. {doc.name}</h3>
                                    <p className="text-[#a6763f] text-sm font-bold uppercase tracking-wider mb-4">{doc.specialization || 'Clinical Nutritionist'}</p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-stone-500 font-medium text-sm">
                                            <div className="size-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                                                <Award size={16} />
                                            </div>
                                            Verified Expert
                                        </div>
                                        <div className="flex items-center gap-3 text-stone-500 font-medium text-sm">
                                            <div className="size-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                                                <Clock size={16} />
                                            </div>
                                            Available Mon-Sat
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/book-appointment?doctor=${encodeURIComponent(doc.name)}`}
                                    className="w-full bg-[#f8faf9] text-[#21492f] hover:bg-[#21492f] hover:text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all border border-[#21492f]/10 group-hover:border-transparent mt-auto"
                                >
                                    Book Consultation
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-stone-100 shadow-sm">
                        <div className="size-24 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Stethoscope size={48} className="text-stone-300" />
                        </div>
                        <h3 className="text-2xl font-black text-[#21492f] mb-3">No verified doctors found</h3>
                        <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto">Try adjusting your search terms or verify doctors from the admin panel.</p>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="bg-[#22aa4f] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-[#21492f] transition-all"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </section>

            {/* How It Works Section */}
            <section className="bg-gradient-to-br from-[#21492f] to-[#16301e] py-24 px-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22aa4f] rounded-full blur-[120px] opacity-20" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black mb-6">The Journey to Healing</h2>
                        <p className="text-white/70 text-lg font-medium leading-relaxed">
                            A seamless process to consult with experts and get a diet plan tailored exactly to your body's needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[110px] left-[15%] right-[15%] h-[2px] bg-white/10" />

                        {[
                            { step: "01", icon: Search, title: "Choose Specialist", desc: "Browse our network of verified nutritionists and select the right fit." },
                            { step: "02", icon: Calendar, title: "Book a Session", desc: "Schedule a flexible online consultation at your convenience." },
                            { step: "03", icon: HeartPulse, title: "Get Your Plan", desc: "Receive your customized, organic diet plan and begin healing." }
                        ].map((s, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="size-24 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center mb-8 shadow-2xl group-hover:-translate-y-2 group-hover:bg-[#22aa4f]/20 transition-all duration-300">
                                    <s.icon size={32} className="text-[#22aa4f] mb-1" />
                                    <span className="text-xs font-black text-white/50">{s.step}</span>
                                </div>
                                <h4 className="text-2xl font-black mb-4">{s.title}</h4>
                                <p className="text-white/60 font-medium leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
