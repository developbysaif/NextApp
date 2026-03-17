import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        unique: true,
        sparse: true,
    },
    slug: {
        type: String,
        unique: true,
        sparse: true,
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
    },
    discount: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        default: 'All Season',
    },
    stock: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 5,
    },
    reviews: {
        type: Number,
        default: 0,
    },
    reviewsList: {
        type: [Object],
        default: [],
    },
    tags: [String],
    quality: {
        organic: { type: Boolean, default: true },
        freshness: { type: String, default: 'Farm Fresh' },
        farmingMethod: { type: String, default: '100% Organic' }
    },
    nutrition: {
        type: Object,
        default: {},
    },
    nutritionalInfo: {
        calories: String,
        sugar: String,
        carbs: String,
        protein: String,
        fat: String,
        fiber: String,
        vitamins: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
