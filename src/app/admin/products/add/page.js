"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    X,
    Plus,
    Tag,
    DollarSign,
    Percent,
    CheckCircle2,
    Loader2,
    Image as ImageIcon,
    Package,
    AlertCircle,
    ArrowLeft,
    Trash2,
    Star,
    ChevronDown,
    Layers
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
    const router = useRouter();
    const fileInputRef = useRef(null);

    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]); 
    const [uploading, setUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        tags: '',
        discount: '0',
        sku: '',
        weight: '',
        status: 'active'
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            if (Array.isArray(data)) {
                setCategories(data);
            } else if (data.data && Array.isArray(data.data)) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        addImages(files);
    };

    const addImages = (files) => {
        const validFiles = files.filter(f => f.type.startsWith('image/'));
        const newImages = validFiles.map((file, idx) => ({
            id: Date.now() + idx,
            url: URL.createObjectURL(file), // Still using object URL for preview, real app would upload to Cloudinary/S3
            file,
            name: file.name,
            isMain: images.length === 0 && idx === 0
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        addImages(Array.from(e.dataTransfer.files));
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const setMainImage = (id) => {
        setImages(prev => prev.map(img => ({ ...img, isMain: img.id === id })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            showToast('Please upload at least one product image', 'error');
            return;
        }

        setIsSubmitting(true);
        try {
            const mainImg = images.find(img => img.isMain)?.url || images[0]?.url;
            
            const productToSave = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                discount: formData.discount,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                image: mainImg,
                images: images.map(img => img.url),
                // Additional fields for Product model
                shortDescription: formData.description.slice(0, 100),
                slug: formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now()
            };

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToSave)
            });

            const result = await response.json();
            if (result.success) {
                showToast(`Product "${formData.name}" published to MongoDB!`);
                setTimeout(() => router.push('/admin/products'), 1500);
            } else {
                showToast(result.message || 'Failed to save to MongoDB', 'error');
            }
        } catch (error) {
            showToast('Connection error', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl font-bold text-sm ${
                            toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#214a32] text-white'
                        }`}
                    >
                        {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="w-11 h-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm"><ArrowLeft size={18} /></Link>
                    <div>
                        <h1 className="text-2xl font-black text-[#214a32]">Add New Product</h1>
                        <p className="text-sm text-gray-400">Saving directly to MongoDB Database</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-6">
                        <h2 className="text-sm font-black text-[#214a32] uppercase mb-4 flex items-center gap-2"><ImageIcon size={16}/> Images</h2>
                        <div 
                            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-[#214a32] bg-green-50' : 'border-gray-200'}`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragLeave={() => setDragOver(false)}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <input ref={fileInputRef} type="file" multiple hidden onChange={handleImageSelect} accept="image/*" />
                            <Upload size={24} className="mx-auto text-[#214a32] mb-2" />
                            <p className="text-xs font-bold text-[#214a32]">Upload Product Images</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {images.map(img => (
                                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border">
                                    <img src={img.url} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center gap-2 transition-all">
                                        <button type="button" onClick={() => setMainImage(img.id)} className={`p-1.5 rounded-lg ${img.isMain ? 'bg-[#214a32] text-white' : 'bg-white'}`}><Star size={12}/></button>
                                        <button type="button" onClick={() => removeImage(img.id)} className="p-1.5 bg-red-500 text-white rounded-lg"><Trash2 size={12}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Product Name</label>
                            <input type="text" required className="w-full bg-[#F8F7F4] rounded-2xl px-6 py-4 font-bold outline-none focus:ring-4 focus:ring-green-50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Description</label>
                            <textarea rows={4} required className="w-full bg-[#F8F7F4] rounded-2xl px-6 py-4 font-bold outline-none focus:ring-4 focus:ring-green-50 resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Price ($)</label>
                                <input type="number" step="0.01" required className="w-full bg-[#F8F7F4] rounded-2xl px-4 py-4 font-bold outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Discount (%)</label>
                                <input type="number" className="w-full bg-[#F8F7F4] rounded-2xl px-4 py-4 font-bold outline-none" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Stock</label>
                                <input type="number" required className="w-full bg-[#F8F7F4] rounded-2xl px-4 py-4 font-bold outline-none" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Category</label>
                            <select required className="w-full bg-[#F8F7F4] rounded-2xl px-6 py-4 font-bold outline-none appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#214a32] text-white rounded-3xl font-black uppercase tracking-widest shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">
                        {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <CheckCircle2 size={20}/>}
                        Publish to MongoDB
                    </button>
                </div>
            </form>
        </div>
    );
}
