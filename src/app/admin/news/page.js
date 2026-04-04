
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Send, Layout, Image as ImageIcon, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminNewsPage() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        excerpt: "",
        author: "Admin",
        category: "General",
        image: "/images/millet_upma.png"
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("news_posts") || "[]");
        setPosts(saved);
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
        setNewPost({ title: "", content: "", excerpt: "", author: "Admin", category: "General", image: "/images/millet_upma.png" });
        alert("Post Published Successfully!");
    };

    const handleDeletePost = (id) => {
        const updated = posts.filter(p => p.id !== id);
        localStorage.setItem("news_posts", JSON.stringify(updated));
        setPosts(updated);
    };

    return (
        <div className="min-h-screen bg-[#f4f5ee] flex">
            {/* Sidebar Placeholder */}
            <aside className="w-64 bg-[#21492f] text-white p-8 hidden md:block">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-12">Portal Admin</h2>
                <nav className="space-y-6">
                    <Link href="/admin" className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity font-bold uppercase tracking-widest text-xs">
                        <Layout size={18} /> Dashboard
                    </Link>
                    <Link href="/admin/news" className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs bg-white/10 p-3 rounded-xl">
                        <FileText size={18} /> News & Updates
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-14">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-3xl font-black text-[#21492f] uppercase tracking-tight">News Manager</h1>
                            <p className="text-[#22aa4f] font-bold text-xs uppercase tracking-widest mt-1">Publish new updates to the website</p>
                        </div>
                    </div>

                    {/* New Post Form */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100 mb-12">
                        <h2 className="text-xl font-black text-[#21492f] uppercase tracking-tight mb-8 flex items-center gap-2">
                             <Plus size={20} className="text-[#22aa4f]" /> Create New Post
                        </h2>
                        <form onSubmit={handleSavePost} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Post Title</label>
                                    <input 
                                        required
                                        className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#22aa4f] transition-all font-bold text-[#21492f]"
                                        value={newPost.title}
                                        onChange={e => setNewPost({...newPost, title: e.target.value})}
                                        placeholder="e.g. Tips for Summer Hydration"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Category</label>
                                    <input 
                                        className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#22aa4f] transition-all font-bold text-[#21492f]"
                                        value={newPost.category}
                                        onChange={e => setNewPost({...newPost, category: e.target.value})}
                                        placeholder="e.g. Health Tips"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Short Excerpt (Visible on Card)</label>
                                <textarea 
                                    className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#22aa4f] transition-all font-bold text-[#21492f] h-24"
                                    value={newPost.excerpt}
                                    onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                                    placeholder="Write a catchy summary..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-4">Full Content (HTML Supported)</label>
                                <textarea 
                                    required
                                    className="w-full bg-[#fcfdfa] border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#22aa4f] transition-all font-bold text-[#21492f] h-48"
                                    value={newPost.content}
                                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                                    placeholder="<p>Full article content here...</p>"
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button className="flex-1 bg-[#22aa4f] hover:bg-[#21492f] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg flex items-center justify-center gap-3">
                                    <Send size={18} /> Publish Now
                                </button>
                                <div className="p-5 bg-[#f4f5ee] rounded-2xl text-gray-400">
                                    <ImageIcon size={20} />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Manage Posts */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-black text-[#21492f] uppercase tracking-tight pl-4">Recent Posts ({posts.length})</h2>
                        {posts.map(post => (
                            <div key={post.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-[#f4f5ee] rounded-2xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                                        <img src={post.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#21492f] uppercase tracking-tight">{post.title}</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{post.date} • {post.category}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDeletePost(post.id)}
                                    className="p-4 bg-red-50 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
