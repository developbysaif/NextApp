"use client"

import React, { useState, useEffect } from 'react';
import { 
    Calendar as CalendarIcon, Search, Filter, Plus, ChevronLeft, ChevronRight, 
    Clock, Utensils, Zap, Flame, MoreHorizontal, Edit2, Trash2, LayoutGrid, List,
    Image as ImageIcon, Tag, FileText, CheckCircle2, X
} from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
const CATEGORIES = [
    { name: 'Breakfast', icon: Clock, color: 'bg-[#B4E567]', text: 'text-[#215b33]', light: 'bg-[#f0f9e1]' },
    { name: 'Lunch', icon: Utensils, color: 'bg-[#FFD166]', text: 'text-[#8f680d]', light: 'bg-[#fff9eb]' },
    { name: 'Snack', icon: Zap, color: 'bg-[#FF9F43]', text: 'text-[#8c4d0f]', light: 'bg-[#fff5eb]' },
    { name: 'Dinner', icon: Flame, color: 'bg-[#94a3b8]', text: 'text-white', light: 'bg-slate-50' }
];

export default function AdminMealPlanPage() {
    const [activeWeek, setActiveWeek] = useState('Week 1');
    const [viewMode, setViewMode] = useState('plan'); // 'plan' or 'library'
    const [mealPlan, setMealPlan] = useState({});
    const [library, setLibrary] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modals
    const [isMealModalOpen, setIsMealModalOpen] = useState(false);
    const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
    
    // Form States
    const [editingCell, setEditingCell] = useState(null); // { week, day, cat }
    const [newDish, setNewDish] = useState({ title: '', description: '', img: '', category: 'Breakfast' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let savedPlan = JSON.parse(localStorage.getItem("adminWeeklyMealPlan") || "{}");
        const hasReset = localStorage.getItem("clearDummyData1");
        
        if (!hasReset || Object.keys(savedPlan).length === 0) {
            const seed = {};
            WEEKS.forEach(w => {
                seed[w] = {};
                DAYS.forEach(day => {
                    seed[w][day] = {
                        breakfast: { title: 'Empty', img: '' },
                        lunch: { title: 'Empty', img: '' },
                        snack: { title: 'Empty', img: '' },
                        dinner: { title: 'Empty', img: '' }
                    };
                });
            });
            setMealPlan(seed);
            localStorage.setItem("adminWeeklyMealPlan", JSON.stringify(seed));
            
            // Sync with frontend legacy key to erase past dummy data there too
            const frontendFormat = {};
            DAYS.forEach(d => {
                frontendFormat[d] = {
                    breakfast: { name: 'Empty', img: '' },
                    lunch: { name: 'Empty', img: '' },
                    snack: { name: 'Empty', img: '' },
                    dinner: { name: 'Empty', img: '' }
                }
            });
            localStorage.setItem("adminMealPlan", JSON.stringify(frontendFormat));
        } else {
            setMealPlan(savedPlan);
        }

        // Load Library
        let savedLib = JSON.parse(localStorage.getItem("dietLibrary") || "[]");
        if (!hasReset || savedLib.length === 0) {
            setLibrary([]);
            localStorage.setItem("dietLibrary", JSON.stringify([]));
        } else {
            setLibrary(savedLib);
        }
        
        // Mark as reset so it doesn't clear their future custom entries!
        localStorage.setItem("clearDummyData1", "true");
        setLoading(false);
    }, []);

    const handleSaveDish = (e) => {
        e.preventDefault();
        const created = { ...newDish, id: Date.now() };
        const updated = [created, ...library];
        setLibrary(updated);
        localStorage.setItem("dietLibrary", JSON.stringify(updated));
        setNewDish({ title: '', description: '', img: '', category: 'Breakfast' });
        setIsLibraryModalOpen(false);
    };

    const handleDeleteDish = (id) => {
        if (!confirm("Delete this dish?")) return;
        const updated = library.filter(d => d.id !== id);
        setLibrary(updated);
        localStorage.setItem("dietLibrary", JSON.stringify(updated));
    };

    const handleAssignMeal = (day, cat, dish) => {
        const updated = { ...mealPlan };
        updated[activeWeek][day][cat.toLowerCase()] = {
            title: dish.title,
            img: dish.img,
            libraryId: dish.id
        };
        setMealPlan(updated);
        localStorage.setItem("adminWeeklyMealPlan", JSON.stringify(updated));
        setIsMealModalOpen(false);

        // Sync with frontend legacy key for immediate backward compatibility
        if (activeWeek === 'Week 1') {
            const frontendFormat = {};
            DAYS.forEach(d => {
                frontendFormat[d] = {
                    breakfast: { name: updated['Week 1'][d].breakfast.title, img: updated['Week 1'][d].breakfast.img },
                    lunch: { name: updated['Week 1'][d].lunch.title, img: updated['Week 1'][d].lunch.img },
                    snack: { name: updated['Week 1'][d].snack.title, img: updated['Week 1'][d].snack.img },
                    dinner: { name: updated['Week 1'][d].dinner.title, img: updated['Week 1'][d].dinner.img }
                }
            });
            localStorage.setItem("adminMealPlan", JSON.stringify(frontendFormat));
        }
    };

    const filteredLibrary = library.filter(d => 
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return null;

    return (
        <div className="p-8 bg-[#FDFBF7] min-h-screen font-sans pb-24">
            
            {/* Header Control Panel */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <CalendarIcon className="text-[#B4E567]" size={32}/>
                        Meal Planning <span className="text-sm text-gray-400 font-bold bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm ml-2">Proprietary Diet CMS</span>
                    </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3 bg-white/50 p-2 rounded-[2rem] backdrop-blur-sm border border-white/50">
                    {/* View Switcher */}
                    <div className="flex bg-gray-100 p-1 rounded-2xl mr-4 shadow-inner">
                        <button 
                            onClick={() => setViewMode('plan')}
                            className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'plan' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400'}`}
                        >
                            <LayoutGrid size={12} className="inline mr-2"/> Weekly Plan
                        </button>
                        <button 
                            onClick={() => setViewMode('library')}
                            className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'library' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400'}`}
                        >
                            <List size={12} className="inline mr-2"/> Diet Library
                        </button>
                    </div>

                    <button onClick={() => setIsLibraryModalOpen(true)} className="bg-[#B4E567] text-gray-900 px-6 py-3 rounded-2xl text-[11px] font-black shadow-sm hover:bg-[#a6d85a] uppercase tracking-widest flex items-center gap-2">
                        <Plus size={14}/> Create New Dish
                    </button>
                </div>
            </div>

            {viewMode === 'plan' ? (
                <>
                {/* Week Selector Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {WEEKS.map(w => (
                        <button 
                            key={w}
                            onClick={() => setActiveWeek(w)}
                            className={`py-4 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] transition-all border shadow-sm
                                ${activeWeek === w ? 'bg-[#215b33] text-white border-transparent' : 'bg-white text-gray-400 border-gray-100 hover:bg-gray-50'}
                            `}
                        >
                            {w}
                        </button>
                    ))}
                </div>

                {/* Main Schedule Display */}
                <div className="bg-white rounded-[3.5rem] p-10 shadow-sm border border-gray-50 overflow-hidden relative">
                    <div className="grid grid-cols-[160px_repeat(4,1fr)] gap-8">
                        {/* Empty Top Left */}
                        <div className="flex flex-col justify-end pb-2">
                             <div className="bg-gray-50/50 rounded-2xl p-4 text-center">
                                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Selected Week</span>
                                 <p className="text-sm font-black text-gray-900">{activeWeek}</p>
                             </div>
                        </div>

                        {/* Category Headers */}
                        {CATEGORIES.map(cat => (
                            <div key={cat.name} className={`${cat.color} ${cat.text} rounded-[2rem] h-16 flex items-center justify-center gap-2 shadow-sm font-black text-[10px] uppercase tracking-[0.2em]`}>
                                <cat.icon size={16}/> {cat.name}
                            </div>
                        ))}

                        {/* Weekly Rows */}
                        {DAYS.map((day, idx) => (
                            <React.Fragment key={day}>
                                <div className="bg-white rounded-[2.5rem] p-6 flex flex-col justify-center border border-gray-100 shadow-sm group">
                                    <h3 className="text-base font-black text-gray-900 mb-1">{day}</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#B4E567]"></div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{idx + 1} Oct, 2028</p>
                                    </div>
                                </div>

                                {CATEGORIES.map(cat => {
                                    const meal = mealPlan[activeWeek][day][cat.name.toLowerCase()] || { title: 'Empty', img: '' };
                                    return (
                                        <div 
                                            key={`${day}-${cat.name}`}
                                            onClick={() => {
                                                setEditingCell({ week: activeWeek, day, cat: cat.name });
                                                setIsMealModalOpen(true);
                                            }}
                                            className={`${cat.light} rounded-[2.5rem] p-4 flex flex-col gap-4 border border-transparent hover:border-[#B4E567] hover:bg-white transition-all cursor-pointer shadow-sm group relative`}
                                        >
                                            <div className="w-full aspect-[1.3] rounded-[1.8rem] overflow-hidden bg-white/50 backdrop-blur-sm relative border border-white/50">
                                                {meal.img ? (
                                                    <img src={meal.img} alt={meal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-200"><Plus size={32} /></div>
                                                )}
                                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-900 shadow-lg"><Edit2 size={12}/></div>
                                                </div>
                                            </div>
                                            <div className="px-2">
                                                <p className="text-[11px] font-black text-gray-900 uppercase leading-snug line-clamp-2 tracking-tight">
                                                    {meal.title}
                                                </p>
                                                {meal.title !== 'Empty' && (
                                                    <div className="flex items-center gap-1 mt-2">
                                                        <CheckCircle2 size={10} className="text-[#B4E567]"/>
                                                        <span className="text-[8px] font-bold text-gray-400 uppercase">Assigned</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                </>
            ) : (
                /* Diet Library Interface */
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Meal Library</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Master database of all diet options</p>
                            </div>
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search by title or category..." 
                                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold focus:bg-white focus:ring-1 focus:ring-[#B4E567] outline-none transition-all"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredLibrary.map(dish => (
                                <div key={dish.id} className="bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                                    <div className="relative aspect-video rounded-[1.8rem] overflow-hidden mb-4">
                                        <img src={dish.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                                        <div className="absolute top-3 left-3">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border border-white/20 
                                                ${dish.category === 'Breakfast' ? 'bg-[#B4E567] text-[#215b33]' : dish.category === 'Lunch' ? 'bg-[#FFD166] text-[#8f680d]' : dish.category === 'Snack' ? 'bg-[#FF9F43] text-white' : 'bg-slate-700 text-white'}`}>
                                                {dish.category}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteDish(dish.id)}
                                            className="absolute bottom-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <h3 className="text-sm font-black text-gray-900 mb-2 truncate px-2">{dish.title}</h3>
                                    <p className="text-[10px] font-medium text-gray-400 line-clamp-2 px-2 mb-4 leading-relaxed">{dish.description}</p>
                                    <div className="mt-auto px-2 pb-2">
                                        <button 
                                            className="w-full py-2.5 rounded-xl border-2 border-gray-50 text-[10px] font-black uppercase tracking-widest hover:border-[#B4E567] hover:bg-[#B4E567]/10 transition-all"
                                            onClick={() => {
                                                alert("Dish details view mode (Edit logic goes here)");
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Add Dish to Library */}
            {isLibraryModalOpen && (
                <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="bg-[#FDFBF7] rounded-[3.5rem] p-10 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar border border-white/30">
                        <button onClick={() => setIsLibraryModalOpen(false)} className="absolute top-8 right-10 text-gray-400 hover:text-red-500 transition-colors"><X size={32}/></button>
                        
                        <div className="flex items-center gap-4 mb-8">
                             <div className="w-14 h-14 rounded-[1.5rem] bg-[#B4E567] flex items-center justify-center shadow-lg text-[#215b33]"><ImageIcon size={28}/></div>
                             <div>
                                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create New Dish</h2>
                                 <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Populate your master diet database</p>
                             </div>
                        </div>

                        <form onSubmit={handleSaveDish} className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2 px-1"><Tag size={12}/> Dish Title</label>
                                    <input 
                                        required
                                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:ring-1 focus:ring-[#B4E567] shadow-sm"
                                        placeholder="Enter meal name..."
                                        value={newDish.title}
                                        onChange={e => setNewDish({...newDish, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2 px-1"><LayoutGrid size={12}/> Category</label>
                                    <select 
                                        className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:ring-1 focus:ring-[#B4E567] shadow-sm appearance-none cursor-pointer"
                                        value={newDish.category}
                                        onChange={e => setNewDish({...newDish, category: e.target.value})}
                                    >
                                        <option>Breakfast</option>
                                        <option>Lunch</option>
                                        <option>Snack</option>
                                        <option>Dinner</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Description</label>
                                <textarea 
                                    rows="4"
                                    className="w-full bg-white border border-gray-100 rounded-[2rem] px-6 py-5 text-xs font-bold outline-none focus:ring-1 focus:ring-[#B4E567] shadow-sm resize-none"
                                    placeholder="Enter nutritional info, benefits, etc..."
                                    value={newDish.description}
                                    onChange={e => setNewDish({...newDish, description: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2 px-1"><ImageIcon size={12}/> Meal Image URL</label>
                                <input 
                                    required
                                    className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:ring-1 focus:ring-[#B4E567] shadow-sm"
                                    placeholder="Paste high-quality URL..."
                                    value={newDish.img}
                                    onChange={e => setNewDish({...newDish, img: e.target.value})}
                                />
                            </div>

                            {newDish.img && (
                                <div className="w-full h-48 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/20">
                                    <img src={newDish.img} className="w-full h-full object-cover" />
                                </div>
                            )}

                            <button type="submit" className="w-full bg-[#B4E567] text-gray-900 font-black py-5 rounded-[2rem] hover:shadow-2xl hover:shadow-[#B4E567]/30 transition-all text-xs uppercase tracking-widest">
                                🚀 Publish to Library
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Assign Meal from Library to Plan */}
            {isMealModalOpen && (
                <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4">
                    <div className="bg-[#FDFBF7] rounded-[3.5rem] p-10 w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-hidden flex flex-col border border-white/30">
                        <button onClick={() => setIsMealModalOpen(false)} className="absolute top-8 right-10 text-gray-400 hover:text-red-500 transition-colors"><X size={32}/></button>
                        
                        <div className="flex items-center gap-4 mb-8 shrink-0">
                             <div className="w-14 h-14 rounded-[1.5rem] bg-[#B4E567] flex items-center justify-center shadow-lg text-[#215b33]"><LayoutGrid size={28}/></div>
                             <div>
                                 <h2 className="text-2xl font-black text-gray-900 tracking-tight">Select for {editingCell.day}</h2>
                                 <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Week: <span className="text-gray-900">{editingCell.week}</span> · Category: <span className="text-gray-900">{editingCell.cat}</span></p>
                             </div>
                        </div>

                        {/* Library Picker */}
                        <div className="mb-6 shrink-0 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text"
                                className="w-full bg-white border border-gray-100 rounded-3xl py-4 pl-16 pr-6 text-xs font-bold outline-none focus:ring-1 focus:ring-[#B4E567] shadow-sm"
                                placeholder="Search dishes to assign..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {library.length === 0 ? (
                                <div className="col-span-full py-20 text-center">
                                    <div className="text-5xl mb-4 opacity-20">🥗</div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest">Library is empty</p>
                                    <button onClick={() => { setIsMealModalOpen(false); setIsLibraryModalOpen(true); }} className="text-[#B4E567] text-xs font-black uppercase tracking-widest mt-4">Create First Dish</button>
                                </div>
                            ) : (
                                library.filter(d => d.category === editingCell.cat || searchTerm.length > 0).map(dish => (
                                    <div 
                                        key={dish.id} 
                                        onClick={() => handleAssignMeal(editingCell.day, editingCell.cat, dish)}
                                        className="bg-white rounded-[2rem] p-4 border-2 border-transparent hover:border-[#B4E567] transition-all cursor-pointer group shadow-sm flex flex-col"
                                    >
                                        <div className="aspect-[1.5] rounded-2xl overflow-hidden mb-4">
                                            <img src={dish.img} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex justify-between items-start mb-2">
                                             <h4 className="text-xs font-black text-gray-900 truncate pr-4">{dish.title}</h4>
                                             <span className="bg-gray-50 text-gray-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-full">{dish.category}</span>
                                        </div>
                                        <p className="text-[9px] font-bold text-gray-400 line-clamp-2 leading-relaxed">{dish.description}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center shrink-0">
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Can&apos;t find what you need?</p>
                            <button 
                                onClick={() => { setIsMealModalOpen(false); setIsLibraryModalOpen(true); }}
                                className="bg-[#215b33] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-green-900/20"
                            >
                                + Create Custom Entry
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
