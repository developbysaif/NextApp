"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Users, 
    Search, 
    Filter, 
    Download, 
    MoreVertical, 
    ShieldCheck, 
    User, 
    Stethoscope, 
    Crown,
    Trash2,
    Edit2,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Loader2
} from 'lucide-react';

export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeRole, setActiveRole] = useState('All');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.success && data.data && data.data.length > 0) {
                    setUsers(data.data.map(u => ({
                        id: u._id?.substring(0, 8).toUpperCase() || 'USR-00X',
                        name: u.name,
                        email: u.email,
                        role: 'USER',
                        plan: 'FREE',
                        lastActivity: 'Just now',
                        bmi: 24.5,
                        weight: '75kg',
                        status: 'ACTIVE'
                    })));
                } else {
                    // Fallback to static if no signed up users exist yet
                    setUsers([
                        { id: 'USR-001', name: 'Adam Ahmed', email: 'adam@example.com', role: 'USER', plan: 'PREMIUM', lastActivity: '2 mins ago', bmi: 24.5, weight: '78kg', status: 'ACTIVE' },
                        { id: 'DOC-002', name: 'Dr. Sarah Khan', email: 'sarah@health.com', role: 'DOCTOR', plan: 'N/A', lastActivity: '1 hour ago', bmi: 21.2, weight: '62kg', status: 'VERIFIED' },
                        { id: 'USR-003', name: 'Fatima Ali', email: 'fatima@test.com', role: 'USER', plan: 'FREE', lastActivity: 'Yesterday', bmi: 28.4, weight: '85kg', status: 'ACTIVE' },
                        { id: 'ADM-004', name: 'Zaid Malik', email: 'zaid@admin.com', role: 'ADMIN', plan: 'N/A', lastActivity: 'Just now', bmi: 23.1, weight: '70kg', status: 'ACTIVE' },
                        { id: 'USR-005', name: 'Omar Farooq', email: 'omar@example.pk', role: 'USER', plan: 'PREMIUM', lastActivity: '3 days ago', bmi: 31.0, weight: '95kg', status: 'INACTIVE' },
                    ]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const roles = ['All', 'USER', 'DOCTOR', 'ADMIN'];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#122A1A] text-white rounded-[2rem] shadow-xl shadow-green-900/10">
                        <Users size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 font-outfit uppercase tracking-tight">User Directory</h2>
                        <p className="text-gray-500 font-medium tracking-tight">Manage and monitor all platform participants.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => {
                        const csvStr = "UID,Name,Email,Role,Status\n" + users.map(u => `${u.id},${u.name},${u.email},${u.role},${u.status}`).join("\n");
                        const blob = new Blob([csvStr], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'user_directory_export.csv';
                        a.click();
                    }} className="p-4 bg-white border border-gray-100 rounded-3xl text-gray-400 hover:text-green-600 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <Download size={18} /> Export CSV
                    </button>
                    <a href="/admin/portal" className="bg-[#122A1A] text-white px-8 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/10">
                        <User size={18} /> Manage Roles
                    </a>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Members', val: '8,452', sub: '+124 new', icon: Users, color: 'text-gray-900' },
                    { label: 'Verified Doctors', val: '156', sub: '8 pending', icon: Stethoscope, color: 'text-emerald-600' },
                    { label: 'Premium Subs', val: '2,140', sub: '25.3%', icon: Crown, color: 'text-amber-500' },
                    { label: 'Active Today', val: '3,842', sub: '45.4%', icon: CheckCircle2, color: 'text-indigo-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 bg-gray-50 rounded-2xl group-hover:rotate-12 transition-transform`}><stat.icon size={20} /></div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{stat.sub}</span>
                        </div>
                        <h3 className="text-2xl font-black font-outfit">{stat.val}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Table Section */}
            <div className="bg-white p-8 md:p-12 rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div className="relative group/search flex-1 lg:max-w-md w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/search:text-[#122A1A] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or uid..." 
                            className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-inner focus:ring-2 focus:ring-[#122A1A] transition-all placeholder:text-gray-300"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                        {roles.map(role => (
                            <button
                                key={role}
                                onClick={() => setActiveRole(role)}
                                className={`px-8 py-3 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest transition-all ${activeRole === role ? 'bg-[#122A1A] text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] lg:min-w-0">
                        <thead>
                            <tr className="border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                                <th className="pb-8 text-left px-4">UID / User Information</th>
                                <th className="pb-8 text-left px-4">Role</th>
                                <th className="pb-8 text-left px-4">Health Profile</th>
                                <th className="pb-8 text-left px-4">Subscription</th>
                                <th className="pb-8 text-left px-4">Last Activity</th>
                                <th className="pb-8 text-right px-4">Status</th>
                                <th className="pb-8 text-right px-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-8 px-4">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-white shadow-sm">
                                                <img src={`https://i.pravatar.cc/150?u=${user.id}`} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase tracking-tight text-gray-900 group-hover:text-[#122A1A] transition-colors">{user.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{user.id} • {user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4">
                                        <div className="flex items-center gap-2">
                                            {user.role === 'ADMIN' && <ShieldCheck size={14} className="text-indigo-600" />}
                                            {user.role === 'DOCTOR' && <Stethoscope size={14} className="text-emerald-600" />}
                                            {user.role === 'USER' && <User size={14} className="text-gray-400" />}
                                            <span className="text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[11px] font-black text-gray-900 font-outfit uppercase tracking-tight">{user.weight}</span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">BMI: {user.bmi}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 px-4">
                                        {user.plan === 'PREMIUM' ? (
                                            <span className="px-3 py-1.5 bg-amber-50 rounded-lg text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1 w-fit"><Crown size={12} /> {user.plan}</span>
                                        ) : (
                                            <span className="px-3 py-1.5 bg-gray-50 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 w-fit">{user.plan}</span>
                                        )}
                                    </td>
                                    <td className="py-8 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{user.lastActivity}</td>
                                    <td className="py-8 px-4 text-right">
                                        <span className={`
                                            px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest
                                            ${user.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                            ${user.status === 'ACTIVE' ? 'bg-indigo-50 text-indigo-600' : ''}
                                            ${user.status === 'INACTIVE' ? 'bg-rose-50 text-rose-600' : ''}
                                        `}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-8 px-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 hover:bg-white rounded-2xl text-gray-300 hover:text-[#122A1A] shadow-sm"><Edit2 size={16} /></button>
                                            <button className="p-3 hover:bg-rose-50 rounded-2xl text-gray-300 hover:text-rose-600 shadow-sm"><Trash2 size={16} /></button>
                                            <button className="p-3 hover:bg-white rounded-2xl text-gray-300 hover:text-[#122A1A] shadow-sm"><MoreVertical size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-50 pt-10">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Showing 5 out of 8,452 users</p>
                    <div className="flex gap-2">
                        <button className="px-8 py-4 bg-gray-50 border border-gray-100 rounded-3xl text-[10px] font-black uppercase text-gray-400 hover:text-[#122A1A] transition-all flex items-center gap-2 group">
                           <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Previous
                        </button>
                        <button className="px-8 py-4 bg-[#122A1A] text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 group">
                           Next <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
