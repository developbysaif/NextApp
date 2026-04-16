"use client"

import React, { useEffect, useState } from 'react';
import { 
    Activity, 
    ClipboardList, 
    Utensils, 
    ShoppingCart, 
    Clock, 
    DollarSign,
    TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (user) setCurrentUser(user);
    }, []);

    const stats = [
        {
            title: "Total Diseases",
            value: "142",
            icon: Activity,
            color: "text-red-600",
            bg: "bg-red-50",
            trend: "+12% from last month"
        },
        {
            title: "Meal Plans",
            value: "86",
            icon: Utensils,
            color: "text-orange-600",
            bg: "bg-orange-50",
            trend: "+5% from last month"
        },
        {
            title: "Diet Plans",
            value: "54",
            icon: ClipboardList,
            color: "text-[#214a32]",
            bg: "bg-[#a4d9bc]/30",
            trend: "+24% from last month"
        },
        {
            title: "Total Orders",
            value: "1,204",
            icon: ShoppingCart,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: "+18% from last month"
        },
        {
            title: "Pending Orders",
            value: "32",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
            trend: "Needs attention"
        },
        {
            title: "Total Revenue",
            value: "$45,231",
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            trend: "+8% from last month"
        }
    ];

    return (
        <div className="space-y-6 pb-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {stats.map((stat, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                <h3 className="text-3xl font-black text-[#214a32] mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs font-semibold">
                            {stat.trend.includes('+') ? (
                                <>
                                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                        <TrendingUp size={12} strokeWidth={3} />
                                        <span>{stat.trend.split(' ')[0]}</span>
                                    </div>
                                    <span className="text-gray-400">{stat.trend.split(' ').slice(1).join(' ')}</span>
                                </>
                            ) : (
                                <div className="text-amber-600 bg-amber-50 px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                                    <Clock size={12} strokeWidth={3} />
                                    <span>{stat.trend}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
