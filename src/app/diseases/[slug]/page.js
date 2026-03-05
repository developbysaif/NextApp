"use client";

import React, { use } from 'react';
import PageHeader from '@/component/PageHeader';
import { diseases } from '@/data/diseases';
import { Activity, Heart, Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DiseaseDetailPage({ params }) {
    const { slug } = use(params);
    const disease = diseases.find(d => d.slug === slug);

    if (!disease) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-[#21492f] mb-4 uppercase italic">Not Found</h1>
                    <p className="text-stone-500 font-bold mb-8">This condition guide could not be located.</p>
                </div>
            </div>
        );
    }

    const icons = { Activity, Heart, Scale };
    const Icon = icons[disease.icon] || Activity;

    // Helper to render content with basic formatting (splitting by lines)
    const renderContent = (content) => {
        return content.split('\n').map((line, idx) => {
            if (line.startsWith('###')) {
                return <h3 key={idx} className="text-2xl font-black text-[#21492f] mt-8 mb-4 uppercase tracking-tight">{line.replace('###', '').trim()}</h3>;
            } else if (line.startsWith('**')) {
                return <strong key={idx} className="text-[#21492f] block mt-4 mb-2">{line.replace(/\*\*/g, '').trim()}</strong>;
            } else if (line.startsWith('*') || (line.match(/^\d\./))) {
                return (
                    <div key={idx} className="flex items-start gap-3 mb-3 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                        <CheckCircle2 size={18} className="text-[#22aa4f] shrink-0 mt-0.5" />
                        <span className="text-stone-600 font-bold text-sm leading-relaxed">{line.replace(/^\*|^\d\./, '').trim()}</span>
                    </div>
                );
            } else if (line.trim() === '') {
                return <div key={idx} className="h-4"></div>;
            } else {
                return <p key={idx} className="text-stone-500 font-medium mb-4 leading-relaxed">{line.trim()}</p>;
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] font-sans">
            <PageHeader
                title={disease.title}
                description={disease.description}
                backgroundImage="/header.jpg"
            />

            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-stone-100 shadow-xl shadow-green-900/5">
                            {renderContent(disease.content)}
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-6">
                        <div className={`rounded-[2.5rem] ${disease.bg} p-8 border border-white/50 text-center relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 size-32 opacity-10 -mr-10 -mt-10 rotate-12">
                                <Icon size={120} />
                            </div>

                            <div className={`size-16 mx-auto rounded-2xl bg-white ${disease.color} flex items-center justify-center mb-6 shadow-sm relative z-10`}>
                                <Icon size={32} />
                            </div>

                            <h4 className="text-[#21492f] font-black uppercase text-sm tracking-widest mb-2 relative z-10">Care Guide</h4>
                            <p className="text-stone-500 text-xs font-bold leading-relaxed relative z-10">
                                Verified food-based solutions for everyday health management.
                            </p>

                            <div className="mt-8 flex items-center justify-center gap-2 bg-white/60 py-2 px-4 rounded-full border border-white relative z-10">
                                <ShieldCheck size={14} className="text-[#22aa4f]" />
                                <span className="text-[10px] font-black uppercase tracking-tight text-[#21492f]">Doctor Verified Advice</span>
                            </div>
                        </div>

                        <div className="bg-[#21492f] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 size-48 bg-white/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                            <h4 className="text-xl font-black mb-4 relative z-10">Personalized Plan?</h4>
                            <p className="text-white/70 text-sm font-medium mb-8 leading-relaxed relative z-10">
                                Get a custom organic diet plan tailored specifically for your health needs by our experts.
                            </p>
                            <a href="/diet-plan" className="block w-full bg-white text-[#21492f] py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-center shadow-xl hover:bg-[#22aa4f] hover:text-white transition-all relative z-10">
                                Start Generation
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
