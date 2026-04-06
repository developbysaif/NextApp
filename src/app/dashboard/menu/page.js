"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
    Search, SlidersHorizontal, Plus, MoreHorizontal, Activity, Heart, Clock, List, LayoutGrid, Filter, Bell, HeartPulse, ChevronDown, Check
} from 'lucide-react';

export default function HealthyMenuPage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null);
    const [menus, setMenus] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMenu, setNewMenu] = useState({ 
        title: '', 
        category: 'Breakfast', 
        cal: '', 
        carbs: '', 
        prot: '', 
        fat: '', 
        img: '',
        description: '',
        seoTitle: '',
        seoDescription: '',
        keywords: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");
        if (user) setCurrentUser(user);

        // Fetch from shared localStorage (acting as both healthy menu and blog posts DB)
        const stored = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        if (stored.length === 0) {
            const seed = [
                { id: 1, slug: 'turkey-breast-asparagus', type: 'featured', title: 'Grilled Turkey Breast with Steamed Asparagus and Brown Rice', category: 'Lunch', rating: 4.8, revs: 125, dif: 'Medium', score: 85, dur: '10 minutes', steps: 4, cal: 450, carbs: 40, prot: 35, fat: 12, img: 'https://images.unsplash.com/photo-1490645935967-10de6ba88061?w=800', description: 'A healthy and protein-packed meal ideal for lunches.', seoTitle: 'Grilled Turkey Breast Recipe - Nutrigo', seoDescription: 'Learn how to cook a delicious grilled turkey breast with asparagus.', keywords: 'turkey, healthy, lunch, protein' },
                { id: 2, slug: 'avocado-toast-poached-egg', type: 'normal', title: 'Avocado Toast with Poached Egg', category: 'Breakfast', dif: 'Easy', score: 90, cal: 320, carbs: 30, prot: 14, fat: 18, img: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400', description: 'The classic breakfast staple made better.', seoTitle: 'Avocado Toast with Poached Egg - Nutrigo', seoDescription: 'Simple and nutrient-dense avocado toast recipe.', keywords: 'breakfast, avocado, eggs' },
                { id: 3, slug: 'shrimp-tacos-mango-salsa', type: 'normal', title: 'Grilled Shrimp Tacos with Mango Salsa', category: 'Lunch', dif: 'Medium', score: 80, cal: 400, carbs: 45, prot: 28, fat: 12, img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400', description: 'Zesty and fresh tacos for a light summer lunch.', seoTitle: 'Zesty Shrimp Tacos - Nutrigo', seoDescription: 'Fresh shrimp tacos with sweet mango salsa.', keywords: 'tacos, shrimp, seafood, lunch' },
                { id: 4, slug: 'baked-chicken-quinoa-kale', type: 'normal', title: 'Baked Chicken Breast with Quinoa and Kale', category: 'Dinner', dif: 'Medium', score: 90, cal: 480, carbs: 50, prot: 40, fat: 15, img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a5a?w=400', description: 'A complete dinner with complex carbs and lean protein.', seoTitle: 'Chicken Quinoa Kale Bowl - Nutrigo', seoDescription: 'Healthy dinner bowl with chicken and superfoods.', keywords: 'chicken, dinner, quinoa, kale' },
            ];
            setMenus(seed);
            localStorage.setItem("blogPosts", JSON.stringify(seed));
        } else {
            setMenus(stored);
        }
    }, []);

    const handleAddMenu = (e) => {
        e.preventDefault();
        const slug = newMenu.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const created = {
            id: Date.now(),
            slug: slug,
            type: 'normal',
            title: newMenu.title,
            category: newMenu.category,
            description: newMenu.description,
            seoTitle: newMenu.seoTitle || newMenu.title,
            seoDescription: newMenu.seoDescription,
            keywords: newMenu.keywords,
            dif: 'Easy', score: 85, rating: 4.5, revs: 0,
            cal: parseInt(newMenu.cal) || 0,
            carbs: parseInt(newMenu.carbs) || 0,
            prot: parseInt(newMenu.prot) || 0,
            fat: parseInt(newMenu.fat) || 0,
            img: newMenu.img || 'https://images.unsplash.com/photo-1498837167339-444ea11dd6b5?w=400'
        };
        const updated = [created, ...menus];
        setMenus(updated);
        localStorage.setItem("blogPosts", JSON.stringify(updated));
        
        // Also sync to global "blogs" if that exists for the frontend blogs page
        const globalBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        const transformedForGlobal = {
            id: created.id,
            slug: created.slug,
            title: created.title,
            content: created.description,
            category: created.category.toLowerCase(),
            featuredImage: created.img,
            authorName: currentUser?.name || 'Admin',
            status: 'PUBLISHED',
            createdAt: new Date().toISOString()
        };
        localStorage.setItem("blogs", JSON.stringify([transformedForGlobal, ...globalBlogs]));

        setIsModalOpen(false);
        setNewMenu({ title: '', category: 'Breakfast', cal: '', carbs: '', prot: '', fat: '', img: '', description: '', seoTitle: '', seoDescription: '', keywords: '' });
    };

    const featuredMenu = menus.find(m => m.type === 'featured') || menus[0];
    const normalMenus = menus.filter(m => m.id !== featuredMenu?.id);
    const filteredMenus = activeTab === 'All' ? normalMenus : normalMenus.filter(m => m.category === activeTab);

    if (!featuredMenu) return <div className="p-10">Loading...</div>;

    const renderHealthBars = (score) => {
        const fullBars = Math.floor(score / 10);
        return (
            <div className="flex gap-0.5">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-3.5 rounded-full ${i < fullBars ? 'bg-[#FF9F43]' : 'bg-gray-200'}`} />
                ))}
            </div>
        );
    };

    return (
        <div className="font-sans text-gray-800 bg-[#FDFBF7] min-h-screen flex flex-col xl:flex-row w-full pb-0 relative">
            
            {/* Center Content Component */}
            <div className="flex-1 px-8 pt-8 flex flex-col gap-6 w-full pb-20">
                
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center w-full gap-4 md:gap-0 mt-4 xl:mt-0 relative z-20">
                    <h1 className="text-[26px] font-bold text-gray-900 tracking-tight leading-none w-1/3">Healthy Menu</h1>
                    
                    <div className="flex-1 flex max-w-lg items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search menu" className="w-full bg-white border border-gray-100 rounded-xl py-3 pl-11 pr-4 text-xs font-bold text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#B4E567] shadow-sm" />
                        </div>
                        <button className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100 shrink-0"><SlidersHorizontal size={18} /></button>
                        <button onClick={() => setIsModalOpen(true)} className="bg-[#B4E567] text-gray-900 px-5 py-3 rounded-xl text-xs font-bold shrink-0 shadow-sm hover:bg-[#a6d85a] transition-all">
                            Add Menu
                        </button>
                    </div>
                </div>

                {/* Featured Menu */}
                <div className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm font-bold text-gray-900">Featured Menu</h2>
                        <MoreHorizontal size={20} className="text-gray-400 cursor-pointer hover:text-gray-800" />
                    </div>

                    <div onClick={() => router.push(`/dashboard/menu/${featuredMenu.id}`)} className="bg-[#FAF7ED] rounded-[2.5rem] p-4 flex flex-col lg:flex-row gap-6 shadow-sm relative pr-24 lg:pr-32 border border-[#f0ecd3] cursor-pointer hover:border-[#FFD166] transition-colors">
                        {/* Image */}
                        <img src={featuredMenu.img} alt={featuredMenu.title} className="w-full lg:w-[340px] h-[280px] object-cover rounded-[2rem] shadow-sm" />
                        
                        {/* Content */}
                        <div className="flex-1 py-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 leading-[1.1] tracking-tight">{featuredMenu.title}</h2>
                                <div className="flex items-center gap-4 mt-4">
                                    <span className="bg-[#FFD166] text-gray-900 px-4 py-1.5 rounded-lg text-[11px] font-bold shadow-sm">{featuredMenu.category}</span>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                        <span className="text-[#FF9F43] text-sm">★</span> {featuredMenu.rating}/5 <span className="text-gray-400 font-medium">({featuredMenu.revs} reviews)</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Stats blocks */}
                            <div className="grid grid-cols-2 gap-y-6 mt-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400 font-bold"><Activity size={14} /></div>
                                    <div className="flex flex-col"><span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Difficulty</span><span className="text-[11px] font-bold text-gray-900">{featuredMenu.dif}</span></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400 font-bold"><Heart size={14} /></div>
                                    <div className="flex flex-col"><span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Health Score</span><span className="text-[11px] font-bold text-gray-900">{featuredMenu.score}/100</span></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400 font-bold"><Clock size={14} /></div>
                                    <div className="flex flex-col"><span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Cook Duration</span><span className="text-[11px] font-bold text-gray-900">{featuredMenu.dur}</span></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-400 font-bold"><List size={14} /></div>
                                    <div className="flex flex-col"><span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Steps</span><span className="text-[11px] font-bold text-gray-900">{featuredMenu.steps} steps</span></div>
                                </div>
                            </div>
                            
                            <button className="bg-[#B4E567] text-gray-900 font-bold text-[13px] tracking-wide py-4 mt-6 rounded-[1.2rem] w-full shadow-sm hover:bg-[#a6d85a] transition-all">
                                Add to Meal Plan
                            </button>
                        </div>

                        {/* Hovering Right Side Macros */}
                        <div className="absolute right-4 top-4 bottom-4 w-[110px] flex flex-col gap-3 z-10 hidden lg:flex">
                             <div className="bg-[#e4fcbd] rounded-[1.5rem] p-4 flex flex-col justify-center gap-2 shadow-sm flex-1">
                                 <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#6a8c35]"><Activity size={16} /></div>
                                 <div className="flex flex-col"><span className="text-[#6a8c35] text-[10px] font-bold mb-0.5">Calories</span><span className="text-[#496b16] font-black leading-none">{featuredMenu.cal} kcal</span></div>
                             </div>
                             <div className="bg-[#FFD166] rounded-[1.5rem] p-4 flex flex-col justify-center gap-2 shadow-sm flex-1 border border-[#f0c35d]">
                                 <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#d19c1e]"><Search size={16} /></div>
                                 <div className="flex flex-col"><span className="text-[#a67a14] text-[10px] font-bold mb-0.5">Carbs</span><span className="text-[#8f680d] font-black leading-none">{featuredMenu.carbs} gr</span></div>
                             </div>
                             <div className="bg-[#FF9F43] rounded-[1.5rem] p-4 flex flex-col justify-center gap-2 shadow-sm flex-1 border border-[#eb923d]">
                                 <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#c26e1d]"><Bell size={16} /></div>
                                 <div className="flex flex-col"><span className="text-[#a65d14] text-[10px] font-bold mb-0.5">Proteins</span><span className="text-[#8c4d0f] font-black leading-none text-white">{featuredMenu.prot} gr</span></div>
                             </div>
                             <div className="bg-white rounded-[1.5rem] p-4 flex flex-col justify-center gap-2 shadow-sm flex-1 border border-gray-100">
                                 <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-500"><HeartPulse size={16} /></div>
                                 <div className="flex flex-col"><span className="text-gray-400 text-[10px] font-bold mb-0.5">Fats</span><span className="text-gray-900 font-black leading-none">{featuredMenu.fat} gr</span></div>
                             </div>
                        </div>

                    </div>
                </div>

                {/* All Menu Toggles & List */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-50">
                            {['All', 'Breakfast', 'Lunch', 'Snack', 'Dinner'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-2 text-[11px] font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-[#B4E567] text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mr-2">
                                Sort by: <span className="bg-white border border-gray-100 rounded px-2 py-1 text-gray-900 flex items-center gap-1 cursor-pointer">Calories <ChevronDown size={10} /></span>
                            </div>
                            <div className="w-8 h-8 bg-white border border-gray-100 rounded flex items-center justify-center text-gray-400 cursor-pointer shadow-sm"><Filter size={14} /></div>
                            <div className="w-8 h-8 bg-[#B4E567] rounded flex items-center justify-center text-gray-900 cursor-pointer shadow-sm"><List size={16} /></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredMenus.map(m => (
                            <div key={m.id} onClick={() => router.push(`/dashboard/menu/${m.id}`)} className="bg-[#FAF7ED]/80 rounded-[2rem] p-3 pl-4 flex items-center gap-6 shadow-sm border border-[#f0ecd3] relative group hover:bg-[#FAF7ED] hover:border-[#FFD166] transition-colors cursor-pointer">
                                 <img src={m.img} alt={m.title} className="w-[140px] h-[90px] rounded-2xl object-cover" />
                                 <div className="flex-1 py-1">
                                     <div className="flex items-center gap-3 mb-2">
                                         <span className={`px-3 py-1 rounded text-[9px] font-bold 
                                            ${m.category === 'Breakfast' ? 'bg-[#c3e884] text-[#496b16]' : m.category === 'Lunch' ? 'bg-[#FFD166] text-[#8f680d]' : 'bg-[#FF9F43] text-white'}`}>
                                            {m.category}
                                         </span>
                                         <span className="text-gray-400 text-[10px] font-bold flex items-center gap-1"><Activity size={10} /> {m.dif}</span>
                                     </div>
                                     <h3 className="text-sm font-black text-gray-900 mb-4">{m.title}</h3>
                                     
                                     <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 border-t border-gray-200/50 pt-3">
                                         <span className="flex items-center gap-1"><Clock size={10}/> {m.cal} kcal</span>
                                         <span className="flex items-center gap-1"><Search size={10}/> {m.carbs}g carbs</span>
                                         <span className="flex items-center gap-1"><Bell size={10}/> {m.prot}g protein</span>
                                         <span className="flex items-center gap-1"><HeartPulse size={10}/> {m.fat}g fats</span>
                                     </div>
                                 </div>
                                 <div className="flex flex-col items-end gap-6 self-start mt-2 mr-4">
                                     <div className="flex items-center gap-2">
                                         <span className="text-[10px] font-bold text-gray-400">Health Score: <span className="text-gray-900">{m.score/10}/10</span></span>
                                         {renderHealthBars(m.score)}
                                     </div>
                                     <button className="bg-[#B4E567] text-gray-900 px-6 py-2.5 rounded-xl text-[11px] font-bold shadow-sm hover:bg-[#a6d85a] transition-all">
                                         Add to Meal Plan
                                     </button>
                                 </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-full xl:w-[350px] bg-[#FDFBF7] p-8 border-l border-white/50 relative z-10 flex flex-col pt-10">
                <div className="flex items-center justify-between mb-10 group">
                    <div className="flex items-center gap-4">
                        <img src="https://i.pravatar.cc/150?u=adam" alt="Adam" className="w-[50px] h-[50px] rounded-2xl object-cover ring-2 ring-white shadow-sm" />
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 leading-tight">Adam Vasylenko</h3>
                            <p className="text-[10px] font-medium text-gray-400 mt-0.5">Member</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm text-gray-400 border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50 relative">
                        <Bell size={16} />
                        <span className="w-2 h-2 rounded-full bg-[#FF9F43] absolute top-2.5 right-2 border border-white"></span>
                    </div>
                </div>

                {/* Popular Menu */}
                <div className="mb-10">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-gray-900">Popular Menu</h2>
                        <MoreHorizontal size={16} className="text-gray-400 cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Greek Salad with Feta and Olives', cat: 'Lunch', rate: 4.9, img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=100' },
                            { name: 'Blueberry Protein Smoothie', cat: 'Breakfast', rate: 4.8, img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=100' },
                            { name: 'Grilled Salmon with Lemon and Asparagus', cat: 'Dinner', rate: 4.9, img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100' }
                        ].map((p, i) => (
                            <div key={i} className="bg-white p-3 rounded-[1.5rem] flex items-center gap-4 shadow-sm border border-gray-50 hover:border-gray-100 transition-colors cursor-pointer">
                                <img src={p.img} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                                <div className="flex-1 min-w-0 pr-2">
                                    <h4 className="text-[11px] font-bold text-gray-900 mb-2 leading-tight pr-4">{p.name}</h4>
                                    <div className="flex justify-between items-center">
                                        <div className="text-[9px] font-bold text-gray-400"><span className="text-[#FFD166] text-xs leading-none">★</span> {p.rate}/5</div>
                                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded ${p.cat==='Lunch'?'bg-[#FFD166]/20 text-[#a67a14]' : p.cat==='Breakfast'?'bg-[#B4E567]/20 text-[#496b16]':'bg-[#FF9F43]/20 text-[#a65d14]'}`}>{p.cat}</span>
                                    </div>
                                </div>
                                <div className="absolute right-6 w-5 h-5 bg-[#e4fcbd] rounded-md flex items-center justify-center text-[#6a8c35] text-xs font-bold leading-none cursor-pointer hover:bg-[#B4E567]"><Plus size={12}/></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended Menu */}
                <div>
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-gray-900">Recommended Menu</h2>
                        <MoreHorizontal size={16} className="text-gray-400 cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Oatmeal with Almond Butter and Berries', cat: 'Breakfast', cal: 350, carbs: 45, prot: 12, fat: 14, img: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=100' },
                            { name: 'Grilled Chicken Wrap with Avocado and Spinach', cat: 'Lunch', cal: 450, carbs: 40, prot: 30, fat: 18, img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=100' },
                            { name: 'Quinoa Salad with Roasted Vegetables and Feta', cat: 'Dinner', cal: 400, carbs: 50, prot: 15, fat: 12, img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100' }
                        ].map((p, i) => (
                            <div key={i} className="bg-white p-4 rounded-[1.5rem] flex flex-col shadow-sm border border-gray-50 hover:border-gray-100 transition-colors cursor-pointer relative">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-gray-100 bg-gray-50">
                                        <img src={p.img} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 pr-6">
                                        <h4 className="text-[11px] font-bold text-gray-900 mb-2 leading-tight">{p.name}</h4>
                                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded inline-block ${p.cat==='Lunch'?'bg-[#FFD166]/20 text-[#a67a14]' : p.cat==='Breakfast'?'bg-[#B4E567]/20 text-[#496b16]':'bg-[#FF9F43]/20 text-[#a65d14]'}`}>{p.cat}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 mt-4 px-1">
                                    <span className="flex items-center gap-1"><Activity size={10}/> {p.cal} kcal</span>
                                    <span className="flex items-center gap-1"><Search size={10}/> {p.carbs}g</span>
                                    <span className="flex items-center gap-1"><Bell size={10}/> {p.prot}g</span>
                                    <span className="flex items-center gap-1"><HeartPulse size={10}/> {p.fat}g</span>
                                </div>
                                <div className="absolute right-4 top-8 w-5 h-5 bg-[#e4fcbd] rounded-md flex items-center justify-center text-[#6a8c35] text-xs font-bold leading-none cursor-pointer hover:bg-[#B4E567]"><Plus size={12}/></div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

             {/* Modal for Adding New Menu (Also acts as Blog Post) */}
             {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-900 leading-none">×</button>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Create New Blog Post</h2>
                        <p className="text-xs text-gray-500 font-medium mb-6">This post will appear in Healthy Menu & the Blog section on the frontend.</p>
                        
                        <form onSubmit={handleAddMenu} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Recipe / Post Title *</label>
                                <input required type="text" value={newMenu.title} onChange={e => setNewMenu({...newMenu, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#B4E567] outline-none" placeholder="e.g. Quinoa Salad with Roasted Vegetables" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Description / Blog Content *</label>
                                <textarea required rows="4" value={newMenu.description} onChange={e => setNewMenu({...newMenu, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#B4E567] outline-none resize-none" placeholder="Describe the recipe, health benefits, and cooking tips..." />
                            </div>

                            {/* Category & Image */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 mb-1.5 block">Category *</label>
                                    <select value={newMenu.category} onChange={e => setNewMenu({...newMenu, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#B4E567] outline-none cursor-pointer">
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Snack">Snack</option>
                                        <option value="Dinner">Dinner</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 mb-1.5 block">Featured Image URL *</label>
                                    <input required type="url" value={newMenu.img} onChange={e => setNewMenu({...newMenu, img: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-[#B4E567] outline-none" placeholder="https://images.unsplash.com/..." />
                                </div>
                            </div>

                            {/* Image preview */}
                            {newMenu.img && (
                                <div className="w-full h-40 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                                    <img src={newMenu.img} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                                </div>
                            )}

                            {/* Macros */}
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-2 block">Nutritional Values (per serving)</label>
                                <div className="grid grid-cols-4 gap-3">
                                    <div>
                                        <label className="text-[10px] font-bold text-[#6a8c35] mb-1 block">Calories</label>
                                        <input required type="number" min="0" value={newMenu.cal} onChange={e => setNewMenu({...newMenu, cal: e.target.value})} className="w-full bg-[#e4fcbd]/50 border border-[#B4E567]/30 rounded-lg p-2.5 text-xs font-bold focus:border-[#B4E567] outline-none" placeholder="450" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-[#a67a14] mb-1 block">Carbs (g)</label>
                                        <input required type="number" min="0" value={newMenu.carbs} onChange={e => setNewMenu({...newMenu, carbs: e.target.value})} className="w-full bg-[#FFD166]/10 border border-[#FFD166]/30 rounded-lg p-2.5 text-xs font-bold focus:border-[#FFD166] outline-none" placeholder="40" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-[#a65d14] mb-1 block">Protein (g)</label>
                                        <input required type="number" min="0" value={newMenu.prot} onChange={e => setNewMenu({...newMenu, prot: e.target.value})} className="w-full bg-[#FF9F43]/10 border border-[#FF9F43]/30 rounded-lg p-2.5 text-xs font-bold focus:border-[#FF9F43] outline-none" placeholder="35" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 mb-1 block">Fats (g)</label>
                                        <input required type="number" min="0" value={newMenu.fat} onChange={e => setNewMenu({...newMenu, fat: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs font-bold focus:border-gray-400 outline-none" placeholder="12" />
                                    </div>
                                </div>
                            </div>

                            {/* SEO Section */}
                            <div className="border-t border-gray-100 pt-5">
                                <p className="text-xs font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-[#B4E567] flex items-center justify-center text-[10px] font-black">S</span>
                                    SEO Settings
                                </p>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">SEO Title (Page Tab Title)</label>
                                        <input type="text" value={newMenu.seoTitle} onChange={e => setNewMenu({...newMenu, seoTitle: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none" placeholder="e.g. Quinoa Salad Recipe - Nutrigo Healthy Meals" />
                                        <p className="text-[10px] text-gray-400 mt-1">Recommended: 50-60 characters. Current: {newMenu.seoTitle.length}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">SEO Meta Description</label>
                                        <textarea rows="2" value={newMenu.seoDescription} onChange={e => setNewMenu({...newMenu, seoDescription: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none resize-none" placeholder="A short description for search engines (150-160 chars)..." />
                                        <p className="text-[10px] text-gray-400 mt-1">Recommended: 150-160 characters. Current: {newMenu.seoDescription.length}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 mb-1.5 block">Keywords (comma separated)</label>
                                        <input type="text" value={newMenu.keywords} onChange={e => setNewMenu({...newMenu, keywords: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none" placeholder="e.g. healthy, salad, vegan, dinner" />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#B4E567] text-gray-900 font-bold py-4 rounded-xl hover:bg-[#a6d85a] transition-colors shadow-sm text-sm tracking-wide">
                                🚀 Publish Blog Post
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
