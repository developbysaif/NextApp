"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, CreditCard, Landmark, Wallet,
    MapPin, Phone, User, CheckCircle2, ChevronRight,
    ShoppingCart, ShieldCheck, Truck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const COLORS = {
    primary: '#2E7D32',
    accent: '#FFB703',
    background: '#F9FAF7',
    text: '#2B2B2B',
};

const PAYMENT_METHODS = [
    { id: 'easypaisa', name: 'EasyPaisa', icon: Wallet, color: '#15A858' },
    { id: 'jazzcash', name: 'JazzCash', icon: Wallet, color: '#E42127' },
    { id: 'bank', name: 'Bank Transfer', icon: Landmark, color: '#004B91' },
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, color: '#2B2B2B' },
];

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        city: '',
    });

    const [orderComplete, setOrderComplete] = useState(false);
    const [placedOrder, setPlacedOrder] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            alert("Please login to place an order");
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                user: user._id || user.id, // Support both formats
                items: cart.map(item => ({
                    productId: item._id || item.id,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: parseFloat(item.price) || 0,
                })),
                totalAmount: getCartTotal(),
                shippingAddress: formData,
                paymentMethod: paymentMethod,
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Order API Error:', errorText);
                throw new Error(`Order API error: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setPlacedOrder(data.order);
                setOrderComplete(true);
                clearCart();
            } else {
                alert(data.message || "Failed to place order");
            }
        } catch (error) {
            console.error("Order error:", error);
            alert("An error occurred while placing order");
        } finally {
            setLoading(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-[#F9FAF7] flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg w-full"
                >
                    <div className="w-24 h-24 bg-green-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-4xl font-black font-outfit mb-2">Order Placed!</h1>
                    <p className="text-[#2E7D32] font-black mb-6">Order ID: {placedOrder?.orderId}</p>
                    <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                        Thank you for shopping with us. Your organic supplies are being prepared for harvest and will reach you soon.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/grocery"
                            className="bg-[#2E7D32] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-900/20 hover:bg-gray-900 transition-all"
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            href="/dashboard/orders"
                            className="bg-white text-[#2E7D32] border-2 border-[#2E7D32] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-50 transition-all"
                        >
                            View My Orders
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9FAF7] font-inter pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <Link href="/grocery" className="flex items-center gap-2 text-[#2E7D32] font-black uppercase tracking-widest text-[10px] mb-4 hover:translate-x-[-4px] transition-transform">
                            <ChevronLeft size={16} />
                            Back to Marketplace
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black font-outfit text-gray-900 leading-none">Checkout</h1>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <div className={`p-3 rounded-xl transition-all ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <User size={18} />
                        </div>
                        <div className="w-8 h-1 bg-gray-100 rounded-full" />
                        <div className={`p-3 rounded-xl transition-all ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <CreditCard size={18} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Main Form Section */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Step 1: Shipping Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 transition-all ${step !== 1 ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32]">
                                    <MapPin size={24} />
                                </div>
                                <h2 className="text-xl font-black font-outfit uppercase tracking-tight">Shipping Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 font-outfit">Full Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        className="w-full bg-gray-50 border-transparent rounded-2xl p-4 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all font-inter"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 font-outfit">Phone Number</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+92 000 0000000"
                                        className="w-full bg-gray-50 border-transparent rounded-2xl p-4 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all font-inter"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 font-outfit">Shipping Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your complete address"
                                        className="w-full bg-gray-50 border-transparent rounded-2xl p-4 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all font-inter min-h-[100px] resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 font-outfit">City</label>
                                    <input
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Lahore, Karachi"
                                        className="w-full bg-gray-50 border-transparent rounded-2xl p-4 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all font-inter"
                                    />
                                </div>
                            </div>

                            {step === 1 && (
                                <button
                                    onClick={() => setStep(2)}
                                    className="mt-10 bg-[#2E7D32] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-green-900/10 hover:bg-gray-900 transition-all flex items-center gap-3 w-fit"
                                >
                                    Continue to Payment
                                    <ChevronRight size={18} />
                                </button>
                            )}
                        </motion.div>

                        {/* Step 2: Payment Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 transition-all ${step !== 2 ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#2E7D32]">
                                    <CreditCard size={24} />
                                </div>
                                <h2 className="text-xl font-black font-outfit uppercase tracking-tight">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {PAYMENT_METHODS.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`
                      relative flex items-center gap-4 p-6 rounded-[1.5rem] border-2 transition-all text-left
                      ${paymentMethod === method.id
                                                ? 'border-[#2E7D32] bg-green-50/30'
                                                : 'border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-200'}
                    `}
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm" style={{ color: method.color }}>
                                            <method.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Pay with</p>
                                            <h4 className="font-black text-[13px] uppercase tracking-tight">{method.name}</h4>
                                        </div>
                                        {paymentMethod === method.id && (
                                            <div className="absolute top-4 right-4 text-[#2E7D32]">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 font-outfit">Card Number</label>
                                        <input
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full bg-gray-50 border-transparent rounded-2xl p-4 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 font-outfit">Expiry Date</label>
                                        <input
                                            placeholder="MM/YY"
                                            className="w-full bg-gray-50 border-transparent rounded-2xl p-4 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 font-outfit">CVV</label>
                                        <input
                                            placeholder="***"
                                            className="w-full bg-gray-50 border-transparent rounded-2xl p-4 text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {['easypaisa', 'jazzcash'].includes(paymentMethod) && (
                                <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in duration-500">
                                    <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                        Please use your Registered Mobile Number. You will receive a prompt on your phone to authorize the transaction.
                                    </p>
                                    <input
                                        placeholder="03XX XXXXXXX"
                                        className="mt-4 w-full bg-white border-transparent rounded-xl p-4 text-sm font-bold outline-none focus:ring-4 focus:ring-green-50 focus:border-green-600 transition-all"
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <div className="mt-10 flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-8 py-5 border-2 border-gray-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className={`flex-1 bg-[#2E7D32] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-green-900/10 hover:bg-gray-900 transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {paymentMethod === 'card' ? 'Complete Payment' : `Pay with ${PAYMENT_METHODS.find(m => m.id === paymentMethod)?.name}`}
                                                <ShieldCheck size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar Summary Section */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 sticky top-36">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                <h3 className="text-xl font-black font-outfit uppercase tracking-tight">Order Summary</h3>
                                <Link href="/grocery" className="text-xs font-bold text-[#2E7D32] hover:underline">Edit Cart</Link>
                            </div>

                            {/* Cart Items List */}
                            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide mb-8">
                                {cart.length > 0 ? (
                                    cart.map((item) => (
                                        <div key={item._id || item.id} className="flex gap-4">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 relative border border-gray-100">
                                                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-xs uppercase tracking-tight leading-tight">{item.name}</h4>
                                                <p className="text-[10px] font-bold text-gray-400 mt-1">{item.quantity} x ${(parseFloat(item.price) || 0).toFixed(2)}</p>
                                            </div>
                                            <span className="font-black text-sm text-gray-900">${((parseFloat(item.price) || 0) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-10 text-center">
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Your cart is empty</p>
                                    </div>
                                )}
                            </div>

                            {/* Totals Section */}
                            <div className="space-y-4 pt-6 border-t border-gray-50">
                                <div className="flex justify-between items-center text-gray-400 text-xs font-black uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-400 text-xs font-black uppercase tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Truck size={14} className="text-[#2E7D32]" />
                                        <span>Shipping</span>
                                    </div>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="pt-4 flex justify-between items-center">
                                    <span className="text-xl font-black font-outfit uppercase tracking-tighter">Total Price</span>
                                    <span className="text-3xl font-black font-outfit text-[#2E7D32]">${getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-green-50/50 rounded-3xl border border-green-100 border-dashed flex items-start gap-4">
                                <ShieldCheck className="text-green-600 mt-1" size={20} />
                                <div>
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#2E7D32] mb-1">Safe & Secure</h5>
                                    <p className="text-[10px] font-medium text-green-700 leading-relaxed uppercase tracking-tight">
                                        Your personal data will be used to process your order and support your experience throughout this website.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
