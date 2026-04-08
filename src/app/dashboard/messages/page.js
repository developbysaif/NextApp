"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, Bell, SlidersHorizontal, Phone, Video, PanelRight, Send, 
    FileText, Globe, Instagram, Youtube, Edit, MoreHorizontal, CheckCheck,
    Image as ImageIcon, Link as LinkIcon, ChevronRight, Stethoscope, UserCircle2,
    MessageSquarePlus, RefreshCw
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function MessagesPage() {
    const { user } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeContactId, setActiveContactId] = useState(null);
    const [messages, setMessages] = useState({});
    const [inputMsg, setInputMsg] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const messagesEndRef = useRef(null);

    // Fetch real doctors from API
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/doctors');
                const result = await res.json();
                if (result.success && result.data?.length > 0) {
                    const verifiedDoctors = result.data.filter(d => d.isVerified !== false);
                    setDoctors(verifiedDoctors);
                    setActiveContactId(verifiedDoctors[0]?.id || verifiedDoctors[0]?._id || null);
                } else {
                    setDoctors([]);
                }
            } catch (err) {
                console.error('Error fetching doctors:', err);
                setDoctors([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    // Load messages from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedMessages = JSON.parse(localStorage.getItem('chatMessages_v2') || '{}');
            setMessages(storedMessages);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getDoctorId = (doc) => doc?.id || doc?._id || '';

    const activeContact = doctors.find(d => getDoctorId(d) === activeContactId);
    const currentChatMessages = messages[activeContactId] || [];

    useEffect(() => {
        scrollToBottom();
    }, [currentChatMessages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputMsg.trim() || !activeContactId) return;

        const newMsg = {
            id: Date.now(),
            sender: 'Me',
            text: inputMsg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        const updatedChat = [...currentChatMessages, newMsg];
        const allMessages = { ...messages, [activeContactId]: updatedChat };

        setMessages(allMessages);
        if (typeof window !== 'undefined') {
            localStorage.setItem('chatMessages_v2', JSON.stringify(allMessages));
        }
        setInputMsg("");

        // Auto-reply simulation
        setTimeout(() => {
            const replies = [
                `Thank you for reaching out. I'll review your concern and get back to you shortly.`,
                `Hello! I've received your message. Please feel free to share any symptoms or concerns.`,
                `Thank you! I'll prepare a response based on your health history.`,
                `Noted. I'll follow up with you soon regarding your query.`,
            ];
            const botReply = {
                id: Date.now() + 1,
                sender: activeContact?.name || 'Doctor',
                text: replies[Math.floor(Math.random() * replies.length)],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isMe: false
            };
            const finalChat = [...allMessages[activeContactId] || [], botReply];
            const finalAllMessages = { ...allMessages, [activeContactId]: finalChat };
            setMessages(finalAllMessages);
            if (typeof window !== 'undefined') {
                localStorage.setItem('chatMessages_v2', JSON.stringify(finalAllMessages));
            }
        }, 1800);
    };

    const filteredDoctors = doctors.filter(doc =>
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getUnread = (docId) => {
        const chat = messages[docId] || [];
        return chat.filter(m => !m.isMe && !m.read).length;
    };

    const getLastMessage = (docId) => {
        const chat = messages[docId] || [];
        if (chat.length === 0) return 'Start a conversation...';
        const last = chat[chat.length - 1];
        return last.text.length > 40 ? last.text.slice(0, 40) + '...' : last.text;
    };

    const getLastTime = (docId) => {
        const chat = messages[docId] || [];
        if (chat.length === 0) return '';
        return chat[chat.length - 1].time;
    };

    const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'You';
    const userInitial = userName?.charAt(0)?.toUpperCase() || 'U';

    return (
        <div className="font-sans text-gray-800 bg-[#FDFBF7] min-h-screen flex flex-col lg:flex-row w-full pb-0 relative overflow-hidden h-screen">
            
            {/* Left Sidebar - Contacts List */}
            <div className="w-full lg:w-[320px] lg:h-screen lg:sticky top-0 bg-white border-r border-[#f0eee8] flex flex-col lg:pt-10 px-6 shrink-0 relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.01)]">
                <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-2">Messages</h1>
                <p className="text-[10px] font-bold text-gray-400 mb-6">Chat with your doctors</p>
                
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search doctor or specialty..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-gray-100 rounded-[1.2rem] py-3.5 pl-11 pr-10 text-[11px] font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#a4d9bc]"
                    />
                    <SlidersHorizontal size={14} strokeWidth={2.5} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-900" />
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 pb-24">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <RefreshCw size={24} className="text-[#a4d9bc] animate-spin" />
                            <p className="text-[11px] font-bold text-gray-400">Loading doctors...</p>
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                            <Stethoscope size={36} className="text-gray-200" strokeWidth={1.5} />
                            <p className="text-[11px] font-bold text-gray-400">No doctors found</p>
                            <p className="text-[10px] text-gray-300 font-medium px-4">Doctors registered on the platform will appear here</p>
                        </div>
                    ) : (
                        filteredDoctors.map(doctor => {
                            const docId = getDoctorId(doctor);
                            const unread = getUnread(docId);
                            const isActive = activeContactId === docId;
                            return (
                                <div
                                    key={docId}
                                    onClick={() => setActiveContactId(docId)}
                                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border border-transparent
                                        ${isActive ? 'bg-[#214a32]/10 border-[#214a32]/20' : 'hover:bg-gray-50'}`}
                                >
                                    {/* Avatar */}
                                    {doctor.image ? (
                                        <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full object-cover shrink-0 bg-gray-100" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full shrink-0 bg-[#a4d9bc]/30 flex items-center justify-center text-[#214a32] font-black text-sm">
                                            {doctor.name?.charAt(0)?.toUpperCase()}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className={`text-xs font-bold truncate pr-2 ${isActive ? 'text-gray-900' : 'text-gray-800'}`}>
                                                Dr. {doctor.name}
                                                <span className="text-[9px] font-medium text-gray-400"> - {doctor.specialty || 'Specialist'}</span>
                                            </h4>
                                        </div>
                                        <div className="flex justify-between items-center gap-2">
                                            <p className={`text-[10px] truncate ${isActive ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'}`}>
                                                {getLastMessage(docId)}
                                            </p>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">{getLastTime(docId)}</span>
                                                {unread > 0 && (
                                                    <span className="w-[18px] h-[18px] rounded-full bg-[#214a32] text-white flex items-center justify-center text-[9px] font-bold">
                                                        {unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full bg-[#a4d9bc] text-gray-900 text-xs font-bold py-4 rounded-[1.2rem] hover:bg-[#8fcca8] transition-all shadow-sm flex items-center justify-center gap-2">
                        <MessageSquarePlus size={16} /> NEW MESSAGE
                    </button>
                </div>
            </div>

            {/* Middle Chat Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden pt-6 px-10 relative bg-[#FDFBF7]">
                
                {/* Right Top global profile cluster */}
                <div className="absolute top-8 right-6 items-center gap-4 hidden lg:flex z-50">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 border border-gray-100 transition-colors">
                        <Search size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 border border-gray-100 transition-colors relative">
                        <Bell size={18} />
                        <span className="absolute top-2.5 right-2 w-2 h-2 bg-[#214a32] rounded-full border border-white"></span>
                    </div>
                    <div className="bg-white rounded-full py-1.5 pl-1.5 pr-4 flex items-center gap-3 shadow-sm border border-gray-100 cursor-pointer">
                        {user?.image ? (
                            <img src={user.image} alt={userName} className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#214a32] flex items-center justify-center text-white text-xs font-black">
                                {userInitial}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-900 leading-tight">{userName}</span>
                            <span className="text-[10px] text-gray-400 font-medium">Member</span>
                        </div>
                        <ChevronRight size={14} className="rotate-90 text-gray-400 ml-1" />
                    </div>
                </div>

                {/* No doctor selected / No doctors state */}
                {!activeContact ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                        <Stethoscope size={64} className="text-gray-200" strokeWidth={1} />
                        <h3 className="text-lg font-bold text-gray-700">
                            {loading ? 'Loading...' : 'No Doctors Available'}
                        </h3>
                        <p className="text-[11px] text-gray-400 font-medium max-w-xs leading-relaxed">
                            {loading
                                ? 'Please wait while we load your doctors...'
                                : 'Doctors registered and verified on the platform will appear in your contacts list on the left. Visit the Doctors page to find specialists.'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Chat Header */}
                        <div className="bg-white rounded-[2rem] p-4 flex items-center justify-between shadow-sm border border-gray-100 mb-6 shrink-0 lg:w-[calc(100%-350px)] relative z-40 mt-16 lg:mt-0">
                            <div className="flex items-center gap-3">
                                {activeContact.image ? (
                                    <img src={activeContact.image} alt={activeContact.name} className="w-12 h-12 rounded-[1.2rem] object-cover bg-gray-100" />
                                ) : (
                                    <div className="w-12 h-12 rounded-[1.2rem] bg-[#a4d9bc]/30 flex items-center justify-center text-[#214a32] font-black text-lg">
                                        {activeContact.name?.charAt(0)}
                                    </div>
                                )}
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bold text-sm text-gray-900 leading-tight">Dr. {activeContact.name}</h3>
                                    <p className="text-[10px] text-[#214a32] font-bold mt-0.5">{activeContact.specialty || 'Specialist'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                                    <Phone size={16} strokeWidth={2.5} />
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                                    <Video size={16} strokeWidth={2.5} />
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-[#a4d9bc] flex items-center justify-center text-gray-900 shadow-sm">
                                    <PanelRight size={16} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        {/* Messages List Area */}
                        <div className="flex-1 overflow-y-auto w-full pr-4 pb-24 no-scrollbar flex flex-col pt-2 lg:w-[calc(100%-350px)]">
                            <div className="text-center mb-6">
                                <span className="text-[10px] font-bold text-gray-400 tracking-wide">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                            </div>

                            {currentChatMessages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-[#a4d9bc]/20 flex items-center justify-center">
                                        <MessageSquarePlus size={28} className="text-[#214a32]" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-700">Start your conversation</p>
                                    <p className="text-[11px] text-gray-400 font-medium max-w-xs leading-relaxed">
                                        Send a message to Dr. {activeContact?.name} to begin your consultation.
                                    </p>
                                </div>
                            ) : (
                                currentChatMessages.map((msg, i) => {
                                    const isLast = i === currentChatMessages.length - 1 || currentChatMessages[i + 1]?.isMe !== msg.isMe;
                                    return (
                                        <div key={msg.id} className={`flex flex-col mb-4 w-full ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                            <div className="flex items-end gap-2 max-w-[80%]">
                                                {!msg.isMe && (
                                                    <div className="w-6 h-6 rounded-full bg-[#a4d9bc]/30 flex items-center justify-center text-[#214a32] text-[9px] font-black shrink-0 mb-1">
                                                        {activeContact?.name?.charAt(0)}
                                                    </div>
                                                )}
                                                <div className={`p-5 text-[11px] font-bold leading-relaxed shadow-sm
                                                    ${msg.isMe
                                                        ? 'bg-[#989a69] text-gray-900 rounded-[1.5rem] rounded-br-[0.5rem]'
                                                        : 'bg-white text-gray-700 border border-gray-100 rounded-[1.5rem] rounded-bl-[0.5rem]'}
                                                `}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                            {isLast && (
                                                <div className="flex items-center gap-1 mt-1.5 px-1">
                                                    <span className="text-[9px] font-bold text-gray-400">{msg.time}</span>
                                                    {msg.isMe && <CheckCheck size={12} className="text-gray-400 ml-1" />}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input Bottom */}
                        <div className="absolute bottom-6 left-10 lg:w-[calc(100%-430px)] right-10 lg:right-auto bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-2 flex items-center z-40">
                            <div className="pl-4 pr-2 text-gray-400">
                                <Stethoscope size={16} />
                            </div>
                            <form onSubmit={handleSend} className="flex-1 flex items-center">
                                <input
                                    type="text"
                                    value={inputMsg}
                                    onChange={(e) => setInputMsg(e.target.value)}
                                    placeholder={`Message Dr. ${activeContact?.name}...`}
                                    className="w-full bg-transparent border-none text-[11px] font-bold text-gray-700 focus:outline-none focus:ring-0 py-3"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputMsg.trim()}
                                    className="shrink-0 bg-[#a4d9bc] text-gray-900 px-6 py-3 rounded-xl text-[11px] font-bold flex items-center gap-2 hover:bg-[#8fcca8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Send <Send size={14} />
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>

            {/* Right Sidebar - Doctor Profile Viewer */}
            {activeContact && (
                <div className="hidden xl:flex w-[350px] bg-white h-screen sticky top-0 border-l border-[#f0eee8] flex-col overflow-y-auto no-scrollbar shadow-[-10px_0_30px_rgba(0,0,0,0.01)] absolute right-0 z-0 pt-28">
                    <div className="flex items-center justify-between px-8 mb-6">
                        <h3 className="text-sm font-bold text-gray-900">Doctor Profile</h3>
                        <Edit size={16} className="text-gray-400 cursor-pointer hover:text-gray-900" />
                    </div>

                    <div className="flex flex-col items-center mb-8 px-8">
                        {activeContact.image ? (
                            <img src={activeContact.image} alt={activeContact.name} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white shadow-sm" />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-[#a4d9bc]/30 flex items-center justify-center text-[#214a32] font-black text-2xl mb-4 border-2 border-white shadow-sm">
                                {activeContact.name?.charAt(0)?.toUpperCase()}
                            </div>
                        )}
                        <h2 className="text-lg font-bold text-gray-900 leading-tight mb-1">Dr. {activeContact.name}</h2>
                        <div className="bg-[#a4d9bc]/20 text-[#214a32] px-4 py-1.5 rounded-lg text-[9px] font-bold tracking-wide mb-2">
                            {activeContact.specialty || 'Specialist'}
                        </div>
                        {activeContact.isVerified && (
                            <span className="text-[9px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                                ✓ Verified Doctor
                            </span>
                        )}
                    </div>

                    {/* About Section */}
                    <div className="px-8 mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <UserCircle2 size={12} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400">About</span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
                            {activeContact.bio || activeContact.description ||
                                `Dr. ${activeContact.name} is a qualified ${activeContact.specialty || 'medical specialist'} with ${activeContact.experience || '10+'} years of experience in natural and evidence-based medicine.`}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="px-8 mb-8">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#FDFBF7] border border-gray-100 rounded-2xl p-4 text-center">
                                <p className="text-lg font-black text-[#214a32]">{activeContact.experience || '10'}+</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Years Exp.</p>
                            </div>
                            <div className="bg-[#FDFBF7] border border-gray-100 rounded-2xl p-4 text-center">
                                <p className="text-lg font-black text-[#214a32]">{activeContact.patients || '500'}+</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">Patients</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    {(activeContact.email || activeContact.phone) && (
                        <div className="px-8 mb-8 w-full">
                            <div className="flex items-center gap-2 mb-4">
                                <LinkIcon size={12} className="text-gray-400" />
                                <span className="text-[10px] font-bold text-gray-400">Contact</span>
                            </div>
                            <div className="space-y-2 w-full">
                                {activeContact.email && (
                                    <div className="flex items-center gap-3 w-full bg-[#FDFBF7] p-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors shadow-sm">
                                        <Globe size={14} className="text-[#214a32] shrink-0" />
                                        <span className="text-[10px] font-bold text-gray-600 truncate flex-1">{activeContact.email}</span>
                                    </div>
                                )}
                                {activeContact.phone && (
                                    <div className="flex items-center gap-3 w-full bg-[#FDFBF7] p-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors shadow-sm">
                                        <Phone size={14} className="text-[#214a32] shrink-0" />
                                        <span className="text-[10px] font-bold text-gray-600 truncate flex-1">{activeContact.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Book Appointment CTA */}
                    <div className="px-8 pb-10">
                        <a
                            href={`/book-appointment?doctor=${getDoctorId(activeContact)}`}
                            className="w-full bg-[#214a32] text-white text-[11px] font-bold py-4 rounded-[1.2rem] flex items-center justify-center gap-2 hover:bg-[#1a3a27] transition-all shadow-lg shadow-emerald-900/20"
                        >
                            Book Appointment →
                        </a>
                        <a
                            href={`/doctors/${getDoctorId(activeContact)}`}
                            className="mt-3 w-full bg-[#a4d9bc]/20 text-[#214a32] text-[11px] font-bold py-3 rounded-[1.2rem] flex items-center justify-center gap-2 hover:bg-[#a4d9bc]/30 transition-all border border-[#a4d9bc]/30"
                        >
                            View Full Profile
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
