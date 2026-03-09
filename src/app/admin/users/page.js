"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Search,
    Filter,
    Mail,
    Calendar,
    MoreVertical,
    UserCircle,
    UserCheck,
    Loader2,
    Shield
} from 'lucide-react';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch from localStorage since that's where they are stored in this app
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        setUsers(storedUsers);
        setLoading(false);
    }, []);

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-green-600 mb-4" size={40} />
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Hydrating Client List...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black font-outfit tracking-tight text-[#21492f]">User Management</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {users.length} Total users registered
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row gap-4 items-center shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input
                        type="text"
                        placeholder="Search users by name, email or role..."
                        className="w-full bg-[#F8F7F4] border-transparent rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredUsers.map((user) => (
                    <motion.div
                        key={user.id || user.email}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 relative">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    <UserCircle size={32} className="text-gray-300" />
                                )}
                                {user.role === 'admin' && (
                                    <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-lg border-2 border-white shadow-lg">
                                        <Shield size={12} />
                                    </div>
                                )}
                            </div>

                            <h3 className="text-sm font-black text-[#21492f] uppercase tracking-tight">{user.name || 'Anonymous'}</h3>
                            <p className="text-[10px] font-bold text-gray-400 lowercase mt-1 truncate w-full px-2">{user.email}</p>

                            <div className="mt-4 px-3 py-1 bg-green-50 rounded-lg">
                                <span className="text-[9px] font-black uppercase text-green-600 tracking-widest">{user.role || 'User'}</span>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-50 w-full flex items-center justify-between">
                                <div className="text-left">
                                    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest leading-none">Joined</p>
                                    <p className="text-[10px] font-bold text-gray-500 mt-1">{user.createdAt ? new Date(parseInt(user.id) || Date.now()).toLocaleDateString() : 'Active'}</p>
                                </div>
                                <button className="p-2 text-gray-300 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <Users size={48} className="text-gray-100 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-400">No users found for "{searchTerm}"</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
