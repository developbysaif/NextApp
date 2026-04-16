"use client"

import React, { useState } from 'react';
import { MessageSquare, Send, User, CheckCircle2, Search, Filter, Phone, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserConsultation() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello Dr. Saif, I've been following my diet for 3 days but feeling a bit weak in the evenings. Is this normal?", sender: 'user', time: '10:30 AM' },
        { id: 2, text: "Hi! Yes, your body is adjusting to lower sugar intake. Increase your water and ensure you don't skip the evening snack.", sender: 'doctor', time: '11:15 AM' },
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <div className="h-[calc(100vh-180px)] max-w-6xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Consultation</h1>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Chat securely with your assigned specialist</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#214a32] hover:bg-emerald-50 transition-all">
                        <Phone size={20} />
                    </button>
                    <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#214a32] hover:bg-emerald-50 transition-all">
                        <Video size={20} />
                    </button>
                    <button className="bg-[#214a32] text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-[#214a32]/20 hover:scale-105 transition-all">
                        Book Appointment
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-[#eaf1ef] border border-[#a4d9bc] flex items-center justify-center font-black text-[#214a32]">
                            DS
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black text-gray-900">Dr. Saif Ullah</h3>
                                <CheckCircle2 size={14} className="text-blue-500" />
                            </div>
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Online • Senior Dietitian</p>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`p-5 rounded-[2rem] text-sm font-bold leading-relaxed shadow-sm ${
                                    msg.sender === 'user' 
                                        ? 'bg-[#214a32] text-white rounded-tr-none' 
                                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                }`}>
                                    {msg.text}
                                </div>
                                <span className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-gray-50">
                    <div className="flex items-center gap-4 bg-gray-50 h-16 rounded-[1.5rem] px-4 border border-gray-100 focus-within:border-[#214a32] transition-all">
                        <input 
                            type="text" 
                            placeholder="Type your message here..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 bg-transparent border-none text-sm font-bold focus:ring-0 placeholder-gray-400 text-gray-700"
                        />
                        <button 
                            onClick={handleSend}
                            className="size-10 rounded-xl bg-[#214a32] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-[9px] text-gray-400 text-center mt-4 font-bold uppercase tracking-widest">Replies usually arrive within 12-24 hours</p>
                </div>
            </div>
        </div>
    );
}
