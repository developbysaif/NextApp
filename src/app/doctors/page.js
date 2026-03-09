"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Search,
    ShieldCheck,
    Stethoscope,
    ChevronRight,
    Heart,
    ArrowUpRight,
    Award,
    Clock,
    User,
    Calendar
} from "lucide-react";

export default function VerifiedDoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        // Only show verified doctors
        setDoctors(users.filter(u => u.role === "doctor" && u.isVerified));
    }, []);

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#fcfdfa] pb-20">
            {/* Hero Section */}
            <section className="bg-slate-900 py-24 px-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 size-64 bg-blue-500 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 size-96 bg-green-500 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/30 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Award size={14} /> Guided by Experts, Powered by Nature
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-tight font-outfit">
                        NATURE MEETS <span className="text-blue-500">SCIENCE</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed italic">
                        Why organic healing matters: Our experts combine research-based organic nutrition with ancient wisdom to provide treatments that actually work.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group mb-6">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Find doctors by name or specialty..."
                            className="w-full bg-slate-800 text-white rounded-[2.5rem] pl-16 pr-8 py-6 text-lg font-bold shadow-2xl focus:ring-8 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-500 border border-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Doctor Registration CTA */}
                    <div className="text-center">
                        <Link href="/signup?role=doctor" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-green-500 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all group">
                            <ShieldCheck size={24} className="group-hover:rotate-12 transition-transform" />
                            Become a Verified Doctor
                            <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                        <p className="text-xs text-slate-500 mt-4 font-bold">Join our network of verified medical professionals</p>
                    </div>
                </div>
            </section>

            {/* Doctor Cards Listing */}
            <div className="max-w-7xl mx-auto px-6 mt-20">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Verified Professionals</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Showing {filteredDoctors.length} verified experts</p>
                    </div>
                </div>

                {filteredDoctors.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                        <User size={64} className="mx-auto text-slate-200 mb-6" strokeWidth={1} />
                        <h3 className="text-xl font-black text-slate-900 uppercase">No verified doctors found</h3>
                        <p className="text-slate-400 font-bold mt-2">Check back later as we continue to verify our experts.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredDoctors.map((doc) => (
                            <DoctorCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function DoctorCard({ doc }) {
    return (
        <div className="group relative">
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] translate-y-4 translate-x-4 opacity-0 group-hover:opacity-10 transition-all duration-500" />

            <article className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Profile Photo */}
                    <div className="size-32 md:size-40 rounded-[2.5rem] bg-blue-50 border-8 border-white shadow-xl mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                        {doc.profilePhoto ? (
                            <img src={doc.profilePhoto} alt={doc.name} className="size-full object-cover" />
                        ) : (
                            <div className="size-full flex items-center justify-center text-4xl text-blue-600 font-black tracking-tighter bg-blue-100">
                                {doc.name.charAt(0)}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-2xl border-2 border-white shadow-sm">
                            <ShieldCheck size={16} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2 leading-tight">
                        {doc.name}
                    </h2>

                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                        {doc.specialization || "General Expert"}
                    </p>

                    <div className="w-full grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <Clock size={16} className="text-slate-400 mx-auto mb-2" />
                            <p className="text-[10px] font-black uppercase text-slate-400">Experience</p>
                            <p className="text-xs font-black text-slate-900">{doc.experience || '10+'} Yrs</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <Award size={16} className="text-slate-400 mx-auto mb-2" />
                            <p className="text-[10px] font-black uppercase text-slate-400">Badge</p>
                            <p className="text-[9px] font-black text-green-600">VERIFIED</p>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3">
                        <Link
                            href={`/doctors/${doc.id}`}
                            className="w-full bg-slate-100 text-slate-900 rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-slate-200 transition-all font-outfit"
                        >
                            Profile <ArrowUpRight size={14} />
                        </Link>
                        <Link
                            href={`/book-appointment?doctor=${doc.id}`}
                            className="w-full bg-[#22aa4f] text-white rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#21492f] transition-all shadow-xl shadow-green-200 font-outfit"
                        >
                            Appointment <Calendar size={14} />
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
