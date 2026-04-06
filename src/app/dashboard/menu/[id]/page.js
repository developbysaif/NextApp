"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
    ChevronLeft, Clock, Activity, Heart, HeartPulse, Share2, Bookmark, MessageCircle,
    Tag, Search, Bell, List, CheckCircle2, Globe
} from 'lucide-react';

export default function BlogDetailPage({ params }) {
    const unwrappedParams = React.use(params);
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
        { id: 1, name: 'Sarah K.', rating: 5.0, text: 'Tried this last night — absolutely incredible! A new staple in my diet plan.', time: '2 hours ago', avatar: 'https://i.pravatar.cc/150?u=comment1' },
        { id: 2, name: 'Daniel R.', rating: 4.5, text: 'Great protein source! I reduced heat by 20°C in step 2 to avoid drying it out.', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=comment2' }
    ]);

    useEffect(() => {
        // Try matching by numeric ID first (from /dashboard/menu/[id])
        const stored = JSON.parse(localStorage.getItem("blogPosts") || "[]");
        const id = unwrappedParams.id;
        
        // Match by id (number) or slug (string)
        const found = stored.find(p => 
            p.id?.toString() === id || p.slug === id
        );
        
        if (found) setPost(found);
        setLoading(false);
    }, [unwrappedParams.id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        const newComment = {
            id: Date.now(),
            name: 'You',
            rating: 5.0,
            text: comment,
            time: 'Just now',
            avatar: 'https://i.pravatar.cc/150?u=you'
        };
        setComments(prev => [...prev, newComment]);
        setComment('');
    };

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#B4E567] border-t-transparent"></div>
        </div>
    );
    
    if (!post) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBF7] p-10">
            <div className="text-6xl mb-4">🥗</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
            <p className="text-gray-500 text-sm mb-6">This menu post doesn't exist or was removed.</p>
            <button onClick={() => router.back()} className="px-6 py-3 bg-[#B4E567] rounded-xl font-bold text-gray-900 hover:bg-[#a6d85a]">← Go Back</button>
        </div>
    );

    const renderHealthBars = (score) => {
        const fullBars = Math.floor((score || 85) / 10);
        return (
            <div className="flex gap-1 justify-center mt-2">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-2 h-6 rounded-full ${i < fullBars ? 'bg-[#FF9F43]' : 'bg-gray-200'}`} />
                ))}
            </div>
        );
    };

    // SEO title and description display
    const pageTitle = post.seoTitle || post.title;
    const pageDesc = post.seoDescription || post.description;
    const keywordsArr = post.keywords ? post.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];

    return (
        <div className="font-sans text-gray-800 bg-[#FDFBF7] min-h-screen w-full pb-24">
            
            {/* Sticky Top Nav */}
            <div className="w-full bg-white/95 backdrop-blur-sm px-6 md:px-10 py-4 sticky top-0 z-50 shadow-sm border-b border-gray-100 flex items-center justify-between">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-xs transition-colors">
                    <ChevronLeft size={18} strokeWidth={2.5}/>
                    <span className="hidden sm:inline">Back to Menu</span>
                </button>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Nutrigo · Healthy Menu</span>
                <div className="flex items-center gap-2">
                    <button className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 border border-gray-100"><Bookmark size={16} /></button>
                    <button className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 border border-gray-100"><Share2 size={16} /></button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">

                {/* SEO Info Bar */}
                {(post.seoTitle || post.keywords) && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-wrap items-center gap-4 mb-8 shadow-sm">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                            <Globe size={12} className="text-[#B4E567]"/>
                            <span className="text-gray-700 font-bold">{pageTitle}</span>
                        </div>
                        {keywordsArr.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                                <Tag size={12} className="text-gray-400" />
                                {keywordsArr.map((kw, i) => (
                                    <span key={i} className="bg-[#B4E567]/20 text-[#496b16] text-[9px] font-bold px-2 py-0.5 rounded-full">{kw}</span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Hero Card */}
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-50 mb-10 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 h-[300px] lg:h-auto shrink-0">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <span className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm
                                    ${post.category === 'Breakfast' ? 'bg-[#c3e884] text-[#496b16]' : post.category === 'Lunch' ? 'bg-[#FFD166] text-[#8f680d]' : post.category === 'Snack' ? 'bg-gray-100 text-gray-600' : 'bg-[#FF9F43] text-white'}`}>
                                    {post.category}
                                </span>
                                {post.rating && (
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                        <span className="text-[#FF9F43] text-sm">★</span> {post.rating}/5 
                                        <span className="text-gray-400 font-medium">({post.revs || 24} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-[1.15] tracking-tight mb-5">{post.title}</h1>
                            
                            {post.description && (
                                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">{post.description}</p>
                            )}
                        </div>
                        
                        {/* Key Stats Row */}
                        <div className="flex flex-wrap gap-6 border-t border-gray-100 pt-6 mb-6">
                            {post.dur && (
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Cook Time</span>
                                    <span className="text-sm font-black text-gray-900 flex items-center gap-1"><Clock size={14} className="text-[#B4E567]"/>{post.dur}</span>
                                </div>
                            )}
                            {post.dif && (
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Difficulty</span>
                                    <span className="text-sm font-black text-gray-900 flex items-center gap-1"><Activity size={14} className="text-[#FFD166]"/>{post.dif}</span>
                                </div>
                            )}
                            {post.score && (
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Health Score</span>
                                    <span className="text-sm font-black text-gray-900 flex items-center gap-1"><Heart size={14} className="text-[#FF9F43]"/>{post.score}/100</span>
                                </div>
                            )}
                            {post.steps && (
                                <div className="flex flex-col">
                                    <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider mb-1">Steps</span>
                                    <span className="text-sm font-black text-gray-900 flex items-center gap-1"><List size={14} className="text-gray-400"/>{post.steps} steps</span>
                                </div>
                            )}
                        </div>

                        <button className="w-full py-4 bg-[#B4E567] text-gray-900 font-bold rounded-[1.5rem] shadow-sm hover:bg-[#a6d85a] transition-all text-sm tracking-wide">
                            + Add to My Planner Today
                        </button>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Main Column */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Macros */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
                            <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                                <HeartPulse size={20} className="text-[#FF9F43]"/> Nutritional Breakdown
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-[#e4fcbd] rounded-[1.5rem] p-5 text-center shadow-sm">
                                    <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-[#6a8c35] mb-3"><Activity size={18}/></div>
                                    <h4 className="text-[10px] font-bold text-[#6a8c35] uppercase tracking-wider mb-1">Calories</h4>
                                    <p className="text-2xl font-black text-[#496b16]">{post.cal || 0}</p>
                                    <p className="text-[9px] text-[#6a8c35] font-bold mt-0.5">kcal</p>
                                </div>
                                <div className="bg-[#FFD166]/20 rounded-[1.5rem] p-5 text-center shadow-sm border border-[#FFD166]/30">
                                    <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-[#a67a14] mb-3"><Search size={18}/></div>
                                    <h4 className="text-[10px] font-bold text-[#a67a14] uppercase tracking-wider mb-1">Carbs</h4>
                                    <p className="text-2xl font-black text-[#8f680d]">{post.carbs || 0}</p>
                                    <p className="text-[9px] text-[#a67a14] font-bold mt-0.5">grams</p>
                                </div>
                                <div className="bg-[#FF9F43]/10 rounded-[1.5rem] p-5 text-center shadow-sm border border-[#FF9F43]/20">
                                    <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center text-[#a65d14] mb-3"><Bell size={18}/></div>
                                    <h4 className="text-[10px] font-bold text-[#a65d14] uppercase tracking-wider mb-1">Protein</h4>
                                    <p className="text-2xl font-black text-[#8c4d0f]">{post.prot || 0}</p>
                                    <p className="text-[9px] text-[#a65d14] font-bold mt-0.5">grams</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-[1.5rem] p-5 text-center shadow-sm">
                                    <div className="w-10 h-10 mx-auto bg-gray-50 rounded-full flex items-center justify-center text-gray-500 mb-3"><HeartPulse size={18}/></div>
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Fats</h4>
                                    <p className="text-2xl font-black text-gray-900">{post.fat || 0}</p>
                                    <p className="text-[9px] text-gray-400 font-bold mt-0.5">grams</p>
                                </div>
                            </div>
                        </div>

                        {/* Step-by-step */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                            <h2 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
                                <List size={20} className="text-[#B4E567]"/> Step-by-Step Preparation
                            </h2>
                            <div className="space-y-8 relative">
                                <div className="absolute left-[22px] top-2 bottom-6 w-0.5 bg-gray-100 z-0"></div>
                                {[
                                    { t: "Prep the Ingredients", d: "Rinse all components under cold running water. Slice or chop to optimal bite-sized pieces to ensure even cooking." },
                                    { t: "Season Generously", d: "Toss with extra virgin olive oil, sea salt, black pepper, and herbs of choice in a large bowl until fully coated." },
                                    { t: "Cook on Medium-High", d: "Use the recommended temperature to lock in flavour without stripping away key macronutrients or vitamins." },
                                    { t: "Rest, Garnish & Serve", d: "Let it rest briefly. Finish with a squeeze of lemon and serve immediately to preserve freshness and texture." }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative z-10 flex gap-6 pr-4">
                                        <div className="w-11 h-11 shrink-0 rounded-full bg-white border-2 border-[#B4E567] text-[#6a8c35] text-lg font-black flex items-center justify-center shadow-sm">
                                            {idx + 1}
                                        </div>
                                        <div className="pt-1">
                                            <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">{step.t}</h3>
                                            <p className="text-sm font-medium text-gray-500 leading-relaxed">{step.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SEO Meta info block (visible) */}
                        {pageDesc && (
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Globe size={14} className="text-[#B4E567]"/> SEO Meta Description
                                </h3>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed italic">&ldquo;{pageDesc}&rdquo;</p>
                            </div>
                        )}

                        {/* Comments Section */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
                            <h2 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
                                <MessageCircle size={20} className="text-blue-400"/> Comments ({comments.length})
                            </h2>
                            
                            <div className="space-y-5 mb-8">
                                {comments.map(c => (
                                    <div key={c.id} className="flex items-start gap-4">
                                        <img src={c.avatar} className="w-11 h-11 rounded-full shrink-0 border-2 border-[#B4E567]/50 bg-gray-100"/>
                                        <div className="flex-1">
                                            <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100">
                                                <h5 className="text-xs font-bold text-gray-900 mb-1">{c.name} <span className="text-[#FF9F43] ml-1">★ {c.rating}</span></h5>
                                                <p className="text-sm font-medium text-gray-600">{c.text}</p>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 mt-1.5 inline-block pl-2">{c.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
                                <input 
                                    type="text" 
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    placeholder="Write a comment..." 
                                    className="flex-1 bg-gray-50 border border-gray-100 px-6 py-4 rounded-[1.5rem] text-sm focus:outline-none focus:border-[#B4E567] transition-colors" 
                                />
                                <button type="submit" disabled={!comment.trim()} className="bg-gray-900 text-white px-6 py-4 rounded-[1.5rem] font-bold shadow-sm text-sm hover:bg-[#215b33] transition-colors disabled:opacity-50 shrink-0">Post</button>
                            </form>
                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Health Score Donut */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 text-center">
                            <h3 className="text-xs font-bold text-gray-900 mb-4 tracking-wide uppercase">Total Health Score</h3>
                            <div className="relative w-36 h-36 mx-auto flex items-center justify-center mb-4">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <path className="text-[#FF9F43]" strokeDasharray={`${post.score || 85}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-gray-900">{post.score || 85}</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">/100</span>
                                </div>
                            </div>
                            {renderHealthBars(post.score || 85)}
                            <p className="text-[11px] font-bold text-gray-500 leading-relaxed mt-4">Highly Optimal Meal — nutritionally well-balanced without bad cholesterol.</p>
                        </div>

                        {/* Ingredients */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
                            <h3 className="text-xs font-bold text-gray-900 mb-5 tracking-wide uppercase">Core Ingredients</h3>
                            <div className="space-y-4">
                                {[
                                    { i: "Primary Protein Source", w: "200g" },
                                    { i: "Nutrient Base (Complex Carbs)", w: "150g" },
                                    { i: "Extra Virgin Olive Oil", w: "1 tbsp" },
                                    { i: "Fresh Greens", w: "2 cups" },
                                    { i: "Spices & Himalayan Salt", w: "to taste" },
                                ].map((ing, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-2 h-2 rounded-full bg-[#B4E567] shrink-0"></div>
                                            <span className="text-xs font-bold text-gray-700">{ing.i}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400">{ing.w}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Keywords */}
                        {keywordsArr.length > 0 && (
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
                                <h3 className="text-xs font-bold text-gray-900 mb-4 tracking-wide uppercase flex items-center gap-2"><Tag size={14} className="text-[#B4E567]"/> Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {keywordsArr.map((kw, i) => (
                                        <span key={i} className="bg-[#FDFBF7] border border-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-[#B4E567]/20 hover:border-[#B4E567] cursor-pointer transition-colors">#{kw}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
