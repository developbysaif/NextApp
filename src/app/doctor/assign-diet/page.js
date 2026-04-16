"use client"

import React, { useState } from 'react';
import { Stethoscope, User, Search, CheckCircle2, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorAssignDietPage() {
    const [step, setStep] = useState(1);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const patients = [
        { id: 1, name: 'Sarah Ahmed', condition: 'Type 2 Diabetes', status: 'Needs Update' },
        { id: 2, name: 'Usman Ali', condition: 'Hypertension', status: 'Pending Review' },
        { id: 3, name: 'Fatima Bilal', condition: 'PCOS', status: 'New Patient' },
    ];

    const dietPlans = [
        { id: 1, name: 'Diabetic Control Protocol', category: 'Diabetes Diet' },
        { id: 2, name: 'Weight Loss Accelerator', category: 'Weight Loss' },
        { id: 3, name: 'Hypertension Safe-Diet', category: 'General Health' },
        { id: 4, name: 'PCOS Balancing Plan', category: 'Hormonal' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-10">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#eaf1ef] text-[#125B50] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                    <Stethoscope size={14} /> Prescription Engine
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Assign Diet Protocol</h1>
                <p className="text-sm font-medium text-gray-500">Link clinical nutrition templates to your patients seamlessly.</p>
            </div>

            {/* Stepper Logic */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                {/* Progress Header */}
                <div className="flex border-b border-gray-50 bg-gray-50/30">
                    <div className={`flex-1 p-6 text-center border-r border-gray-50 transition-colors ${step >= 1 ? 'bg-white' : ''}`}>
                        <span className={`text-[11px] font-black uppercase tracking-widest flex justify-center items-center gap-2 ${step >= 1 ? 'text-[#125B50]' : 'text-gray-400'}`}>
                            <div className={`size-6 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-[#125B50]' : 'bg-gray-300'}`}>1</div> Find Patient
                        </span>
                    </div>
                    <div className={`flex-1 p-6 text-center border-r border-gray-50 transition-colors ${step >= 2 ? 'bg-white' : ''}`}>
                        <span className={`text-[11px] font-black uppercase tracking-widest flex justify-center items-center gap-2 ${step >= 2 ? 'text-[#125B50]' : 'text-gray-400'}`}>
                            <div className={`size-6 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-[#125B50]' : 'bg-gray-300'}`}>2</div> Select Plan
                        </span>
                    </div>
                    <div className={`flex-1 p-6 text-center transition-colors ${step === 3 ? 'bg-white' : ''}`}>
                         <span className={`text-[11px] font-black uppercase tracking-widest flex justify-center items-center gap-2 ${step === 3 ? 'text-[#125B50]' : 'text-gray-400'}`}>
                            <div className={`size-6 rounded-full flex items-center justify-center text-white ${step === 3 ? 'bg-[#125B50]' : 'bg-gray-300'}`}>3</div> Confirm
                        </span>
                    </div>
                </div>

                {/* Step 1: Patient Selection */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 md:p-12 space-y-6">
                        <div className="relative max-w-xl mx-auto mb-8">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search existing patients..." 
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-transparent rounded-[1.2rem] text-sm font-bold focus:ring-4 focus:ring-[#125B50]/10 focus:border-[#125B50] focus:bg-white transition-all outline-none"
                            />
                        </div>
                        <div className="grid gap-4">
                            {patients.map(p => (
                                <button 
                                    key={p.id}
                                    onClick={() => setSelectedPatient(p)}
                                    className={`w-full text-left p-6 rounded-[1.5rem] border transition-all flex items-center justify-between ${selectedPatient?.id === p.id ? 'border-[#125B50] bg-[#eaf1ef] shadow-md' : 'border-gray-100 bg-white hover:border-[#125B50]/30 hover:shadow-sm'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`size-12 rounded-2xl flex items-center justify-center font-black ${selectedPatient?.id === p.id ? 'bg-[#125B50] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            {p.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900">{p.name}</h3>
                                            <p className="text-xs text-gray-500 font-bold mt-1">Pathology: <span className="text-gray-800">{p.condition}</span></p>
                                        </div>
                                    </div>
                                    {selectedPatient?.id === p.id ? <CheckCircle2 size={24} className="text-[#125B50]" /> : <ChevronRight size={24} className="text-gray-300" />}
                                </button>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button 
                                disabled={!selectedPatient}
                                onClick={() => setStep(2)}
                                className="bg-[#125B50] text-white px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0e483e] transition-all flex items-center gap-3"
                            >
                                Continue to Diet Plan <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Protocol Selection */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 md:p-12 space-y-6">
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4 mb-8">
                            <div className="bg-white p-2 rounded-xl text-amber-500 shadow-sm"><User size={20} /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Prescribing for Patient</p>
                                <p className="text-sm font-bold text-gray-900">{selectedPatient.name} — {selectedPatient.condition}</p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {dietPlans.map(plan => (
                                <button 
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan)}
                                    // Make auto-suggestion visual hit
                                    className={`w-full text-left p-6 rounded-[1.5rem] border transition-all flex items-center justify-between ${selectedPlan?.id === plan.id ? 'border-[#125B50] bg-[#eaf1ef] shadow-md' : 'border-gray-100 bg-white hover:border-[#125B50]/30 hover:shadow-sm'} ${plan.category.includes(selectedPatient.condition.split(' ')[1] || selectedPatient.condition) ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-black text-gray-900">{plan.name}</h3>
                                            {plan.category.includes(selectedPatient.condition.split(' ')[1] || selectedPatient.condition) && (
                                                <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Recommended</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{plan.category}</p>
                                    </div>
                                    {selectedPlan?.id === plan.id ? <CheckCircle2 size={24} className="text-[#125B50]" /> : <ChevronRight size={24} className="text-gray-300" />}
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-8 flex justify-between">
                            <button 
                                onClick={() => setStep(1)}
                                className="px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all border border-gray-200"
                            >
                                Back
                            </button>
                            <button 
                                disabled={!selectedPlan}
                                onClick={() => setStep(3)}
                                className="bg-[#125B50] text-white px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0e483e] transition-all flex items-center gap-3"
                            >
                                Review Prescription <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 md:p-12 flex flex-col items-center text-center space-y-6">
                        <div className="size-24 bg-[#eaf1ef] text-[#125B50] rounded-[2rem] flex items-center justify-center mb-4">
                            <Calendar size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Confirm Assignment</h2>
                        <p className="text-sm font-medium text-gray-500 max-w-sm">
                            You are about to assign <span className="font-bold text-gray-900">{selectedPlan.name}</span> to <span className="font-bold text-gray-900">{selectedPatient.name}</span> starting today.
                        </p>
                        
                        <div className="w-full max-w-sm bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-3 my-4 text-left">
                           <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Patient</span>
                               <span className="text-xs font-bold text-gray-900">{selectedPatient.name}</span>
                           </div>
                           <div className="flex justify-between items-center text-left">
                               <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Protocol</span>
                               <span className="text-xs font-bold text-[#125B50]">{selectedPlan.name}</span>
                           </div>
                        </div>

                        <div className="flex gap-4 w-full max-w-sm">
                            <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all border border-gray-200">
                                Edit
                            </button>
                            <button onClick={() => {
                                alert("Diet Assigned Successfully! The patient will be notified.");
                                setStep(1); setSelectedPatient(null); setSelectedPlan(null);
                            }} className="flex-[2] bg-[#125B50] text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#0e483e] transition-all shadow-lg shadow-[#125B50]/20 flex justify-center items-center gap-2">
                                <CheckCircle2 size={16} /> Confirm & Notify
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
