"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Leaf } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, loading } = useCart();
    const total = getCartTotal();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfdfa]">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
    );

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfdfa] py-12 px-4">
                <div className="w-32 h-32 bg-green-50 rounded-[2.5rem] flex items-center justify-center mb-8 animate-float">
                    <ShoppingBag size={48} className="text-green-600" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your cart is <span className="text-green-600">empty</span></h2>
                <p className="text-gray-500 font-bold mb-10 text-lg">Harvest some organic goodness today!</p>
                <Link
                    href="/products"
                    className="px-10 py-4 bg-green-600 text-white rounded-2xl hover:bg-gray-900 transition-all font-black uppercase tracking-widest shadow-xl shadow-green-900/10 flex items-center gap-3 group"
                >
                    Start Shopping
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfdfa] py-20">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">My <span className="text-green-600">Harvest</span></h1>
                        <p className="text-gray-500 font-bold flex items-center gap-2">
                            <Leaf size={16} className="text-green-600" />
                            {cart.length} items ready for delivery
                        </p>
                    </div>
                    <button onClick={clearCart} className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline underline-offset-4 flex items-center gap-2">
                        <Trash2 size={14} /> Clear Cart
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-6">
                        {cart.map((item) => (
                            <div key={item._id || item.id} className="bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row items-center gap-8 group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500">
                                <div className="relative w-32 h-32 bg-gray-50 rounded-[1.5rem] overflow-hidden p-4 group-hover:scale-105 transition-transform duration-500">
                                    <Image
                                        src={item.image || '/placeholder.png'}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-1">{item.category}</p>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">{item.name}</h3>
                                    <p className="text-2xl font-black text-gray-900">${item.price}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-2 border border-gray-100">
                                    <button
                                        onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                        className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-8 text-center font-black text-lg">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                        className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center hover:bg-green-50 hover:text-green-600 transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <div className="text-right min-w-[120px]">
                                    <p className="text-2xl font-black text-green-600">${((parseFloat(item.price) || 0) * item.quantity).toFixed(2)}</p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id || item.id)}
                                    className="p-4 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:w-[400px]">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-32">
                            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Summary</h3>

                            <div className="space-y-4 mb-10 pb-10 border-b border-gray-50 font-bold">
                                <div className="flex justify-between text-gray-500 uppercase tracking-widest text-xs">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 uppercase tracking-widest text-xs">
                                    <span>Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="pt-4 flex justify-between">
                                    <span className="text-gray-900 uppercase tracking-tight text-xl font-black">Total</span>
                                    <span className="text-green-600 text-3xl font-black">${total.toFixed(2)}</span>
                                </div>
                            </div>

<<<<<<< HEAD
                            <Link
                                href="/checkout"
=======
                            <button
                                onClick={(e) => {
                                    if (!localStorage.getItem("currentUser")) {
                                        alert("Please sign up before buying any thing");
                                        window.location.href = "/signup";
                                    } else {
                                        window.location.href = "/checkout";
                                    }
                                }}
>>>>>>> 87b965e (initial commit)
                                className="w-full bg-green-600 text-white py-5 rounded-2xl hover:bg-gray-900 transition-all font-black uppercase tracking-widest shadow-xl shadow-green-900/10 flex items-center justify-center gap-3 group"
                            >
                                Proceed to Checkout
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
<<<<<<< HEAD
                            </Link>
=======
                            </button>
>>>>>>> 87b965e (initial commit)

                            <div className="mt-8">
                                <p className="text-center text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">Supported Payments</p>
                                <div className="flex justify-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                                            <span className="text-[8px] font-black text-[#15A858]">EP</span>
                                        </div>
                                        <span className="text-[7px] font-black uppercase">EasyPaisa</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                                            <span className="text-[8px] font-black text-[#E42127]">JC</span>
                                        </div>
                                        <span className="text-[7px] font-black uppercase">JazzCash</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                                            <span className="text-[8px] font-black text-[#004B91]">BANK</span>
                                        </div>
                                        <span className="text-[7px] font-black uppercase">Transfer</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                                            <span className="text-[8px] font-black text-gray-800">CARD</span>
                                        </div>
                                        <span className="text-[7px] font-black uppercase">Visa/MC</span>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-8 text-center text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                <ShieldCheck size={12} className="text-green-600" /> 100% Secure Transaction
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShieldCheck({ size, className }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );
}
