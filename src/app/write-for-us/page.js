"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Heart,
    Mail,
    Lock,
    User,
    ArrowRight,
    Shield,
    Stethoscope,
    FileText,
    GraduationCap,
    Building2,
    Upload,
    CheckCircle2
} from "lucide-react";

export default function DoctorRegistrationPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "doctor",
        licenseNumber: "",
        specialization: "",
        experience: "",
        clinicName: "",
        bio: "",
        // File paths (simulated)
        licenseFile: null,
        profilePhoto: null,
        clinicLogo: null,
        signature: null
    });

    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { signup } = useAuth();
    const router = useRouter();

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, we would upload to Cloudinary here
            setFormData({ ...formData, [field]: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // Save to localStorage (extending the current auth logic)
            const doctorData = {
                ...formData,
                approvalStatus: "PENDING",
                isVerified: false,
                verificationDate: null,
                createdAt: new Date().toISOString()
            };

            await signup(doctorData);
            setIsSubmitted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center border border-blue-100">
                    <div className="size-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="size-10 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">Application Submitted!</h2>
                    <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                        Thank you for applying to be a verified doctor on MediBlog.
                        Our team will review your credentials and get back to you within 2-3 business days.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center w-full bg-blue-600 text-white rounded-2xl py-4 font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl shadow-blue-900/10"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-900/20 mb-6 transition-transform hover:scale-110">
                        <Heart size={32} fill="currentColor" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        WRITE FOR <span className="text-blue-600">MEDIBLOG</span>
                    </h1>
                    <p className="text-gray-500 font-semibold max-w-2xl mx-auto text-lg leading-relaxed">
                        Join our community of verified medical professionals and share your expertise with thousands of readers.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Benefits Section */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm">
                            <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">Why Join Us?</h3>
                            <div className="space-y-4">
                                <BenefitItem
                                    icon={<Shield className="size-5" />}
                                    title="Verified Badge"
                                    desc="Earn trust with a professional verification badge."
                                />
                                <BenefitItem
                                    icon={<User className="size-5" />}
                                    title="Doctor Profile"
                                    desc="Get a dedicated public profile page."
                                />
                                <BenefitItem
                                    icon={<FileText className="size-5" />}
                                    title="Publish Blogs"
                                    desc="Share medical insights and tips."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-blue-50">
                            {/* Step Progress */}
                            <div className="flex items-center gap-4 mb-10">
                                <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-100'}`} />
                                <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-100'}`} />
                                <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-gray-100'}`} />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 border-l-4">
                                        {error}
                                    </div>
                                )}

                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                            <User className="text-blue-600" /> Basic Information
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <InputField
                                                label="Full Name"
                                                icon={<User size={18} />}
                                                placeholder="Dr. John Doe"
                                                value={formData.name}
                                                onChange={(val) => setFormData({ ...formData, name: val })}
                                            />
                                            <InputField
                                                label="Email Address"
                                                icon={<Mail size={18} />}
                                                placeholder="doctor@example.com"
                                                type="email"
                                                value={formData.email}
                                                onChange={(val) => setFormData({ ...formData, email: val })}
                                            />
                                        </div>
                                        <InputField
                                            label="Password"
                                            icon={<Lock size={18} />}
                                            placeholder="••••••••"
                                            type="password"
                                            value={formData.password}
                                            onChange={(val) => setFormData({ ...formData, password: val })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full bg-blue-600 text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-900 transition-all group"
                                        >
                                            Next Step <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                            <Stethoscope className="text-blue-600" /> Professional Details
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <InputField
                                                label="License Number"
                                                icon={<Shield size={18} />}
                                                placeholder="ML-12345"
                                                value={formData.licenseNumber}
                                                onChange={(val) => setFormData({ ...formData, licenseNumber: val })}
                                            />
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Specialization</label>
                                                <div className="relative group">
                                                    <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                                                    <select
                                                        className="w-full bg-gray-50 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none appearance-none"
                                                        value={formData.specialization}
                                                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                                    >
                                                        <option value="">Select Specialty</option>
                                                        <option value="cardiologist">Cardiologist</option>
                                                        <option value="nutritionist">Nutritionist</option>
                                                        <option value="dermatologist">Dermatologist</option>
                                                        <option value="pediatrician">Pediatrician</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <InputField
                                                label="Years of Experience"
                                                icon={<GraduationCap size={18} />}
                                                placeholder="e.g. 10"
                                                type="number"
                                                value={formData.experience}
                                                onChange={(val) => setFormData({ ...formData, experience: val })}
                                            />
                                            <InputField
                                                label="Clinic/Hospital Name"
                                                icon={<Building2 size={18} />}
                                                placeholder="City Care Hospital"
                                                value={formData.clinicName}
                                                onChange={(val) => setFormData({ ...formData, clinicName: val })}
                                            />
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="flex-1 bg-gray-100 text-gray-600 rounded-2xl py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all font-inter"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setStep(3)}
                                                className="flex-[2] bg-blue-600 text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-900 transition-all group"
                                            >
                                                Next Step <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                            <Upload className="text-blue-600" /> Documents & Verification
                                        </h2>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FileUploadField
                                                label="Medical License (PDF/JPG)"
                                                onChange={(e) => handleFileChange(e, 'licenseFile')}
                                                preview={formData.licenseFile}
                                            />
                                            <FileUploadField
                                                label="Profile Photo"
                                                onChange={(e) => handleFileChange(e, 'profilePhoto')}
                                                preview={formData.profilePhoto}
                                            />
                                            <FileUploadField
                                                label="Clinic Logo (Optional)"
                                                onChange={(e) => handleFileChange(e, 'clinicLogo')}
                                                preview={formData.clinicLogo}
                                            />
                                            <FileUploadField
                                                label="Digital Signature (PNG)"
                                                onChange={(e) => handleFileChange(e, 'signature')}
                                                preview={formData.signature}
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="flex-1 bg-gray-100 text-gray-600 rounded-2xl py-4 font-black uppercase tracking-widest hover:bg-gray-200 transition-all font-inter"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-[2] bg-green-600 text-white rounded-2xl py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-900 transition-all shadow-xl shadow-green-900/10"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, icon, placeholder, type = "text", value, onChange }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors">
                    {icon}
                </div>
                <input
                    type={type}
                    required
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-50 border-transparent rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
                />
            </div>
        </div>
    );
}

function FileUploadField({ label, onChange, preview }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{label}</label>
            <div className="relative group min-h-[100px] border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center p-4 hover:border-blue-200 transition-colors bg-gray-50/50">
                {preview ? (
                    <div className="relative w-full h-full flex flex-col items-center">
                        <img src={preview} alt="Preview" className="h-16 w-auto object-contain rounded-lg mb-2" />
                        <span className="text-[10px] font-bold text-blue-600">File Selected</span>
                    </div>
                ) : (
                    <>
                        <Upload className="size-6 text-gray-300 group-hover:text-blue-600 transition-colors mb-2" />
                        <span className="text-[10px] font-bold text-gray-400">Upload File</span>
                    </>
                )}
                <input
                    type="file"
                    onChange={onChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
}

function BenefitItem({ icon, title, desc }) {
    return (
        <div className="flex gap-4">
            <div className="size-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div>
                <p className="font-bold text-gray-900 text-sm leading-none mb-1">{title}</p>
                <p className="text-xs text-gray-500 font-medium">{desc}</p>
            </div>
        </div>
    );
}
