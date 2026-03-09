"use client";

import React, { useState } from 'react';
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
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
        { id: 'moderate', label: 'Moderate', desc: 'Exercise 3-5 days/week' },
        { id: 'active', label: 'Active', desc: 'Exercise 6-7 days/week' },
        { id: 'very-active', label: 'Very Active', desc: 'Hard exercise/physical job' }
    ];

    const goals = [
        { id: 'weight-loss', label: 'Weight Loss', desc: 'Burn fat & get lean' },
        { id: 'muscle-gain', label: 'Muscle Gain', desc: 'Build strength & size' },
        { id: 'maintenance', label: 'Maintenance', desc: 'Keep current weight' },
        { id: 'health', label: 'Overall health', desc: 'Vitality & longevity' }
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
        <div className="min-h-screen bg-[#FDFCF8] text-[#21492f] selection:bg-[#22aa4f]/20">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 px-6">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#22aa4f0a,transparent_50%)]" />
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-[#21492f]/5 px-4 py-1.5 rounded-full text-[#21492f] font-bold text-xs uppercase tracking-widest mb-6"
                    >
                        <Sparkles size={14} className="text-[#22aa4f]" />
                        AI-Powered Nutrition
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight mb-6"
                    >
                        “Your Body Is Unique — <br />
                        <span className="text-[#22aa4f]">Your Diet Should Be Too”</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-stone-500 text-lg max-w-2xl mx-auto font-medium"
                    >
                        Organic healing meets AI precision. Get a diet plan rooted in Sunnah and backed by science.
                    </motion.p>
                </div>
            </section>

            {/* How AI Analyzes Section */}
            <section className="py-12 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-[#21492f]">How It Works</h2>
                        <p className="text-gray-500">Our AI analyzes your unique profile to create the perfect healing plan.</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Age & Gender", icon: User, desc: "Personalized biological requirements" },
                            { title: "Symptoms", icon: Activity, desc: "Addressing the root cause" },
                            { title: "Lifestyle", icon: Target, desc: "Fitting into your daily routine" },
                            { title: "Natural Foods", icon: Utensils, desc: "Sunnah-based ingredients" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[#f8faf9] border border-green-50/50 text-center group hover:border-[#22aa4f]/30 transition-all">
                                <div className="size-12 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 text-[#22aa4f]">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="font-bold text-[#21492f] mb-1">{item.title}</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-12"
                    >
                        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(33,73,47,0.08)] border border-stone-100 p-8 md:p-12 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-2 h-full bg-[#22aa4f]" />

                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Section 1: Basic Info */}
                                <div>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f]">
                                            <User size={18} />
                                        </div>
                                        Personal Metrics
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Saif Dev"
                                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22aa4f] focus:ring-4 focus:ring-[#22aa4f]/5 transition-all font-bold placeholder:text-stone-300"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Age</label>
                                            <input
                                                required
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleInputChange}
                                                placeholder="Years"
                                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22aa4f] focus:ring-4 focus:ring-[#22aa4f]/5 transition-all font-bold placeholder:text-stone-300"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Gender</label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22aa4f] focus:ring-4 focus:ring-[#22aa4f]/5 transition-all font-bold"
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Body Stats */}
                                <div>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f]">
                                            <Scale size={18} />
                                        </div>
                                        Body Composition
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Weight (kg)</label>
                                            <input
                                                required
                                                type="number"
                                                name="weight"
                                                value={formData.weight}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 75"
                                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22aa4f] focus:ring-4 focus:ring-[#22aa4f]/5 transition-all font-bold placeholder:text-stone-300"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Height (cm)</label>
                                            <input
                                                required
                                                type="number"
                                                name="height"
                                                value={formData.height}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 175"
                                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22aa4f] focus:ring-4 focus:ring-[#22aa4f]/5 transition-all font-bold placeholder:text-stone-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Lifestyle & Goals */}
                                <div>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f]">
                                            <Target size={18} />
                                        </div>
                                        Lifestyle & Goals
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Activity Level</label>
                                            <div className="grid grid-cols-1 gap-3">
                                                {activityLevels.map((level) => (
                                                    <label
                                                        key={level.id}
                                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.activityLevel === level.id
                                                            ? 'border-[#22aa4f] bg-[#22aa4f]/5 ring-4 ring-[#22aa4f]/5'
                                                            : 'border-stone-100 bg-stone-50 hover:bg-stone-100'
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
                                                        <div>
                                                            <p className="font-bold text-sm">{level.label}</p>
                                                            <p className="text-[10px] text-stone-400 font-bold uppercase">{level.desc}</p>
                                                        </div>
                                                        {formData.activityLevel === level.id && <CheckCircle2 size={18} className="text-[#22aa4f]" />}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Primary Goal</label>
                                            <div className="grid grid-cols-1 gap-3">
                                                {goals.map((goal) => (
                                                    <label
                                                        key={goal.id}
                                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.goal === goal.id
                                                            ? 'border-[#22aa4f] bg-[#22aa4f]/5 ring-4 ring-[#22aa4f]/5'
                                                            : 'border-stone-100 bg-stone-50 hover:bg-stone-100'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="goal"
                                                            value={goal.id}
                                                            checked={formData.goal === goal.id}
                                                            onChange={handleInputChange}
                                                            className="hidden"
                                                        />
                                                        <div>
                                                            <p className="font-bold text-sm">{goal.label}</p>
                                                            <p className="text-[10px] text-stone-400 font-bold uppercase">{goal.desc}</p>
                                                        </div>
                                                        {formData.goal === goal.id && <CheckCircle2 size={18} className="text-[#22aa4f]" />}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Additional Details */}
                                <div>
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-[#22aa4f]/10 flex items-center justify-center text-[#22aa4f]">
                                            <Utensils size={18} />
                                        </div>
                                        Dietary Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Medical Conditions</label>
                                            <textarea
                                                name="medicalConditions"
                                                value={formData.medicalConditions}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Diabetes, High Blood Pressure, none"
                                                rows={3}
                                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22aa4f] focus:ring-4 focus:ring-[#22aa4f]/5 transition-all font-bold placeholder:text-stone-300 resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-black uppercase text-stone-400 tracking-wider ml-1">Dietary Preferences</label>
                                            <textarea
                                                name="preferences"
                                                value={formData.preferences}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Vegetarian, Keto, No Seafood"
                                                rows={3}
                                                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#22aa4f] focus:ring-4 focus:ring-[#22aa4f]/5 transition-all font-bold placeholder:text-stone-300 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#21492f] hover:bg-[#22aa4f] text-white py-5 rounded-[20px] font-black text-lg transition-all shadow-xl shadow-[#21492f]/20 flex items-center justify-center gap-3 disabled:opacity-50 group"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            Generate AI Diet Plan
                                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* Results Section */}
                <AnimatePresence>
                    {(result || error) && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            id="result"
                            className="mt-16"
                        >
                            {error ? (
                                <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[32px] flex items-start gap-4">
                                    <AlertCircle className="text-red-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-black text-red-900 mb-2">Something went wrong</h3>
                                        <p className="text-red-700 font-medium">{error}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#21492f] text-white p-8 md:p-16 rounded-[48px] shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#22aa4f] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2" />

                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                            <div>
                                                <div className="inline-flex items-center gap-2 bg-[#22aa4f] px-4 py-1.5 rounded-full text-white font-bold text-[10px] uppercase tracking-widest mb-4">
                                                    Analysis Complete
                                                </div>
                                                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Your Custom Plan</h2>
                                            </div>
                                            <button
                                                onClick={() => window.print()}
                                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2"
                                            >
                                                Download PDF <ArrowRight size={18} />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {result.response && (
                                                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[32px] p-8 md:p-12 whitespace-pre-wrap font-medium leading-relaxed text-lg text-stone-200">
                                                    {result.response}
                                                </div>
                                            )}

                                            {result.diet_plan && (
                                                <div className="grid grid-cols-1 gap-6">
                                                    {Object.entries(result.diet_plan).map(([key, value]) => (
                                                        <div key={key} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[28px] p-8 transition-all hover:bg-white/10">
                                                            <h4 className="text-[#22aa4f] font-black uppercase tracking-widest text-xs mb-4">{key}</h4>
                                                            <div className="text-white font-medium leading-relaxed">
                                                                {typeof value === 'object' ? (
                                                                    <ul className="space-y-3">
                                                                        {Object.entries(value).map(([k, v]) => (
                                                                            <li key={k}>
                                                                                <span className="text-[#22aa4f] font-bold mr-2">{k}:</span>
                                                                                <span className="text-stone-300">{Array.isArray(v) ? v.join(", ") : String(v)}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ) : (
                                                                    <p className="text-stone-300">{String(value)}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {result.foods_to_include && result.foods_to_include.length > 0 && (
                                                <div className="bg-green-500/10 border border-green-500/20 rounded-[32px] p-8 md:p-12">
                                                    <h4 className="text-green-400 font-black uppercase tracking-widest text-xs mb-4">Recommended Foods</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {result.foods_to_include.map((food, i) => (
                                                            <span key={i} className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-bold border border-green-500/30">
                                                                {food}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {result.foods_to_avoid && result.foods_to_avoid.length > 0 && (
                                                <div className="bg-red-500/10 border border-red-500/20 rounded-[32px] p-8 md:p-12">
                                                    <h4 className="text-red-400 font-black uppercase tracking-widest text-xs mb-4">Foods to Avoid</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {result.foods_to_avoid.map((food, i) => (
                                                            <span key={i} className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-bold border border-red-500/30">
                                                                {food}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {result.follow_up_questions && result.follow_up_questions.length > 0 && (
                                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-[32px] p-8 md:p-12">
                                                    <h4 className="text-blue-400 font-black uppercase tracking-widest text-xs mb-4">Follow-up Questions</h4>
                                                    <ul className="space-y-3">
                                                        {result.follow_up_questions.map((q, i) => (
                                                            <li key={i} className="text-blue-200 font-medium flex gap-3">
                                                                <Sparkles size={18} className="shrink-0 text-blue-400" />
                                                                {q}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {result.disclaimer && (
                                                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 italic text-stone-400 text-sm">
                                                    <strong>Note:</strong> {result.disclaimer}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                <p className="text-[#22aa4f] font-black uppercase tracking-widest text-[10px] mb-2">Health Score</p>
                                                <p className="text-2xl font-black italic">Personalized</p>
                                            </div>
                                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                <p className="text-[#22aa4f] font-black uppercase tracking-widest text-[10px] mb-2">Duration</p>
                                                <p className="text-2xl font-black italic">30 Day Cycle</p>
                                            </div>
                                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                <p className="text-[#22aa4f] font-black uppercase tracking-widest text-[10px] mb-2">Complexity</p>
                                                <p className="text-2xl font-black italic">Tailored</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Testimonials & Before/After Section */}
                <section className="mt-24 py-16 px-6 bg-[#21492f] rounded-[48px] text-white overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black mb-4">Healing Stories</h2>
                            <p className="text-white/60">Real results from our natural AI-powered plans.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { name: "Amna", text: "My hair fall stopped in just 3 weeks with the Sunnah-based diet plan!", result: "Reduced Hair Fall" },
                                { name: "Sara", text: "Finally lost weight without feeling weak. The natural ingredients really worked.", result: "Weight Loss" }
                            ].map((story, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[32px]">
                                    <div className="flex gap-1 text-amber-400 mb-4">
                                        {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} size={14} fill="currentColor" />)}
                                    </div>
                                    <p className="text-lg italic mb-6">"{story.text}"</p>
                                    <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                        <span className="font-bold">{story.name}</span>
                                        <span className="bg-[#22aa4f] text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-full">{story.result}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center mt-12 text-[10px] text-white/40 uppercase tracking-[0.2em]">
                            *Results may vary based on individual metabolism and adherence. Consult a doctor for medical conditions.
                        </p>
                    </div>
                </section>
            </section>
        </div>
    );
}

