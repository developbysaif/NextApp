"use client";

import React, { useState, useEffect } from 'react';
import PageHeader from '../../component/PageHeader';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ChevronRight, CheckCircle2, Stethoscope, Heart } from 'lucide-react';

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
        // Here you would typically send data to an API
        console.log("Appointment Booked:", formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#fdfdfd] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-[#22aa4f] mb-8 animate-bounce">
                    <CheckCircle2 size={48} />
                </div>
                <h1 className="text-4xl font-black text-[#21492f] mb-4">Mubarak Ho!</h1>
                <p className="text-gray-600 text-lg mb-8 max-w-md">
                    Aap ki appointment request received ho gayi hai. Hamari team jald hi aap se raabta karegi.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-[#22aa4f] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-green-200 hover:-translate-y-1 transition-all"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="text-gray-800 antialiased font-[Poppins] bg-[#fdfdfd]">
            <PageHeader
                title="Book Consultation"
                description="Expert doctors aur nutritionists se online ya physical mashwara hasil karein."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Left Side: Info */}
                    <div className="lg:col-span-5">
                        <span className="text-[#22aa4f] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Medical Assistance</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#21492f] mb-8 leading-tight">
                            Start Your <br />
                            <span className="text-[#22aa4f]">Healing Journey</span>
                        </h2>
                        <p className="text-gray-600 mb-10 leading-relaxed font-medium">
                            Hamare verified medical experts aap ki health aur nutrition requirements ko samajh kar aap ke liye behtareen organic hal pesh karte hain.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: "Verified Experts", desc: "Qualified doctors and nutritionists.", icon: Stethoscope, color: "bg-blue-50 text-blue-600" },
                                { title: "Flexible Timing", desc: "Choose a time that suits you best.", icon: Clock, color: "bg-amber-50 text-[#a6763f]" },
                                { title: "Personalized Care", desc: "One-on-on consultation for better results.", icon: Heart, color: "bg-red-50 text-red-600" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 p-4 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all border border-transparent">
                                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}>
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#21492f] mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. Ali Khan"
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-12 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="03XX-XXXXXXX"
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-12 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="youremail@example.com"
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-12 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Choose Doctor / Specialty</label>
                                    <div className="relative group">
                                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                        <select
                                            required
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-12 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm appearance-none"
                                        >
                                            <option value="">Select Service</option>
                                            <option value="General Consultation">General Consultation</option>
                                            <option value="Nutrition Specialist">Nutrition Specialist</option>
                                            <option value="Diabetes Specialist">Diabetes Specialist (Sugar)</option>
                                            <option value="Heart Specialist">Heart Specialist</option>
                                            {doctors.map(doc => (
                                                <option key={doc.id} value={doc.name}>Dr. {doc.name} ({doc.specialization})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Appointment Date</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                            <input
                                                required
                                                type="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-12 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Preferred Time</label>
                                        <div className="relative group">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                            <select
                                                required
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-12 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm appearance-none"
                                            >
                                                <option value="">Select Time</option>
                                                <option value="Morning (9 AM - 12 PM)">Morning (9:00 - 12:00)</option>
                                                <option value="Afternoon (1 PM - 4 PM)">Afternoon (13:00 - 16:00)</option>
                                                <option value="Evening (5 PM - 8 PM)">Evening (17:00 - 20:00)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Message / Medical History</label>
                                    <div className="relative group">
                                        <MessageSquare className="absolute left-4 top-6 text-gray-400 group-focus-within:text-[#22aa4f] transition-colors" size={18} />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Write your symptoms or questions here..."
                                            rows="4"
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-3xl px-12 py-5 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#21492f] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#22aa4f] transition-all shadow-xl shadow-gray-200 group/submit"
                                >
                                    Book Appointment Now
                                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
