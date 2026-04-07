"use client"

import React, { useState, useEffect } from 'react';
import { 
    Activity, Search, Plus, Edit2, Trash2, X, Image as ImageIcon, 
    Clock, Gauge, Dumbbell, ChevronRight, Save
} from 'lucide-react';

export default function AdminExercisesPage() {
    const [exercises, setExercises] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingExercise, setEditingExercise] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        image: '',
        category: 'Strength',
        duration: '',
        intensity: 'Medium',
        calories: '',
        equipment: '',
        steps: [''],
        benefits: ['']
    });

    useEffect(() => {
        const savedExercises = JSON.parse(localStorage.getItem("adminExercises") || "[]");
        setExercises(savedExercises);
        setLoading(false);
    }, []);

    const saveToLocalStorage = (data) => {
        localStorage.setItem("adminExercises", JSON.stringify(data));
        setExercises(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            const slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            setFormData(prev => ({ ...prev, title: value, slug }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayInput = (index, value, type) => {
        const updated = [...formData[type]];
        updated[index] = value;
        setFormData(prev => ({ ...prev, [type]: updated }));
    };

    const addArrayField = (type) => {
        setFormData(prev => ({ ...prev, [type]: [...prev[type], ''] }));
    };

    const removeArrayField = (index, type) => {
        const updated = formData[type].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [type]: updated }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedExercises;
        if (editingExercise) {
            updatedExercises = exercises.map(ex => ex.id === editingExercise.id ? { ...formData, id: ex.id } : ex);
        } else {
            updatedExercises = [...exercises, { ...formData, id: Date.now() }];
        }
        saveToLocalStorage(updatedExercises);
        closeModal();
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this exercise?")) {
            const updated = exercises.filter(ex => ex.id !== id);
            saveToLocalStorage(updated);
        }
    };

    const openModal = (ex = null) => {
        if (ex) {
            setEditingExercise(ex);
            setFormData(ex);
        } else {
            setEditingExercise(null);
            setFormData({
                title: '',
                slug: '',
                description: '',
                image: '',
                category: 'Strength',
                duration: '',
                intensity: 'Medium',
                calories: '',
                equipment: '',
                steps: [''],
                benefits: ['']
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingExercise(null);
    };

    const filteredExercises = exercises.filter(ex => 
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return null;

    return (
        <div className="p-8 bg-[#FDFBF7] min-h-screen font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <Dumbbell className="text-[#B4E567]" size={32}/>
                        Exercise Management
                    </h1>
                    <p className="text-gray-500 text-sm font-medium mt-1">Curate and manage global workout programs</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search exercises..." 
                            className="w-full bg-white rounded-2xl py-3 pl-11 pr-4 text-sm font-medium border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-[#B4E567]/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => openModal()}
                        className="bg-[#B4E567] text-gray-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[#B4E567]/20 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Plus size={16}/> Add Exercise
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredExercises.map(ex => (
                    <div key={ex.id} className="bg-white rounded-[2.5rem] p-5 border border-gray-50 shadow-sm hover:shadow-xl transition-all group relative">
                        <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-5">
                            <img src={ex.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400"} alt={ex.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 left-4">
                                <span className="bg-[#B4E567] text-gray-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                                    {ex.category}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal(ex)} className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-900 shadow-lg hover:bg-[#B4E567] transition-colors"><Edit2 size={12}/></button>
                                <button onClick={() => handleDelete(ex.id)} className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-900 shadow-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={12}/></button>
                            </div>
                        </div>
                        <div className="px-2">
                            <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 truncate">{ex.title}</h3>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><Clock size={12}/> {ex.duration} min</span>
                                <span className="flex items-center gap-1"><Gauge size={12}/> {ex.intensity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="bg-[#FDFBF7] rounded-[3rem] p-8 md:p-12 w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar border border-white/30">
                        <button onClick={closeModal} className="absolute top-8 right-10 text-gray-400 hover:text-red-500 transition-colors"><X size={32}/></button>
                        
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-8">
                            {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Title</label>
                                    <input 
                                        required
                                        name="title"
                                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:ring-2 focus:ring-[#B4E567]/50"
                                        placeholder="Exercise name..."
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Category</label>
                                    <select 
                                        name="category"
                                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none cursor-pointer appearance-none"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option>Strength</option>
                                        <option>Cardio</option>
                                        <option>Yoga</option>
                                        <option>Pilates</option>
                                        <option>Crossfit</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Description</label>
                                <textarea 
                                    name="description"
                                    rows="3"
                                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-6 py-5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#B4E567]/50 resize-none"
                                    placeholder="Brief overview of the exercise..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1 text-center block">Duration (min)</label>
                                    <input 
                                        name="duration"
                                        type="number"
                                        className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-center text-xs font-bold"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1 text-center block">Intensity</label>
                                    <select 
                                        name="intensity"
                                        className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-center text-xs font-bold appearance-none cursor-pointer"
                                        value={formData.intensity}
                                        onChange={handleInputChange}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1 text-center block">Calories</label>
                                    <input 
                                        name="calories"
                                        type="number"
                                        className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-center text-xs font-bold"
                                        value={formData.calories}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1 text-center block">Equipment</label>
                                    <input 
                                        name="equipment"
                                        className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-center text-xs font-bold"
                                        value={formData.equipment}
                                        onChange={handleInputChange}
                                        placeholder="None, Dumbbells, etc."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Image URL</label>
                                <input 
                                    name="image"
                                    className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none"
                                    placeholder="Paste high-quality URL..."
                                    value={formData.image}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Dynamic Steps */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Exercise Steps / Instructions</label>
                                    <button type="button" onClick={() => addArrayField('steps')} className="text-[#B4E567] text-[10px] font-black uppercase tracking-widest">+ Add Step</button>
                                </div>
                                <div className="space-y-3">
                                    {formData.steps.map((step, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center font-black text-xs text-gray-400 shrink-0">{i + 1}</div>
                                            <input 
                                                className="flex-1 bg-white border border-gray-100 rounded-xl px-5 py-3 text-xs font-bold outline-none"
                                                value={step}
                                                onChange={(e) => handleArrayInput(i, e.target.value, 'steps')}
                                                placeholder="Instruction step..."
                                            />
                                            <button type="button" onClick={() => removeArrayField(i, 'steps')} className="text-gray-300 hover:text-red-500"><X size={16}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dynamic Benefits */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Key Benefits</label>
                                    <button type="button" onClick={() => addArrayField('benefits')} className="text-[#B4E567] text-[10px] font-black uppercase tracking-widest">+ Add Benefit</button>
                                </div>
                                <div className="space-y-3">
                                    {formData.benefits.map((benefit, i) => (
                                        <div key={i} className="flex gap-3">
                                            <input 
                                                className="flex-1 bg-white border border-gray-100 rounded-xl px-5 py-3 text-xs font-bold outline-none"
                                                value={benefit}
                                                onChange={(e) => handleArrayInput(i, e.target.value, 'benefits')}
                                                placeholder="e.g. Improves core strength"
                                            />
                                            <button type="button" onClick={() => removeArrayField(i, 'benefits')} className="text-gray-300 hover:text-red-500"><X size={16}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#B4E567] text-gray-900 font-black py-5 rounded-[2rem] shadow-xl shadow-[#B4E567]/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3">
                                <Save size={18}/> {editingExercise ? 'Update Exercise' : 'Publish Exercise'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
