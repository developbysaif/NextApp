"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Star,
    Search,
    ChevronRight,
    Home,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Phone,
    Mail,
    MapPin,
    ArrowRight
} from 'lucide-react';

const doctorsData = [
    {
        name: "Dr. Zain Khan",
        role: "Medical Nutritionist",
        rating: "4.5 (0)",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
        tags: ["PCOS", "Type 2 Diabetes", "Gut Health"]
    },
    {
        name: "Dr. Ayesha Siddiqui",
        role: "Senior Dietitian",
        rating: "4.7 (8)",
        image: "https://images.unsplash.com/photo-1559839734-2b71f1536701?q=80&w=400&auto=format&fit=crop",
        tags: ["Thyroid", "Weight Management", "IBS"]
    },
    {
        name: "Dr. Hamza Raza",
        role: "Clinical Nutritionist",
        rating: "5.5 (0)",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
        tags: ["Fertility", "Hormonal Balance", "Pediatrics"]
    },
    {
        name: "Dr. Sara Ali",
        role: "Wellness Coach & Dietitian",
        rating: "4.5 (8)",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
        tags: ["Autoimmune", "Celiac", "Natural Healing"]
    },
    {
        name: "Dr. Osman Farooq",
        role: "Integrative Nutritionist",
        rating: "4.8 (5)",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
        tags: ["Stress Eating", "Cardio-Metabolic", "Functional Medicine"]
    },
    {
        name: "Dr. Maria Noor",
        role: "Certified Dietitian",
        rating: "4.5 (4)",
        image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=400&auto=format&fit=crop",
        tags: ["PCOS Management", "Pregnancy Nutrition", "Geriatrics"]
    },
    {
        name: "Dr. Khalid Mehmood",
        role: "Nutritional Therapist",
        rating: "4.5 (0)",
        image: "https://images.unsplash.com/photo-1582750433449-64c6fe57f927?q=80&w=400&auto=format&fit=crop",
        tags: ["Allergies", "Skin Conditions", "Energy Levels"]
    },
    {
        name: "Dr. Noreen Javed",
        role: "Specialized Nutritionist",
        rating: "4.5 (8)",
        image: "https://images.unsplash.com/photo-1638202993928-7267aad84c3e?q=80&w=400&auto=format&fit=crop",
        tags: ["Hashimoto's", "Gut Detox", "Diabetes Support"]
    },
    {
        name: "Dr. Bilal Ahmed",
        role: "Medical Dietitian",
        rating: "4.5 (8)",
        image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?q=80&w=400&auto=format&fit=crop",
        tags: ["Digestive Disorders", "Thyroid Health", "Holistic Care"]
    }
];

