import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['home', 'walk', 'gym'], required: true },
    duration: { type: String, required: true },
    instructions: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

export default mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema);
