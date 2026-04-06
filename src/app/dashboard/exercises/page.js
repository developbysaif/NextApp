"use client"

import React, { useState } from 'react';
import { 
    Bell, Search, Filter, Plus, ChevronDown, MoreHorizontal, Minus, 
    Facebook, Twitter, Instagram, Youtube, Linkedin, DollarSign, Box, Flame,
    MoreVertical, ChevronLeft, ChevronRight, BarChart2
} from 'lucide-react';

export default function GroceryDashboard() {
    const [activeTab, setActiveTab] = useState('All Categories');

    const stats = [
        { label: 'Estimated Cost', value: '$157', change: '+2.08%', isPositive: true, icon: DollarSign, color: 'text-green-700', bg: 'bg-[#B4E567]', iconColor: 'text-[#506e1b]' },
        { label: 'Total items', value: '40', change: '+10.2%', isPositive: true, icon: Box, color: 'text-orange-700', bg: 'bg-[#FFD166]', iconColor: 'text-[#875c00]' },
        { label: 'Total Calories', value: '21,615', valSuffix: 'kcal', change: '-3.56%', isPositive: false, icon: Flame, color: 'text-orange-600', bg: 'bg-[#FF9F43]', iconColor: 'text-[#7a3900]' },
    ];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const barData = [60, 50, 45, 55, 100, 55, 45, 55, 65, 55, 45, 55]; // Heights visually approximated (Max 100)

    const categories = ['All Categories', 'Grains', 'Fruits', 'Veggies', 'Protein', 'Dairy', 'Others'];

    const items = [
        { id: 1, name: 'Oats', category: 'Grains', catColor: 'bg-orange-100 text-orange-600', qty: 500, unit: 'gr', cals: '1900', cost: '$0.60', img: '🥣' },
        { id: 2, name: 'Almond Butter', category: 'Others', catColor: 'bg-gray-100 text-gray-600', qty: 1, unit: 'jar', cals: '1600', cost: '$5', img: '🥜' },
        { id: 3, name: 'Berries', category: 'Fruits', catColor: 'bg-orange-50 text-orange-500', qty: 200, unit: 'gr', cals: '120', cost: '$2', img: '🫐' },
        { id: 4, name: 'Chicken Breast', category: 'Protein', catColor: 'bg-orange-200 text-orange-700', qty: 1, unit: 'kg', cals: '1650', cost: '$8', img: '🍗' },
        { id: 5, name: 'Avocado', category: 'Fruits', catColor: 'bg-orange-50 text-orange-500', qty: 3, unit: 'units', cals: '720', cost: '$2', img: '🥑' },
        { id: 6, name: 'Spinach', category: 'Veggies', catColor: 'bg-[#B4E567]/30 text-[#506e1b]', qty: 300, unit: 'gr', cals: '65', cost: '$1', img: '🥬' },
        { id: 7, name: 'Sweet Potatoes', category: 'Veggies', catColor: 'bg-[#B4E567]/30 text-[#506e1b]', qty: 3, unit: 'units', cals: '360', cost: '$1', img: '🍠' },
        { id: 8, name: 'Greek Yogurt', category: 'Dairy', catColor: 'bg-orange-100 text-orange-700', qty: 1, unit: 'tub', cals: '600', cost: '$4', img: '🥛' },
        { id: 9, name: 'Quinoa', category: 'Grains', catColor: 'bg-orange-100 text-orange-600', qty: 500, unit: 'gr', cals: '1800', cost: '$1', img: '🍚' },
        { id: 10, name: 'Brown Rice', category: 'Grains', catColor: 'bg-orange-100 text-orange-600', qty: 500, unit: 'g', cals: '1800', cost: '$0.80', img: '🍛' },
    ];

    return (
        <div className="min-h-screen bg-[#FCFAEF] text-gray-800 p-8 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Grocery List</h1>
                <div className="flex items-center gap-4">
                    <div className="relative bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm cursor-pointer">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-100 overflow-hidden cursor-pointer shadow-sm">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-[1.5rem] p-6 flex flex-col justify-between shadow-sm border border-gray-50 h-36">
                        <div className="flex items-center justify-between mb-2">
                            <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center`}>
                                <stat.icon className={stat.iconColor} size={20} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
                            <div className="flex items-end justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                                    {stat.valSuffix && <span className="text-gray-400 text-sm font-medium">{stat.valSuffix}</span>}
                                </div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${stat.isPositive ? 'bg-gray-100 text-gray-600' : 'bg-red-50 text-red-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Middle Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Expense Overview (Spans 2 columns on lg) */}
                <div className="lg:col-span-3 xl:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-50 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Expense Overview</h2>
                        <button className="flex items-center gap-1 ext-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg font-medium">
                            This Year <ChevronDown size={14} />
                        </button>
                    </div>
                    
                    <div className="flex-1 flex items-end justify-between gap-2 h-48 mt-4 relative">
                        {/* Fake Y-Axis */}
                        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400 font-medium">
                            <span>$600</span>
                            <span>$450</span>
                            <span>$300</span>
                            <span>$150</span>
                            <span>$0</span>
                        </div>
                        {/* Horizontal Grid Lines */}
                        <div className="absolute left-8 right-0 top-1.5 bottom-6 flex flex-col justify-between z-0">
                            {[1,2,3,4,5].map(i => <div key={i} className="border-t border-gray-100 w-full"></div>)}
                        </div>
                        
                        {/* Bars Container */}
                        <div className="flex-1 flex items-end justify-between ml-10 h-full relative z-10 pb-6">
                            {barData.map((val, idx) => (
                                <div key={idx} className="flex flex-col items-center group w-full px-1">
                                    {idx === 4 && (
                                        <div className="absolute -top-3 bg-white shadow-md rounded-lg py-1 px-3 text-[10px] font-bold text-gray-700 whitespace-nowrap z-20">
                                            May 2028
                                            <div className="text-center text-sm font-bold mt-0.5">$530</div>
                                        </div>
                                    )}
                                    <div 
                                        className={`w-full max-w-[24px] rounded-t-md transition-all duration-300 ${idx === 4 ? 'bg-[#FF9F43]' : 'bg-[#FFD166] hover:bg-[#FF9F43]'}`} 
                                        style={{ height: `${val}%` }}
                                    ></div>
                                    <span className={`text-[10px] font-medium mt-3 absolute bottom-0 ${idx === 4 ? 'text-gray-800 font-bold' : 'text-gray-400'}`}>
                                        {months[idx]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Expense Breakdown & Grocery Category */}
                <div className="lg:col-span-3 xl:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Expense Breakdown */}
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-50">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-gray-900">Expense Breakdown</h2>
                            <button className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md font-medium">
                                This Week <ChevronDown size={12} />
                            </button>
                        </div>
                        <div className="flex items-center justify-center relative my-4 h-32">
                            {/* Simple CSS Donut representation */}
                            <div className="w-28 h-28 rounded-full border-[12px] border-gray-100 relative overflow-hidden flex items-center justify-center">
                                {/* SVG for real donut portions would go here, mimicking with border colors for now */}
                                <svg viewBox="0 0 36 36" className="absolute w-32 h-32 -rotate-90">
                                    <path className="text-[#FF9F43]" strokeDasharray="30 100" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="text-[#B4E567]" strokeDasharray="25 100" strokeDashoffset="-30" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="text-[#FFD166]" strokeDasharray="18 100" strokeDashoffset="-55" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="text-[#ffb774]" strokeDasharray="15 100" strokeDashoffset="-73" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                
                                <div className="text-center absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-lg font-bold text-gray-900 leading-tight">$157</div>
                                    <div className="text-[8px] text-gray-400 font-medium">Total Expense</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 mt-4 ml-6">
                            {[
                                { name: 'Protein', val: '$47.10', pct: '30%', dot: 'bg-[#B4E567]' },
                                { name: 'Grains', val: '$38.25', pct: '25%', dot: 'bg-[#FFD166]' },
                                { name: 'Fruits', val: '$28.26', pct: '18%', dot: 'bg-[#FF9F43]' },
                                { name: 'Veggies', val: '$23.55', pct: '15%', dot: 'bg-[#ffb774]' },
                                { name: 'Dairy', val: '$10.99', pct: '7%', dot: 'bg-gray-200' },
                                { name: 'Others', val: '$7.85', pct: '5%', dot: 'bg-gray-300' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                                        <span className="text-gray-500 font-medium">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-400 text-[10px]">{item.val}</span>
                                        <span className="font-bold text-gray-800 w-6 text-right">{item.pct}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Grocery Category */}
                    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-50 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-gray-900">Grocery Category</h2>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>
                        <div className="flex items-baseline gap-1 mb-3">
                            <span className="text-xs text-gray-400">Total</span>
                            <span className="text-xl font-bold text-gray-900">40</span>
                            <span className="text-xs text-gray-400">items</span>
                        </div>
                        
                        {/* Progress bar composite */}
                        <div className="flex h-2 mb-6 gap-1">
                            <div className="h-full bg-[#B4E567] rounded-l-full w-[30%]"></div>
                            <div className="h-full bg-[#FFD166] w-[25%]"></div>
                            <div className="h-full bg-[#FF9F43] w-[20%]"></div>
                            <div className="h-full bg-[#ffb774] w-[15%]"></div>
                            <div className="h-full bg-gray-200 w-[5%]"></div>
                            <div className="h-full bg-gray-300 rounded-r-full w-[5%]"></div>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                             {[
                                { name: 'Grains', count: '12 items', pct: '30%', dot: 'bg-[#B4E567]' },
                                { name: 'Veggies', count: '10 items', pct: '25%', dot: 'bg-[#FFD166]' },
                                { name: 'Protein', count: '8 items', pct: '20%', dot: 'bg-[#FF9F43]' },
                                { name: 'Fruits', count: '6 items', pct: '15%', dot: 'bg-[#ffb774]' },
                                { name: 'Dairy', count: '2 items', pct: '5%', dot: 'bg-gray-200' },
                                { name: 'Others', count: '2 items', pct: '5%', dot: 'bg-gray-300' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-3 h-3 rounded-sm ${item.dot}`}></span>
                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 text-[10px]">{item.count}</span>
                                        <span className="font-bold text-gray-800 w-6 text-right">{item.pct}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="mb-2">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Grocery List</h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 max-w-md w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search item" 
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder-gray-400"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-gray-100 text-sm font-medium text-gray-600 rounded-xl hover:bg-gray-50 flex-shrink-0">
                            <Filter size={16} className="text-gray-400" /> Filter <ChevronDown size={14} className="text-gray-400" />
                        </button>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm text-gray-400">Sort by:</span>
                        <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 bg-white border border-gray-100 px-3 py-2 rounded-lg">
                            Newest <ChevronDown size={14} />
                        </button>
                        <button className="bg-[#B4E567] text-[#506e1b] px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 hover:bg-[#a6d956] transition-colors shadow-sm">
                            <Plus size={16} strokeWidth={3} /> Add item
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-t-3xl pt-2 pb-0 px-2 flex gap-1 overflow-x-auto no-scrollbar border-b border-gray-100">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setActiveTab(cat)}
                        className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors rounded-t-2xl ${activeTab === cat ? 'bg-white text-gray-900 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)] relative z-10' : 'text-gray-400 hover:text-gray-600'}`}
                        style={{ borderBottom: activeTab === cat ? 'none' : '' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-b-3xl rounded-tr-3xl shadow-sm border border-gray-50 border-t-0 p-6 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                <th className="pb-4 font-semibold text-gray-400 hover:text-gray-600 cursor-pointer flex items-center gap-1">Item Name <span className="text-[8px]">▼</span></th>
                                <th className="pb-4 font-semibold text-gray-400">Category <span className="text-[8px]">▼</span></th>
                                <th className="pb-4 font-semibold text-gray-400">Qty <span className="text-[8px]">▼</span></th>
                                <th className="pb-4 font-semibold text-gray-400">Calories <span className="text-[8px]">▼</span></th>
                                <th className="pb-4 font-semibold text-gray-400">Cost <span className="text-[8px]">▼</span></th>
                                <th className="pb-4 font-semibold text-gray-400 text-right pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-lg shadow-sm border border-orange-100/50">
                                                {item.img}
                                            </div>
                                            <span className="font-bold text-sm text-gray-800">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-left">
                                        <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide ${item.catColor}`}>
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-sm text-gray-700 w-8 text-center">{item.qty}</span>
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                                                <button className="w-5 h-5 flex items-center justify-center bg-white rounded shadow-sm text-gray-400 hover:text-gray-600"><Minus size={12} /></button>
                                                <button className="w-5 h-5 flex items-center justify-center bg-white rounded shadow-sm text-gray-400 hover:text-gray-600 ml-1"><Plus size={12} /></button>
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium ml-1">{item.unit}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-sm">
                                        <span className="font-bold text-gray-800">{item.cals}</span> <span className="text-xs text-gray-400 font-medium">kcal</span>
                                    </td>
                                    <td className="py-4 text-sm font-bold text-gray-800">
                                        {item.cost}
                                    </td>
                                    <td className="py-4 text-right pr-4">
                                        <button className="text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center ml-auto">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination & Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-6 text-sm">
                <div className="flex items-center gap-2 text-gray-500 font-medium text-xs">
                    Showing 
                    <button className="flex items-center gap-1 bg-white border border-gray-100 rounded px-2 py-1 mx-1 font-bold text-gray-700">
                        10 <ChevronDown size={12} />
                    </button>
                    out of 40
                </div>
                
                <div className="flex items-center gap-1.5">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"><ChevronLeft size={16} /></button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#B4E567] text-[#506e1b] font-bold shadow-sm">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 font-medium">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 font-medium">3</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 font-medium">4</button>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"><ChevronRight size={16} /></button>
                </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400">
                <div>Copyright © 2024 Peterdraw</div>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">Term and conditions</a>
                    <a href="#" className="hover:text-gray-600 transition-colors">Contact</a>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <a href="#" className="hover:text-gray-600 transition-colors"><Facebook size={16} /></a>
                    <a href="#" className="hover:text-gray-600 transition-colors"><Twitter size={16} /></a>
                    <a href="#" className="hover:text-gray-600 transition-colors"><Instagram size={16} /></a>
                    <a href="#" className="hover:text-gray-600 transition-colors"><Youtube size={16} /></a>
                    <a href="#" className="hover:text-gray-600 transition-colors"><Linkedin size={16} /></a>
                </div>
            </div>
        </div>
    );
}

