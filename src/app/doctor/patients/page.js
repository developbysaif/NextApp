"use client"

import React, { useState, useEffect } from 'react';
import { Search, User, Activity, ChevronRight, Stethoscope, Mail, Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DoctorPatientDirectory() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch all users with role 'customer'
        // Simulating with dummy data for now
        setTimeout(() => {
            setPatients([
                { id: 1, name: 'Amna Ali', email: 'amna@example.com', age: 28, condition: 'Diabetes', status: 'Active' },
                { id: 2, name: 'Zaid Khan', email: 'zaid@example.com', age: 45, condition: 'Hypertension', status: 'Pending' },
                { id: 3, name: 'Sara Ahmed', email: 'sara@example.com', age: 34, condition: 'General Health', status: 'Active' },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const filteredPatients = patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Patient Directory</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage clinical profiles and assign plans</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#125B50] outline-none shadow-sm transition-all"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Patient</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Condition</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Activity</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPatients.map((p, idx) => (
                                <motion.tr 
                                    key={p.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group hover:bg-[#eaf1ef]/30 transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-[#eaf1ef] text-[#125B50] flex items-center justify-center font-black text-sm">
                                                {p.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">{p.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <Activity size={14} className="text-[#125B50]" />
                                            <span className="text-xs font-black text-gray-700">{p.condition}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Last Sync</p>
                                        <p className="text-xs font-black text-gray-700">2 hours ago</p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Link 
                                            href={`/doctor/assign-diet?patient=${p.id}`}
                                            className="inline-flex items-center gap-2 text-[#125B50] bg-[#eaf1ef] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#125B50] hover:text-white transition-all"
                                        >
                                            <Stethoscope size={14} /> Assign Diet
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredPatients.length === 0 && !loading && (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                    <User size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No patients found matches your criteria</p>
                </div>
            )}
        </div>
    );
}
