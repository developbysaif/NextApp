"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Search,
    ShieldCheck,
    Calendar,
    Award,
    ArrowUpRight,
    Stethoscope,
    Database,
    BookOpen,
    Check
} from "lucide-react";
import { motion } from "framer-motion";

export default function MedicalPortalPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/api/doctors');
                const result = await response.json();
                if (result.success) {
                    // Show verified doctors
                    setDoctors(result.data.filter(d => d.isVerified).slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doc =>
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#fcfdfa] font-[Poppins]">
            {/* Hero Section */}
            <section className="relative min-h-[600px] flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
                {/* Background Image with Dark Green Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1664447972887-9bc6403067cd?q=80&w=2070&auto=format&fit=crop"
                        alt="Medical Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#122A1A]/90 mix-blend-multiply" />
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                        <ShieldCheck size={14} className="text-green-400" /> Guided by Experts, Powered by Nature
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight uppercase leading-[0.9]">
                        NATURE MEETS <br /> <span className="text-white/90">SCIENCE</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/70 font-medium mb-12 max-w-3xl mx-auto leading-relaxed italic">
                        Why organic healing matters: Our experts combine research-based organic nutrition with ancient wisdom to provide treatments that actually work.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group mb-10">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40" size={24} />
                        <input
                            type="text"
                            placeholder="Find doctors by name or specialty..."
                            className="w-full bg-white/10 backdrop-blur-xl text-white rounded-full pl-16 pr-8 py-6 text-lg font-medium shadow-2xl border border-white/20 outline-none focus:bg-white/20 transition-all placeholder:text-white/40"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Become a Doctor Button */}
                    <Link href="/doctors/register" className="inline-flex items-center gap-3 bg-[#2ea354] text-white px-8 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#258a46] transition-all group shadow-xl shadow-green-900/40">
                        <Award size={20} />
                        Become a Verified Doctor
                    </Link>
                </div>
            </section>

            {/* Middle Section: Verified Professionals (Light Brown) */}
            <section className="bg-[#b89163] py-24 px-6 relative overflow-hidden">
                <div className="absolute top-10 right-10 opacity-20 hidden md:block">
                    <div className="grid grid-cols-5 gap-2">
                        {[...Array(25)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-black rounded-full" />
                        ))}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl font-black text-[#1c1c1c] uppercase tracking-tighter">Verified Professionals</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1c1c1c]/60 mt-2">Showing & Verified Experts</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="h-[400px] bg-white/20 rounded-3xl animate-pulse" />
                            ))
                        ) : (
                            filteredProducts().map((doc, idx) => (
                                <motion.div
                                    key={doc.id || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-[#dcc0a1] rounded-[2rem] p-4 group hover:bg-[#e6d0b7] transition-all duration-500 shadow-xl overflow-hidden"
                                >
                                    <div className="bg-white rounded-[1.5rem] overflow-hidden aspect-[4/5] relative mb-6">
                                        <img
                                            src={doc.image || "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop"}
                                            alt={doc.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>

                                    <div className="text-center px-4 pb-6">
                                        <h3 className="text-xl font-black text-[#202020] uppercase tracking-tighter mb-1">{doc.name}</h3>
                                        <p className="text-xs font-bold text-[#202020]/60 uppercase tracking-widest mb-6">{doc.specialty || "Nutrition Specialist"}</p>

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-[#202020] uppercase">
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white">
                                                    <Check size={12} strokeWidth={4} />
                                                </div>
                                                Verified
                                            </div>
                                            <Link
                                                href={`/book-appointment?doctor=${doc.id}`}
                                                className="flex items-center gap-2 text-[10px] font-black text-white bg-[#1c1c1c] px-4 py-2.5 rounded-full hover:bg-black transition-all"
                                            >
                                                <Calendar size={12} />
                                                Book Appointment
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Our Pillars of Care Section */}
                    <div className="mt-32 text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1c1c1c] uppercase tracking-tighter mb-20">Our Pillars of Care</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                            {/* Dividers */}
                            <div className="hidden md:block absolute top-1/2 left-1/3 w-[1px] h-32 bg-black/10 -translate-y-1/2" />
                            <div className="hidden md:block absolute top-1/2 left-2/3 w-[1px] h-32 bg-black/10 -translate-y-1/2" />

                            <div className="flex flex-col items-center group">
                                <div className="w-20 h-20 mb-8 relative">
                                    <Stethoscope size={64} strokeWidth={1} className="text-[#1c1c1c] group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-[#1c1c1c] uppercase tracking-tighter mb-4 leading-none">
                                    Evidence-Based <br /> Organic Nutrition
                                </h3>
                                <p className="text-sm font-medium text-[#1c1c1c]/60 max-w-[200px]">
                                    Evidence-based evidence based organic nutrition.
                                </p>
                            </div>

                            <div className="flex flex-col items-center group">
                                <div className="w-20 h-20 mb-8 relative">
                                    <Database size={64} strokeWidth={1} className="text-[#1c1c1c] group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-[#1c1c1c] uppercase tracking-tighter mb-4 leading-none">
                                    Scientific Research <br /> Database
                                </h3>
                                <p className="text-sm font-medium text-[#1c1c1c]/60 max-w-[200px]">
                                    Scientific research database, and trained professionals.
                                </p>
                            </div>

                            <div className="flex flex-col items-center group">
                                <div className="w-20 h-20 mb-8 relative">
                                    <BookOpen size={64} strokeWidth={1} className="text-[#1c1c1c] group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-[#1c1c1c] uppercase tracking-tighter mb-4 leading-none">
                                    Ancient Wisdom, <br /> Modern Applications
                                </h3>
                                <p className="text-sm font-medium text-[#1c1c1c]/60 max-w-[200px]">
                                    Ancient wisdom, modern applications in our services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-20 left-10 rotate-45 opacity-20">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </div>
            </section>
        </div>
    );

    // Helper to filter and return sliced doctors
    function filteredProducts() {
        if (doctors.length === 0) {
            // Fallback mock data if API is empty
            return [
                { name: "Dr. Ayesha Khan", specialty: "Cardiology Nutritionist", image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop" },
                { name: "Dr. Ayesha Khan", specialty: "Cardiology Nutritionist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop" },
                { name: "Dr. Doctor Khan", specialty: "Cardiology Nutritionist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" },
            ];
        }
        return doctors;
    }
}
