"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Send, Image as ImageIcon, FileText, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNewsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        excerpt: "",
        author: "Admin",
        category: "General",
        image: "/images/organic-foods.png"
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("news_posts") || "[]");
        setPosts(saved);
        setLoading(false);
    }, []);

    const handleSavePost = (e) => {
        e.preventDefault();
        const updatedPosts = [{ 
            ...newPost, 
            id: Date.now().toString(), 
            slug: newPost.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        }, ...posts];
        
        localStorage.setItem("news_posts", JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
        setNewPost({ title: "", content: "", excerpt: "", author: "Admin", category: "General", image: "/images/organic-foods.png" });
        alert("Post Published Successfully!");
    };

    const handleDeletePost = (id) => {
        const updated = posts.filter(p => p.id !== id);
        localStorage.setItem("news_posts", JSON.stringify(updated));
        setPosts(updated);
    };

    return (
        <div className="space-y-8 pb-20 max-w-5xl mx-auto">
            {/* Header Area (Heading removed) */}
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-6 pt-4">
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-8 py-4 bg-[#214a32] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-green-100">
                        <Plus size={20} />
                        Bulk Upload
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Create Section */}
                <div className="lg:col-span-12">
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-4 bg-[#214a32] text-white rounded-[1.5rem] shadow-xl shadow-green-900/10 transition-transform hover:rotate-12">
                                <Plus size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-[#214a32] font-outfit uppercase tracking-tight">Create News Article</h2>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Broadcast latest updates to your users</p>
                            </div>
                        </div>

                        <form onSubmit={handleSavePost} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4 italic">Post Title</label>
                                    <input 
                                        required
                                        className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:border-[#214a32] transition-all font-bold text-[#214a32] shadow-inner"
                                        value={newPost.title}
                                        onChange={e => setNewPost({...newPost, title: e.target.value})}
                                        placeholder="e.g. Health Benefits of Moringa"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4 italic">Target Category</label>
                                    <input 
                                        className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:border-[#214a32] transition-all font-bold text-[#214a32] shadow-inner"
                                        value={newPost.category}
                                        onChange={e => setNewPost({...newPost, category: e.target.value})}
                                        placeholder="e.g. Wellness Tips"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4 italic">Short Teaser Excerpt</label>
                                <textarea 
                                    className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:border-[#214a32] transition-all font-bold text-[#214a32] h-24 shadow-inner"
                                    value={newPost.excerpt}
                                    onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                                    placeholder="Write a catchy 2-line summary..."
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4 italic">Full Content Canvas</label>
                                <textarea 
                                    required
                                    className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-5 outline-none focus:border-[#214a32] transition-all font-bold text-[#214a32] h-64 shadow-inner"
                                    value={newPost.content}
                                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                                    placeholder="Deep dive into the article content here..."
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-10">
                                <button className="flex-1 bg-[#214a32] hover:bg-black text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-green-900/10 flex items-center justify-center gap-3">
                                    <Send size={18} /> Publish to Feed
                                </button>
                                <div className="p-5 bg-white border border-gray-100 rounded-[1.5rem] text-gray-300 hover:text-[#214a32] transition-all cursor-pointer">
                                    <ImageIcon size={22} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Listing Section */}
                <div className="lg:col-span-12 space-y-6">
                    <div className="flex items-center justify-between px-6">
                        <h2 className="text-xl font-black text-[#214a32] font-outfit uppercase tracking-tight">Recent Archives ({posts.length})</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map(post => (
                            <motion.div
                                layout
                                key={post.id} 
                                className="bg-white p-8 rounded-[3.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] overflow-hidden relative shadow-inner">
                                        <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-[13px] text-gray-900 uppercase tracking-tight group-hover:text-[#214a32] transition-colors">{post.title}</h3>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                                            <span className="text-[#214a32]">{post.category}</span>
                                            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                            {post.date}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDeletePost(post.id)}
                                    className="p-5 bg-red-50 text-red-500 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
