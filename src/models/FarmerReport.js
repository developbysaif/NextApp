import mongoose from 'mongoose';

const FarmerReportSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    month: {
        type: Number, // 1-12
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    totalSuppliedWithUnit: {
        quantity: Number,
        unit: {
            type: String,
            default: 'kg',
        },
    },
    governmentSupply: {
        quantity: Number,
        unit: {
            type: String,
            default: 'kg',
        },
    },
    incomeGenerated: {
        type: Number,
        required: true,
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Unique constraint to prevent duplicate reports for same month/year per farmer
FarmerReportSchema.index({ farmer: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.models.FarmerReport || mongoose.model('FarmerReport', FarmerReportSchema);
