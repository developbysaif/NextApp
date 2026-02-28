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
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        <Sparkles size={16} />
                        Powered by Advanced AI
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                        Personalized Health & Diet
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Tell us about your health profile, and our AI Doctor will prescribe the perfect fruits and vegetables for you.
                    </p>
                </div>

                {/* Input Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Conditions */}
                        <div>
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                                <Activity className="text-red-500" />
                                Do you have any existing health conditions?
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {conditionsList.map(item => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => handleToggle('conditions', item)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${formData.conditions.includes(item)
                                            ? 'bg-red-50 border-red-500 text-red-600 font-medium scale-105'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Diet */}
                        <div>
                            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                                <Heart className="text-green-500" />
                                Dietary Preferences
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {dietList.map(item => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => handleToggle('diet', item)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${formData.diet.includes(item)
                                            ? 'bg-green-50 border-green-500 text-green-600 font-medium scale-105'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
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
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Processing Health Data...</>
                            ) : (
                                <>
                                    <Sparkles className="animate-pulse" />
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
