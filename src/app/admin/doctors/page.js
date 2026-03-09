"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
    Loader2
} from 'lucide-react';

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredDoctors = doctors.filter(d =>
        d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Verifying Practitioners...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black font-outfit tracking-tight text-[#21492f]">Doctor Directory</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {doctors.length} Verified medical professionals
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 px-6 py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100"
                >
                    <Plus size={20} />
                    Register New Doctor
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search by specialist name or medical department..."
                        className="w-full bg-[#F8F7F4] border-transparent rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                    <motion.div
                        key={doctor._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6">
                            <button className="text-gray-300 hover:text-green-600 transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-green-50 rounded-[2rem] overflow-hidden flex items-center justify-center border-4 border-white shadow-xl mb-6 relative group-hover:scale-105 transition-transform duration-500">
                                {doctor.image ? (
                                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Stethoscope size={32} className="text-green-600" />
                                )}
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                                    <ShieldCheck size={12} className="text-white" />
                                </div>
                            </div>

                            <h3 className="text-xl font-black text-[#21492f] font-outfit uppercase tracking-tight">{doctor.name}</h3>
                            <p className="text-[10px] font-black uppercase text-green-600 tracking-widest mt-1">{doctor.specialty || 'General Practitioner'}</p>

                            <div className="flex items-center gap-1 mt-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={12} className={s <= (doctor.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                                ))}
                                <span className="text-[10px] font-bold text-gray-400 ml-1">({doctor.reviews || 0} Reviews)</span>
                            </div>

                            <div className="w-full grid grid-cols-1 gap-3 mt-8 pt-8 border-t border-gray-50 uppercase font-black text-[9px] tracking-widest text-gray-400">
                                <div className="flex items-center gap-3">
                                    <Mail size={14} className="text-gray-200" />
                                    <span>{doctor.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={14} className="text-gray-200" />
                                    <span>{doctor.phone || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin size={14} className="text-gray-200" />
                                    <span className="truncate">{doctor.location || 'Consultation Clinic'}</span>
                                </div>
                            </div>

                            <button className="mt-8 w-full py-3 bg-[#F8F7F4] hover:bg-green-600 hover:text-white text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300">
                                View Full Profile
                            </button>
                        </div>
                    </motion.div>
                ))}

                {filteredDoctors.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <Stethoscope size={48} className="text-gray-100 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-400">No practitioners found for "{searchTerm}"</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
