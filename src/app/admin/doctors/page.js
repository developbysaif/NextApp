"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    Stethoscope,
    ShieldCheck,
    MoreVertical,
    Star,
    Mail,
    Phone,
    MapPin,
    Loader2,
    Check,
    X,
    UserCircle,
    Trash2
} from 'lucide-react';

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/doctors');
            const data = await response.json();
            if (data.success) {
                setDoctors(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleVerification = async (id, currentStatus) => {
        setUpdatingId(id);
        try {
            const response = await fetch(`/api/doctors/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isVerified: !currentStatus })
            });
            const data = await response.json();
            if (data.success) {
                setDoctors(prev => prev.map(d => d._id === id ? { ...d, isVerified: !currentStatus } : d));
            }
        } catch (error) {
            console.error('Update error:', error);
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteDoctor = async (id) => {
        if (!confirm('Are you sure you want to remove this doctor from the registry?')) return;

        try {
            const response = await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data.success) {
                setDoctors(prev => prev.filter(d => d._id !== id));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const filteredDoctors = doctors.filter(d =>
        d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-[#142A1D] mb-4" size={40} />
            <p className="text-[10px] font-bold text-[#8D9F91] uppercase tracking-[0.2em]">Verifying Practitioners...</p>
        </div>
    );

    return (
        <div className="space-y-10 pb-20 relative font-sans text-[#203626]">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
                <div>
                    <h1 className="text-[32px] font-bold tracking-tight text-[#142A1D] font-sans">Professional Registry</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-bold text-[#8D9F91] uppercase tracking-[0.15em]">
                            {doctors.length} Registered Experts
                        </span>
                        <div className="w-1 h-1 bg-[#D1D9CA] rounded-full"></div>
                        <span className="text-[10px] font-bold text-[#E18D5E] uppercase tracking-[0.15em]">
                            {doctors.filter(d => !d.isVerified).length} Pending Approval
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => window.location.href = '/doctors/register'}
                    className="flex items-center gap-2 px-8 py-4 bg-[#142A1D] text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#0A1A10] transition-all shadow-[0_10px_20px_rgba(20,42,29,0.2)]"
                >
                    <Plus size={20} strokeWidth={2.5} />
                    Onboard Practitioner
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-[#EFECE0] p-6 rounded-[32px] border border-white flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8D9F91] group-focus-within:text-[#142A1D] transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by specialist name, department or city..."
                        className="w-full bg-white/60 border-transparent rounded-[24px] pl-16 pr-6 py-4 text-[13px] font-medium text-[#142A1D] focus:bg-white focus:shadow-inner transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white/60 rounded-[24px] font-bold text-[10px] uppercase tracking-widest text-[#546458] hover:bg-white transition-all shadow-sm">
                        <Filter size={16} />
                        Status: All
                    </button>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDoctors.map((doctor) => (
                    <motion.div
                        key={doctor._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[48px] border border-[#D1D9CA]/40 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                    >
                        {/* Status Badge Top Right */}
                        <div className="absolute top-8 right-8">
                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${doctor.isVerified ? 'bg-[#E4EFE3] text-[#1A5A3B] border-[#1A5A3B]/10' : 'bg-[#FEF1E9] text-[#E18D5E] border-[#E18D5E]/10'}`}>
                                {doctor.isVerified ? 'Verified' : 'Pending'}
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-28 h-28 bg-[#F4F4EB] rounded-[40px] overflow-hidden flex items-center justify-center border-4 border-white shadow-xl mb-8 relative group-hover:scale-105 transition-transform duration-700">
                                {doctor.image ? (
                                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle size={48} className="text-[#D1D9CA]" />
                                )}
                                {doctor.isVerified && (
                                    <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#3B925D] border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                                        <ShieldCheck size={18} className="text-white" />
                                    </div>
                                )}
                            </div>

                            <h3 className="text-[20px] font-bold text-[#142A1D] tracking-tight mb-1">{doctor.name}</h3>
                            <p className="text-[11px] font-bold uppercase text-[#3B925D] tracking-[0.1em] mb-4">{doctor.specialty || 'General Practitioner'}</p>

                            <div className="flex items-center gap-1.5 mb-8">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={14} className={s <= (doctor.rating || 5) ? 'text-[#E18D5E] fill-[#E18D5E]' : 'text-[#D1D9CA]'} />
                                ))}
                                <span className="text-[10px] font-bold text-[#8D9F91] ml-2 tracking-tight">({doctor.reviews || 0} reviews)</span>
                            </div>

                            <div className="w-full space-y-4 mb-10 pt-8 border-t border-[#F8F6EF]">
                                <div className="flex items-center gap-4 text-[#546458]">
                                    <div className="w-8 h-8 rounded-xl bg-[#F4F4EB] flex items-center justify-center shrink-0">
                                        <Mail size={14} />
                                    </div>
                                    <span className="text-[11px] font-bold truncate">{doctor.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-4 text-[#546458]">
                                    <div className="w-8 h-8 rounded-xl bg-[#F4F4EB] flex items-center justify-center shrink-0">
                                        <MapPin size={14} />
                                    </div>
                                    <span className="text-[11px] font-bold truncate">{doctor.location || 'Pakistan'}</span>
                                </div>
                            </div>

                            {/* Approval Controls */}
                            <div className="grid grid-cols-2 gap-3 w-full">
                                {doctor.isVerified ? (
                                    <button
                                        disabled={updatingId === doctor._id}
                                        onClick={() => toggleVerification(doctor._id, true)}
                                        className="w-full py-4 bg-[#FEF1E9] text-[#A13124] rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#A13124] hover:text-white transition-all disabled:opacity-50"
                                    >
                                        {updatingId === doctor._id ? <Loader2 className="animate-spin" size={12} /> : <X size={14} />}
                                        Revoke
                                    </button>
                                ) : (
                                    <button
                                        disabled={updatingId === doctor._id}
                                        onClick={() => toggleVerification(doctor._id, false)}
                                        className="w-full py-4 bg-[#E4EFE3] text-[#1A5A3B] rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1A5A3B] hover:text-white transition-all disabled:opacity-50"
                                    >
                                        {updatingId === doctor._id ? <Loader2 className="animate-spin" size={12} /> : <Check size={14} />}
                                        Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteDoctor(doctor._id)}
                                    className="w-full py-4 bg-[#F8F7F4] text-[#8D9F91] rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#203626] hover:text-white transition-all"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredDoctors.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-[#EFECE0] rounded-[60px] border border-white">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Stethoscope size={36} className="text-[#D1D9CA]" />
                        </div>
                        <h3 className="text-[18px] font-bold text-[#142A1D]">Registry search yielded zero results.</h3>
                        <p className="text-[13px] font-medium text-[#8D9F91] mt-2">Try refined keywords or check the pending queue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
