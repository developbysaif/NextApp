"use client";

import React from 'react';
import PageHeader from '../../component/PageHeader';

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-[#fdfdfd] font-sans scroll-mt-20">
            <PageHeader
                title="FAQs & support"
                description="24/7 Support — Effective Date: 1 January, 2026"
                backgroundImage="/header.jpg"
            />

            {/* Main Content */}
            <section className="max-w-5xl mx-auto px-4 py-12 text-[#21492f]">

                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-black mb-4 text-[#21492f]">Hello and welcome to IlajbilGhiza FAQs</h1>
                    <p className="text-gray-700 leading-relaxed text-base max-w-3xl">
                        At IlajbilGhiza, we believe that <span className="font-bold text-[#22aa4f]">ghiza hi asli shifa hai</span>. Our platform combines organic Pakistani foods, nutrition science, doctor expertise, and AI technology to help people improve health naturally.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-6">
                    {/* 01. What is IlajbilGhiza? */}
                    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                        <h2 className="text-lg md:text-xl font-black mb-3 flex items-center gap-2">
                            <span className="text-[#22aa4f]">01.</span> What is IlajbilGhiza?
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                            IlajbilGhiza is a health and nutrition platform based on the concept of treatment through organic food. We help users:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                            <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Identify the right foods</li>
                            <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Personalized daily diet plans</li>
                            <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Consult certified doctors</li>
                            <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Minimal medicine dependency</li>
                        </ul>
                    </div>

                    {/* 02. Is IlajbilGhiza a medical service? */}
                    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                        <h2 className="text-lg md:text-xl font-black mb-3 flex items-center gap-2">
                            <span className="text-[#22aa4f]">02.</span> Is IlajbilGhiza a medical service?
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                            No. IlajbilGhiza is a nutrition and preventive health platform. We do not replace doctors or emergency medical treatment.
                        </p>
                        <div className="bg-green-50/50 p-4 rounded-xl text-gray-700 text-sm border border-green-100">
                            <p className="font-bold mb-1">Our role is to:</p>
                            <ul className="list-disc list-inside space-y-0.5">
                                <li>Support healing through food</li>
                                <li>Improve lifestyle and nutrition</li>
                                <li>Assist recovery alongside medical advice</li>
                            </ul>
                        </div>
                    </div>

                    {/* 04. AI Diet Planner */}
                    <div className="bg-[#21492f] text-white p-6 rounded-2xl shadow-md border border-white/10">
                        <h2 className="text-lg md:text-xl font-black mb-3 flex items-center gap-2">
                            <span className="text-[#22aa4f]">03.</span> How does the AI diet planner work?
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed mb-4">
                            Our AI platform analyzes your profile to generate meal plans, quantities, and nutrients specifically for your health status.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-[10px] font-bold">
                            <div className="bg-white/10 p-2 rounded-lg border border-white/10">Meal plans</div>
                            <div className="bg-white/10 p-2 rounded-lg border border-white/10">Quantities</div>
                            <div className="bg-white/10 p-2 rounded-lg border border-white/10">Nutrients</div>
                            <div className="bg-white/10 p-2 rounded-lg border border-white/10">Progress</div>
                        </div>
                    </div>

                    {/* 05. Audiences */}
                    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                        <h2 className="text-lg md:text-xl font-black mb-3 flex items-center gap-2">
                            <span className="text-[#22aa4f]">04.</span> Who can use IlajbilGhiza?
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                            Absolutely everyone. We offer special diet plans for students, professionals, teachers, and homemakers.
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['Students', 'Teachers', 'Professionals', 'Homemakers'].map(tag => (
                                <div key={tag} className="px-3 py-2 bg-stone-50 rounded-lg text-center text-xs font-bold text-[#21492f] border border-stone-100">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-stone-100 text-center">
                    <p className="text-gray-400 text-sm mb-4">Still have questions? Our support team is here for you 24/7.</p>
                    <button className="bg-[#22aa4f] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#21492f] transition-all shadow-md">
                        Contact support
                    </button>
                </div>
            </section>
        </div>
        // </div >
    );
}
