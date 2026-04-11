import mongoose from 'mongoose';

const GrocerySchema = new mongoose.Schema({
    userId: {
        type: String, // Keeping it simple as a string for now, could be an ObjectId later
        default: 'default-user',
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    qty: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        default: 0,
    },
    cost: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Grocery || mongoose.model('Grocery', GrocerySchema);
