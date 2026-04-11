import mongoose from 'mongoose';

const DiarySchema = new mongoose.Schema({
    userId: {
        type: String,
        default: 'default-user',
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        default: 0,
    },
    carbs: {
        type: Number,
        default: 0,
    },
    protein: {
        type: Number,
        default: 0,
    },
    fat: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Diary || mongoose.model('Diary', DiarySchema);
