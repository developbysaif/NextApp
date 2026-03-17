import React from 'react';
import { Stethoscope, UserCheck, ShieldCheck } from 'lucide-react';

const DoctorRecommendation = ({ recommendation }) => {
    return (
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-white/30 shadow-2xl animate-float">
                        <Stethoscope className="text-white" size={48} />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center gap-3 mb-4 justify-center md:justify-start">
                        <div className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <UserCheck size={12} />
                            Expert Advice
                        </div>
                        <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <ShieldCheck size={12} />
                            Verified Recommendation
                        </div>
                    </div>

                    <h3 className="text-3xl font-black mb-6 leading-tight">Doctor&apos;s Recommendation</h3>

                    <div className="space-y-6">
                        <div>
                            <p className="text-blue-100 text-lg font-medium leading-relaxed italic mb-4">
                                &quot;{recommendation.recommendation}&quot;
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Ideal For</p>
                                <p className="text-sm font-bold text-white">{recommendation.idealFor}</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Helps With</p>
                                <p className="text-sm font-bold text-white">{recommendation.healthConditions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorRecommendation;
