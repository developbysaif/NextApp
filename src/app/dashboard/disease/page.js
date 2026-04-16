"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Activity, ShieldAlert, CheckCircle2, ChevronRight, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserDiseaseSelection() {
    const { user, updateProfile } = useAuth();
    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const res = await fetch('/api/diseases');
                const data = await res.json();
                if (data.success) setDiseases(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDiseases();
    }, []);

    const toggleSymptom = (s) => {
        setSelectedSymptoms(prev => 
            prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
        );
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateProfile({
                disease: selectedDisease?._id,
                symptoms: selectedSymptoms
            });
            alert("Health profile updated! We are now tailoring your diet plan.");
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Your Health Profile</h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Select your condition to personalize your care</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Disease Selection */}
                <div className="space-y-6">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Activity size={14} className="text-[#214a32]" /> Select Condition
                    </h3>
                    <div className="grid gap-3 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                        {diseases.map(d => (
                            <button
                                key={d._id}
                                onClick={() => { setSelectedDisease(d); setSelectedSymptoms([]); }}
                                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between ${selectedDisease?._id === d._id ? 'border-[#214a32] bg-[#a4d9bc]/10 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                            >
                                <div>
                                    <p className="text-sm font-black text-gray-900">{d.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{d.category}</p>
                                </div>
                                {selectedDisease?._id === d._id && <CheckCircle2 size={20} className="text-[#214a32]" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Symptom Selection */}
                <div className="space-y-6">
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldAlert size={14} className="text-amber-500" /> Select Symptoms
                    </h3>
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-8 min-h-[300px] flex flex-col">
                        {selectedDisease ? (
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-gray-400 mb-4 uppercase">Common for {selectedDisease.name}:</p>
                                {selectedDisease.symptoms?.length > 0 ? (
                                    selectedDisease.symptoms.map((s, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => toggleSymptom(s)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-[12px] font-bold transition-all border ${selectedSymptoms.includes(s) ? 'bg-[#214a32] text-white border-transparent' : 'bg-gray-50 text-gray-500 border-gray-50 hover:border-gray-200'}`}
                                        >
                                            {s}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400 italic">No symptoms linked to this disease yet.</p>
                                )}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                                <Activity size={32} className="mb-4 opacity-20" />
                                <p className="text-xs font-bold uppercase tracking-widest">Please select a condition first</p>
                            </div>
                        )}
                        
                        {selectedDisease && (
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="mt-8 w-full bg-[#214a32] text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#1a3a28] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#214a32]/20"
                            >
                                <Save size={18} /> {saving ? 'Saving...' : 'Save & Analyze'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
