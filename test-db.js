const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function test() {
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log('Connecting to:', MONGODB_URI);
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');
        
        // Define temp schema and model
        const productSchema = new mongoose.Schema({}, { strict: false });
        const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
        
        const count = await Product.countDocuments();
        console.log('Product count:', count);
        
        const products = await Product.find().limit(1);
        console.log('Sample product:', products);
        
        await mongoose.disconnect();
    } catch (err) {
        console.error('Connection error:', err);
    }
}

test();
