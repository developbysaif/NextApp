"use client";

import React, { use } from 'react';
import PageHeader from '@/component/PageHeader';
import { diseases } from '@/data/diseases';
import Link from 'next/link';
import Image from 'next/image';
import { 
    Activity, Heart, Scale, ShieldCheck, 
    CheckCircle2, ArrowLeft, Leaf, Droplets,
    Stethoscope, Zap, Info
} from 'lucide-react';

export default function DiseaseDetailPage({ params }) {
    const { slug } = use(params);
    const disease = diseases.find(d => d.slug === slug);

    if (!disease) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]">
                <div className="text-center p-8 bg-white rounded-3xl shadow-2xl border border-stone-100">
                    <div className="size-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Info size={40} />
                    </div>
                    <h1 className="text-4xl font-black text-[#21492f] mb-4 uppercase italic">Not Found</h1>
                    <p className="text-stone-500 font-bold mb-8">This health guide could not be located in our sanctuary.</p>
                    <Link href="/#diseases-section" className="inline-flex items-center gap-2 bg-[#21492f] text-white px-8 py-3 rounded-full font-bold hover:bg-[#22aa4f] transition-all">
                        <ArrowLeft size={18} />
                        Back to Library
                    </Link>
                </div>
            </div>
        );
    }

    const icons = { Activity, Heart, Scale, Stethoscope, Leaf, Droplets };
    const Icon = icons[disease.icon] || Activity;

    const renderContent = (content) => {
        if (!content) return null;
        return content.split('\n').map((line, idx) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('###')) {
                return (
                    <div key={idx} className="relative mt-12 mb-6">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#22aa4f] rounded-full hidden md:block"></div>
                        <h3 className="text-2xl md:text-3xl font-black text-[#21492f] uppercase tracking-tight">
                            {trimmedLine.replace('###', '').trim()}
                        </h3>
                    </div>
                );
            } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                return <h4 key={idx} className="text-lg font-black text-[#22aa4f] mt-8 mb-4 border-b border-stone-100 pb-2">{trimmedLine.replace(/\*\*/g, '').trim()}</h4>;
            } else if (trimmedLine.startsWith('*') || (trimmedLine.match(/^\d\./))) {
                return (
                    <div key={idx} className="flex items-start gap-4 mb-4 bg-stone-50/50 p-5 rounded-2xl border border-stone-100 group hover:shadow-md transition-all">
                        <div className="size-8 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 mt-0.5 border border-stone-100 group-hover:bg-[#22aa4f] group-hover:text-white transition-colors">
                            <CheckCircle2 size={16} className="text-[#22aa4f] group-hover:text-white" />
                        </div>
                        <span className="text-stone-600 font-bold text-sm md:text-base leading-relaxed">
                            {trimmedLine.replace(/^\*|^\d\./, '').trim()}
                        </span>
                    </div>
                );
            } else if (trimmedLine === '') {
                return <div key={idx} className="h-2"></div>;
            } else {
                return <p key={idx} className="text-stone-500 font-medium mb-6 leading-relaxed text-sm md:text-base">{trimmedLine}</p>;
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-[#22aa4f] selection:text-white">
            <PageHeader
                title={disease.title}
                description={disease.description}
                backgroundImage="/header.jpg"
                breadcrumbClassName="text-white bg-[#22aa4f] shadow-lg"
            />

            <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="relative">
                            {/* Decorative element */}
                            <div className="absolute -top-10 -left-10 size-40 bg-[#22aa4f]/5 rounded-full blur-3xl"></div>
                            
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-stone-100 shadow-2xl shadow-green-900/5 relative z-10 overflow-hidden">
                                {/* Inner glow */}
                                <div className="absolute top-0 right-0 size-64 bg-gradient-to-bl from-[#22aa4f]/5 to-transparent opacity-50"></div>
                                
                                <div className="content-rendered">
                                    {renderContent(disease.content)}
                                </div>
                                
                                <div className="mt-16 pt-10 border-t border-stone-100 flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Share Knowledge</p>
                                            <p className="text-stone-700 font-bold">Help someone heal naturally</p>
                                        </div>
                                    </div>
                                    <Link href="/#diseases-section" className="text-stone-400 hover:text-[#21492f] font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2 group">
                                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                        Return to Directory
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status Card */}
                        <div className={`rounded-[2.5rem] ${disease.bg || 'bg-stone-50'} p-8 border border-white/50 text-center relative overflow-hidden shadow-xl`}>
                            <div className="absolute top-0 right-0 size-32 opacity-10 -mr-10 -mt-10 rotate-12">
                                <Icon size={120} />
                            </div>

                            <div className={`size-20 mx-auto rounded-3xl bg-white ${disease.color || 'text-[#21492f]'} flex items-center justify-center mb-6 shadow-lg relative z-10 border border-white`}>
                                <Icon size={36} />
                            </div>

                            <h4 className="text-[#21492f] font-black uppercase text-sm tracking-widest mb-3 relative z-10 italic">Treatment Protocol</h4>
                            <p className="text-stone-500 text-xs md:text-sm font-bold leading-relaxed relative z-10 px-4">
                                Sunnah-integrated organic solutions for sustainable health restoration.
                            </p>

                            <div className="mt-8 flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md py-3 px-6 rounded-full border border-white relative z-10 shadow-sm">
                                <ShieldCheck size={16} className="text-[#22aa4f]" />
                                <span className="text-[11px] font-black uppercase tracking-tight text-[#21492f]">100% Certified Organic Advice</span>
                            </div>
                        </div>

                        {/* Visual Asset if exists */}
                        {disease.image && (
                            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-64 relative group">
                                <Image 
                                    src={disease.image} 
                                    alt={disease.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Reference Illustration</p>
                                    <p className="font-black text-sm italic">Natural Healing Power</p>
                                </div>
                            </div>
                        )}

                        {/* CTA Card */}
                        <div className="bg-[#21492f] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                            {/* Decorative background circle */}
                            <div className="absolute top-0 right-0 size-48 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                            
                            <Leaf size={40} className="text-[#22aa4f] mb-6 opacity-40" />
                            
                            <h4 className="text-2xl font-black mb-4 relative z-10 leading-tight">Need a Personalized Health Map?</h4>
                            <p className="text-white/70 text-sm font-medium mb-10 leading-relaxed relative z-10">
                                Every body is unique. Get a precision diet plan tailored to your symptoms and lifestyle by our Sunnah nutritionists.
                            </p>
                            
                            <Link href="/diet-plan" className="block w-full bg-[#22aa4f] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs text-center shadow-xl hover:bg-white hover:text-[#21492f] transition-all relative z-10">
                                Build My Plan
                            </Link>
                        </div>

                        {/* Quick Insight */}
                        <div className="bg-white rounded-[2rem] p-6 border border-stone-100 shadow-lg flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                                <Stethoscope size={18} />
                            </div>
                            <p className="text-[11px] font-bold text-stone-500 leading-relaxed">
                                <span className="block text-[#21492f] font-black uppercase tracking-tight mb-0.5">Note</span>
                                Always consult with a professional therapist before starting new intense treatments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
