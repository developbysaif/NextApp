import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        // e.g., 'Diabetes-friendly', 'Heart patient', 'High BP', 'Low BP', 'Lung health', 'Kidney patient', 'Weight loss'
    },
    content: {
        type: String, // HTML or Markdown
        required: true,
    },
    medicalDescription: String,
    scienceBenefits: [String],
    aiSuggestions: String, // "AI-generated doctor-style suggestions"
    author: {
        type: String, // Could be 'Dr. AI' or admin name
        default: 'Dr. AI',
    },
    imageUrl: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
