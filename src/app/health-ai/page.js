"use client";

import React, { useState } from 'react';
import { Sparkles, Activity, Heart, Apple, Info } from 'lucide-react';
import ProductItem from '@/component/ProductItem';

export default function HealthAIPage() {
    const [formData, setFormData] = useState({
        conditions: [],
        diet: [],
        goals: ""
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const conditionsList = ['Diabetes', 'Hypertension', 'Heart Disease', 'Obesity', 'Kidney Issues', 'None'];
    const dietList = ['Vegan', 'Vegetarian', 'Keto', 'Low Sugar', 'Balanced'];

    const handleToggle = (field, value) => {
        setFormData(prev => {
            const current = prev[field];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [field]: updated };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            // NOTE: In a real app, we might also send purchase history if available
            const res = await fetch('/api/ai/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conditions: formData.conditions,
                    diet: formData.diet,
                    previousPurchases: [] // placeholder
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            if (data.success) {
                setResult(data.data);
            }
        } catch (error) {
            console.error("AI Error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdfbf7] to-[#a4d9bc]/10 py-12">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 bg-[#214a32]/10 text-[#214a32] px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-4">
                        <Sparkles size={16} />
                        Powered by Advanced AI
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#214a32] font-outfit uppercase tracking-tight mb-4">
                        Personalized Health & Diet
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">
                        Tell us about your health profile, and our AI Doctor will prescribe the perfect fruits and vegetables for you.
                    </p>
                </div>

                {/* Input Form */}
                <div className="bg-white rounded-[3rem] shadow-xl p-10 mb-12 border border-gray-100/50">
                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* Conditions */}
                        <div>
                            <label className="flex items-center gap-2 text-lg font-black text-gray-800 mb-6 uppercase tracking-tight font-outfit">
                                <Activity className="text-rose-500" />
                                Do you have any existing health conditions?
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {conditionsList.map(item => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => handleToggle('conditions', item)}
                                        className={`px-6 py-3 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${formData.conditions.includes(item)
                                            ? 'bg-rose-50 border-rose-500 text-rose-600 scale-105 shadow-lg shadow-rose-100'
                                            : 'border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Diet */}
                        <div>
                            <label className="flex items-center gap-2 text-lg font-black text-gray-800 mb-6 uppercase tracking-tight font-outfit">
                                <Heart className="text-[#214a32]" />
                                Dietary Preferences
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {dietList.map(item => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => handleToggle('diet', item)}
                                        className={`px-6 py-3 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${formData.diet.includes(item)
                                            ? 'bg-[#a4d9bc]/30 border-[#214a32] text-[#214a32] scale-105 shadow-lg shadow-green-100'
                                            : 'border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#214a32] text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-black hover:shadow-green-900/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>Processing Health Data...</>
                            ) : (
                                <>
                                    <Sparkles size={20} className="animate-pulse" />
                                    Generate My Prescription
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results */}
                {result && (
                    <div className="animate-fadeIn">

                        {/* Doctor Note */}
                        <div className="bg-white rounded-2xl shadow-lg border-l-8 border-blue-500 p-8 mb-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                                <Activity size={200} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Info className="text-blue-500" />
                                Medical Analysis
                            </h2>
                            <div className="prose text-gray-700 leading-relaxed">
                                <p>{result.summary}</p>
                            </div>
                        </div>

                        {/* Recommended Products */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Apple className="text-green-600" />
                            Recommended for You
                        </h3>

                        {/* Note: The AI returns a list of names/reasons. 
                    In a real app, we would match these names to our DB Products to show "Add to Cart".
                    For this demo, we can show cards with the AI data or placeholder images.
                */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {result.recommendations?.map((rec, idx) => (
                                <div key={idx} className="bg-white rounded-xl shadow p-6 border border-gray-100 hover:shadow-md transition-shadow">
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">{rec.name}</h4>
                                    <p className="text-sm text-gray-600 mb-4">{rec.reason}</p>
                                    <div className="mt-auto">
                                        <button className="w-full py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm">
                                            Find in Store
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
