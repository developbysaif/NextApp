"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    Stethoscope,
    User,
    Mail,
    Phone,
    Award,
    MapPin,
    Briefcase,
    Loader2,
    X,
    FileText,
    Image as ImageIcon
} from 'lucide-react';

export default function DoctorRegistrationPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: 'Cardiologist',
        experience: '',
        location: '',
        bio: '',
        image: ''
    });

    const specialties = [
        "Cardiologist",
        "Nutritionist",
        "Dermatologist",
        "Pediatrician",
        "General Practitioner",
        "Homeopathic Expert",
        "Neurologist"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    isVerified: false, // Must be approved by admin
                    rating: 5,
                    reviews: 0
                })
            });

            const data = await response.json();
            if (data.success) {
                setSuccess(true);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-[#F4F4EB] text-center"
                >
                    <div className="w-20 h-20 bg-[#E4EFE3] rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} className="text-[#1A5A3B]" />
                    </div>
                    <h1 className="text-3xl font-serif font-black text-[#142A1D] mb-4 tracking-tight">Application Received</h1>
                    <p className="text-[#4F5E4B] font-medium leading-relaxed mb-10">
                        Thank you for your interest! Our admin team will review your credentials. You will be visible on the platform once your profile is verified.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full py-4 bg-[#142A1D] text-white rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#0A1A10] transition-all"
                    >
                        Return Home
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCF8] py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#E4EFE3] text-[#1A5A3B] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                        <Award size={14} /> Professional Network
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-[#142A1D] mb-4 tracking-tight">Join Our Expert Panel</h1>
                    <p className="text-[#4F5E4B] font-medium max-w-lg mx-auto leading-relaxed">
                        Become a verified practitioner on Pakistan's leading organic health platform. Help us guide the nation towards natural healing.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-[#F4F4EB]"
                >
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Core Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Full Professional Name</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D1D9CA]" size={18} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Dr. Ayesha Khan"
                                        className="w-full bg-[#F4F4EB] border-transparent rounded-[20px] pl-16 pr-6 py-4 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] transition-all outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Medical Specialty</label>
                                <div className="relative">
                                    <Stethoscope className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D1D9CA]" size={18} />
                                    <select
                                        required
                                        className="w-full bg-[#F4F4EB] border-transparent rounded-[20px] pl-16 pr-6 py-4 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] appearance-none transition-all outline-none"
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                    >
                                        {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Professional Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D1D9CA]" size={18} />
                                    <input
                                        required
                                        type="email"
                                        placeholder="doctor@example.com"
                                        className="w-full bg-[#F4F4EB] border-transparent rounded-[20px] pl-16 pr-6 py-4 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] transition-all outline-none"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D1D9CA]" size={18} />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+92 XXX XXXXXXX"
                                        className="w-full bg-[#F4F4EB] border-transparent rounded-[20px] pl-16 pr-6 py-4 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] transition-all outline-none"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Years of experience</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D1D9CA]" size={18} />
                                    <input
                                        required
                                        type="number"
                                        placeholder="e.g. 10"
                                        className="w-full bg-[#F4F4EB] border-transparent rounded-[20px] pl-16 pr-6 py-4 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] transition-all outline-none"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Clinic / City Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D1D9CA]" size={18} />
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Gulberg, Lahore"
                                        className="w-full bg-[#F4F4EB] border-transparent rounded-[20px] pl-16 pr-6 py-4 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] transition-all outline-none"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Professional Image URL</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D1D9CA]" size={18} />
                                <input
                                    type="text"
                                    placeholder="Paste image link here..."
                                    className="w-full bg-[#F4F4EB] border-transparent rounded-[20px] pl-16 pr-6 py-4 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] transition-all outline-none"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#8D9F91] ml-4">Medical Bio / Philosophy</label>
                            <div className="relative">
                                <FileText className="absolute left-6 top-10 text-[#D1D9CA]" size={18} />
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Tell us about your organic health philosophy..."
                                    className="w-full bg-[#F4F4EB] border-transparent rounded-[32px] pl-16 pr-8 py-6 text-sm font-bold text-[#142A1D] focus:bg-white focus:ring-4 focus:ring-[#E4EFE3] transition-all outline-none resize-none"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 bg-[#142A1D] text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_20px_40px_rgba(20,42,29,0.2)] hover:bg-[#0A1A10] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Submitting Application...
                                </>
                            ) : (
                                <>
                                    <Stethoscope size={20} />
                                    Submit Application for Review
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
