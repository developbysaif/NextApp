"use client";

import React, { useState } from 'react';
import PageHeader from '../../component/PageHeader';
import Image from 'next/image';
import { Leaf, Send } from 'lucide-react';

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
        alert('Your message has been sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="font-sans bg-[#F4F4EB] text-[#223B2A] selection:bg-[#22aa4f]/20 min-h-screen">
            <PageHeader
                title="Contact Us"
                titleClassName="font-serif font-medium text-white"
                breadcrumbClassName="bg-[#2A231C]/60 text-[#EAE5D9] backdrop-blur-md border border-white/10 shadow-none font-medium"
                description="We'd love to hear from you!"
                backgroundImage="/header.jpg"
            />

            <section className="max-w-[1000px] mx-auto px-6 py-20 pb-16">
                {/* Form Section */}
                <div className="mb-24">
                    <p className="font-serif text-[1.3rem] text-[#2A3F31] mb-12">
                        Please complete the form below:
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                            {/* First Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    placeholder="First Name"
                                    className="w-full bg-transparent border-b-[1.5px] border-[#2A3F31] px-0 py-2 focus:outline-none focus:border-[#429560] font-serif text-[15px] text-[#2A3F31] placeholder:text-[#2A3F31] transition-colors"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    placeholder="Last Name"
                                    className="w-full bg-transparent border-b-[1.5px] border-[#2A3F31] px-0 py-2 focus:outline-none focus:border-[#429560] font-serif text-[15px] text-[#2A3F31] placeholder:text-[#2A3F31] transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="relative">
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b-[1.5px] border-[#2A3F31] px-0 py-2 focus:outline-none focus:border-[#429560] font-serif text-[15px] text-[#2A3F31] placeholder:text-[#2A3F31] transition-colors"
                                required
                            />
                        </div>

                        {/* Subject */}
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                placeholder="Subject"
                                className="w-full bg-transparent border-b-[1.5px] border-[#2A3F31] px-0 py-2 focus:outline-none focus:border-[#429560] font-serif text-[15px] text-[#2A3F31] placeholder:text-[#2A3F31] transition-colors"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="relative">
                            <textarea
                                rows="3"
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                placeholder="Message"
                                className="w-full bg-transparent border-b-[1.5px] border-[#2A3F31] px-0 py-2 focus:outline-none focus:border-[#429560] font-serif text-[15px] text-[#2A3F31] placeholder:text-[#2A3F31] resize-none transition-colors"
                                required
                            ></textarea>
                            {/* Little drag indicator hint at bottom right of textarea */}
                            <div className="absolute bottom-1 right-0 opacity-40 pointer-events-none">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L1 9" stroke="#2A3F31" strokeWidth="0.8" />
                                    <path d="M9 5L5 9" stroke="#2A3F31" strokeWidth="0.8" />
                                </svg>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="bg-[#121E15] text-[#A5C3A5] px-10 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#348956] hover:text-white transition-all shadow-lg hover:-translate-y-0.5"
                            >
                                SEND MESSAGE
                            </button>
                        </div>
                    </form>
                </div>

                {/* Custom Newsletter Section for Contact Page */}
                <div className="relative bg-[#EBEDE3] rounded-[40px] md:rounded-[60px] p-8 md:p-14 lg:p-[4.5rem] overflow-hidden border border-[#2B4031] flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] group">

                    {/* Floating Mint Image right side exactly like screenshot */}
                    <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 pointer-events-none z-10">
                        <Image
                            src="/Mint.png"
                            alt="Mint Leaves"
                            fill
                            className="object-contain object-top-right transform translate-x-12 -translate-y-6 md:translate-x-16 md:-translate-y-8 opacity-90 scale-110 drop-shadow-xl saturate-110 contrast-125"
                        />
                    </div>

                    <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#121E15] text-[#A5C3A5] px-5 py-2 rounded-full text-xs font-bold tracking-wider mb-8 shadow-sm">
                            <Leaf size={14} className="text-[#A5C3A5]" />
                            <span className="mb-[1px]">IlajBiGhiza Family</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif font-bold text-[#121E15] leading-tight mb-5 tracking-tight">
                            Aapki Sehat, <span className="text-[#3B925D]">Hamara Junoon</span>
                        </h2>

                        {/* Description */}
                        <p className="text-[#314336] text-[15px] md:text-[17px] font-medium mb-12 max-w-lg mx-auto leading-relaxed">
                            Join 10,000+ families who chose life over disease. Get weekly healing tips delivered with love.
                        </p>

                        {/* Email Input & Button Container */}
                        <div className="w-full max-w-xl mx-auto bg-[#131A15] p-2 rounded-full flex flex-col sm:flex-row items-stretch shadow-2xl relative mb-6">

                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-transparent px-6 py-4 sm:py-2 text-[#EAE5D9] placeholder:text-[#A7BAA7]/60 focus:outline-none text-[15px] font-medium w-full"
                            />

                            <button className="bg-[#1C5938] text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2A754B] transition-colors shadow-inner flex-shrink-0 mt-2 sm:mt-0">
                                Join Family
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 ml-1">
                                    <circle cx="12" cy="12" r="4"></circle>
                                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Footer Subtext */}
                        <p className="text-[#314336] text-[10px] font-bold uppercase tracking-[0.15em]">
                            Join 10,000+ health conscious people in pakistan
                        </p>

                    </div>
                </div>
            </section>
        </div>
    );
}
