"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ShieldAlert, ShieldCheck, Smartphone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TwoFactorAuthenticationPage() {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [step, setStep] = useState(1); // 1 = Start, 2 = Verify Code, 3 = Success
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState('sms'); // 'sms' or 'app'

    const handleEnableClick = () => {
        setIsLoading(true);
        // Simulate initial API call to send code
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 1200);
    };

    const handleDisableClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIs2FAEnabled(false);
            setStep(1);
        }, 1200);
    };

    const handleCodeChange = (index, value) => {
        if (value.length > 1) value = value.slice(-1);
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleCodeKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerify = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIs2FAEnabled(true);
            setStep(3);
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-12">
            {/* Header section */}
            <div className="flex items-center gap-4 mb-8">
                <Link 
                    href="/dashboard/profile" 
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-[#214a32] hover:bg-[#a4d9bc] hover:shadow-lg transition-all"
                >
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-[#214a32] tracking-tight">Two-Factor Authentication</h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Add an extra layer of security to your account.</p>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`p-6 rounded-3xl border flex items-start gap-4 transition-all duration-300 ${
                is2FAEnabled 
                ? 'bg-[#f0f9f4] border-[#a4d9bc]/30 text-[#214a32]' 
                : 'bg-white border-gray-100 shadow-sm'
            }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    is2FAEnabled ? 'bg-[#a4d9bc] text-[#214a32]' : 'bg-gray-100 text-gray-400'
                }`}>
                    {is2FAEnabled ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />}
                </div>
                <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-800">
                        {is2FAEnabled ? 'Two-Factor Authentication is ON' : 'Two-Factor Authentication is OFF'}
                    </h2>
                    <p className={`text-sm mt-1 mb-4 ${is2FAEnabled ? 'text-[#214a32]/80' : 'text-gray-500'}`}>
                        {is2FAEnabled 
                            ? 'Your account is currently protected with two-factor authentication. We will ask for a verification code when you sign in from an unrecognized device.' 
                            : 'Protect your account from unauthorized access by requiring a verification code every time you sign in.'}
                    </p>
                    
                    {is2FAEnabled ? (
                        <button 
                            onClick={handleDisableClick}
                            disabled={isLoading}
                            className="bg-white border border-red-100 text-red-500 px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-70"
                        >
                            {isLoading ? 'Disabling...' : 'Disable 2FA'}
                        </button>
                    ) : (
                        <div className="pt-2">
                            {step === 1 && (
                                <button 
                                    onClick={handleEnableClick}
                                    disabled={isLoading}
                                    className="bg-[#214a32] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a3a27] transition-all shadow-lg hover:shadow-emerald-900/20 disabled:opacity-70 flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <span>Set Up Now</span>
                                    )}
                                    {!isLoading && <ArrowRight size={16} />}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Verification Flow */}
            {!is2FAEnabled && step === 2 && (
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-xl font-bold text-[#214a32] mb-2">Verify your device</h3>
                    <p className="text-gray-500 text-sm mb-8">We've sent a 6-digit verification code to your registered mobile number ending in ****67.</p>
                    
                    <div className="flex justify-center gap-3 mb-8">
                        {verificationCode.map((digit, index) => (
                            <input
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-black text-[#214a32] bg-[#FDFBF7] border border-gray-200 rounded-xl focus:outline-none focus:border-[#a4d9bc] focus:ring-2 focus:ring-[#a4d9bc]/20 transition-all"
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button 
                            onClick={handleVerify}
                            disabled={isLoading || verificationCode.some(d => d === '')}
                            className="w-full max-w-sm flex items-center justify-center gap-2 bg-[#214a32] hover:bg-[#1a3a27] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <span>Verify Code</span>
                            )}
                        </button>
                        <button className="text-sm font-bold text-[#214a32] hover:underline" onClick={() => setVerificationCode(['','','','','',''])}>
                            Resend Code
                        </button>
                    </div>
                </div>
            )}

            {/* Success Flow */}
            {step === 3 && (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-[#f0f9f4] rounded-full flex items-center justify-center text-emerald-500 mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-[#214a32] mb-2">You're all set!</h3>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">Two-factor authentication has been successfully enabled for your account. You will now be required to enter a verification code when logging in.</p>
                    
                    <button 
                        onClick={() => {
                            setStep(1);
                            setIs2FAEnabled(true);
                        }}
                        className="bg-[#214a32] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#1a3a27] transition-all"
                    >
                        Return to Settings
                    </button>
                </div>
            )}

            {/* Method Selection (Visible when 2FA is off and step is 1) */}
            {!is2FAEnabled && step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div 
                        onClick={() => setMethod('sms')}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                            method === 'sms' 
                            ? 'border-[#a4d9bc] bg-[#f0f9f4]' 
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Smartphone size={20} className={method === 'sms' ? 'text-[#214a32]' : 'text-gray-400'} />
                            <h4 className="font-bold text-gray-800">SMS Verification</h4>
                        </div>
                        <p className="text-sm text-gray-500">Receive a randomized verification code via SMS to your registered phone number.</p>
                    </div>

                    <div 
                        onClick={() => setMethod('app')}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                            method === 'app' 
                            ? 'border-[#a4d9bc] bg-[#f0f9f4]' 
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck size={20} className={method === 'app' ? 'text-[#214a32]' : 'text-gray-400'} />
                            <h4 className="font-bold text-gray-800">Authenticator App</h4>
                        </div>
                        <p className="text-sm text-gray-500">Use an app like Google Authenticator or Authy to generate verification codes.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
