"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Search, LayoutGrid, FileText, Stethoscope, 
    ShieldCheck, Edit2, Trash2, Eye, Loader2,
    X, CheckCircle2, Globe, Tag, Clock, Award,
    Smartphone, Zap, ChevronRight, Package, List,
    Upload, Image as ImageIcon
} from 'lucide-react';

const TABS = [
    { id: 'blogs', name: 'Blog Archive', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'doctors', name: 'Verified Clinicians', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'diseases', name: 'Disease Database', icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'products', name: 'Herbal Shop', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function ContentPortal() {
    const [activeTab, setActiveTab] = useState('blogs');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState(null);

    // Dynamic Form State for all types
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/${activeTab}`);
            const result = await res.json();
            if (result.success) {
                setData(result.data || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e, isMultiple = false) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setUploading(true);

        try {
            const uploadedUrls = [];
            for (const file of files) {
                const fd = new FormData();
                fd.append('file', file);
                const res = await fetch('/api/upload', { method: 'POST', body: fd });
                const result = await res.json();
                if (result.success) uploadedUrls.push(result.url);
            }

            if (isMultiple) {
                // For Products (array of images)
                setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...uploadedUrls] }));
            } else {
                // For Blogs/Doctors/Diseases (single image)
                setFormData(prev => ({ ...prev, image: uploadedUrls[0] }));
            }
        } catch (err) {
            showToast('❌ Image upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/${activeTab}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (result.success) {
                showToast(`✅ ${activeTab.slice(0, -1).toUpperCase()} added successfully!`, 'success');
                setShowModal(false);
                fetchData();
            }
        } catch (err) {
            showToast('❌ Error saving content.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`/api/${activeTab}?id=${id}`, { method: 'DELETE' });
            fetchData();
            showToast('Item removed successfully.', 'info');
        } catch (err) {
            console.error(err);
        }
    };

    const showToast = (msg, type) => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const openModal = () => {
        // Initialize form structure based on tab
        if (activeTab === 'blogs') {
            setFormData({ title: '', category: '', content: '', author: 'Admin', published: true, image: '' });
        } else if (activeTab === 'doctors') {
            setFormData({ name: '', specialty: '', experience: '', rating: '5.0', status: 'VERIFIED', image: '' });
        } else if (activeTab === 'diseases') {
            setFormData({ name: '', slug: '', description: '', treatments: [], image: '' });
        } else if (activeTab === 'products') {
            setFormData({ name: '', price: '', category: '', description: '', images: [] });
        }
        setShowModal(true);
    };

    const inputCls = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-50 transition-all outline-none placeholder:text-gray-300";

    return (
        <div className="space-y-8 pb-20 max-w-[1400px] mx-auto">
             {/* Toast Notification */}
             <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        className={`fixed top-6 right-6 z-[200] px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 ${toast.type === 'success' ? 'bg-[#21492f] text-white' : 'bg-red-600 text-white'}`}
                    >
                        {toast.type === 'success' ? <CheckCircle2 size={18} /> : <Zap size={18} />}
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <h1 className="text-[34px] font-black font-outfit tracking-tighter text-[#122A1A] uppercase leading-none mb-3">Universal Content Hub</h1>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe size={14} className="text-emerald-500" /> Global Management Portal • {activeTab.toUpperCase()}
                    </p>
                </div>
                <button
                    onClick={openModal}
                    className="flex items-center justify-center gap-3 px-10 py-5 bg-[#22aa4f] text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[0.15em] hover:bg-[#122A1A] transition-all shadow-xl shadow-green-900/10 active:scale-95 group"
                >
                    <Plus size={18} className="transition-transform group-hover:rotate-180" /> Onboard New {activeTab.slice(0, -1)}
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-3
                            ${activeTab === tab.id 
                                ? 'bg-white border-green-500 shadow-xl shadow-green-900/5' 
                                : 'bg-gray-50 border-transparent text-gray-400 hover:bg-white hover:border-gray-100'}
                        `}
                    >
                        <div className={`p-4 rounded-2xl ${activeTab === tab.id ? tab.bg + ' ' + tab.color : 'bg-white'}`}>
                            <tab.icon size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* Search & Actions Area */}
            <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative group w-full max-w-lg">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/search:text-green-600 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder={`Search in ${activeTab}...`} 
                        className="w-full bg-[#F8F9FA] rounded-2xl pl-16 pr-6 py-4 text-xs font-bold uppercase tracking-widest shadow-inner focus:bg-white focus:ring-0 transition-all border-none"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-green-600 transition-all"><List size={20} /></button>
                    <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-green-600 transition-all"><LayoutGrid size={20} /></button>
                </div>
            </div>

            {/* Content Table/Grid */}
            <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-40 flex flex-col items-center justify-center gap-4">
                        <div className="size-16 border-t-4 border-green-600 rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">Synchronizing Database...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="p-40 flex flex-col items-center justify-center gap-6 text-center">
                        <div className="p-10 bg-gray-50 rounded-full text-gray-200">
                            <List size={64} strokeWidth={1} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-gray-300 uppercase font-outfit">Nothing here yet</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 max-w-md">Start building your database by adding your first entry above.</p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#F8F9FA] border-b border-gray-50 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">
                                <tr>
                                    <th className="px-10 py-6">ID / Entry</th>
                                    <th className="px-10 py-6">Category</th>
                                    <th className="px-10 py-6">Status</th>
                                    <th className="px-10 py-6">Date Added</th>
                                    <th className="px-10 py-6 text-right">Managemnt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-green-50/20 transition-all">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="size-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-white group-hover:shadow-md transition-all">
                                                    {activeTab === 'blogs' && <FileText size={20} />}
                                                    {activeTab === 'doctors' && <Stethoscope size={20} />}
                                                    {activeTab === 'diseases' && <ShieldCheck size={20} />}
                                                    {activeTab === 'products' && <Package size={20} />}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-gray-900 group-hover:text-green-700 transition-colors">{item.title || item.name || 'Untitled Entry'}</h4>
                                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1">UUID: {item._id || item.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{item.category || item.specialty || 'General'}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2">
                                                <div className={`size-1.5 rounded-full ${item.published || item.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">{item.published ? 'Live' : item.status || 'Draft'}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-[11px] font-black text-gray-400">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Mar 12, 2024'}
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-2 pr-2">
                                                <button className="p-3 bg-gray-50 rounded-xl text-gray-300 hover:text-blue-500 hover:bg-white shadow-sm transition-all"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete(item._id || item.id)} className="p-3 bg-gray-50 rounded-xl text-gray-300 hover:text-red-500 hover:bg-white shadow-sm transition-all"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination / Logs Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10">
                <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.2em]">Platform Master Records • Page 01 of 12</p>
                <div className="flex gap-2">
                    <button className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#122A1A] hover:bg-gray-50 transition-all shadow-sm">Previous</button>
                    <button className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#122A1A] hover:bg-gray-50 transition-all shadow-sm">Next Entry</button>
                </div>
            </div>

            {/* MASTER MODAL FOR ALL DATA ENTRY */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#122A1A]/30 backdrop-blur-md"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden"
                        >
                            <form onSubmit={handleSave} className="flex flex-col h-[85vh]">
                                <div className="p-10 border-b border-gray-100 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black font-outfit uppercase tracking-tighter text-[#122A1A]">Master Data Entry</h2>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Configuring {activeTab.slice(0,-1)} records</p>
                                    </div>
                                    <button onClick={() => setShowModal(false)} className="size-12 bg-gray-50 rounded-2xl flex items-center justify-center transition-all hover:bg-red-50 hover:text-red-500">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-10 space-y-6">
                                    {/* Universal Image Upload Area */}
                                    <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 hover:border-green-400 transition-colors">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <h4 className="text-[11px] font-black uppercase text-gray-900 tracking-widest leading-tight">Featured Media & Assets</h4>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Upload images to link with this post.</p>
                                                </div>
                                                <div className="relative inline-block w-full max-w-[200px]">
                                                    <button type="button" className="w-full px-6 py-3 bg-white border border-gray-100 shadow-sm rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 text-gray-600 hover:text-[#122A1A] transition-all relative overflow-hidden">
                                                        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                                        {uploading ? 'Processing...' : 'Select Files'}
                                                        <input 
                                                            type="file" 
                                                            multiple={activeTab === 'products'}
                                                            onChange={(e) => handleFileUpload(e, activeTab === 'products')}
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Previews */}
                                            <div className="flex gap-2 flex-wrap max-w-xs justify-end">
                                                {activeTab === 'products' && (formData.images || []).map((imgUrl, i) => (
                                                    <div key={i} className="size-16 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                                                        <img src={imgUrl} className="w-full h-full object-cover" alt="Preview"/>
                                                    </div>
                                                ))}
                                                {activeTab !== 'products' && formData.image && (
                                                    <div className="w-24 h-16 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                                                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview"/>
                                                    </div>
                                                )}
                                                {!formData.image && (!formData.images || formData.images.length === 0) && (
                                                    <div className="size-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 shadow-inner">
                                                        <ImageIcon size={24} strokeWidth={1} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Main Label / Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder={`e.g. ${activeTab === 'blogs' ? 'Kalonji Oil Benefits' : 'Dr. Sarah'}`}
                                                className={inputCls}
                                                value={formData.title || formData.name || ''}
                                                onChange={e => setFormData(p => ({ ...p, [activeTab === 'blogs' ? 'title' : 'name']: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Classification / Specialty</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Nutrition, Herbal, Chronic"
                                                className={inputCls}
                                                value={formData.category || formData.specialty || ''}
                                                onChange={e => setFormData(p => ({ ...p, [activeTab === 'blogs' ? 'category' : 'specialty']: e.target.value }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Universal Description / Bio</label>
                                        <textarea 
                                            rows={4}
                                            placeholder="Provide detailed information for the registry..."
                                            className={inputCls + " resize-none"}
                                            value={formData.content || formData.description || ''}
                                            onChange={e => setFormData(p => ({ ...p, [activeTab === 'blogs' ? 'content' : 'description']: e.target.value }))}
                                        />
                                    </div>

                                    {activeTab === 'doctors' && (
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Experience (Years)</label>
                                                <input type="text" className={inputCls} value={formData.experience} onChange={e => setFormData(p=>({...p, experience: e.target.value}))} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Initial Rating</label>
                                                <input type="number" step="0.1" className={inputCls} value={formData.rating} onChange={e => setFormData(p=>({...p, rating: e.target.value}))} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Official Status</label>
                                                <select className={inputCls} value={formData.status} onChange={e => setFormData(p=>({...p, status: e.target.value}))}>
                                                    <option value="VERIFIED">VERIFIED</option>
                                                    <option value="PENDING">PENDING</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'products' && (
                                        <div className="grid grid-cols-2 gap-6">
                                             <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Retail Price ($)</label>
                                                <input type="number" className={inputCls} value={formData.price} onChange={e => setFormData(p=>({...p, price: e.target.value}))} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Initial Inventory</label>
                                                <input type="number" className={inputCls} placeholder="100" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-10 bg-gray-50 flex items-center justify-between border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="size-4 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ready for cloud broadcast</span>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || uploading}
                                        className="px-12 py-5 bg-[#122A1A] text-white rounded-[2rem] font-black uppercase text-[11px] tracking-widest hover:bg-black transition-all flex items-center gap-4 disabled:opacity-50"
                                    >
                                        {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : <><CheckCircle2 size={18} /> Publish & Post Now</>}
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
