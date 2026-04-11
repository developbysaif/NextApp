import mongoose from 'mongoose';

const DiseaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the disease name'],
        trim: true,
    },
    category: {
        type: String, // Storing category name for simplicity or we can use ref
        required: [true, 'Please provide a category'],
    },
    description: {
        type: String,
        trim: true,
    },
    risk: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },
    status: {
        type: String,
        enum: ['Published', 'Draft'],
        default: 'Published',
    },
    usersCount: {
        type: String,
        default: '0',
    },
    iconType: {
        type: String,
        default: 'Activity',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);
