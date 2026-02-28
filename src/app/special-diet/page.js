"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Stethoscope,
    CheckCircle2,
    Star,
    Calendar,
    ArrowRight,
    Clock,
    Award,
    ShieldCheck,
    Search
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
        <div className="min-h-screen bg-[#FDFCF8] font-sans scroll-mt-20">
            <PageHeader
                title="Specialized diet plans"
                description="Verified experts se personalized nutrition aur health guidance hasil karein."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-5xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="max-w-xl">
                        <span className="text-[#22aa4f] font-bold text-xs mb-3 block">Medical network</span>
                        <h2 className="text-2xl md:text-4xl font-black text-[#21492f] mb-4 leading-tight">
                            Consult with our <span className="text-[#22aa4f]">verified specialists</span>
                        </h2>
                        <p className="text-gray-500 text-base font-medium leading-relaxed">
                            Aap ki sehat hamari awaleen tarjih hai. Hamare platform par maujood tamam doctors verified hain aur aap ko behtareen organic health solutions faraham karte hain.
                        </p>
                    </div>

                    <div className="w-full md:w-80 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-sm border border-stone-100 focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white rounded-2xl animate-pulse border border-gray-100"></div>
                        ))}
                    </div>
                ) : filteredDoctors.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doc, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative size-16 shrink-0 rounded-2xl overflow-hidden bg-stone-50 border-2 border-white shadow-sm">
                                        {doc.profilePhoto ? (
                                            <Image src={doc.profilePhoto} alt={doc.name} fill className="object-cover" />
                                        ) : (
                                            <div className="size-full flex items-center justify-center bg-[#21492f] text-white text-xl font-black">
                                                {doc.name?.charAt(0)}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0.5 right-0.5 bg-green-500 text-white rounded-full p-0.5 border border-white">
                                            <ShieldCheck size={10} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-[#21492f] mb-0.5 tracking-tight">Dr. {doc.name}</h3>
                                        <p className="text-[#22aa4f] text-[10px] font-bold tracking-widest mb-1">{doc.specialization || 'Clinical nutritionist'}</p>
                                        <div className="flex items-center gap-0.5 text-amber-500">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                            <span className="text-gray-400 text-[10px] font-bold ml-1">(4.9)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                        <Award size={14} className="text-[#a6763f]" />
                                        <span>Verified expert professional</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                        <Clock size={14} className="text-[#22aa4f]" />
                                        <span>Mon - Sat (9am-5pm)</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/book-appointment?doctor=${encodeURIComponent(doc.name)}`}
                                    className="w-full bg-[#21492f] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#22aa4f] transition-all"
                                >
                                    Book consultation
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-3xl border border-stone-100 shadow-sm">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Stethoscope size={32} className="text-stone-200" />
                        </div>
                        <h3 className="text-xl font-black text-[#21492f] mb-2">No verified doctors found</h3>
                        <p className="text-gray-400 font-medium text-sm">Behtareen results ke liye koshish karein ke doctors admin se verify hon.</p>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="mt-6 text-[#22aa4f] font-bold text-xs underline"
                        >
                            Reset search
                        </button>
                    </div>
                )}
            </section>

            {/* How it works simple section */}
            <section className="bg-[#21492f] py-16 px-4 text-center text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-black mb-6 leading-tight">Start your special diet plan today</h2>
                    <p className="text-white/70 text-base mb-10 leading-relaxed max-w-2xl mx-auto">
                        Hamare verified doctors aap ki medical state ko analyze kar ke aap ko ek muhammad aur scientific diet plan faraham karte hain jo aap ki recovery mein tezi lata hai.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: "01", title: "Choose doctor", desc: "List se apna pasandida specialist muntakhib karein." },
                            { step: "02", title: "Book session", desc: "Apne flexible time ke mutabiq appointment book karein." },
                            { step: "03", title: "Get plan", desc: "Expert se mashwara kar ke apna diet plan hasil karein." }
                        ].map((s, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white/10 border border-white/10">
                                <div className="text-4xl font-black text-[#22aa4f]/50 mb-4">{s.step}</div>
                                <h4 className="text-lg font-black mb-3">{s.title}</h4>
                                <p className="text-white/60 text-xs font-medium">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
