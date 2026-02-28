import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: 60,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        // Not required if using Google Login
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['customer', 'farmer', 'admin'],
        default: 'customer',
    },
    // Health Profile for AI Recommendations
    healthProfile: {
        conditions: [String], // e.g., ['diabetes', 'hypertension']
        dietaryPreferences: [String], // e.g., ['vegan', 'low-sugar']
        goals: String, // e.g., 'weight loss'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
