"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ChevronRight, CheckCircle2, Stethoscope, Heart, Home, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
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
        if (typeof window !== 'undefined') {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            setDoctors(users.filter(u => u.role === "doctor" && u.isVerified));
        }
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
            <div className="min-h-screen bg-[#FDF9F1] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#214a32]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#214a32]/10 rounded-full blur-[100px]" />

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10 w-28 h-28 bg-[#1a3b2b]/10 rounded-full flex items-center justify-center text-[#1a3b2b] mb-8 shadow-2xl shadow-[#1a3b2b]/20">
                    <CheckCircle2 size={56} />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-serif font-black text-[#1a3b2b] mb-6 tracking-tight">Booking Confirmed!</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600 text-lg mb-10 max-w-md font-medium leading-relaxed">
                    Aap ki appointment request successfully receive ho gayi hai. Hamari support team confirmation ke liye jald raabta karegi.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    onClick={() => window.location.href = '/'}
                    className="bg-[#1a3b2b] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-gray-200 hover:-translate-y-1 hover:bg-[#214a32] transition-all flex items-center gap-3"
                >
                    Back to Home <ChevronRight size={18} />
                </motion.button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDF9F1] text-gray-800 antialiased font-[Poppins] selection:bg-[#214a32]/20 pb-32 relative">

            {/* Custom Banner */}
            <div className="px-4 md:px-8 pt-6">
                <div className="relative w-full h-[300px] md:h-[350px] bg-[#1a3b2b] rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col items-center justify-center shadow-lg">
                    {/* Background image overlap */}
                    <div className="absolute inset-2 md:inset-4 rounded-[32px] md:rounded-[48px] overflow-hidden">
                        <Image
                            src="/header.jpg"
                            alt="Banner Background Honey Organic"
                            fill
                            className="object-cover opacity-60 mix-blend-luminosity"
                        />
                        {/* Gradient overlay to make text readable */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3b2b]/90 via-[#1a3b2b]/60 to-[#1a3b2b]/30 mix-blend-multiply" />
                    </div>

                    <div className="relative z-10 text-center text-white mt-8">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#e1c58c] mb-4">Book Consultation</h1>
                        <p className="text-sm md:text-base text-stone-200 mb-8 max-w-lg mx-auto px-4 font-medium">
                            Expert doctors aur nutritionists se online ya physical mashwara hasil karein.
                        </p>

                        {/* Breadcrumbs */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs text-white/90">
                            <Home size={14} />
                            <span className="font-medium">Home</span>
                            <ChevronRight size={14} className="text-white/50" />
                            <span className="text-[#e1c58c] font-medium">Book Consultation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Side */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="mb-10">
                            <span className="text-[#1a3b2b] font-bold text-[11px] uppercase tracking-[0.2em] mb-4 block">
                                Medical Assistance
                            </span>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#1a3b2b] mb-6 leading-[1.1]">
                                Start Your <br />
                                Healing <span className="text-[#a8824b]">Journey</span>
                            </h2>
                            <p className="text-[#1a3b2b]/80 leading-relaxed font-medium text-sm md:text-base max-w-sm">
                                Hamare verified medical experts aap ki health aur nutrition requirements ko samajh kar aap ke liye behtareen organic hal pesh karte hain.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-8">
                            {/* Feature 1 */}
                            <div className="flex gap-5 items-center group">
                                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                                    <div className="absolute inset-0 bg-[#eef1f6] rounded-[24px]" style={{ borderRadius: '43% 57% 70% 30% / 30% 30% 70% 70%' }}></div>
                                    <div className="absolute inset-0 bg-[#3a5b7c]/10 rounded-[24px] scale-90 border border-[#3a5b7c]/20" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
                                    <Stethoscope size={24} className="relative z-10 text-[#3a5b7c]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1a3b2b] mb-1 text-lg">Verified Experts</h4>
                                    <p className="text-sm text-[#1a3b2b]/70 font-medium">Qualified doctors and nutritionists.</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex gap-5 items-center group">
                                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                                    <div className="absolute inset-0 bg-[#fff8eb] rounded-[24px]" style={{ borderRadius: '50% 50% 30% 70% / 50% 60% 40% 50%' }}></div>
                                    <div className="absolute inset-0 bg-[#cba465]/10 rounded-[24px] scale-90 border border-[#cba465]/20" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
                                    <Clock size={24} className="relative z-10 text-[#a8824b]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1a3b2b] mb-1 text-lg">Flexible Timing</h4>
                                    <p className="text-sm text-[#1a3b2b]/70 font-medium">Choose a time that suits you best.</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex gap-5 items-center group">
                                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                                    <div className="absolute inset-0 bg-[#fef2f2] rounded-[24px]" style={{ borderRadius: '60% 40% 70% 30% / 70% 30% 70% 40%' }}></div>
                                    <div className="absolute inset-0 bg-[#c45e5e]/10 rounded-[24px] scale-90 border border-[#c45e5e]/20" style={{ borderRadius: '40% 60% 30% 70% / 50% 60% 40% 50%' }}></div>
                                    <Heart size={24} className="relative z-10 text-[#c45e5e]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1a3b2b] mb-1 text-lg">Personalized Care</h4>
                                    <p className="text-sm text-[#1a3b2b]/70 font-medium">One-on-on consultation for better results.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-[0_20px_50px_rgba(26,59,43,0.06)] border border-[#1a3b2b]/5">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Row 1 */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a3b2b] ml-1">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                                <User size={18} />
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. Ali Khan"
                                                className="w-full bg-[#faf9f6]/30 border border-[#e0cca1] rounded-[20px] pl-12 pr-6 py-4 focus:outline-none focus:border-[#a8824b] focus:ring-1 focus:ring-[#a8824b] transition-all text-sm font-medium text-[#1a3b2b] placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a3b2b] ml-1">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                                <Phone size={18} />
                                            </div>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="03XX-XXXXXXX"
                                                className="w-full bg-[#faf9f6]/30 border border-[#e0cca1] rounded-[20px] pl-12 pr-6 py-4 focus:outline-none focus:border-[#a8824b] focus:ring-1 focus:ring-[#a8824b] transition-all text-sm font-medium text-[#1a3b2b] placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a3b2b] ml-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="youremail@example.com"
                                            className="w-full bg-[#faf9f6]/30 border border-[#e0cca1] rounded-[20px] pl-12 pr-6 py-4 focus:outline-none focus:border-[#a8824b] focus:ring-1 focus:ring-[#a8824b] transition-all text-sm font-medium text-[#1a3b2b] placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a3b2b] ml-1">Choose Doctor / Specialty</label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                                            <Stethoscope size={18} />
                                        </div>
                                        <select
                                            required
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-[#faf9f6]/80 border border-[#e0cca1] rounded-[20px] pl-12 pr-6 py-4 focus:outline-none focus:border-[#a8824b] focus:ring-1 focus:ring-[#a8824b] transition-all text-sm font-medium text-[#1a3b2b] appearance-none relative"
                                        >
                                            <option value="">Select Service / Doctor</option>
                                            <option value="General Consultation">General Consultation</option>
                                            <option value="Nutrition Specialist">Nutrition Specialist</option>
                                            <option value="Diabetes Specialist">Diabetes Specialist (Sugar)</option>
                                            {doctors.map(doc => (
                                                <option key={doc.id} value={doc.name}>Dr. {doc.name} ({doc.specialization})</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a3b2b] ml-1">Appointment Date</label>
                                        <div className="relative">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                                                <Calendar size={18} />
                                            </div>
                                            <input
                                                required
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full bg-[#faf9f6]/30 border border-[#e0cca1] rounded-[20px] pl-12 pr-6 py-4 focus:outline-none focus:border-[#a8824b] focus:ring-1 focus:ring-[#a8824b] transition-all text-sm font-medium text-[#1a3b2b]"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a3b2b] ml-1">Preferred Time</label>
                                        <div className="relative">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                                                <Clock size={18} />
                                            </div>
                                            <select
                                                required
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className="w-full bg-[#faf9f6]/30 border border-[#e0cca1] rounded-[20px] pl-12 pr-6 py-4 focus:outline-none focus:border-[#a8824b] focus:ring-1 focus:ring-[#a8824b] transition-all text-sm font-medium text-[#1a3b2b] appearance-none relative"
                                            >
                                                <option value="">Select Time</option>
                                                <option value="Morning">Morning (9 AM - 12 PM)</option>
                                                <option value="Afternoon">Afternoon (1 PM - 4 PM)</option>
                                                <option value="Evening">Evening (5 PM - 8 PM)</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1a3b2b] ml-1">Message / Medical History</label>
                                    <div className="relative border border-[#e0cca1] rounded-[24px] overflow-hidden bg-[#faf9f6]/30 focus-within:border-[#a8824b] focus-within:ring-1 focus-within:ring-[#a8824b] transition-all">
                                        <div className="absolute left-5 top-5 text-gray-400">
                                            <MessageSquare size={18} />
                                        </div>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Write your symptoms or questions here..."
                                            rows="4"
                                            className="w-full bg-transparent border-none pl-12 pr-6 py-5 focus:outline-none focus:ring-0 text-sm font-medium text-[#1a3b2b] placeholder:text-gray-400 resize-none"
                                        ></textarea>
                                        <div className="absolute bottom-3 right-4">
                                            <svg className="w-3 h-3 text-[#d6c7a9]" viewBox="0 0 10 10"><path d="M10 10H0V8h8V0h2v10z" fill="currentColor" /></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#173e28] to-[#1e5134] text-white py-4 md:py-5 rounded-full flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-[#1a3b2b]/20 transition-all font-bold tracking-widest text-xs mt-6 group"
                                >
                                    BOOK APPOINTMENT NOW
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Floating Profile Badge */}
                <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 z-20">
                    <div className="bg-white rounded-full p-2 pr-6 flex items-center gap-4 shadow-[0_10px_30px_rgba(26,59,43,0.12)] border border-[#e0cca1]/30 hover:scale-105 transition-transform cursor-pointer">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#e0cca1]/50">
                            <Image
                                src="/placeholder.png"
                                alt="Dr Ayesha"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute right-0 bottom-0 bg-[#214a32] text-white rounded-full p-0.5 shadow-sm border border-white z-10">
                                <CheckCircle2 size={10} strokeWidth={4} />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1a3b2b] flex items-center gap-1.5 leading-tight text-sm">
                                Dr. Ayesha <BadgeCheck size={16} className="text-[#214a32]" fill="#e6f5ea" />
                            </h4>
                            <p className="text-[10px] text-[#1a3b2b]/60 font-bold uppercase tracking-widest mt-0.5">Certified Nutritionist</p>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
