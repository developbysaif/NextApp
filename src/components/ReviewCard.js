import React from 'react';
import { Star, User, Quote } from 'lucide-react';

const ReviewCard = ({ review }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={14}
                className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
            />
        ));
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-50 hover:border-green-100 transition-all duration-300 relative overflow-hidden group">
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gray-50 group-hover:text-green-50/50 transition-colors duration-500" />

            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center text-green-600 font-bold text-xl shadow-inner">
                        {review.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 leading-tight">{review.name}</h4>
                        <div className="flex gap-0.5 mt-1">
                            {renderStars(review.rating)}
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 leading-[1.8] italic">
                    &quot;{review.comment}&quot;
                </p>

                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <span>Verified Purchase</span>
                    <span>2 days ago</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
