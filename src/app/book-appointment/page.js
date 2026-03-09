"use client";

import React, { useState, useEffect } from 'react';
import PageHeader from '../../component/PageHeader';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ChevronRight, CheckCircle2, Stethoscope, Activity, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function BookAppointmentPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        setDoctors(users.filter(u => u.role === "doctor" && u.isVerified));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Appointment Booked:", formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22aa4f]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#22aa4f]/10 rounded-full blur-[100px]" />

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 w-28 h-28 bg-[#22aa4f]/10 rounded-full flex items-center justify-center text-[#22aa4f] mb-8 shadow-2xl shadow-[#22aa4f]/20">
                    <CheckCircle2 size={56} />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-[#21492f] mb-6 tracking-tight">Booking Confirmed!</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600 text-lg mb-10 max-w-md font-medium leading-relaxed">
                    Aap ki appointment request successfully receive ho gayi hai. Hamari support team confirmation ke liye jald raabta karegi.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    onClick={() => window.location.href = '/'}
                    className="bg-[#21492f] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-gray-200 hover:-translate-y-1 hover:bg-[#22aa4f] transition-all flex items-center gap-3"
                >
                    Back to Home <ChevronRight size={18} />
                </motion.button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-gray-800 antialiased font-[Poppins] selection:bg-[#22aa4f]/20">
            <PageHeader
                title="Book Consultation"
                description="Expert doctors aur nutritionists se online ya physical mashwara hasil karein."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

                    {/* Left Side: Info & Steps */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div className="mb-12">
                            <span className="inline-flex items-center gap-2 bg-[#22aa4f]/10 px-4 py-2 rounded-full text-[#22aa4f] font-bold text-xs uppercase tracking-widest mb-6">
                                <Activity size={16} /> Certified Network
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#21492f] mb-6 leading-tight tracking-tight">
                                Transform Your <br />
                                Health <span className="text-[#22aa4f]">Today.</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed font-medium text-lg">
                                By booking a consultation, you get direct access to our verified medical experts who understand your unique nutritional requirements.
                            </p>
                        </div>

                        {/* Image or Illustration */}
                        <div className="relative h-[400px] w-full rounded-[40px] overflow-hidden shadow-2xl mb-12 hidden lg:block">
                            <Image
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
                                alt="Doctor Consultation"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#21492f] to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <div className="flex gap-1 text-amber-400 mb-2">
                                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                                </div>
                                <p className="font-bold text-lg leading-tight mb-2">"The consultation completely changed my approach to food and healing."</p>
                                <p className="text-white/60 text-sm font-bold uppercase tracking-widest">- Verified Patient</p>
                            </div>
                        </div>

                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(33,73,47,0.08)] border border-stone-100 relative h-full">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#22aa4f]/5 rounded-[40px] border border-[#22aa4f]/10 translate-x-12 -translate-y-12 rotate-12"></div>

                            <div className="relative z-10 mb-10">
                                <h3 className="text-2xl font-black text-[#21492f]">Booking Form</h3>
                                <p className="text-gray-500 font-medium text-sm">Fill out the details below to schedule your appointment.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">

                                {/* Personal Info Section */}
                                <div>
                                    <h4 className="flex items-center gap-3 font-black text-[#21492f] mb-6 pb-2 border-b border-stone-100">
                                        <div className="size-8 rounded-full bg-stone-100 flex items-center justify-center text-gray-500"><User size={16} /></div> Personal Info
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] ml-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. Ali Khan"
                                                className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] ml-1">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="03XX-XXXXXXX"
                                                className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] ml-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="youremail@example.com"
                                                className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment Details Section */}
                                <div>
                                    <h4 className="flex items-center gap-3 font-black text-[#21492f] mb-6 pb-2 border-b border-stone-100">
                                        <div className="size-8 rounded-full bg-stone-100 flex items-center justify-center text-gray-500"><Calendar size={16} /></div> Consultation Details
                                    </h4>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] ml-1">Choose Doctor / Specialty</label>
                                            <select
                                                required
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            >
                                                <option value="">Select Service / Doctor</option>
                                                <option value="General Consultation">General Consultation</option>
                                                <option value="Nutrition Specialist">Nutrition Specialist</option>
                                                <option value="Diabetes Specialist">Diabetes Specialist (Sugar)</option>
                                                {doctors.map(doc => (
                                                    <option key={doc.id} value={doc.name}>Dr. {doc.name} ({doc.specialization})</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] ml-1">Appointment Date</label>
                                                <input
                                                    required
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] ml-1">Preferred Time</label>
                                                <select
                                                    required
                                                    name="time"
                                                    value={formData.time}
                                                    onChange={handleChange}
                                                    className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                                >
                                                    <option value="">Select Time Window</option>
                                                    <option value="Morning (9 AM - 12 PM)">Morning (9:00 - 12:00)</option>
                                                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (13:00 - 16:00)</option>
                                                    <option value="Evening (5 PM - 8 PM)">Evening (17:00 - 20:00)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Medical History Section */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#22aa4f] ml-1">Message / Current Symptoms</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your symptoms or questions here..."
                                        rows="4"
                                        className="w-full bg-stone-50 border-2 border-transparent rounded-3xl px-6 py-5 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#21492f] text-white py-6 rounded-2xl flex items-center justify-between px-8 hover:bg-[#22aa4f] transition-all shadow-xl shadow-green-900/10 group mt-8"
                                >
                                    <span className="font-black uppercase tracking-widest text-sm">Confirm Booking</span>
                                    <div className="size-10 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                        <ChevronRight size={20} />
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
