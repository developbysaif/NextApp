"use client";

import React from 'react';
import PageHeader from '../../components/PageHeader';
import { Briefcase, Key, ShoppingCart, MessageCircle, Lock, Mail } from 'lucide-react';

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-[#DFE5D9] font-sans text-gray-800 relative overflow-hidden">
            {/* Background Pattern - subtle leaf backdrop */}
            <div
                className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20c15 0 25 10 25 25s-10 25-25 25 c-15 0-25-10-25-25s10-25 25-25z' fill='none' stroke='%23B2C3A0' stroke-width='2'/%3E%3Cpath d='M50 40c20 0 35 15 35 35s-15 35-35 35 c-20 0-35-15-35-35s15-35 35-35z' fill='none' stroke='%23B2C3A0' stroke-width='2'/%3E%3C/svg%3E")`,
                    backgroundSize: '160px'
                }}
            ></div>

            <PageHeader
                title="Terms of Service"
                titleClassName="font-serif text-[#C4A972] font-normal"
                breadcrumbClassName="text-[#EADBB8] bg-[#A1795E] border-none shadow-none font-medium"
                description="Please read these terms and conditions carefully before using our service."
                backgroundImage="/header.jpg"
            />

            <section className="relative z-10 py-16 md:py-24 px-4 sm:px-8 lg:px-12 flex justify-center w-full">

                {/* Main Beige Container */}
                <div className="bg-[#F8F6EF] rounded-[24px] md:rounded-[40px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] w-full max-w-[54rem] p-8 sm:p-12 md:p-16 relative text-gray-800 border border-white/60">

                    {/* Header */}
                    <div className="mb-14">
                        <h1 className="text-3xl md:text-[44px] font-serif text-[#465431] font-bold mb-3 md:mb-5 tracking-tight leading-tight">Terms and Conditions</h1>
                        <p className="text-gray-600 mb-8 font-medium">Last Updated: January 2026</p>

                        <p className="text-gray-800 leading-relaxed mb-6">
                            Welcome to <strong className="text-[#3B4D30] font-bold">IlajBilGhiza</strong>. By accessing our website, using our AI Diet Planner, or purchasing our organic products, you agree to be bound by these Terms of Service.
                        </p>
                        <p className="text-gray-800 leading-relaxed">
                            If you do not agree with any part of these terms, please do not use our service.
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-16">

                        {/* 01 */}
                        <div className="relative">
                            <div className="absolute -left-8 sm:-left-12 md:-left-16 top-0 hidden md:flex h-16 w-16 md:h-20 md:w-20 bg-[#283E2D] rounded-full items-center justify-center ring-[6px] md:ring-[8px] ring-[#B7CCA6]/40 shadow-lg  transform -translate-x-1/2">
                                <Briefcase className="text-[#E7E2C3] w-7 h-7 md:w-9 md:h-9 outline-none" strokeWidth={1.5} />
                            </div>
                            <div className="md:pl-6 lg:pl-10">
                                <h2 className="text-2xl md:text-[28px] font-serif font-bold text-[#455431] mb-5 md:mb-6 flex items-center md:block">
                                    <span className="md:hidden flex h-10 w-10 bg-[#283E2D] rounded-full items-center justify-center mr-4 shrink-0 ring-4 ring-[#B7CCA6]/40 transform">
                                        <Briefcase className="text-[#E7E2C3] w-5 h-5" />
                                    </span>
                                    01. Medical Disclaimer
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                                    IlajBilGhiza is a platform for nutritional guidance and organic food. Content provided by our AI, blogs, or product descriptions is for informational purposes only.
                                </p>
                                <div className="bg-[#EFECE0] p-6 md:p-8 rounded-[20px] shadow-sm text-gray-700 border border-white/50">
                                    <ul className="list-disc list-inside space-y-3 marker:text-[#214a32]">
                                        <li className="leading-relaxed font-medium">We do not provide medical diagnosis or treatment.</li>
                                        <li className="leading-relaxed font-medium">Always consult a qualified healthcare provider for any medical condition.</li>
                                        <li className="leading-relaxed font-medium">Do not disregard professional medical advice because of something you have read on this site.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 02 */}
                        <div className="relative">
                            <div className="absolute -left-8 sm:-left-12 md:-left-16 top-0 hidden md:flex h-16 w-16 md:h-20 md:w-20 bg-[#283E2D] rounded-full items-center justify-center ring-[6px] md:ring-[8px] ring-[#B7CCA6]/40 shadow-lg transform -translate-x-1/2">
                                <Key className="text-[#E7E2C3] w-7 h-7 md:w-9 md:h-9 outline-none" strokeWidth={1.5} />
                            </div>
                            <div className="md:pl-6 lg:pl-10">
                                <h2 className="text-2xl md:text-[28px] font-serif font-bold text-[#455431] mb-5 md:mb-6 flex items-center md:block">
                                    <span className="md:hidden flex h-10 w-10 bg-[#283E2D] rounded-full items-center justify-center mr-4 shrink-0 ring-4 ring-[#B7CCA6]/40">
                                        <Key className="text-[#E7E2C3] w-5 h-5" />
                                    </span>
                                    02. Account Registration
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-5 font-medium">
                                    To use certain features like the AI Diet Planner or to place an order, you may be required to register an account. You agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-3 text-gray-700 marker:text-[#214a32]">
                                    <li className="leading-relaxed font-medium">Provide accurate and current information.</li>
                                    <li className="leading-relaxed font-medium">Maintain the security of your password.</li>
                                    <li className="leading-relaxed font-medium">Accept responsibility for all activities that occur under your account.</li>
                                </ul>
                            </div>
                        </div>

                        {/* 03 */}
                        <div className="relative">
                            <div className="absolute -left-8 sm:-left-12 md:-left-16 top-0 hidden md:flex h-16 w-16 md:h-20 md:w-20 bg-[#283E2D] rounded-full items-center justify-center ring-[6px] md:ring-[8px] ring-[#B7CCA6]/40 shadow-lg transform -translate-x-1/2">
                                <ShoppingCart className="text-[#E7E2C3] w-7 h-7 md:w-9 md:h-9 outline-none" strokeWidth={1.5} />
                            </div>
                            <div className="md:pl-6 lg:pl-10">
                                <h2 className="text-2xl md:text-[28px] font-serif font-bold text-[#455431] mb-5 md:mb-6 flex items-center md:block">
                                    <span className="md:hidden flex h-10 w-10 bg-[#283E2D] rounded-full items-center justify-center mr-4 shrink-0 ring-4 ring-[#B7CCA6]/40">
                                        <ShoppingCart className="text-[#E7E2C3] w-5 h-5" />
                                    </span>
                                    03. Product Purchases & Returns
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        <strong className="text-black font-semibold font-serif text-[1.1rem] tracking-tight">Availability:</strong>  All organic products are subject to seasonal availability. We reserve the right to discontinue any product at any time.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        <strong className="text-black font-semibold font-serif text-[1.1rem] tracking-tight">Pricing:</strong> Prices are subject to change without notice. We strive for accuracy but are not liable for pricing errors.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        <strong className="text-black font-semibold font-serif text-[1.1rem] tracking-tight">Returns:</strong> Due to the perishable nature of organic foods, we only accept returns if the product is damaged or spoiled upon delivery. Claims must be made within 24 hours of receipt.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 04 */}
                        <div className="relative">
                            <div className="absolute -left-8 sm:-left-12 md:-left-16 top-0 hidden md:flex h-16 w-16 md:h-20 md:w-20 bg-[#283E2D] rounded-full items-center justify-center ring-[6px] md:ring-[8px] ring-[#B7CCA6]/40 shadow-lg transform -translate-x-1/2">
                                <MessageCircle className="text-[#E7E2C3] w-7 h-7 md:w-9 md:h-9 outline-none" strokeWidth={1.5} />
                            </div>
                            <div className="md:pl-6 lg:pl-10">
                                <h2 className="text-2xl md:text-[28px] font-serif font-bold text-[#455431] mb-5 md:mb-6 flex items-center md:block">
                                    <span className="md:hidden flex h-10 w-10 bg-[#283E2D] rounded-full items-center justify-center mr-4 shrink-0 ring-4 ring-[#B7CCA6]/40">
                                        <MessageCircle className="text-[#E7E2C3] w-5 h-5" />
                                    </span>
                                    04. User Content
                                </h2>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    You retain ownership of any reviews or comments you post. However, by posting, you grant IlajBilGhiza a non-exclusive license to use, reproduce, and display such content.
                                </p>
                            </div>
                        </div>

                        {/* 05 */}
                        <div className="relative">
                            <div className="absolute -left-8 sm:-left-12 md:-left-16 top-0 hidden md:flex h-16 w-16 md:h-20 md:w-20 bg-[#283E2D] rounded-full items-center justify-center ring-[6px] md:ring-[8px] ring-[#B7CCA6]/40 shadow-lg transform -translate-x-1/2">
                                <Lock className="text-[#E7E2C3] w-7 h-7 md:w-9 md:h-9 outline-none" strokeWidth={1.5} />
                            </div>
                            <div className="md:pl-6 lg:pl-10">
                                <h2 className="text-2xl md:text-[28px] font-serif font-bold text-[#455431] mb-5 md:mb-6 flex items-center md:block">
                                    <span className="md:hidden flex h-10 w-10 bg-[#283E2D] rounded-full items-center justify-center mr-4 shrink-0 ring-4 ring-[#B7CCA6]/40">
                                        <Lock className="text-[#E7E2C3] w-5 h-5" />
                                    </span>
                                    05. Limitation of Liability
                                </h2>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    IlajBilGhiza shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our service or products.
                                </p>
                            </div>
                        </div>

                        {/* 06 */}
                        <div className="relative">
                            <div className="absolute -left-8 sm:-left-12 md:-left-16 top-0 hidden md:flex h-16 w-16 md:h-20 md:w-20 bg-[#283E2D] rounded-full items-center justify-center ring-[6px] md:ring-[8px] ring-[#B7CCA6]/40 shadow-lg transform -translate-x-1/2">
                                <Mail className="text-[#E7E2C3] w-7 h-7 md:w-9 md:h-9 outline-none" strokeWidth={1.5} />
                            </div>
                            <div className="md:pl-6 lg:pl-10">
                                <h2 className="text-2xl md:text-[28px] font-serif font-bold text-[#455431] mb-5 md:mb-6 flex items-center md:block">
                                    <span className="md:hidden flex h-10 w-10 bg-[#283E2D] rounded-full items-center justify-center mr-4 shrink-0 ring-4 ring-[#B7CCA6]/40">
                                        <Mail className="text-[#E7E2C3] w-5 h-5" />
                                    </span>
                                    06. Contact Information
                                </h2>
                                <p className="text-gray-700 leading-relaxed font-medium">
                                    Questions about the Terms of Service should be sent to us at <strong className="text-[#214a32] cursor-pointer hover:underline">support@ilajbilghiza.com</strong>.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
