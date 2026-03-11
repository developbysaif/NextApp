"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, Eye, Loader2,
    Upload, Tag, X, CheckCircle2, AlertCircle,
    FileText, Link as LinkIcon, Image as ImageIcon, Globe, Clock, BookOpen
} from 'lucide-react';

const CATEGORIES = [
    'Cardiologist Insights',
    'Nutritionist Insights',
    'Dermatologist Insights',
    'Pediatrician Insights'
];

const emptyForm = {
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    category: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    readTime: '',
    published: true,
};

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [activeTab, setActiveTab] = useState('content'); // content | seo

    useEffect(() => { fetchBlogs(); }, []);

    // Auto-generate slug from title
    useEffect(() => {
        if (formData.title && !formData.slug) {
            setFormData(prev => ({
                ...prev,
                slug: prev.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.title]);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (data.success) setBlogs(data.data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const result = await res.json();
            if (result.success) setFormData(prev => ({ ...prev, image: result.url }));
        } catch (err) {
            console.error(err);
        } finally { setUploading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                readTime: formData.readTime || `${Math.ceil((formData.content || '').split(' ').length / 200)} min read`,
            };

            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (result.success) {
                showToast('✅ Blog published successfully!', 'success');
                setShowModal(false);
                setFormData(emptyForm);
                setActiveTab('content');
                fetchBlogs();
            } else {
                showToast('❌ Failed to publish blog.', 'error');
            }
        } catch (err) {
            showToast('❌ Error: ' + err.message, 'error');
        } finally { setIsSubmitting(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        try {
            const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                showToast('Blog deleted.', 'success');
                fetchBlogs();
            }
        } catch (e) { console.error(e); }
    };

    const showToast = (msg, type) => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const openModal = () => { setFormData(emptyForm); setActiveTab('content'); setShowModal(true); };

    const filtered = blogs.filter(b =>
        b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const inputCls = "w-full bg-[#F8F7F4] border-transparent rounded-2xl px-5 py-3.5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none placeholder:text-gray-400";

    return (
        <div className="space-y-8">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        className={`fixed top-6 right-6 z-[200] px-6 py-4 rounded-2xl font-bold text-sm shadow-xl ${toast.type === 'success' ? 'bg-[#21492f] text-white' : 'bg-red-600 text-white'}`}
                    >
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black font-outfit tracking-tight text-[#21492f]">Blog Management</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {blogs.length} Total Posts
                    </p>
                </div>
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 px-6 py-4 bg-[#22aa4f] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#21492f] transition-all shadow-xl shadow-green-100"
                >
                    <Plus size={20} /> Write New Blog
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search blogs by title or category..."
                        className="w-full bg-[#F8F7F4] rounded-xl pl-12 pr-4 py-3 text-sm font-medium outline-none focus:bg-white transition-all"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Blog List */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[40vh]">
                    <Loader2 className="animate-spin text-green-600" size={36} />
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center">
                    <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-[#21492f] mb-2">No Blogs Yet</h3>
                    <p className="text-gray-400 text-sm font-medium mb-6">Start writing your first blog post.</p>
                    <button onClick={openModal} className="px-8 py-3 bg-[#22aa4f] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#21492f] transition-all">
                        Write First Blog
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F8F7F4] border-b border-gray-100">
                                {['Blog', 'Category', 'Read Time', 'Status', 'Date', 'Actions'].map(h => (
                                    <th key={h} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(blog => (
                                <motion.tr key={blog._id} className="hover:bg-green-50/20 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-10 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                {blog.image
                                                    ? <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                                    : <ImageIcon size={16} className="text-gray-300 m-auto mt-2.5" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#21492f] text-sm leading-tight line-clamp-1">{blog.title}</p>
                                                <p className="text-[10px] text-gray-400 font-bold mt-0.5">/blog/{blog.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">{blog.category || '—'}</span>
                                    </td>
                                    <td className="px-6 py-5 text-xs font-bold text-gray-500">
                                        <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime || '—'}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`text-[10px] font-black uppercase ${blog.published ? 'text-green-600' : 'text-gray-400'}`}>
                                            {blog.published ? '● Published' : '○ Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-xs font-bold text-gray-400">
                                        {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="p-2 text-gray-300 hover:text-blue-500 rounded-lg transition-all">
                                                <Eye size={16} />
                                            </a>
                                            <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-300 hover:text-red-500 rounded-lg transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- MODAL --- */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#21492f]/20 backdrop-blur-md"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden"
                        >
                            <div className="flex h-[88vh]">
                                {/* Left Sidebar: Image + Info */}
                                <div className="hidden lg:flex flex-col w-[280px] flex-shrink-0 bg-[#F8F7F4] border-r border-gray-100 p-8">
                                    <h3 className="text-lg font-black text-[#21492f] mb-6">Featured Image</h3>

                                    {/* Image Upload */}
                                    <div className="aspect-[4/3] bg-white rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer hover:border-green-400 transition-all group mb-4">
                                        {formData.image
                                            ? <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                            : <>
                                                <Upload size={32} className="text-gray-300 group-hover:text-green-500 transition-colors mb-3" />
                                                <p className="text-[10px] font-black uppercase text-gray-400 text-center px-4 tracking-widest">Upload Featured Image</p>
                                            </>
                                        }
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        {uploading && (
                                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                                <Loader2 className="animate-spin text-green-600" size={28} />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-8">Supports JPG, PNG, WEBP.</p>

                                    {/* Category */}
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Category</label>
                                    <select
                                        className={inputCls + ' mb-4'}
                                        value={formData.category}
                                        onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                                    >
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>

                                    {/* Read Time */}
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Read Time</label>
                                    <div className="relative">
                                        <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="e.g. 5 min read"
                                            className={inputCls + ' pl-10'}
                                            value={formData.readTime}
                                            onChange={e => setFormData(p => ({ ...p, readTime: e.target.value }))}
                                        />
                                    </div>

                                    {/* Published */}
                                    <div className="mt-6 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, published: !p.published }))}
                                            className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${formData.published ? 'bg-[#22aa4f]' : 'bg-gray-200'}`}
                                        >
                                            <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.published ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </button>
                                        <span className="text-xs font-black text-gray-600 uppercase tracking-wide">
                                            {formData.published ? 'Publish Now' : 'Save as Draft'}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Form */}
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
                                        <h2 className="text-2xl font-black font-outfit text-[#21492f]">Write New Blog</h2>
                                        <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <X size={22} className="text-gray-400" />
                                        </button>
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex border-b border-gray-100 px-8">
                                        {[
                                            { id: 'content', label: 'Content', icon: FileText },
                                            { id: 'seo', label: 'SEO & Link', icon: Globe },
                                        ].map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex items-center gap-2 px-4 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab.id ? 'border-[#22aa4f] text-[#22aa4f]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                            >
                                                <tab.icon size={14} /> {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Form Content */}
                                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
                                        {activeTab === 'content' && (
                                            <>
                                                {/* Title */}
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Blog Title *</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="e.g. Benefits of Black Seed Oil for Immunity"
                                                        className={inputCls}
                                                        value={formData.title}
                                                        onChange={e => setFormData(p => ({ ...p, title: e.target.value, slug: '' }))}
                                                    />
                                                </div>

                                                {/* Short Description */}
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Article Description (Urdu/English) *</label>
                                                    <textarea
                                                        required
                                                        rows={2}
                                                        placeholder="Write a catchy one-line description..."
                                                        className={inputCls + ' resize-none'}
                                                        value={formData.description}
                                                        onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                                                    />
                                                </div>

                                                {/* Full Content */}
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Article Content *</label>
                                                    <textarea
                                                        required
                                                        rows={10}
                                                        placeholder="Write the complete article here..."
                                                        className={inputCls + ' resize-none'}
                                                        value={formData.content}
                                                        onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                                                    />
                                                </div>

                                                {/* Tags */}
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tags (comma separated)</label>
                                                    <div className="relative">
                                                        <Tag size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            placeholder="organic, immunity, kalonji, herbal"
                                                            className={inputCls + ' pl-10'}
                                                            value={formData.tags}
                                                            onChange={e => setFormData(p => ({ ...p, tags: e.target.value }))}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'seo' && (
                                            <>
                                                {/* URL Slug */}
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">URL Slug</label>
                                                    <div className="relative">
                                                        <LinkIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            placeholder="benefits-of-black-seed-oil"
                                                            className={inputCls + ' pl-10'}
                                                            value={formData.slug}
                                                            onChange={e => setFormData(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }))}
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 ml-2">
                                                        Page URL: <span className="text-[#22aa4f] font-bold">/blog/{formData.slug || 'auto-generated'}</span>
                                                    </p>
                                                </div>

                                                {/* SEO Title */}
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">SEO Title (Google Title)</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Best Organic Black Seed Oil | Ilaj Bil Ghiza"
                                                        className={inputCls}
                                                        value={formData.seoTitle}
                                                        onChange={e => setFormData(p => ({ ...p, seoTitle: e.target.value }))}
                                                    />
                                                    <p className={`text-[10px] ml-2 font-bold ${formData.seoTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                                                        {formData.seoTitle.length}/60 characters
                                                    </p>
                                                </div>

                                                {/* SEO Description */}
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">SEO Meta Description</label>
                                                    <textarea
                                                        rows={3}
                                                        placeholder="A short description for search engines (max 160 characters)..."
                                                        className={inputCls + ' resize-none'}
                                                        value={formData.seoDescription}
                                                        onChange={e => setFormData(p => ({ ...p, seoDescription: e.target.value }))}
                                                    />
                                                    <p className={`text-[10px] ml-2 font-bold ${formData.seoDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                                                        {formData.seoDescription.length}/160 characters
                                                    </p>
                                                </div>

                                                {/* SEO Tags Preview */}
                                                {(formData.tags || formData.title) && (
                                                    <div className="bg-[#F8F7F4] rounded-2xl p-5 space-y-2">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Google Preview</p>
                                                        <p className="text-blue-600 font-bold text-sm underline">{formData.seoTitle || formData.title}</p>
                                                        <p className="text-green-700 text-[11px]">ilajbilghiza.com/blog/{formData.slug || '...'}</p>
                                                        <p className="text-gray-600 text-xs">{formData.seoDescription || formData.description}</p>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* Submit Button (always visible) */}
                                        <div className="pt-2 pb-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-[#22aa4f] text-white rounded-2xl py-4 font-black uppercase tracking-widest hover:bg-[#21492f] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-60"
                                            >
                                                {isSubmitting
                                                    ? <><Loader2 className="animate-spin" size={18} /> Publishing...</>
                                                    : <><CheckCircle2 size={18} /> {formData.published ? 'Publish Blog Post' : 'Save as Draft'}</>
                                                }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
