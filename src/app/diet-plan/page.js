"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
    Sparkles,
    Activity,
    Utensils,
    Scale,
    Target,
    User,
    Send,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Loader2,
    Key,
    Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhyChooseUs from '@/component/WhyChooseUs';

export default function DietPlanPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        activityLevel: 'moderate',
        goal: 'weight-loss',
        medicalConditions: '',
        preferences: ''
    });

    const activityLevels = [
        { id: 'sedentary', label: 'Sedentary', desc: 'Spent in the sun inside' },
        { id: 'moderate', label: 'Moderate', desc: 'Active in some extent' },
        { id: 'active', label: 'Active', desc: 'Some sort of activity' },
        { id: 'very-active', label: 'Very Active', desc: 'Even all the time in the sun' }
    ];

    const goals = [
        { id: 'weight-loss', label: 'Weight Loss', desc: 'Slight Weight Loss' },
        { id: 'muscle-gain', label: 'Muscle Gain', desc: 'Natural Muscle Gain' },
        { id: 'maintenance', label: 'Maintenance', desc: 'Management Layout' },
        { id: 'health', label: 'Current Foods', desc: 'Consistent Diet Cure' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const body = {
                action_type: 'diet_plan',
                message: `Generate a personalized diet plan for ${formData.name}, a ${formData.age} year old ${formData.gender} weighing ${formData.weight}kg with a height of ${formData.height}cm. Goal: ${formData.goal}, lifestyle: ${formData.activityLevel}. Medical: ${formData.medicalConditions || 'none'}, Preferences: ${formData.preferences || 'none'}.`,
                user_data: formData,
                session_id: `health-${formData.name || 'user'}-${Date.now()}`
            };

            const response = await fetch('https://saifdev.app.n8n.cloud/webhook-test/health-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Failed to connect to the health assistant. Please try again later.');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error('Error fetching diet plan:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F5EE] text-[#2A3F31] font-sans relative overflow-x-hidden selection:bg-[#3B925D]/20">
            {/* Background Texture/Leaves */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20c15 0 25 10 25 25s-10 25-25 25 c-15 0-25-10-25-25s10-25 25-25z' fill='none' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M50 40c20 0 35 15 35 35s-15 35-35 35 c-20 0-35-15-35-35s15-35 35-35z' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px'
                }}
            />

            {/* Floating Golden Keys (Decorative) */}
            <div className="absolute top-[300px] left-8 w-10 h-10 rounded-full bg-gradient-to-br from-[#DBC27A] to-[#B89B4A] shadow-lg flex items-center justify-center opacity-80 hidden lg:flex">
                <Key size={18} className="text-[#5A4D20] drop-shadow-sm" />
            </div>
            <div className="absolute top-[600px] left-6 w-10 h-10 rounded-full bg-gradient-to-br from-[#DBC27A] to-[#B89B4A] shadow-lg flex items-center justify-center opacity-80 hidden lg:flex">
                <Key size={18} className="text-[#5A4D20] drop-shadow-sm" />
            </div>
            <div className="absolute top-[900px] left-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#DBC27A] to-[#B89B4A] shadow-lg flex items-center justify-center opacity-80 hidden lg:flex">
                <Key size={18} className="text-[#5A4D20] drop-shadow-sm" />
            </div>
            <div className="absolute top-[1200px] left-8 w-10 h-10 rounded-full bg-gradient-to-br from-[#DBC27A] to-[#B89B4A] shadow-lg flex items-center justify-center opacity-80 hidden lg:flex">
                <Key size={18} className="text-[#5A4D20] drop-shadow-sm" />
            </div>
            <div className="absolute top-[1600px] left-6 w-10 h-10 rounded-full bg-gradient-to-br from-[#DBC27A] to-[#B89B4A] shadow-lg flex items-center justify-center opacity-80 hidden lg:flex">
                <Key size={18} className="text-[#5A4D20] drop-shadow-sm" />
            </div>
            <div className="absolute top-[1900px] left-8 w-10 h-10 rounded-full bg-gradient-to-br from-[#DBC27A] to-[#B89B4A] shadow-lg flex items-center justify-center opacity-80 hidden lg:flex">
                <Key size={18} className="text-[#5A4D20] drop-shadow-sm" />
            </div>
            <div className="absolute top-[2200px] left-10 w-10 h-10 rounded-full bg-gradient-to-br from-[#DBC27A] to-[#B89B4A] shadow-lg flex items-center justify-center opacity-80 hidden lg:flex">
                <Key size={18} className="text-[#5A4D20] drop-shadow-sm" />
            </div>

            {/* Header Section */}
            <section className="relative pt-16 pb-12 z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-[#D1D9CA] px-5 py-1.5 rounded-full text-[#38513B] font-bold text-[10px] uppercase tracking-wider mb-6 border border-[#2A3F31]/10 shadow-sm">
                    <Sparkles size={12} className="text-[#D3B462]" />
                    AI POWERED HEALTH
                </div>
                <h1 className="text-4xl md:text-[54px] lg:text-[64px] font-serif font-bold text-[#142A1D] leading-[1.1] mb-6 tracking-tight">
                    “Your Body Is Unique — <br />
                    Your Diet Should Be Too”
                </h1>
                <p className="text-[#4F5E4B] text-[15px] font-medium max-w-lg mx-auto leading-relaxed">
                    Organic healing meets AI precision. Get a diet plan rooted in Sunnah and backed by science.
                </p>
            </section>

            {/* How It Works Section */}
            <section className="relative z-10 w-full mb-8">
                {/* Wavy Background specifically for How It Works */}
                <div className="absolute inset-0 bg-[#D7E3CC] z-0 pointer-events-none" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' }}></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
                    <h2 className="text-[26px] font-serif font-bold text-[#203626] mb-2">How It Works</h2>
                    <p className="text-[#3A5041] text-sm font-medium mb-10">Our AI analyzes your unique profile to curate a fresh health plan.</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { title: "Age & Gender", icon: User, desc: "Personalized biological requirements" },
                            { title: "Symptoms", icon: Activity, desc: "Addressing root cause directly" },
                            { title: "Lifestyle", icon: Target, desc: "Align plans to your daily routine" },
                            { title: "Natural Foods", icon: Utensils, desc: "Sunnah-based recommendations" }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#E9EDE0] border-2 border-[#1E412A] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-lg transform transition-transform hover:-translate-y-1">
                                <div className="text-[#D3B462] mb-3">
                                    <item.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-[#1E412A] text-[13px] mb-1 leading-tight">{item.title}</h3>
                                <p className="text-[9px] text-[#4F5E4B] font-medium leading-tight">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Massive Form Section */}
            <section className="relative z-10 max-w-[800px] mx-auto px-4 pb-24">
                <div className="bg-[#FBFBFA] rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden relative border border-white">

                    {/* Dark Green Wavy overlay for Step 03 */}
                    <div className="absolute top-[35%] left-0 w-full h-[40%] bg-[#568160] z-0 sm:h-[45%]" style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' }}>
                        {/* Subtle leaf overlay inside green band */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20c15 0 25 10 25 25s-10 25-25 25 c-15 0-25-10-25-25s10-25 25-25z' fill='none' stroke='%23FFF' stroke-width='3'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />
                    </div>

                    <form onSubmit={handleSubmit} className="relative z-10 p-8 md:p-14">

                        {/* 01 Personal Metrics */}
                        <div className="mb-14 relative group">
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-xl font-serif font-bold text-[#1F3325] flex gap-3 items-center">
                                    <span className="text-[#3B925D] font-black text-2xl">01</span> Personal Metrics
                                </h3>
                                <span className="text-5xl font-serif font-black text-[#D3B462]/30 pointer-events-none absolute right-0 -top-4">01</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className="space-y-2 col-span-1 md:col-span-1 border-b md:border-b-0 border-[#3B925D]/20 pb-4 md:pb-0">
                                    <label className="text-[10px] font-bold uppercase text-[#546458] tracking-widest pl-2">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Saif Dev"
                                        className="w-full bg-[#EFECE0] border border-[#D1D9CA] rounded-full px-5 py-3.5 focus:outline-none focus:border-[#D3B462] border-b-4 focus:bg-white text-sm font-medium text-[#1F3325] placeholder:text-[#8D9F91]"
                                    />
                                </div>
                                <div className="space-y-2 border-b md:border-b-0 border-[#3B925D]/20 pb-4 md:pb-0">
                                    <label className="text-[10px] font-bold uppercase text-[#546458] tracking-widest pl-2">Age</label>
                                    <input
                                        required
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        placeholder="Years"
                                        className="w-full bg-[#EFECE0] border border-[#D1D9CA] rounded-full px-5 py-3.5 focus:outline-none focus:border-[#D3B462] border-b-4 focus:bg-white text-sm font-medium text-[#1F3325] placeholder:text-[#8D9F91]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-[#546458] tracking-widest pl-2">Gender</label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#EFECE0] border border-[#D1D9CA] rounded-full px-5 py-3.5 focus:outline-none focus:border-[#D3B462] border-b-4 focus:bg-white text-sm font-medium text-[#1F3325] appearance-none"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#546458]">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 02 Body Composition */}
                        <div className="mb-20 relative group">
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-xl font-serif font-bold text-[#1F3325] flex gap-3 items-center">
                                    <span className="text-[#3B925D] font-black text-2xl">02</span> Body Composition
                                </h3>
                                <span className="text-5xl font-serif font-black text-[#D3B462]/30 pointer-events-none absolute right-0 -top-4">02</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-[#546458] tracking-widest pl-2">Weight (kg)</label>
                                    <input
                                        required
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 75"
                                        className="w-full bg-[#EFECE0] border border-[#D1D9CA] rounded-full px-5 py-3.5 focus:outline-none focus:border-[#D3B462] border-b-4 focus:bg-white text-sm font-medium text-[#1F3325] placeholder:text-[#8D9F91]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-[#546458] tracking-widest pl-2">Height (cm)</label>
                                    <input
                                        required
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 175"
                                        className="w-full bg-[#EFECE0] border border-[#D1D9CA] rounded-full px-5 py-3.5 focus:outline-none focus:border-[#D3B462] border-b-4 focus:bg-white text-sm font-medium text-[#1F3325] placeholder:text-[#8D9F91]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 03 Lifestyle & Goals (On Green Background) */}
                        <div className="mb-20 mt-10 relative group pt-8 sm:pt-6">
                            <div className="flex justify-between items-end mb-8 relative z-10">
                                <h3 className="text-xl font-serif font-bold text-white flex gap-3 items-center">
                                    <span className="text-[#3B925D] font-black text-2xl drop-shadow-sm">03</span> Lifestyle & Goals
                                </h3>
                                <span className="text-5xl font-serif font-black text-[#D3B462]/40 pointer-events-none absolute right-0 -top-4 drop-shadow-sm">03</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase text-white/80 tracking-widest pl-2 drop-shadow-sm">Activity Level</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {activityLevels.map((level) => (
                                            <label
                                                key={level.id}
                                                className={`flex items-center p-3.5 rounded-xl border border-[#486E50] cursor-pointer transition-all ${formData.activityLevel === level.id
                                                    ? 'bg-[#E3E8CF] text-[#1F3325] shadow-inner'
                                                    : 'bg-[#486F50]/60 text-white hover:bg-[#3E6247]/80'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="activityLevel"
                                                    value={level.id}
                                                    checked={formData.activityLevel === level.id}
                                                    onChange={handleInputChange}
                                                    className="hidden"
                                                />
                                                <div className="flex-1 px-2">
                                                    <p className="font-bold text-[13px]">{level.label}</p>
                                                    <p className={`text-[10px] font-medium mt-0.5 ${formData.activityLevel === level.id ? 'text-[#546458]' : 'text-white/60'}`}>{level.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase text-white/80 tracking-widest pl-2 drop-shadow-sm">Primary Goal</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {goals.map((goal) => (
                                            <label
                                                key={goal.id}
                                                className={`flex items-center p-3.5 rounded-xl border cursor-pointer transition-all ${formData.goal === goal.id
                                                    ? 'bg-[#EFECE0] text-[#1F3325] border-[#D3B462]'
                                                    : 'bg-[#183220]/40 text-white border-[#183220]/20 hover:bg-[#183220]/60'
                                                    }`}
                                                style={formData.goal === goal.id ? {
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20c15 0 25 10 25 25s-10 25-25 25 c-15 0-25-10-25-25s10-25 25-25z' fill='none' stroke='%23D3B462' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E")`
                                                } : {}}
                                            >
                                                <input
                                                    type="radio"
                                                    name="goal"
                                                    value={goal.id}
                                                    checked={formData.goal === goal.id}
                                                    onChange={handleInputChange}
                                                    className="hidden"
                                                />
                                                <div className="flex-1 px-2">
                                                    <p className="font-bold text-[13px]">{goal.label}</p>
                                                    <p className={`text-[10px] font-medium mt-0.5 ${formData.goal === goal.id ? 'text-[#546458]' : 'text-white/60'}`}>{goal.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 04 Dietary Details */}
                        <div className="mb-14 relative group pt-10 sm:pt-14">
                            <div className="flex justify-between items-end mb-6">
                                <h3 className="text-xl font-serif font-bold text-[#1F3325] flex gap-3 items-center">
                                    <span className="text-[#3B925D] font-black text-2xl">04</span> Dietary Details
                                </h3>
                                <span className="text-5xl font-serif font-black text-[#D3B462]/30 pointer-events-none absolute right-0 -top-4">04</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-[#546458] tracking-widest pl-2">Dietary Conditions</label>
                                    <input
                                        type="text"
                                        name="medicalConditions"
                                        value={formData.medicalConditions}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Diabetes, High Blood Pressure, none"
                                        className="w-full bg-[#EFECE0] border border-[#D1D9CA] rounded-xl px-5 py-4 focus:outline-none focus:border-[#D3B462] border-b-4 focus:bg-white text-sm font-medium text-[#1F3325] placeholder:text-[#8D9F91]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase text-[#546458] tracking-widest pl-2">Dietary Preferences</label>
                                    <input
                                        type="text"
                                        name="preferences"
                                        value={formData.preferences}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Vegetarian, Keto, No Seafood"
                                        className="w-full bg-[#EFECE0] border border-[#D1D9CA] rounded-xl px-5 py-4 focus:outline-none focus:border-[#D3B462] border-b-4 focus:bg-white text-sm font-medium text-[#1F3325] placeholder:text-[#8D9F91]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-[100%] md:w-[90%] bg-gradient-to-r from-[#173823] via-[#2A5C3C] to-[#173823] text-white py-5 rounded-full font-serif font-bold text-xl transition-all shadow-[0_15px_30px_rgba(23,56,35,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 group border border-[#D3B462]/50 hover:shadow-[0_20px_40px_rgba(23,56,35,0.6)] hover:-translate-y-1 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                {loading ? (
                                    <Loader2 className="animate-spin text-[#D3B462]" />
                                ) : (
                                    <>
                                        Generate AI Diet Plan
                                        <Key size={20} className="text-[#D3B462] rotate-45 transform group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Loading and Results sections below */}
                <AnimatePresence>
                    {/* ... Same as original results block, slightly restyled but same functionality ... */}
                    {(result || error) && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            id="result"
                            className="mt-16"
                        >
                            {/* Shortened unchanged block for size matching the theme */}
                            {error ? (
                                <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl flex items-start gap-4">
                                    <AlertCircle className="text-red-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-black text-red-900 mb-2">Something went wrong</h3>
                                        <p className="text-red-700 font-medium">{error}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#1F3325] text-white p-8 md:p-14 rounded-[40px] shadow-2xl relative border border-[#D3B462]/30">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D3B462] rounded-full blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                            <div>
                                                <div className="inline-flex items-center gap-2 bg-[#D3B462] px-4 py-1.5 rounded-full text-[#1F3325] font-bold text-[10px] uppercase tracking-widest mb-4">
                                                    Analysis Complete
                                                </div>
                                                <h2 className="text-3xl font-serif font-black tracking-tight">Your Custom Plan</h2>
                                            </div>
                                            <button
                                                onClick={() => window.print()}
                                                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 border border-[#D3B462]/30"
                                            >
                                                Download PDF <ArrowRight size={16} />
                                            </button>
                                        </div>
                                        <div className="space-y-6">
                                            {result.response && (
                                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 whitespace-pre-wrap font-medium leading-relaxed text-stone-200">
                                                    {result.response}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* Custom Wood Testimonials Section */}
            <section className="relative z-10 max-w-[800px] mx-auto px-4 pb-20">
                <div
                    className="rounded-[30px] shadow-2xl p-10 md:p-14 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, #6C3F1B 0%, #4A2810 100%)',
                        boxShadow: '0 20px 50px rgba(74, 40, 16, 0.4), inset 0 2px 4px rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Wood Texture Overlay SVG */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={28} className="fill-[#D3B462] text-[#D3B462]" />)}
                        </div>
                        <p className="text-[#EADBB8] text-sm font-medium mb-12">Red results from our natural AI powered plans.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="bg-[#FAF5E6] rounded-2xl p-6 shadow-lg border-b-4 border-[#D3B462]/30 text-left">
                                <div className="flex gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-[#D3B462] text-[#D3B462]" />)}
                                </div>
                                <p className="text-[#3A5041] font-serif font-bold text-[15px] mb-6 leading-relaxed">
                                    "My body is now with sent or salt a health with her exact important decisions"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cover bg-center border border-[#D3B462]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop')" }}></div>
                                    <span className="font-bold text-[#1F3325] text-sm">Anna</span>
                                </div>
                            </div>

                            <div className="bg-[#FAF5E6] rounded-2xl p-6 shadow-lg border-b-4 border-[#D3B462]/30 text-left">
                                <div className="flex gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-[#D3B462] text-[#D3B462]" />)}
                                </div>
                                <p className="text-[#3A5041] font-serif font-bold text-[15px] mb-6 leading-relaxed">
                                    "Worldly heavy enlightened with dimming found open wall me represent in wittier box-inn"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cover bg-center border border-[#D3B462]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop')" }}></div>
                                    <span className="font-bold text-[#1F3325] text-sm">Sara</span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-10 text-white/50 text-[9px] font-bold uppercase tracking-[0.2em] text-center max-w-lg">
                            THERE'S A GREAT MANY OUT NATURAL, NATURAL AI, OUR LEARNINGS, COMPANY EXPECTED PARAMETERS, CONTINUES.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
}
