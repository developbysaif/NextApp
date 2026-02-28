"use client";

import React from 'react';
import PageHeader from '../../component/PageHeader';

export default function TermsAndConditions() {
    return (
        <div className="text-gray-800 antialiased font-[Poppins] bg-[#fdfdfd]">
            <PageHeader
                title="Terms of Service"
                description="Please read these terms and conditions carefully before using our service."
                backgroundImage="/header.jpg"
            />

            {/* Main Content */}
            <section className="max-w-4xl mx-auto px-6 mt-16 md:px-12 py-14 text-[#21492f]">

                {/* Main Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#21492f]">Terms and Conditions</h1>
                <p className="text-sm text-gray-500 mb-10 font-bold">Last Updated: January 2026</p>

                <div className="space-y-12">
                    {/* Introduction */}
                    <div>
                        <p className="text-gray-700 leading-relaxed text-lg mb-6">
                            Welcome to <strong>IlajbilGhiza</strong>. By accessing our website, using our AI Diet Planner, or purchasing our organic products, you agree to be bound by these Terms of Service.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            If you do not agree with any part of these terms, please do not use our services.
                        </p>
                    </div>

                    {/* Section 01 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-[#22aa4f]">01.</span> Medical Disclaimer
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            IlajbilGhiza is a platform for nutritional guidance and organic food. Content provided by our AI, blogs, or product descriptions is for informational purposes only.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                            <li>We do not provide medical diagnosis or treatment.</li>
                            <li>Always consult a qualified healthcare provider for any medical condition.</li>
                            <li>Do not disregard professional medical advice because of something you have read on this site.</li>
                        </ul>
                    </div>

                    {/* Section 02 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-[#22aa4f]">02.</span> Account Registration
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To use certain features like the AI Diet Planner or to place an order, you may be required to register an account. You agree to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Provide accurate and current information.</li>
                            <li>Maintain the security of your password.</li>
                            <li>Accept responsibility for all activities that occur under your account.</li>
                        </ul>
                    </div>

                    {/* Section 03 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-[#22aa4f]">03.</span> Product Purchases & Returns
                        </h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                <strong>Availability:</strong> All organic products are subject to seasonal availability. We reserve the right to discontinue any product at any time.
                            </p>
                            <p>
                                <strong>Pricing:</strong> Prices are subject to change without notice. We strive for accuracy but are not liable for pricing errors.
                            </p>
                            <p>
                                <strong>Returns:</strong> Due to the perishable nature of organic foods, we only accept returns if the product is damaged or spoiled upon delivery. Claims must be made within 24 hours of receipt.
                            </p>
                        </div>
                    </div>

                    {/* Section 04 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-[#22aa4f]">04.</span> User Content
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You retain ownership of any reviews or comments you post. However, by posting, you grant IlajbilGhiza a non-exclusive license to use, reproduce, and display such content.
                        </p>
                    </div>

                    {/* Section 05 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-[#22aa4f]">05.</span> Limitation of Liability
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            IlajbilGhiza shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our service or products.
                        </p>
                    </div>

                    {/* Section 06 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <span className="text-[#22aa4f]">06.</span> Contact Information
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Questions about the Terms of Service should be sent to us at <a href="mailto:support@ilajbilghiza.com" className="text-[#22aa4f] font-bold hover:underline">support@ilajbilghiza.com</a>.
                        </p>
                    </div>
                </div>

            </section>
        </div>
    );
}
