"use client"

import React, { useState } from 'react';
import { 
    User, 
    Shield, 
    Bell, 
    Globe, 
    ChevronDown, 
    ChevronRight,
    Camera,
    Lock,
    Smartphone,
    Mail,
    Edit2,
    Trash2,
    ArrowLeft,
    CheckCircle2,
    Search,
    Monitor,
    Database,
    Zap,
    Grid,
    Settings,
    Clock,
    Eye,
    EyeOff,
    ShieldCheck,
    DollarSign,
    MoreHorizontal
} from 'lucide-react';

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [securityView, setSecurityView] = useState('list'); // 'list' or 'change-password'
    const [expandedMenu, setExpandedMenu] = useState('Administrator Management');
    const [showPassword, setShowPassword] = useState(false);

    const sidebarMenu = [
        {
            group: 'Administrator Management',
            icon: ShieldCheck,
            items: [
                { id: 'profile', label: 'Admin Profile', dot: true },
                { id: 'security', label: 'Security Guard', dot: true },
                { id: 'permissions', label: 'Master Permissions', dot: true },
                { id: 'logs', label: 'Activity Logs', dot: true },
            ]
        },
        {
            group: 'Website CMS Settings',
            icon: Globe,
            items: [
                { id: 'organization', label: 'Organization', dot: true },
                { id: 'localization', label: 'Localization', dot: true },
                { id: 'prefixes', label: 'Prefixes', dot: true },
                { id: 'seo-setup', label: 'SEO Setup', dot: true },
                { id: 'language', label: 'Language', dot: true },
                { id: 'maintenance', label: 'Maintenance Mode', dot: true },
                { id: 'login-register', label: 'Login & Register', dot: true },
                { id: 'preferences', label: 'Preferences', dot: true },
            ]
        },
        {
            group: 'Clinic Settings',
            icon: Settings,
            items: [
                { id: 'clinic-appointment', label: 'Appointment', dot: true },
                { id: 'working-hours', label: 'Working Hours', dot: true },
                { id: 'cancel-reason', label: 'Cancellation Reason', dot: true },
            ]
        },
        { group: 'App Settings', icon: Grid },
        { group: 'System Engine', icon: Database },
        { group: 'Revenue & Finance', icon: DollarSign },
        { group: 'Global Settings', icon: Settings },
    ];

    const toggleMenu = (group) => {
        setExpandedMenu(expandedMenu === group ? null : group);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-800 pb-20">
            {/* Page Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1e293b]">Master Admin Settings</h1>
                    <p className="text-[13px] text-gray-400 font-medium mt-1">Configure global platform parameters and security profiles.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#f8fafc] text-gray-600 rounded-lg text-xs font-bold border border-gray-200 hover:bg-gray-100 transition-all">Audit Logs</button>
                    <button className="px-4 py-2 bg-[#214a32] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-[#1a3a28] transition-all">Deploy Changes</button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                
                {/* Left Sidebar Layout */}
                <div className="w-full xl:w-72 flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-4">
                        <nav className="space-y-1">
                            {sidebarMenu.map((menu) => (
                                <div key={menu.group} className="px-3">
                                    <button 
                                        onClick={() => toggleMenu(menu.group)}
                                        className={`
                                            w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all
                                            ${expandedMenu === menu.group ? 'text-[#214a32] bg-[#f0f9f4]/50' : 'text-gray-600 hover:bg-gray-50'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            {typeof menu.icon === 'function' ? menu.icon() : <menu.icon size={18} className={expandedMenu === menu.group ? 'text-[#214a32]' : 'text-gray-400'} />}
                                            <span className="text-[14px] font-semibold">{menu.group}</span>
                                        </div>
                                        {menu.items ? (
                                            <ChevronDown size={14} className={`transition-transform duration-300 ${expandedMenu === menu.group ? 'rotate-180' : ''}`} />
                                        ) : (
                                            <ChevronRight size={14} className="text-gray-300" />
                                        )}
                                    </button>

                                    {menu.items && expandedMenu === menu.group && (
                                        <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1">
                                            {menu.items.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        setActiveTab(item.id);
                                                        setSecurityView('list');
                                                    }}
                                                    className={`
                                                        w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[13px] font-medium transition-all
                                                        ${activeTab === item.id ? 'text-[#214a32] font-bold' : 'text-gray-500 hover:text-gray-900'}
                                                    `}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${activeTab === item.id ? 'bg-[#214a32]' : 'bg-gray-300'}`}></span>
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-[600px] flex flex-col">
                        
                        {/* 1. Admin Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <h2 className="text-lg font-bold text-[#1e293b] mb-10 pb-4 border-b border-gray-50">Administrator Details</h2>
                                
                                <div className="max-w-4xl">
                                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center mb-10">
                                        <label className="text-[14px] font-bold text-[#475569]">Master Avatar <span className="text-red-500">*</span></label>
                                        <div className="relative w-28 h-28 group">
                                            <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-200">
                                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                                    <Camera size={20} className="text-white" />
                                                </div>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#10b981] border-4 border-white rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-12">
                                        <InputField label="Admin First Name" required defaultValue="Admin" />
                                        <InputField label="Admin Last Name" required defaultValue="Master" />
                                        <InputField label="Contact Email" required defaultValue="admin@ilajbilghiza.com" type="email" />
                                        <div className="space-y-2">
                                            <label className="text-[14px] font-bold text-[#475569]">Designation <span className="text-gray-400 font-normal ml-1">(System)</span></label>
                                            <input value="Master Administrator" readOnly className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] font-bold text-gray-400 focus:outline-none" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-50 mt-10">
                                        <button className="px-6 py-2 rounded-lg text-[14px] font-bold text-gray-400 hover:text-gray-600">Revert</button>
                                        <button className="px-6 py-2 rounded-lg text-[14px] font-bold bg-[#214a32] text-white shadow-sm hover:bg-[#1a3a28]">Update Details</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Security Tab (Linked to Security Guard sidebar) */}
                        {activeTab === 'security' && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <div className="flex flex-col lg:flex-row gap-12">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-[#1e293b] mb-10">Security Guard Protocol</h2>
                                        <div className="divide-y divide-gray-100">
                                            <SecurityItem 
                                                title="Master Access Password" 
                                                desc="Used for all system-level configurations" 
                                                onEdit={() => setSecurityView('change-password')} 
                                            />
                                            <SecurityItem 
                                                title="Administrative 2FA" 
                                                desc="Mandatory for high-risk system updates" 
                                                hasSwitch 
                                                defaultChecked 
                                            />
                                            <SecurityItem 
                                                title="IP Whitelisting" 
                                                desc="Restrict access to trusted networks" 
                                                hasSwitch 
                                            />
                                            <SecurityItem 
                                                title="Master Phone" 
                                                desc="Primary contact for alert notifications" 
                                                hasIcons 
                                            />
                                            <SecurityItem 
                                                title="Emergency Email" 
                                                desc="Account recovery and critical alerts" 
                                                hasIcons 
                                            />
                                        </div>
                                    </div>

                                    {/* System Side-stats */}
                                    <div className="w-full lg:w-80 bg-gray-50/50 rounded-2xl border border-gray-100 p-6 self-start">
                                        <h4 className="text-[14px] font-bold text-[#1e293b] mb-4 flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-[#a4d9bc]" /> Integrity Check
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[12px] font-medium text-gray-500">Security Rating</span>
                                                <span className="text-[12px] font-bold text-emerald-600">Excellent</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[12px] font-medium text-gray-500">Active Sessions</span>
                                                <span className="text-[12px] font-bold text-gray-700">1</span>
                                            </div>
                                            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full w-[95%]"></div>
                                            </div>
                                        </div>
                                        <button className="w-full mt-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-[12px] font-bold hover:bg-gray-200 transition-colors">Run System Audit</button>
                                    </div>
                                </div>

                                {/* Modal for Change Password */}
                                {securityView === 'change-password' && (
                                    <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                                        <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-xl font-bold text-[#1e293b]">Update Master Password</h3>
                                                <button onClick={() => setSecurityView('list')} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-400"><EyeOff size={18} /></button>
                                            </div>
                                            <div className="space-y-6">
                                                <InputField label="Master Credentials" type="password" />
                                                <InputField label="New Protocol Key" type="password" />
                                                <InputField label="Confirm Key" type="password" />
                                                <button className="w-full py-3.5 bg-[#214a32] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#214a32]/20 hover:bg-[#1a3a28] transition-all">Submit Protocol Change</button>
                                                <button onClick={() => setSecurityView('list')} className="w-full py-2 text-sm font-bold text-gray-400">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {/* Website CMS Tabs Implementation */}
                        {['organization', 'localization', 'prefixes', 'seo-setup', 'language', 'maintenance', 'login-register', 'preferences'].includes(activeTab) && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                    <div>
                                        <h2 className="text-xl font-bold text-[#1e293b] capitalize">{activeTab.replace('-', ' & ')} Configuration</h2>
                                        <p className="text-sm text-gray-400 mt-1 font-medium">Master control for {activeTab.replace('-', ' ')} protocol.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-5 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-200">Reset Defaults</button>
                                        <button className="px-5 py-2 bg-[#214a32] text-white rounded-xl text-xs font-bold shadow-sm" onClick={() => alert("Settings updated!")}>Push Changes</button>
                                    </div>
                                </div>

                                <div className="max-w-4xl space-y-8">
                                    {activeTab === 'organization' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <InputField label="Master Organization Name" defaultValue="IlajBilGhiza HQ" />
                                            <InputField label="System Admin Name" defaultValue="Master Admin" />
                                            <InputField label="Platform Tech Support" defaultValue="tech@ilajbilghiza.com" />
                                            <InputField label="Global Support Line" defaultValue="+92 312 3456789" />
                                        </div>
                                    )}
                                    {activeTab === 'seo-setup' && (
                                        <div className="space-y-6">
                                            <InputField label="Global Meta Title" defaultValue="IlajBilGhiza | Master Platform" />
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-bold text-[#475569] ml-1">Master Tracking ID (GA4)</label>
                                                <input className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[14px] font-bold text-[#214a32] focus:ring-4 focus:ring-[#a4d9bc]/10 focus:border-[#a4d9bc] focus:outline-none transition-all shadow-sm" defaultValue="UA-XXXXXXXX-1" />
                                            </div>
                                        </div>
                                    )}
                                    {!['organization', 'seo-setup'].includes(activeTab) && (
                                        <div className="bg-[#f0f9f4]/30 border-2 border-dashed border-[#a4d9bc]/30 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#214a32] mb-4"><Database size={24} /></div>
                                            <h3 className="text-lg font-bold text-[#214a32] capitalize">{activeTab.replace('-', ' ')} Module</h3>
                                            <p className="text-sm text-gray-400 mt-2 max-w-xs font-medium">This administrative module is ready for back-end synchronization.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {(activeTab === 'permissions' || activeTab === 'logs') && (
                            <div className="p-10 flex flex-col items-center justify-center h-full text-center">
                                <Monitor size={48} className="text-gray-200 mb-4" />
                                <h3 className="text-lg font-bold text-gray-400">Section Under Management</h3>
                                <p className="text-sm text-gray-300 max-w-xs mt-2">Access to this module requires higher administrative clearance.</p>
                            </div>
                        )}

                        {/* Footer Area */}
                        {/* Clinic Settings Tabs Implementation */}
                        {['clinic-appointment', 'working-hours', 'cancel-reason'].includes(activeTab) && (
                            <div className="p-8 md:p-10 animate-in fade-in duration-300">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-[#1e293b] capitalize">{activeTab.replace('clinic-', '').replace('-', ' ')} Protocols</h2>
                                    <div className="flex gap-2">
                                        <button className="px-5 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-200">Reset</button>
                                        <button className="px-5 py-2 bg-[#214a32] text-white rounded-xl text-xs font-bold shadow-lg" onClick={() => alert("Clinic protocols updated!")}>Save Changes</button>
                                    </div>
                                </div>

                                <div className="max-w-5xl space-y-12">
                                    {activeTab === 'clinic-appointment' && (
                                        <div className="space-y-10">
                                            <div className="space-y-6">
                                                <h3 className="text-md font-bold text-[#1e293b]">Appointment Reminders</h3>
                                                <div className="space-y-4">
                                                    <ReminderToggle label="Automatically notify clients about upcoming appointments." defaultChecked />
                                                    <ReminderToggle label="Reminders for weekend appointments go out on Friday." />
                                                    <ReminderToggle label="Appointments auto-cancel if clients reply 'No' or 'Cancel' to reminders." defaultChecked />
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-md font-bold text-[#1e293b]">Automatic Reminders</h3>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_2fr_1fr_auto] items-center gap-4">
                                                        <span className="text-[13px] font-bold text-gray-500">Reminder</span>
                                                        <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-[#214a32] focus:outline-none"><option>Email</option><option>SMS</option></select>
                                                        <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-[#214a32] focus:outline-none"><option>Appointment Reminder</option></select>
                                                        <div className="flex items-center gap-2">
                                                            <input type="text" defaultValue="01" className="w-[60px] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-bold text-[#214a32] focus:outline-none" />
                                                            <span className="text-[12px] font-bold text-gray-400">Days Before</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                             <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl border border-gray-100"><Edit2 size={14}/></button>
                                                             <button className="p-2.5 bg-[#214a32] text-white rounded-xl"><Plus size={14}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'working-hours' && (
                                        <div className="space-y-12">
                                            <div className="grid md:grid-cols-[200px_1fr] items-center gap-8">
                                                <label className="text-sm font-bold text-[#1e293b]">Expected Productive Time <span className="text-red-500">*</span></label>
                                                <div className="relative max-w-sm">
                                                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-[#214a32] focus:outline-none pr-24" placeholder="08" />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-l pl-4 border-gray-200">Hours / Day</span>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <h3 className="text-md font-bold text-[#1e293b]">Working Days Configuration</h3>
                                                <div className="space-y-4">
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                                        <div key={day} className="flex flex-col md:flex-row md:items-center justify-between p-1 bg-white hover:bg-gray-50/50 rounded-2xl transition-colors group">
                                                            <div className="flex items-center gap-4 w-48">
                                                                <Switch defaultChecked={!['Saturday', 'Sunday'].includes(day)} />
                                                                <span className={`text-sm font-bold ${['Saturday', 'Sunday'].includes(day) ? 'text-gray-400' : 'text-[#214a32]'}`}>{day}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4 mt-4 md:mt-0">
                                                                <div className="flex items-center gap-2">
                                                                    <TimeInput defaultValue="09:30 AM" />
                                                                    <span className="text-[11px] font-bold text-gray-300">to</span>
                                                                    <TimeInput defaultValue="09:30 AM" />
                                                                </div>
                                                                <button className="p-2 text-gray-300 hover:text-[#214a32] opacity-0 group-hover:opacity-100 transition-opacity"><Edit2 size={14}/></button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="p-8 border-t border-gray-50 mt-auto">
                            <p className="text-[13px] text-gray-400 font-medium text-center">2026 Admin Portal • Secure System Interface</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reuse Sub-components (could be imported if in separate files)
function InputField({ label, required, ...props }) {
    return (
        <div className="space-y-2">
            <label className="text-[14px] font-bold text-[#475569] ml-1">{label} {required && <span className="text-red-500">*</span>}</label>
            <input className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-[14px] focus:ring-2 focus:ring-[#a4d9bc]/20 focus:border-[#a4d9bc] focus:outline-none transition-all shadow-sm" {...props} />
        </div>
    );
}

function SecurityItem({ title, desc, hasSwitch, defaultChecked, hasIcons, onEdit }) {
    return (
        <div className="py-6 flex items-center justify-between">
            <div className="pr-10">
                <h4 className="text-[16px] font-bold text-[#1e293b]">{title}</h4>
                <p className="text-[14px] text-gray-400 mt-1">{desc}</p>
            </div>
            {hasSwitch ? (
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#214a32]"></div>
                </label>
            ) : hasIcons ? (
                <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2 text-gray-400 hover:text-[#214a32] hover:bg-[#f0f9f4] rounded-lg border border-gray-100"><Edit2 size={16} /></button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-gray-100"><Trash2 size={16} /></button>
                </div>
            ) : (
                <button onClick={onEdit} className="p-2 text-gray-400 hover:text-[#214a32] hover:bg-[#f0f9f4] rounded-lg transition-all border border-gray-100 flex-shrink-0">
                    <Edit2 size={16} />
                </button>
            )}
        </div>
    );
}

function TimeInput({ defaultValue }) {
    return (
        <div className="relative">
            <input type="text" defaultValue={defaultValue} className="w-[120px] bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-[12px] font-bold text-[#214a32] focus:outline-none pr-8" />
            <Clock size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
        </div>
    );
}

function ReminderToggle({ label, defaultChecked }) {
    return (
        <label className="flex items-center justify-between p-1 cursor-pointer group">
            <span className="text-sm font-semibold text-gray-600 group-hover:text-[#214a32] transition-colors">{label}</span>
            <Switch defaultChecked={defaultChecked} />
        </label>
    );
}

function Switch({ checked, defaultChecked, onChange }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input type="checkbox" className="sr-only peer" checked={checked} defaultChecked={defaultChecked} onChange={onChange} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#214a32]"></div>
        </label>
    );
}

function Plus({ size, className }) {
    return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
}

// Fixed missing Clock icon in some contexts if needed... (already imported at top likely)

// Hospital Icon helper
function HospitalIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M3 7v14" /><path d="M21 7v14" /><path d="M16 11h-4v4" /><path d="M12 11h4v4" /><path d="M14 7v4" /><path d="M5 7h14l-1.5-4h-11L5 7Z" /></svg>
}

