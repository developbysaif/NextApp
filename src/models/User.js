import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'doctor', 'admin'], default: 'customer' },
    
    // Health Profile
    age: { type: Number },
    gender: { type: String },
    weight: { type: Number },
    height: { type: Number },
    medicalHistory: { type: String },
    
    // Links
    disease: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease' },
    symptoms: [{ type: String }],
    dietPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' },
    
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
