"use client";

import React from 'react';
import PageHeader from '../../component/PageHeader';

export default function PrivacyPolicy() {
    return (
        <div className="text-gray-800 antialiased font-[Poppins] bg-[#fdfdfd]">
            <PageHeader
                title="Privacy Policy"
                description="Your privacy is extremely important to us. Learn how we protect your data."
                backgroundImage="/header.jpg"
            />

            {/* Main Content */}
            <section className="max-w-4xl mx-auto px-6 mt-16 md:px-12 py-14 text-[#21492f]">

                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#21492f]">Welcome to IlajbilGhiza Privacy Policy</h1>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        At IlajbilGhiza, your privacy is extremely important to us. This Privacy Policy explains how we collect, use, protect, and share your personal information when you use our website, mobile application, AI diet planner, and related services.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                        By accessing or using IlajbilGhiza, you agree to the practices described in this policy.
                    </p>
                </div>

                {/* 01. Information We Collect */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">01.</span> Information We Collect
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        We may collect the following types of information to provide better health and nutrition services:
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-[#8c8c4f] mb-3">Personal Information</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Age and gender</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-semibold text-[#8c8c4f] mb-3">Health & Lifestyle Information</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Height and weight</li>
                                <li>Dietary preferences</li>
                                <li>Health conditions (voluntarily provided)</li>
                                <li>Daily routine and activity level</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-[#8c8c4f] mb-3">Technical Information</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>IP address</li>
                            <li>Browser type</li>
                            <li>Device information</li>
                            <li>Usage data (pages visited, interactions)</li>
                        </ul>
                    </div>

                    <p className="text-gray-600 italic mt-6 text-sm">
                        This information helps us personalize your experience and improve our platform.
                    </p>
                </div>

                {/* 02. How We Use Your Information */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">02.</span> How We Use Your Information
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We use your information for the following purposes:
                    </p>
                    <ul className="space-y-3">
                        {[
                            "To generate personalized AI diet plans",
                            "To recommend suitable organic foods",
                            "To connect you with doctors or nutritionists",
                            "To improve our services and user experience",
                            "To send important updates, notifications, or support messages"
                        ].map((item, index) => (
                            <li key={index} className="flex gap-3 items-start text-gray-700">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#22aa4f] shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 font-medium text-[#a6763f]">
                        We do not sell or misuse your personal data under any circumstances.
                    </p>
                </div>

                {/* 03. AI Diet Planner & Health Data */}
                <div className="mb-12 bg-green-50/50 p-8 rounded-3xl border border-green-100">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">03.</span> AI Diet Planner & Health Data
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Health-related data entered into the AI Diet Planner is:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                        <li>Used only for generating diet and nutrition guidance</li>
                        <li>Processed securely and confidentially</li>
                        <li>Never shared without your consent</li>
                    </ul>
                    <div className="p-4 bg-white/80 rounded-xl text-sm text-gray-600 border border-green-200">
                        <strong>Disclaimer:</strong> IlajbilGhiza’s AI system follows ethical nutrition guidelines and does not replace medical diagnosis or emergency care.
                    </div>
                </div>

                {/* 04. Cookies & Tracking Technologies */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">04.</span> Cookies & Tracking Technologies
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We use cookies and similar technologies to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                        <li>Improve website functionality</li>
                        <li>Analyze user behavior</li>
                        <li>Remember user preferences</li>
                    </ul>
                    <p className="text-gray-600 text-sm">
                        You can disable cookies through your browser settings, but some features may not function properly.
                    </p>
                </div>

                {/* 05. Data Sharing & Third Parties */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">05.</span> Data Sharing & Third Parties
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We may share limited information with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                        <li>Trusted service providers (hosting, analytics)</li>
                        <li>Doctors or nutritionists (only with user consent)</li>
                    </ul>
                    <p className="font-semibold text-[#21492f]">
                        We never share your data with advertisers or unauthorized third parties.
                    </p>
                </div>

                {/* 06. Data Security */}
                <div className="mb-12 bg-gray-50 p-8 rounded-3xl border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">06.</span> Data Security
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We implement appropriate security measures to protect your data, including:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
                        <div className="bg-white p-4 rounded-xl shadow-sm border">Secure Servers</div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border">Encrypted Transmission</div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border">Access Controls</div>
                    </div>
                    <p className="text-gray-500 text-sm italic">
                        However, no online system is 100% secure, and users share information at their own risk.
                    </p>
                </div>

                {/* 07. User Rights & Choices */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">07.</span> User Rights & Choices
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        You have the right to:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Access your personal data</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Update or correct information</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Request account deletion</li>
                        <li className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#22aa4f]" /> Opt out of communications</li>
                    </ul>
                    <p className="mt-6 text-gray-600">
                        Requests can be made through our support team.
                    </p>
                </div>

                {/* 08. Children’s Privacy */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">08.</span> Children’s Privacy
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        IlajbilGhiza does not knowingly collect personal data from children under the age of 13 without parental consent. If such data is identified, it will be removed immediately.
                    </p>
                </div>

                {/* 09. Changes to This Privacy Policy */}
                <div className="pt-12 border-t border-gray-100">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-[#22aa4f]">09.</span> Changes to This Privacy Policy
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        IlajbilGhiza may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.
                    </p>
                    <p className="text-gray-500 font-medium italic">
                        We encourage users to review this policy periodically.
                    </p>
                </div>

            </section>
        </div>
    );
}

