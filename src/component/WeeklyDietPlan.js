
"use client";
import React, { useState } from 'react';
import { Coffee, Utensils, Moon, ChevronRight, Check, Leaf, Star, Sparkles, ChefHat } from 'lucide-react';

const dietPlan = [
  {
    day: "Monday",
    breakfast: "Oats + Milk/Yogurt + Banana + 5–6 Almonds",
    lunch: "2 Roti + Chicken/Daal + Sabzi + Salad",
    dinner: "Soup + Grilled Fish/Chicken + Mixed Vegetables",
    glow: "Energy Kickstart"
  },
  {
    day: "Tuesday",
    breakfast: "2 Boiled Eggs + Brown Bread + Apple",
    lunch: "Rice + Daal + Cucumber Salad + Yogurt",
    dinner: "2 Roti + Paneer/Chicken Curry + Bhindi/Lauki",
    glow: "Protein Focus"
  },
  {
    day: "Wednesday",
    breakfast: "Yogurt Bowl + Oats + Fresh Fruit",
    lunch: "Chicken Sandwich/Wrap + Salad + Fruit",
    dinner: "2 Roti + Daal + Palak/Saag + Raita",
    glow: "Brain Power"
  },
  {
    day: "Thursday",
    breakfast: "2 Chapati + Omelette + Low-Sugar Chai",
    lunch: "Rice + Fish/Chicken + Mixed Sabzi",
    dinner: "Vegetable Soup + 1–2 Roti + Yogurt",
    glow: "Metabolism Boost"
  },
  {
    day: "Friday",
    breakfast: "Peanut Butter Toast + Banana + Milk",
    lunch: "2 Roti + Chana/Rajma + Fresh Salad",
    dinner: "Grilled Chicken + Stir-fry Veggies + Small Rice",
    glow: "Muscle Recovery"
  },
  {
    day: "Saturday",
    breakfast: "Poha/Upma with Veggies + Herbal Tea",
    lunch: "2 Roti + Beef/Chicken Keema + Salad",
    dinner: "Daal Soup + Chapati + Cucumber/Raita",
    glow: "Detox Day"
  },
  {
    day: "Sunday",
    breakfast: "Fruit Chaat + Yogurt + Oats",
    lunch: "Rice + Daal + Sabzi + Salad",
    dinner: "2 Roti + Grilled Protein + Mixed Vegetables",
    glow: "Rest & Reset"
  }
];

