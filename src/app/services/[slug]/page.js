
"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { servicesData } from "@/data/services-data";
import { ArrowLeft, CheckCircle2, Users, Star, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function ServiceDetail() {
  const { slug } = useParams();
  const router = useRouter();
  
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f5ee]">
        <h1 className="text-4xl font-black text-[#21492f] mb-4">Service Not Found</h1>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-[#6bb300] text-white rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-[#5a9600] transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfa] pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-[#21492f] overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-10 size-64 bg-[#6bb300] rounded-full blur-[120px]" />
            <div className="absolute bottom-20 right-10 size-96 bg-[#22aa4f] rounded-full blur-[150px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-[#6bb300] font-bold uppercase tracking-[0.2em] text-xs mb-8 hover:text-[#88e000] transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
            {service.title}
          </h1>
          <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
            {service.desc}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-6xl">{service.icon}</span>
                <div>
                  <h2 className="text-3xl font-black text-[#21492f] uppercase tracking-tight">Overview</h2>
                  <div className="h-1.5 w-20 bg-[#6bb300] rounded-full mt-2"></div>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed font-medium mb-10">
                {service.detailedDesc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-5 bg-[#f4f5ee] rounded-2xl group hover:bg-[#6bb300] transition-all duration-300">
                    <CheckCircle2 className="text-[#6bb300] group-hover:text-white shrink-0 mt-1" size={24} />
                    <span className="text-[#21492f] group-hover:text-white font-bold leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial / Quote */}
            <div className="bg-[#6bb300] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="relative z-10">
                    <Star className="text-white/40 mb-6" size={48} fill="currentColor" />
                    <p className="text-2xl md:text-3xl font-bold italic leading-relaxed mb-8">
                       " {service.title} specialized care changed my perspective on health entirely. The professional approach and detailed guidance are unmatched. "
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center font-black text-xl">JD</div>
                        <div>
                            <p className="font-black uppercase tracking-widest text-sm">Jane Doe</p>
                            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Satisfied Patient</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl font-black text-[#21492f] uppercase tracking-tight mb-8">Service Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#fcfdfa] rounded-2xl border border-gray-50">
                  <div className="flex items-center gap-3">
                    <Users className="text-[#6bb300]" size={24} />
                    <span className="font-bold text-gray-600">Expert Staff</span>
                  </div>
                  <span className="font-black text-[#21492f]">{service.doctors}+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#fcfdfa] rounded-2xl border border-gray-50">
                  <div className="flex items-center gap-3">
                    <Star className="text-[#6bb300]" size={24} />
                    <span className="font-bold text-gray-600">Success Rate</span>
                  </div>
                  <span className="font-black text-[#21492f]">98%</span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-[#21492f] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#6bb300]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-2xl font-black uppercase tracking-tight mb-4 relative z-10">Start Your Journey</h3>
               <p className="text-gray-300 font-medium mb-8 relative z-10">Book a consultation with our experts today and get a personalized plan.</p>
               <button className="w-full bg-[#6bb300] hover:bg-[#5a9600] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-xl relative z-10">
                 Book Appointment <ArrowRight size={18} />
               </button>
            </div>

            {/* Need Help */}
            <div className="p-8 bg-[#f4f5ee] rounded-[2.5rem] border-2 border-dashed border-[#6bb300]/30 text-center">
                <p className="text-[#21492f] font-black uppercase tracking-[0.1em] text-xs mb-2">Need Help?</p>
                <p className="text-gray-600 font-bold text-lg mb-4">Contact our support 24/7</p>
                <div className="text-[#6bb300] font-black text-xl">+92 312 4567890</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
