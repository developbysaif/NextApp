"use client"

import React, { useState, useEffect } from 'react';
import { 
    Search, Bell, ChevronDown, Plus, 
    MoreHorizontal, Filter, FastForward, Activity,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultExercises = [
    { id: 1, name: 'Squats', sets: 4, reps: '12 repetitions', rest: '60 sec', weight: '45 kg', calories: '180 cal', status: 'Completed', color: 'bg-[#a4d9bc]', iconColor: 'text-[#215b33]' },
    { id: 2, name: 'Deadlifts', sets: 3, reps: '10 repetitions', rest: '90 sec', weight: '60 kg', calories: '220 cal', status: 'Completed', color: 'bg-[#989a69]', iconColor: 'text-[#856312]' },
    { id: 3, name: 'Bench Press', sets: 3, reps: '8 repetitions', rest: '60 sec', weight: '40 kg', calories: '150 cal', status: 'In Progress', color: 'bg-[#214a32]', iconColor: 'text-[#6b3a04]' },
    { id: 4, name: 'Pull-Ups', sets: 4, reps: '8 repetitions', rest: '90 sec', weight: 'Bodyweight', calories: '120 cal', status: 'Skipped', color: 'bg-[#a4d9bc]', iconColor: 'text-[#215b33]' },
    { id: 5, name: 'Plank', sets: 3, reps: '60 repetitions', rest: '30 sec', weight: '-', calories: '90 cal', status: 'Completed', color: 'bg-[#989a69]', iconColor: 'text-[#856312]' },
    { id: 6, name: 'Running', sets: 1, reps: '30 minutes', rest: 'N/A', weight: '-', calories: '300 cal', status: 'Completed', color: 'bg-[#214a32]', iconColor: 'text-[#6b3a04]' },
    { id: 7, name: 'Lunges', sets: 3, reps: '15 repetitions', rest: '60 sec', weight: '20 kg', calories: '160 cal', status: 'Not Started', color: 'bg-[#a4d9bc]', iconColor: 'text-[#215b33]' },
    { id: 8, name: 'Shoulder Press', sets: 3, reps: '10 repetitions', rest: '60 sec', weight: '25 kg', calories: '140 cal', status: 'Not Started', color: 'bg-[#989a69]', iconColor: 'text-[#856312]' },
    { id: 9, name: 'Bicep Curls', sets: 3, reps: '12 repetitions', rest: '45 sec', weight: '15 kg', calories: '110 cal', status: 'Skipped', color: 'bg-[#214a32]', iconColor: 'text-[#6b3a04]' },
    { id: 10, name: 'Cycling', sets: 1, reps: '45 minutes', rest: 'N/A', weight: '-', calories: '350 cal', status: 'Completed', color: 'bg-[#a4d9bc]', iconColor: 'text-[#215b33]' },
    { id: 11, name: 'Mountain Climbers', sets: 4, reps: '20 repetitions', rest: '30 sec', weight: '-', calories: '200 cal', status: 'In Progress', color: 'bg-[#989a69]', iconColor: 'text-[#856312]' },
    { id: 12, name: 'Yoga (Stretching)', sets: 1, reps: '60 minutes', rest: 'N/A', weight: '-', calories: '150 cal', status: 'Not Started', color: 'bg-[#214a32]', iconColor: 'text-[#6b3a04]' },
];

export default function ExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [healthSyncMessage, setHealthSyncMessage] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', rest: '', weight: '', calories: '' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('userExercises');
        if (stored) {
            setExercises(JSON.parse(stored));
        } else {
            setExercises(defaultExercises);
            localStorage.setItem('userExercises', JSON.stringify(defaultExercises));
        }
    }, []);

    const updateExerciseStatus = (id, newStatus) => {
        const updated = exercises.map(ex => {
            if (ex.id === id) {
                return { ...ex, status: newStatus };
            }
            return ex;
        });
        setExercises(updated);
        localStorage.setItem('userExercises', JSON.stringify(updated));

        // Evaluate backend health report sync logic
        if (newStatus === 'Completed') {
            const completedCount = updated.filter(e => e.status === 'Completed').length;
            setHealthSyncMessage(`Awesome! ${completedCount} exercises completed. Health report updated.`);
            // Update the generalized progress health score in local storage
            localStorage.setItem('healthScoreUpdate', Date.now().toString());
            setTimeout(() => setHealthSyncMessage(''), 4000);
        }
    };

    const handleAddExercise = (e) => {
        e.preventDefault();
        const colors = ['bg-[#a4d9bc]', 'bg-[#989a69]', 'bg-[#214a32]'];
        const iconColors = ['text-[#215b33]', 'text-[#856312]', 'text-[#6b3a04]'];
        const randIndex = Math.floor(Math.random() * colors.length);

        const newEx = {
            id: Date.now(),
            name: newExercise.name || 'Custom Exercise',
            sets: newExercise.sets || 1,
            reps: newExercise.reps || '10 repetitions',
            rest: newExercise.rest || '60 sec',
            weight: newExercise.weight || '-',
            calories: newExercise.calories ? newExercise.calories + ' cal' : '100 cal',
            status: 'Not Started',
            color: colors[randIndex],
            iconColor: iconColors[randIndex]
        };

        const updated = [newEx, ...exercises];
        setExercises(updated);
        localStorage.setItem('userExercises', JSON.stringify(updated));
        setIsAddModalOpen(false);
        setNewExercise({ name: '', sets: '', reps: '', rest: '', weight: '', calories: '' });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-[#a4d9bc] text-[#215b33]';
            case 'In Progress': return 'bg-[#989a69] text-[#856312]';
            case 'Skipped': return 'bg-[#214a32] text-white';
            case 'Not Started': return 'bg-gray-100 text-gray-500';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    const filteredExercises = exercises.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-[#FCFAEF] min-h-screen text-gray-800 p-8 font-sans relative">
            
            {/* Top Header */}
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">Exercises</h1>
                <div className="flex items-center gap-4">
                    <div className="relative bg-white p-2.5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer">
                        <Bell size={20} className="text-gray-400" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-400 rounded-full"></span>
                    </div>
                    <div className="flex items-center gap-3 bg-white pr-4 pl-2 py-1.5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] cursor-pointer">
                        <img 
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop" 
                            alt="User" 
                            className="w-8 h-8 rounded-xl object-cover"
                        />
                        <div className="hidden sm:block text-left">
                            <p className="text-xs font-bold text-gray-900 leading-tight">Adam Vasylenko</p>
                            <p className="text-[10px] font-medium text-gray-400">Member</p>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 ml-1" />
                    </div>
                </div>
            </header>

            {/* Sync Feedback Toast */}
            <AnimatePresence>
                {healthSyncMessage && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B4B] text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-indigo-500/30"
                    >
                        <Activity size={18} className="text-[#a4d9bc]" />
                        <span className="text-sm font-bold tracking-wide">{healthSyncMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px] lg:min-w-[280px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search for exercise" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-transparent rounded-[1.25rem] text-[13px] font-medium shadow-[0_2px_15px_rgba(0,0,0,0.02)] outline-none focus:ring-1 focus:ring-green-500 placeholder-gray-400"
                        />
                    </div>
                    
                    <button className="flex items-center gap-2 px-5 py-3 bg-white text-gray-500 text-[13px] font-bold rounded-[1.25rem] shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                        Status <ChevronDown size={14} strokeWidth={2.5} />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 bg-white text-gray-500 text-[13px] font-bold rounded-[1.25rem] shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                        This Week <ChevronDown size={14} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-[13px] font-bold text-gray-500 pr-2">
                        Popular <ChevronDown size={14} strokeWidth={2.5} className="text-gray-400" />
                    </button>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#a4d9bc] text-[#215b33] px-5 py-3 rounded-[1.25rem] font-bold text-[13px] flex items-center gap-2 hover:bg-[#a5db56] transition-colors shadow-sm"
                    >
                        <Plus size={16} strokeWidth={2.5} /> Add Exercise
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">Exercise Name <ChevronDown size={10} /></th>
                                <th className="text-left py-5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sets <ChevronDown size={10} className="inline ml-0.5" /></th>
                                <th className="text-left py-5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Reps <ChevronDown size={10} className="inline ml-0.5" /></th>
                                <th className="text-left py-5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Rest <ChevronDown size={10} className="inline ml-0.5" /></th>
                                <th className="text-left py-5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Weight <ChevronDown size={10} className="inline ml-0.5" /></th>
                                <th className="text-left py-5 px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Calories <ChevronDown size={10} className="inline ml-0.5" /></th>
                                <th className="text-right py-5 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status <ChevronDown size={10} className="inline ml-0.5" /></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredExercises.map((exercise) => (
                                <tr key={exercise.id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 ${exercise.color} ${exercise.iconColor} rounded-xl flex items-center justify-center font-black `}>
                                               {exercise.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <span className="font-bold text-[13px] text-gray-900">{exercise.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-[13px] font-black text-gray-600">{exercise.sets}</td>
                                    <td className="py-4 px-4 text-[13px] font-medium text-gray-500">{exercise.reps}</td>
                                    <td className="py-4 px-4 text-[13px] font-black text-gray-500 tracking-tight">{exercise.rest}</td>
                                    <td className="py-4 px-4 text-[13px] font-black text-gray-700 tracking-tight">{exercise.weight}</td>
                                    <td className="py-4 px-4 text-[13px] font-medium text-gray-500">{exercise.calories}</td>
                                    <td className="py-4 px-6 text-right relative">
                                        <div className="flex justify-end relative group/status">
                                            <button className={`px-4 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap min-w-[90px] text-center border border-transparent shadow-sm ${getStatusStyle(exercise.status)}`}>
                                                {exercise.status}
                                            </button>
                                            
                                            {/* Status Dropdown on Hover/Click */}
                                            <div className="absolute top-1/2 -translate-y-1/2 right-full mr-2 bg-white shadow-xl rounded-xl border border-gray-100 p-2 flex flex-col gap-1 opacity-0 pointer-events-none group-hover/status:opacity-100 group-hover/status:pointer-events-auto transition-all scale-95 group-hover/status:scale-100 z-10 w-32">
                                                <button onClick={() => updateExerciseStatus(exercise.id, 'Completed')} className="text-left px-3 py-1.5 text-xs font-bold text-[#215b33] hover:bg-[#a4d9bc]/20 rounded-md">Mark Completed</button>
                                                <button onClick={() => updateExerciseStatus(exercise.id, 'In Progress')} className="text-left px-3 py-1.5 text-xs font-bold text-[#856312] hover:bg-[#989a69]/20 rounded-md">Set In Progress</button>
                                                <button onClick={() => updateExerciseStatus(exercise.id, 'Skipped')} className="text-left px-3 py-1.5 text-xs font-bold text-[#6b3a04] hover:bg-[#214a32]/20 rounded-md">Mark Skipped</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination (Static UI from screenshot) */}
                <div className="border-t border-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
                        Showing 
                        <button className="flex items-center gap-1 font-bold text-gray-700 mx-1 border border-gray-100 px-2 py-1 rounded-md">
                            12 <ChevronDown size={12} />
                        </button> 
                        out of {exercises.length}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900">&lt;</button>
                        <button className="w-8 h-8 rounded-lg bg-[#a4d9bc] text-[#215b33] font-bold shadow-sm">1</button>
                        <button className="w-8 h-8 rounded-lg hover:bg-gray-50 text-gray-600 font-bold">2</button>
                        <button className="w-8 h-8 rounded-lg hover:bg-gray-50 text-gray-600 font-bold">3</button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900">&gt;</button>
                    </div>
                </div>
            </div>

            {/* Modal for adding exercise */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            onClick={() => setIsAddModalOpen(false)}
                        ></motion.div>
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-[2rem] shadow-2xl relative z-10 w-full max-w-lg overflow-hidden border border-gray-100"
                        >
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-900">Add New Exercise</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-700 bg-gray-50 p-2 rounded-xl"><X size={18} /></button>
                            </div>
                            <form onSubmit={handleAddExercise} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Exercise Name *</label>
                                    <input required value={newExercise.name} onChange={e => setNewExercise({...newExercise, name: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:border-transparent focus:ring-green-400 outline-none" placeholder="e.g. Weighted Squats" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Sets</label>
                                        <input value={newExercise.sets} onChange={e => setNewExercise({...newExercise, sets: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:border-transparent focus:ring-green-400 outline-none" placeholder="e.g. 3" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Reps</label>
                                        <input value={newExercise.reps} onChange={e => setNewExercise({...newExercise, reps: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:border-transparent focus:ring-green-400 outline-none" placeholder="e.g. 10 repetitions" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Rest</label>
                                        <input value={newExercise.rest} onChange={e => setNewExercise({...newExercise, rest: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:border-transparent focus:ring-green-400 outline-none" placeholder="60 sec" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Weight</label>
                                        <input value={newExercise.weight} onChange={e => setNewExercise({...newExercise, weight: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:border-transparent focus:ring-green-400 outline-none" placeholder="45 kg" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">Calories</label>
                                        <input value={newExercise.calories} onChange={e => setNewExercise({...newExercise, calories: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:border-transparent focus:ring-green-400 outline-none" placeholder="150" />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-[#a4d9bc] text-[#215b33] font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#a5dc57] transition-all shadow-md">
                                        Save Exercise
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
