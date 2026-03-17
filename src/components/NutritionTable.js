import React from 'react';
import { Apple, Zap, Shield, Heart, Activity } from 'lucide-react';

const NutritionTable = ({ nutrition }) => {
    const nutritionItems = [
        { icon: Zap, label: 'Calories', value: nutrition.calories, color: 'text-orange-600', bg: 'bg-orange-50' },
        { icon: Activity, label: 'Vitamins', value: nutrition.vitamins, color: 'text-green-600', bg: 'bg-green-50' },
        { icon: Shield, label: 'Minerals', value: nutrition.minerals, color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: Heart, label: 'Fiber', value: nutrition.fiber, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                        <Apple className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">Nutrition Facts</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Typical values per 100g</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {nutritionItems.map((item, index) => (
                        <div key={index} className={`${item.bg} rounded-3xl p-5 border border-white transition-transform duration-300 hover:scale-[1.02]`}>
                            <div className="flex items-start gap-4">
                                <item.icon className={item.color} size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                                    <p className="text-sm font-bold text-gray-800 leading-tight">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Health Benefits Section */}
                <div className="bg-gray-900 rounded-[2rem] p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Heart className="text-white" size={16} />
                        </div>
                        <h4 className="text-lg font-bold text-white">Health Benefits</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                        {nutrition.healthBenefits}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NutritionTable;