export default function SpecialDietPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch('/api/doctors');
                const result = await res.json();
                if (result.success) {
                    // Only show approved doctors if such field exists, or all for now
                    setDoctors(result.data || []);
                }
            } catch (err) {
                console.error("Failed to fetch doctors:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = (doctors.length > 0 ? doctors : doctorsData).filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.role || d.specialization || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.tags && d.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-sans">
            {/* Header / Hero Section */}
            <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#214a32]">
                    <img
                        src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2000&auto=format&fit=crop"
                        alt="Honeycomb background"
                        className="w-full h-full object-cover opacity-60"
                        onError={(e) => { e.target.src = '/header.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[2.5rem] md:text-5xl lg:text-6xl font-serif font-black mb-6 tracking-tight">
                            Specialized Diet Plans
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
                            Verified experts to personalized nutrition our health guidance hasil karein.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-white px-6 py-2.5 rounded-full text-[11px] font-black text-[#142A1D] shadow-xl uppercase tracking-widest">
                            <Link href="/" className="hover:text-[#214a32] transition-colors flex items-center gap-1.5 focus:outline-none">
                                <Home size={14} className="mb-0.5" /> Home
                            </Link>
                            <ChevronRight size={14} className="text-gray-300" />
                            <span className="text-gray-400">Specialized Diet Plans</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Verified Specialists Header Section */}
            <section className="max-w-[1400px] mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h2 className="text-[2.5rem] font-serif font-black text-[#214a32] mb-4">
                            Our Verified Specialists
                        </h2>
                        <p className="text-gray-500 font-bold text-lg">
                            Browse our network of certified nutritionists and select the right fit.
                        </p>
                    </div>

                    <div className="relative flex-1 max-w-md w-full">
                        <div className="flex items-center bg-white rounded-full shadow-[0_10px_40px_rgba(33,73,47,0.06)] border border-[#E8EEE9] p-1.5">
                            <Search className="text-gray-400 ml-4" size={20} />
                            <input
                                type="text"
                                placeholder="Search by doctor name or spec..."
                                className="w-full bg-transparent border-none px-4 py-2 focus:outline-none focus:ring-0 text-gray-700 font-bold text-sm placeholder:text-gray-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="bg-[#214a32] text-white px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#214a32] transition-all">
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid of Doctors */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {loading ? (
                        <div className="col-span-full py-20 flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#214a32]"></div>
                        </div>
                    ) : filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doc, idx) => (
                            <motion.div
                                key={doc._id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (idx % 3) * 0.1 }}
                                className="bg-white rounded-[32px] overflow-hidden border border-[#E8EEE9] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                                    <img
                                        src={doc.profilePhoto || doc.image || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop"}
                                        alt={doc.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        onError={(e) => { e.target.src = '/placeholder.png'; }}
                                    />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-black/5">
                                        <Star size={12} className="text-[#FBC02D] fill-[#FBC02D]" />
                                        <span className="text-[10px] font-black text-[#214a32]">{doc.rating || "4.5 (0)"}</span>
                                    </div>
                                </div>

                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-serif font-black text-[#214a32] mb-1 leading-tight group-hover:text-[#214a32] transition-colors">Dr. {doc.name}</h3>
                                    <p className="text-gray-500 font-bold text-[13px] mb-6">{doc.role || doc.specialization || "Clinical Nutritionist"}</p>

                                    <div className="flex flex-wrap justify-center gap-2 mb-8 h-12 overflow-hidden">
                                        {(doc.tags || ["Verified", "Specialist"]).map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="bg-[#214a32] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/book-appointment?doctor=${encodeURIComponent(doc.name)}`}
                                        className="block w-full bg-[#214a32] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-[#214a32]/20 hover:bg-[#214a32] hover:shadow-[#214a32]/30 transition-all active:scale-[0.98]"
                                    >
                                        Book Appointment
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                            <h3 className="text-xl font-black text-[#214a32] opacity-40 uppercase tracking-widest">No Specialists Found</h3>
                            <p className="text-sm font-bold text-gray-400 mt-2 italic">New registered specialists will appear here after approval.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* The Journey to Healing Section */}
            <section className="bg-[#142A1D] py-24 mt-20 text-center relative overflow-hidden">
                {/* Decorative bg element */}
                <div className="absolute bottom-0 right-0 opacity-10 translate-y-1/2 translate-x-1/4">
                    <div className="w-[600px] h-[600px] bg-[#214a32] rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-black text-white mb-6">
                            The Journey to <span className="text-[#CFD9C8]">Healing</span>
                        </h2>
                        <p className="text-white/70 text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                            A seamless process to consult with experts and get a diet plan tailored exactly to your body's needs.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Footer Section (Matching the image) */}
            <footer className="bg-[#F8FAF8] pt-24 pb-12 border-t border-gray-100">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
                        {/* Logo & About */}
                        <div className="lg:col-span-4">
                            <div className="flex items-center gap-2 mb-8 group cursor-pointer">
                                <div className="bg-[#214a32] p-2.5 rounded-2xl group-hover:rotate-12 transition-transform">
                                    <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                                    </div>
                                </div>
                                <span className="text-2xl font-serif font-black text-[#142A1D] tracking-tight">IlajbilGhiza</span>
                            </div>
                            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-10 max-w-sm">
                                Chics Go Bijl, Zipilogi Richter. Determinene analogouesed our the phrasoe plenives are overfitlate to higiedocomya the digneded metonul hotover Plaugila ao Giugle this doe.
                            </p>
                            <div className="flex gap-4">
                                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                    <Link key={i} href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#214a32] hover:text-white hover:border-[#214a32] transition-all">
                                        <Icon size={18} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links Group 1 */}
                        <div className="lg:col-span-2">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#214a32] mb-10">Medical Center</h4>
                            <ul className="space-y-4">
                                {["Organic Foods", "All Diet Plans", "Medical Portal", "Cardiologist Insights", "Health Blogs", "Contact Us"].map((link, i) => (
                                    <li key={i}>
                                        <Link href="#" className="text-gray-500 font-bold text-sm hover:text-[#214a32] transition-colors">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Support */}
                        <div className="lg:col-span-4">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#214a32] mb-10">Contact Support</h4>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="bg-[#214a32]/5 w-10 h-10 rounded-full flex items-center justify-center text-[#214a32] shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Medical Address</p>
                                        <p className="text-gray-500 font-bold text-sm leading-tight">Maki Besiooed, Gathorg, Calenn, Patrion</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-[#214a32]/5 w-10 h-10 rounded-full flex items-center justify-center text-[#214a32] shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Phone Number</p>
                                        <p className="text-[#214a32] font-black text-sm tracking-widest">+12 Support 1177</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-[#214a32]/5 w-10 h-10 rounded-full flex items-center justify-center text-[#214a32] shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Email Support</p>
                                        <p className="text-gray-500 font-bold text-sm">info@ilajbilghiza.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Star */}
                        <div className="lg:col-span-2 flex items-end justify-end opacity-20">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L14.4 9.6H22L15.8 14.1L18.2 21.7L12 17.2L5.8 21.7L8.2 14.1L2 9.6H9.6L12 2Z" fill="#142A1D" />
                            </svg>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            © 2024 IlajbilGhiza. All Rights Reserved.
                        </p>
                        <div className="flex gap-8">
                            {["Privacy Policy", "Terms of Service"].map((text, i) => (
                                <Link key={i} href="#" className="text-[10px] font-black text-[#214a32] uppercase tracking-widest hover:underline">
                                    {text}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
