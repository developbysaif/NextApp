"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, Bell, SlidersHorizontal, Phone, Video, PanelRight, Send, CheckCircle2,
    FileText, Globe, Instagram, Youtube, Edit, MoreHorizontal, Check, CheckCheck,
    Image as ImageIcon, Link as LinkIcon, ChevronRight
} from 'lucide-react';

export default function MessagesPage() {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("currentUser") || "null");
            if (user) setCurrentUser(user);
        }
    }, []);

    const initialContacts = [
        { id: 1, name: 'Mia Johnson', role: 'Yoga Instructor', time: '11:40 AM', unread: 1, text: 'It was great to see you at the yo...', isAi: false, avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Dr. Emily Lawson', role: 'Doctor', time: '11:15 AM', unread: 5, text: 'Hi Adam, your blood test results...', isAi: false, avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Alex Foster', role: 'Personal Trainer', time: '10:30 AM', unread: 0, text: 'You\'ve got this! See you at our next s...', isAi: true, avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Sara Mitchell', role: 'Nutritionist', time: '9:45 AM', unread: 2, text: 'I\'ve updated your meal plan for...', isAi: false, avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Laura Davis', role: 'Health Coach', time: '8:10 AM', unread: 3, text: 'Just checking in to see how you\'...', isAi: false, avatar: 'https://i.pravatar.cc/150?u=5' },
        { id: 6, name: 'Dr. Kevin Moore', role: 'Physiotherapist', time: '8:25 AM', unread: 1, text: 'Remember to do the stretching...', isAi: false, avatar: 'https://i.pravatar.cc/150?u=6' },
        { id: 7, name: 'Chris Novak', role: 'Fitness Coach', time: '7:30 AM', unread: 0, text: 'Hey Adam, I\'ve updated your cardio...', isAi: false, avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: 8, name: 'Dr. Mehdi Petit', role: 'Doctor', time: '7:05 AM', unread: 0, text: 'Don\'t forget your follow-up appoint...', isAi: false, avatar: 'https://i.pravatar.cc/150?u=8' }
    ];

    const initialChat = [
        { id: 1, sender: 'Alex Foster', text: 'Hey Adam, great job on completing your 5th strength training session today! You\'re making awesome progress with the 50kg squats. 💪', time: '9:40 AM', isMe: false },
        { id: 2, sender: 'Me', text: 'Thanks, Alex! It\'s definitely challenging, but I\'m feeling stronger each time.', time: '9:47 AM', isMe: true },
        { id: 3, sender: 'Alex Foster', text: 'That\'s the spirit! Let\'s aim for more reps in our next session—think you can handle 3 more per set?', time: '9:50 AM', isMe: false },
        { id: 4, sender: 'Me', text: 'That sounds tough, but I\'ll give it my best shot!', time: '10:05 AM', isMe: true },
        { id: 5, sender: 'Alex Foster', text: 'I have no doubt you\'ll crush it! Also, remember to focus on your form to avoid injury. I\'ll be there to guide you through it.', time: '10:10 AM', isMe: false },
        { id: 6, sender: 'Me', text: 'Will do! Thanks for the encouragement!', time: '10:25 AM', isMe: true },
        { id: 7, sender: 'Alex Foster', text: 'You\'ve got this! See you at our next session. Let\'s keep pushing forward!', time: '10:30 AM', isMe: false }
    ];

    const [activeContactId, setActiveContactId] = useState(3); // Alex Foster
    const [messages, setMessages] = useState({});
    const [inputMsg, setInputMsg] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '{}');
            if (!storedMessages[3]) {
                storedMessages[3] = initialChat;
                localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
            }
            setMessages(storedMessages);
        }
    }, []);

    const currentChatMessages = messages[activeContactId] || [];
    const activeContact = initialContacts.find(c => c.id === activeContactId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentChatMessages]);

    const handleSend = (e) => {
        e.preventDefault();
        if(!inputMsg.trim()) return;

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
            localStorage.setItem('chatMessages', JSON.stringify(allMessages));
        }
        setInputMsg("");

        // Simulate auto-reply if talking to Alex (the mocked bot)
        if(activeContactId === 3) {
            setTimeout(() => {
                const botReply = {
                    id: Date.now() + 1,
                    sender: activeContact.name,
                    text: 'Got it! I will prepare your next routine. Keep hydrating and rest well tonight!',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isMe: false
                };
                const finalChat = [...allMessages[activeContactId], botReply];
                const finalAllMessages = { ...allMessages, [activeContactId]: finalChat };
                setMessages(finalAllMessages);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('chatMessages', JSON.stringify(finalAllMessages));
                }
            }, 1500);
        }
    };

    return (
        <div className="font-sans text-gray-800 bg-[#FDFBF7] min-h-screen flex flex-col lg:flex-row w-full pb-0 relative overflow-hidden h-screen">
            
            {/* Left Sidebar - Contacts List */}
            <div className="w-full lg:w-[320px] lg:h-screen lg:sticky top-0 bg-white border-r border-[#f0eee8] flex flex-col lg:pt-10 px-6 shrink-0 relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.01)]">
                <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-8">Messages</h1>
                
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="Search name, chat, etc" className="w-full bg-[#FDFBF7] border border-gray-100 rounded-[1.2rem] py-3.5 pl-11 pr-10 text-[11px] font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#a4d9bc]" />
                    <SlidersHorizontal size={14} strokeWidth={2.5} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-900" />
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 pb-24">
                    {initialContacts.map(contact => (
                        <div 
                            key={contact.id} 
                            onClick={() => setActiveContactId(contact.id)}
                            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border border-transparent
                                ${activeContactId === contact.id ? 'bg-[#214a32]/10 border-[#214a32]/20' : 'hover:bg-gray-50'}`}
                        >
                            <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover shrink-0 bg-gray-100" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className={`text-xs font-bold truncate pr-2 ${activeContactId===contact.id ? 'text-gray-900' : 'text-gray-800'}`}>{contact.name} <span className="text-[9px] font-medium text-gray-400"> - {contact.role}</span></h4>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <p className={`text-[10px] truncate ${activeContactId===contact.id ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium'}`}>{contact.text}</p>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[9px] font-bold text-gray-400 whitespace-nowrap">{contact.time}</span>
                                        {contact.unread > 0 && <span className="w-[18px] h-[18px] rounded-full bg-[#214a32] text-white flex items-center justify-center text-[9px] font-bold">{contact.unread}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                     <button className="w-full bg-[#a4d9bc] text-gray-900 text-xs font-bold py-4 rounded-[1.2rem] hover:bg-[#a6d85a] transition-all shadow-sm">
                         NEW MESSAGE
                     </button>
                </div>
            </div>

            {/* Middle Chat Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden pt-6 px-10 relative bg-[#FDFBF7]">
                
                {/* Right Top global profile cluster */}
                <div className="absolute top-8 right-6 flex items-center gap-4 hidden lg:flex z-50">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 border border-gray-100 transition-colors">
                        <Search size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 border border-gray-100 transition-colors relative">
                        <Bell size={18} />
                        <span className="absolute top-2.5 right-2 w-2 h-2 bg-[#214a32] rounded-full border border-white"></span>
                    </div>
                    <div className="bg-white rounded-full py-1.5 pl-1.5 pr-4 flex items-center gap-3 shadow-sm border border-gray-100 cursor-pointer">
                        <img src="https://i.pravatar.cc/150?u=adam" alt="Adam" className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-900 leading-tight">Adam Vasylenko</span>
                            <span className="text-[10px] text-gray-400 font-medium">Member</span>
                        </div>
                        <ChevronRight size={14} className="rotate-90 text-gray-400 ml-1" />
                    </div>
                </div>

                {/* Chat Header */}
                <div className="bg-white rounded-[2rem] p-4 flex items-center justify-between shadow-sm border border-gray-100 mb-6 shrink-0 lg:w-[calc(100%-350px)] relative z-40 mt-16 lg:mt-0">
                    <div className="flex items-center gap-3">
                        <img src={activeContact.avatar} className="w-12 h-12 rounded-[1.2rem] object-cover bg-gray-100" />
                        <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-sm text-gray-900 leading-tight">{activeContact.name}</h3>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">last seen recently</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"><Phone size={16} strokeWidth={2.5}/></button>
                        <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"><Video size={16} strokeWidth={2.5}/></button>
                        <button className="w-9 h-9 rounded-xl bg-[#a4d9bc] flex items-center justify-center text-gray-900 shadow-sm"><PanelRight size={16} strokeWidth={2.5}/></button>
                    </div>
                </div>

                {/* Messages List Area */}
                <div className="flex-1 overflow-y-auto w-full pr-4 pb-24 no-scrollbar flex flex-col pt-2 lg:w-[calc(100%-350px)]">
                    <div className="text-center mb-6"><span className="text-[10px] font-bold text-gray-400 tracking-wide">Today, Sept 8</span></div>
                    
                    {currentChatMessages.map((msg, i) => {
                        const isLast = i === currentChatMessages.length - 1 || currentChatMessages[i+1].isMe !== msg.isMe;
                        return (
                            <div key={msg.id} className={`flex flex-col mb-4 w-full ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-end gap-2 max-w-[80%]">
                                    <div className={`p-5 text-[11px] font-bold leading-relaxed shadow-sm
                                        ${msg.isMe ? 'bg-[#989a69] text-gray-900 rounded-[1.5rem] rounded-br-[0.5rem]' : 'bg-white text-gray-700 border border-gray-100 rounded-[1.5rem] rounded-bl-[0.5rem]'}
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
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input Bottom */}
                <div className="absolute bottom-6 left-10 lg:w-[calc(100%-430px)] right-10 lg:right-auto bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-2 flex items-center z-40">
                     <div className="pl-4 pr-2 text-gray-400">
                         <Search size={16} />
                     </div>
                     <form onSubmit={handleSend} className="flex-1 flex items-center">
                         <input 
                             type="text" 
                             value={inputMsg}
                             onChange={(e) => setInputMsg(e.target.value)}
                             placeholder="Type a message.." 
                             className="w-full bg-transparent border-none text-[11px] font-bold text-gray-700 focus:outline-none focus:ring-0 py-3"
                         />
                         <button type="submit" disabled={!inputMsg.trim()} className="shrink-0 bg-[#a4d9bc] text-gray-900 px-6 py-3 rounded-xl text-[11px] font-bold flex items-center gap-2 hover:bg-[#a6d85a] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                             Send <Send size={14} />
                         </button>
                     </form>
                 </div>
            </div>

            {/* Right Sidebar - Profile Viewer */}
            <div className="hidden xl:flex w-[350px] bg-white h-screen sticky top-0 border-l border-[#f0eee8] flex flex-col overflow-y-auto no-scrollbar shadow-[-10px_0_30px_rgba(0,0,0,0.01)] absolute right-0 z-0 pt-28">
                 <div className="flex items-center justify-between px-8 mb-6">
                     <h3 className="text-sm font-bold text-gray-900">Profile</h3>
                     <Edit size={16} className="text-gray-400 cursor-pointer hover:text-gray-900" />
                 </div>

                 <div className="flex flex-col items-center mb-8 px-8">
                     <img src={activeContact.avatar} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white shadow-sm" />
                     <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2">{activeContact.name}</h2>
                     <div className="bg-[#a4d9bc]/20 text-[#214a32] px-4 py-1.5 rounded-lg text-[9px] font-bold tracking-wide">
                         {activeContact.role}
                     </div>
                 </div>

                 <div className="px-8 mb-8">
                     <div className="flex items-center gap-2 mb-3">
                         <Search size={12} className="text-gray-400" />
                         <span className="text-[10px] font-bold text-gray-400">About</span>
                     </div>
                     <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
                         A certified personal trainer with 8 years of experience, specializing in strength training and personalized fitness plans for clients.
                     </p>
                 </div>

                 <div className="px-8 mb-8">
                     <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                             <ImageIcon size={12} className="text-gray-400" />
                             <span className="text-[10px] font-bold text-gray-400">Media (2)</span>
                         </div>
                         <a href="#" className="text-[9px] font-bold text-gray-900 hover:underline">Show All</a>
                     </div>
                     <div className="flex gap-3">
                         <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop" className="w-16 h-16 rounded-2xl object-cover bg-gray-100 shadow-sm" />
                         <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop" className="w-16 h-16 rounded-2xl object-cover bg-gray-100 shadow-sm" />
                         <div className="w-16 h-16 rounded-2xl object-cover bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 cursor-pointer shadow-sm hover:bg-gray-100">
                             <MoreHorizontal size={16} />
                         </div>
                     </div>
                 </div>

                 <div className="px-8 mb-8 w-full">
                     <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                             <FileText size={12} className="text-gray-400" />
                             <span className="text-[10px] font-bold text-gray-400">Documents (3)</span>
                         </div>
                         <a href="#" className="text-[9px] font-bold text-gray-900 hover:underline">Show All</a>
                     </div>
                     <div className="space-y-3 w-full">
                         <div className="flex gap-3 items-center w-full group cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors">
                             <div className="p-2.5 bg-[#a4d9bc]/20 text-[#214a32] rounded-xl shrink-0"><FileText size={16} strokeWidth={2.5} /></div>
                             <div className="flex-1 min-w-0">
                                 <h4 className="text-[10px] font-bold text-gray-900 truncate">Customized workout plan.pdf</h4>
                                 <span className="text-[9px] font-bold text-gray-400">2.5 mb</span>
                             </div>
                         </div>
                         <div className="flex gap-3 items-center w-full group cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors">
                             <div className="p-2.5 bg-[#a4d9bc]/20 text-[#214a32] rounded-xl shrink-0"><FileText size={16} strokeWidth={2.5} /></div>
                             <div className="flex-1 min-w-0">
                                 <h4 className="text-[10px] font-bold text-gray-900 truncate">Nutritional guide for muscle rec...</h4>
                                 <span className="text-[9px] font-bold text-gray-400">1.45 mb</span>
                             </div>
                         </div>
                         <div className="flex gap-3 items-center w-full group cursor-pointer hover:bg-gray-50 p-2 -ml-2 rounded-xl transition-colors">
                             <div className="p-2.5 bg-[#989a69]/20 text-[#e6a800] rounded-xl shrink-0"><FileText size={16} strokeWidth={2.5} /></div>
                             <div className="flex-1 min-w-0">
                                 <h4 className="text-[10px] font-bold text-gray-900 truncate">Weekly progress report.xls</h4>
                                 <span className="text-[9px] font-bold text-gray-400">1.96 mb</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="px-8 pb-10 w-full">
                     <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                             <LinkIcon size={12} className="text-gray-400" />
                             <span className="text-[10px] font-bold text-gray-400">Links</span>
                         </div>
                         <a href="#" className="text-[9px] font-bold text-gray-900 hover:underline">Show All</a>
                     </div>
                     <div className="space-y-2 w-full">
                         <div className="flex items-center gap-3 w-full bg-[#FDFBF7] p-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors shadow-sm">
                             <Globe size={14} className="text-[#a1cb5d] shrink-0" />
                             <span className="text-[10px] font-bold text-[#a1cb5d] truncate flex-1 leading-none pt-0.5">http://www.alexfosterfitness.com/</span>
                             <MoreHorizontal size={14} className="text-gray-400 shrink-0" />
                         </div>
                         <div className="flex items-center gap-3 w-full bg-[#FDFBF7] p-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors shadow-sm">
                             <Instagram size={14} className="text-gray-500 shrink-0" />
                             <span className="text-[10px] font-bold text-gray-500 truncate flex-1 leading-none pt-0.5">@alex_fitnesspro</span>
                             <MoreHorizontal size={14} className="text-gray-400 shrink-0" />
                         </div>
                         <div className="flex items-center gap-3 w-full bg-[#FDFBF7] p-3 rounded-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-colors shadow-sm">
                             <Youtube size={14} className="text-[#a4d9bc] shrink-0" />
                             <span className="text-[10px] font-bold text-gray-900 truncate flex-1 leading-none pt-0.5">Alex Foster Fitness Tips</span>
                             <MoreHorizontal size={14} className="text-gray-400 shrink-0" />
                         </div>
                     </div>
                 </div>

            </div>

        </div>
    );
}
