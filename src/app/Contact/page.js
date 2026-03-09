"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import PageHeader from '../../component/PageHeader';
import Subscribe from '../../component/Subscribe';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        localStorage.setItem('contactFormData', JSON.stringify(formData));
        alert('Your message has been sent successfully and saved to local storage!');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="font-[Poppins] bg-[#FDFCF8] text-gray-800 selection:bg-[#22aa4f]/20">
            <PageHeader
                title="Contact Us"
                description="We'd love to hear from you! Reach out for any inquiries or support."
                backgroundImage="/header.jpg"
            />

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <span className="text-[#22aa4f] font-black uppercase tracking-widest text-xs mb-3 block">Get in Touch</span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#21492f] mb-6 leading-tight">
                                Let's Start a <br />
                                <span className="text-[#22aa4f]">Conversation</span>
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                Whether you have a question about our customized diet plans, organic products, or consultations, our team is ready to answer all your questions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-stone-100 flex items-center gap-6 group hover:border-[#22aa4f]/30 hover:shadow-xl transition-all">
                                <div className="size-14 rounded-2xl bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f] group-hover:scale-110 transition-transform">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-[#21492f] text-lg">Office Location</h4>
                                    <p className="text-gray-500 font-medium text-sm mt-1">Main Boulevard, Gulberg, Lahore, Pakistan</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-stone-100 flex items-center gap-6 group hover:border-[#22aa4f]/30 hover:shadow-xl transition-all">
                                <div className="size-14 rounded-2xl bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f] group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-[#21492f] text-lg">Direct Line</h4>
                                    <p className="text-gray-500 font-medium text-sm mt-1">+92 Support 24/7</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-stone-100 flex items-center gap-6 group hover:border-[#22aa4f]/30 hover:shadow-xl transition-all">
                                <div className="size-14 rounded-2xl bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f] group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-[#21492f] text-lg">Email Support</h4>
                                    <p className="text-gray-500 font-medium text-sm mt-1">info@ilajbilghiza.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links or additional info */}
                        <div className="bg-[#21492f] p-8 rounded-[32px] text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#22aa4f] rounded-full blur-[60px] opacity-40" />
                            <div className="relative z-10 flex items-center gap-6">
                                <Clock size={32} className="text-[#22aa4f] shrink-0" />
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                                    <p className="text-white/70 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                    <p className="text-white/70 text-sm">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(33,73,47,0.06)] border border-stone-100 relative">
                            <div className="absolute top-10 right-10 text-stone-100 opacity-50">
                                <MessageSquare size={120} />
                            </div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <h3 className="text-2xl font-black text-[#21492f] mb-8">Send us a message</h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            placeholder="e.g. Ali"
                                            className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            placeholder="e.g. Khan"
                                            className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="youremail@example.com"
                                        className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange('subject', e.target.value)}
                                        placeholder="How can we help?"
                                        className="w-full bg-stone-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Message</label>
                                    <textarea
                                        rows="5"
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        placeholder="Write your message here..."
                                        className="w-full bg-stone-50 border-2 border-transparent rounded-3xl px-6 py-5 focus:bg-white focus:border-[#22aa4f] outline-none transition-all font-bold text-sm resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#21492f] text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#22aa4f] transition-all shadow-xl shadow-green-900/20 group"
                                >
                                    Send Message
                                    <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder or Image */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="w-full h-[400px] rounded-[40px] overflow-hidden relative shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop"
                        alt="Contact Us Location"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#21492f]/80 to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white">
                        <h3 className="text-3xl font-black mb-2">Visit our HQ</h3>
                        <p className="font-medium text-white/80">Experience the organic revolution in person.</p>
                    </div>
                </div>
            </section>

            <Subscribe />
        </div>
    );
}
