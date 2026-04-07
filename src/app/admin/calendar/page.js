"use client"

import React, { useState, useEffect } from 'react';
import { 
    Search, Bell, ChevronLeft, ChevronRight, X, Clock, MapPin, Check, Plus, Edit, Trash2, Calendar as CalendarIcon, Activity, Utensils
} from 'lucide-react';

export default function CalendarPage() {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("currentUser") || "null");
            if (user) setCurrentUser(user);
        }
    }, []);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(today.getDate());
    
    // Switch Month
    const handlePrevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); } 
        else { setCurrentMonth(m => m - 1); }
    };
    const handleNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); } 
        else { setCurrentMonth(m => m + 1); }
    };

    // Calculate Grid
    const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear);

    const calendarCells = [];
    for (let i = firstDay - 1; i >= 0; i--) calendarCells.push({ d: daysInPrevMonth - i, isCurrent: false, fullDate: new Date(currentMonth === 0 ? currentYear - 1 : currentYear, currentMonth === 0 ? 11 : currentMonth - 1, daysInPrevMonth - i) });
    for (let i = 1; i <= daysInMonth; i++) calendarCells.push({ d: i, isCurrent: true, fullDate: new Date(currentYear, currentMonth, i) });
    const remaining = 35 - calendarCells.length;
    for (let i = 1; i <= remaining; i++) calendarCells.push({ d: i, isCurrent: false, fullDate: new Date(currentMonth === 11 ? currentYear + 1 : currentYear, currentMonth === 11 ? 0 : currentMonth + 1, i) });

    // Events State - Initial Mock Data
    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem("myCalendarEvents");
            if (stored) {
                setEvents(JSON.parse(stored));
            } else {
                // Seed initial events around current date
                const seed = [
                    { id: 1, title: 'Morning Yoga Session', type: 'physical', date: new Date(currentYear, currentMonth, 5).toISOString(), time: '07:00 AM', location: 'Sunrise Yoga Studio', note: 'Focus on flexibility and breathing.' },
                    { id: 2, title: 'General Health Check-up', type: 'appointment', date: new Date(currentYear, currentMonth, 5).toISOString(), time: '03:00 PM', location: 'Central Clinic', note: 'Annual check-up.' },
                    { id: 3, title: 'Meal Prep: Oatmeal', type: 'meal', date: new Date(currentYear, currentMonth, today.getDate()).toISOString(), time: '07:00 AM', location: 'Home Kitchen', note: 'Prepare for next 3 days.' }
                ];
                setEvents(seed);
                localStorage.setItem("myCalendarEvents", JSON.stringify(seed));
            }
            setIsLoaded(true);
        }
    }, []);

    const saveEvents = (newEvents) => {
        setEvents(newEvents);
        if (typeof window !== 'undefined') {
            localStorage.setItem("myCalendarEvents", JSON.stringify(newEvents));
        }
    };

    const [filters, setFilters] = useState({ meal: true, physical: true, appointment: true });
    const toggleFilter = (key) => setFilters(prev => ({ ...prev, [key]: !prev[key] }));

    // Form Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvt, setNewEvt] = useState({ title: '', type: 'meal', date: today.toISOString().split('T')[0], time: '12:00 PM', location: '', note: '' });

    const handleAddEvent = (e) => {
        e.preventDefault();
        const created = { ...newEvt, id: Date.now(), date: new Date(newEvt.date).toISOString() };
        saveEvents([...events, created]);
        setIsModalOpen(false);
        setNewEvt({ title: '', type: 'meal', date: today.toISOString().split('T')[0], time: '12:00 PM', location: '', note: '' });
    };

    const removeEvent = (id) => {
        saveEvents(events.filter(ev => ev.id !== id));
    };

    const typeColors = {
        meal: { bg: 'bg-[#B4E567]', border: 'border-[#B4E567]', text: 'text-gray-900', badge: 'bg-[#B4E567]/20 text-[#6a8c35]' },
        physical: { bg: 'bg-[#FFD166]', border: 'border-[#FFD166]', text: 'text-gray-900', badge: 'bg-[#FFD166]/20 text-[#e6a800]' },
        appointment: { bg: 'bg-[#FF9F43]', border: 'border-[#FF9F43]', text: 'text-white', badge: 'bg-[#FF9F43]/20 text-[#d87c25]' }
    };

    const filteredEvents = events.filter(e => filters[e.type]);
    const selectedDateObj = new Date(currentYear, currentMonth, selectedDate);
    const selectedDateStr = selectedDateObj.toDateString();

    const selectedEvents = filteredEvents.filter(e => new Date(e.date).toDateString() === selectedDateStr);

    const formatEventDate = (isoStr) => {
        const d = new Date(isoStr);
        return `${daysOfWeek[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    };

    if (!isLoaded) return <div className="p-10 font-black text-[#215b33]">LOADING CALENDAR...</div>;

    return (
        <div className="font-sans text-gray-800 bg-[#FDFBF7] min-h-screen flex flex-col lg:flex-row pb-10 w-full relative">
            
            {/* Center Content Component (Heading removed) */}
            <div className="flex-1 px-6 md:px-10 pt-10 flex flex-col gap-8 lg:pr-8">
                
                {/* Header Row (Breadcrumbs & Profile) */}
                <div className="flex items-center justify-end w-full">
                    <div className="flex items-center gap-4 hidden md:flex">
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200 border border-gray-100 transition-colors">
                            <Search size={18} />
                        </div>
                        <div className="bg-white rounded-full py-1.5 pl-1.5 pr-4 flex items-center gap-3 shadow-sm border border-gray-100 cursor-pointer">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#a4d9bc] text-[#214a32] font-bold">{currentUser?.name?.charAt(0) || 'A'}</div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-900 leading-tight">{currentUser?.name || 'Adam Vasylenko'}</span>
                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Portal Manager</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Summary Cards Dynamic */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
                        <h4 className="text-[11px] font-bold text-gray-400 mb-4 tracking-wide">Total Meal Agendas</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#B4E567] flex items-center justify-center text-gray-900"><Utensils size={18} /></div>
                            <h2 className="text-3xl font-black text-gray-900 leading-none">{events.filter(e => e.type === 'meal').length} <span className="text-sm font-medium text-gray-600">agendas</span></h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
                        <h4 className="text-[11px] font-bold text-gray-400 mb-4 tracking-wide">Physical Activities</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#FFD166] flex items-center justify-center text-gray-900"><Activity size={18} /></div>
                            <h2 className="text-3xl font-black text-gray-900 leading-none">{events.filter(e => e.type === 'physical').length} <span className="text-sm font-medium text-gray-600">agendas</span></h2>
                        </div>
                    </div>
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100">
                        <h4 className="text-[11px] font-bold text-gray-400 mb-4 tracking-wide">Appointments</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#FF9F43] flex items-center justify-center text-white"><CalendarIcon size={18} /></div>
                            <h2 className="text-3xl font-black text-gray-900 leading-none">{events.filter(e => e.type === 'appointment').length} <span className="text-sm font-medium text-gray-600">agendas</span></h2>
                        </div>
                    </div>
                </div>

                {/* Month Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-1">
                        <button onClick={handlePrevMonth} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-200 hover:bg-gray-50 shadow-sm"><ChevronLeft size={16} /></button>
                        <button onClick={handleNextMonth} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-200 hover:bg-gray-50 shadow-sm mr-4"><ChevronRight size={16} /></button>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">{monthNames[currentMonth]} {currentYear}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsModalOpen(true)} className="bg-[#B4E567] text-gray-900 px-5 py-2.5 rounded-full text-xs font-bold flex items-center shadow-sm hover:bg-[#a6d85a] transition-all border border-[#a1cb5d]">
                            <Plus size={16} className="mr-1"/> New Schedule 
                        </button>
                    </div>
                </div>

                {/* Filter Row */}
                <div className="flex justify-start gap-8 bg-white border border-gray-100 border-b-0 rounded-t-3xl pt-6 px-8 pb-4">
                     {Object.keys(filters).map(key => (
                         <label key={key} className="flex items-center gap-2 cursor-pointer group">
                             <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all ${filters[key] ? typeColors[key].bg + ' ' + typeColors[key].border : 'border-gray-200 bg-white group-hover:border-gray-300'}`}>
                                 {filters[key] && <Check size={14} className={key === 'appointment' ? 'text-white' : 'text-gray-900'} strokeWidth={3} />}
                             </div>
                             <span className="text-xs font-bold text-gray-600 select-none tracking-wide capitalize">{key === 'meal' ? 'Meal Planning' : key === 'physical' ? 'Physical Activities' : 'Appointments/Events'}</span>
                         </label>
                     ))}
                </div>

                {/* Calendar Grid Dynamic */}
                <div className="bg-white border-x border-gray-100 pb-8 px-6 rounded-b-3xl">
                    <div className="grid grid-cols-7 border-b border-gray-100">
                        {daysOfWeek.map(d => <div key={d} className="text-center text-xs font-bold text-gray-400 py-3">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 border-l border-t border-gray-100">
                        {calendarCells.map((cell, idx) => {
                            const cellDateStr = cell.fullDate.toDateString();
                            const isSelected = cell.isCurrent && cell.d === selectedDate;
                            const isToday = cellDateStr === today.toDateString();
                            const cellEvents = filteredEvents.filter(e => new Date(e.date).toDateString() === cellDateStr);

                            return (
                                <div 
                                    key={idx} 
                                    onClick={() => { if(cell.isCurrent) setSelectedDate(cell.d); }}
                                    className={`min-h-[140px] border-r border-b border-gray-100 p-2 flex flex-col relative cursor-pointer transition-colors ${!cell.isCurrent ? 'bg-gray-50/50 opacity-80 cursor-default' : isSelected ? 'bg-gray-50/80 shadow-inner' : 'hover:bg-gray-50'}`}
                                >
                                     <span className={`text-[11px] font-bold z-10 w-6 h-6 flex items-center justify-center rounded-full ${!cell.isCurrent ? 'text-gray-300' : isToday ? 'bg-[#FF9F43] text-white shadow-sm' : isSelected ? 'bg-gray-900 text-white' : 'text-gray-900'} mb-1`}>{cell.d}</span>
                                     
                                     <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mt-1">
                                         {cellEvents.map(evt => (
                                             <div key={evt.id} className={`${typeColors[evt.type].bg} ${typeColors[evt.type].text} p-1.5 px-2 rounded-md text-[9px] font-bold leading-tight shadow-sm z-10 w-full truncate border border-black/5`}>
                                                 <span className="opacity-80 mr-1">{evt.time.split(' ')[0]}</span>{evt.title}
                                             </div>
                                         ))}
                                     </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* Right Sidebar - Schedule Details */}
            <div className="w-full lg:w-[350px] bg-white min-h-screen lg:rounded-tl-[3.5rem] shadow-[-10px_0_30px_rgba(0,0,0,0.02)] p-6 pt-10 flex flex-col text-gray-800 lg:sticky lg:top-0 h-screen mt-8 lg:mt-0 xl:w-[400px]">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Schedule Details</h3>
                    <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500">{selectedDateObj.toLocaleDateString('en-US', {month:'short', day:'numeric'})}</div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-10 space-y-6">
                    {selectedEvents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                            <CalendarIcon size={32} className="mb-2 opacity-30" />
                            <p className="text-sm font-medium">No schedules for this day.</p>
                        </div>
                    ) : (
                        selectedEvents.map(ev => (
                            <div key={ev.id} className="bg-[#FDFBF7] rounded-[1.5rem] p-5 border border-[#f0eee8] hover:border-gray-200 transition-colors shadow-sm">
                                <span className={`inline-block px-3 py-1 rounded-md text-[9px] font-bold tracking-wide mb-3 uppercase ${typeColors[ev.type].badge}`}>
                                    {ev.type === 'meal' ? 'Meal Planning' : ev.type === 'physical' ? 'Physical Activities' : 'Appointments'}
                                </span>
                                
                                <h2 className="text-lg font-bold text-gray-900 leading-tight mb-4">{ev.title}</h2>
                                
                                <div className="space-y-2 mb-5">
                                    <div className="flex items-center gap-3 text-[11px] text-gray-500 font-bold">
                                        <CalendarIcon size={12} strokeWidth={2.5}/> {formatEventDate(ev.date)}
                                    </div>
                                    <div className="flex items-center gap-3 text-[11px] text-gray-500 font-bold">
                                        <Clock size={12} strokeWidth={2.5}/> {ev.time}
                                    </div>
                                    {ev.location && (
                                        <div className="flex items-start gap-3 text-[11px] text-gray-500 font-bold">
                                            <MapPin size={12} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                                            <span className="leading-tight">{ev.location}</span>
                                        </div>
                                    )}
                                </div>

                                {ev.note && (
                                    <div className="bg-white rounded-xl p-3 text-[11px] font-bold text-gray-500 leading-relaxed shadow-sm border border-gray-100 mb-5">
                                        <span className="text-gray-400 block mb-0.5 text-[9px] uppercase tracking-wider font-extrabold">Note</span>
                                        {ev.note}
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 font-bold text-[10px] tracking-wide">
                                    <button onClick={() => removeEvent(ev.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-100">Remove</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal for Adding New Event */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X size={20}/></button>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Schedule</h2>
                        
                        <form onSubmit={handleAddEvent} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Event Title</label>
                                <input required type="text" value={newEvt.title} onChange={e => setNewEvt({...newEvt, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none" placeholder="e.g. Morning Jog" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 mb-1 block">Date</label>
                                    <input required type="date" value={newEvt.date} onChange={e => setNewEvt({...newEvt, date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 mb-1 block">Time</label>
                                    <input required type="time" value={newEvt.time} onChange={e => setNewEvt({...newEvt, time: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Category</label>
                                <select value={newEvt.type} onChange={e => setNewEvt({...newEvt, type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none cursor-pointer">
                                    <option value="meal">Meal Planning</option>
                                    <option value="physical">Physical Activity</option>
                                    <option value="appointment">Appointment/Event</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Location</label>
                                <input type="text" value={newEvt.location} onChange={e => setNewEvt({...newEvt, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none" placeholder="e.g. Golden Gym" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 mb-1 block">Note</label>
                                <textarea rows="2" value={newEvt.note} onChange={e => setNewEvt({...newEvt, note: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:border-[#B4E567] outline-none" placeholder="Any extra details..." />
                            </div>
                            <button type="submit" className="w-full bg-[#B4E567] text-gray-900 font-bold py-3 rounded-xl mt-4 hover:bg-[#a6d85a] transition-colors shadow-sm">Save Schedule</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
