import mongoose from 'mongoose';

const DietPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    meals: {
        breakfast: { type: String, default: "" },
        lunch: { type: String, default: "" },
        dinner: { type: String, default: "" },
        snacks: { type: String, default: "" },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.DietPlan || mongoose.model('DietPlan', DietPlanSchema);