export default function WeeklyDietPlan() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section className="bg-[#fcfdfa] py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 size-96 bg-[#6bb300]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 size-96 bg-[#22aa4f]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-white/50 backdrop-blur-md p-10 rounded-[3rem] border border-gray-100 shadow-xl">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[#f4f5ee] px-4 py-1.5 rounded-full text-[#6bb300] font-black tracking-widest text-[10px] uppercase mb-4 border border-[#6bb300]/10 shadow-sm">
                    <Sparkles size={14} className="text-[#6bb300]" /> 7-Day Healthy Journey
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#21492f] leading-tight mb-6">
                    Weekly Nutritional <br /> <span className="text-[#6bb300]">Master Plan</span>
                </h2>
                <p className="text-lg text-gray-600 font-medium leading-relaxed italic border-l-4 border-[#6bb300] pl-6 py-2">
                    "Elevate your health with our carefully curated 7-day meal guide designed for maximum vitality and sustainable weight management."
                </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-4">
                <div className="bg-[#6bb300] text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <ChefHat size={48} className="mb-4" />
                    <p className="font-black text-2xl uppercase">21</p>
                    <p className="text-[10px] font-black tracking-widest uppercase">Unique Meals</p>
                </div>
                <div className="bg-[#21492f] text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Leaf size={48} className="mb-4 text-[#6bb300]" />
                    <p className="font-black text-2xl uppercase">100%</p>
                    <p className="text-[10px] font-black tracking-widest uppercase">Organic Focus</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Day Selector */}
          <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto gap-3 pb-4 lg:pb-0 scrollbar-hide">
            {dietPlan.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDay(idx)}
                className={`
                  flex-shrink-0 flex items-center justify-between px-8 py-5 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-xs border
                  ${activeDay === idx 
                    ? "bg-[#6bb300] text-white shadow-xl shadow-[#6bb300]/30 border-[#6bb300] scale-[1.02] -translate-y-0.5" 
                    : "bg-white text-gray-500 border-gray-100 hover:bg-[#f4f5ee] hover:border-[#6bb300]/20"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${activeDay === idx ? 'bg-white/20' : 'bg-gray-50'}`}>0{idx+1}</span>
                    {item.day}
                </div>
                <ChevronRight className={`transition-transform ${activeDay === idx ? 'rotate-90 md:rotate-0 opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>

          {/* Details Content */}
          <div className="lg:col-span-8 bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_32px_80px_-16px_rgba(33,73,47,0.1)] border border-gray-100 relative group min-h-[500px]">
             
             <div className="absolute top-10 right-10 flex items-center gap-2 bg-[#6bb300]/10 text-[#6bb300] px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest border border-[#6bb300]/20">
                <Star size={14} className="fill-[#6bb300]" /> {dietPlan[activeDay].glow}
             </div>

             <div className="flex items-center gap-4 mb-14">
                <div className="w-16 h-16 bg-[#6bb300] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                    {dietPlan[activeDay].day.charAt(0)}
                </div>
                <div>
                    <h3 className="text-3xl font-black text-[#21492f] uppercase tracking-tight">{dietPlan[activeDay].day} Schedule</h3>
                    <p className="text-[#6bb300] font-black text-[10px] uppercase tracking-[0.3em] mt-1">Recommended by Specialists</p>
                </div>
             </div>

             <div className="space-y-8">
                {/* Breakfast */}
                <div className="group/item flex flex-col md:flex-row md:items-center gap-6 p-8 bg-[#f4f5ee] rounded-[2.5rem] border border-transparent hover:border-[#6bb300] transition-all duration-500 hover:shadow-xl hover:bg-white">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-md transform group-hover/item:rotate-12 transition-transform duration-500">
                    <Coffee size={32} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6bb300] mb-1 block">07:00 AM - Breakfast</span>
                    <h4 className="text-xl font-bold text-[#21492f] group-hover/item:text-[#6bb300] transition-colors">{dietPlan[activeDay].breakfast}</h4>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-[#6bb300] font-black text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity uppercase tracking-widest">
                    Pure Energy <Check size={16} />
                  </div>
                </div>

                {/* Lunch */}
                <div className="group/item flex flex-col md:flex-row md:items-center gap-6 p-8 bg-[#f4f5ee] rounded-[2.5rem] border border-transparent hover:border-[#6bb300] transition-all duration-500 hover:shadow-xl hover:bg-white">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-md transform group-hover/item:rotate-12 transition-transform duration-500">
                    <Utensils size={32} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6bb300] mb-1 block">01:00 PM - Lunch</span>
                    <h4 className="text-xl font-bold text-[#21492f] group-hover/item:text-[#6bb300] transition-colors">{dietPlan[activeDay].lunch}</h4>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-[#6bb300] font-black text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity uppercase tracking-widest">
                    Nutrient Power <Check size={16} />
                  </div>
                </div>

                {/* Dinner */}
                <div className="group/item flex flex-col md:flex-row md:items-center gap-6 p-8 bg-[#f4f5ee] rounded-[2.5rem] border border-transparent hover:border-[#6bb300] transition-all duration-500 hover:shadow-xl hover:bg-white">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-800 shadow-md transform group-hover/item:rotate-12 transition-transform duration-500">
                    <Moon size={32} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6bb300] mb-1 block">08:00 PM - Dinner</span>
                    <h4 className="text-xl font-bold text-[#21492f] group-hover/item:text-[#6bb300] transition-colors">{dietPlan[activeDay].dinner}</h4>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-[#6bb300] font-black text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity uppercase tracking-widest">
                    Easy Digest <Check size={16} />
                  </div>
                </div>
             </div>

             <div className="mt-14 pt-8 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-500 font-medium max-w-sm">
                    * Drinks: Stay hydrated with at least 3-4 liters of water daily. Green tea or lemon water is recommended between meals.
                </p>
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-[#6bb300] shadow-[0_0_10px_#6bb300]"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Live Health Lab Verified</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
