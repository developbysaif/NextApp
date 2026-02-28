const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Basic manual .env.local loader to avoid 'dotenv' dependency
function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                process.env[key.trim()] = valueParts.join('=').trim();
            }
        });
    }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

// Define Schema (Simplified for migration)
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: Number },
    slug: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function migrate() {
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in .env.local');
        console.log('Current env keys:', Object.keys(process.env).filter(k => k.includes('MON')));
        return;
    }

    try {
        console.log('Connecting to MongoDB:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected to MongoDB.');

        const jsonPath = path.join(__dirname, 'src', 'data', 'dynamic_products.json');

        if (!fs.existsSync(jsonPath)) {
            console.log('No dynamic_products.json found at:', jsonPath);
            return;
        }

        const jsonData = fs.readFileSync(jsonPath, 'utf8');
        const products = JSON.parse(jsonData);

        console.log(`Found ${products.length} products in JSON. Starting migration...`);

        let successCount = 0;
        let failCount = 0;
        let skipCount = 0;

        for (const prod of products) {
            try {
                // Remove _id from JSON to let MongoDB create it if it's currently a string
                const { _id, ...safeProd } = prod;

                // Check if product with this id or name already exists
                const existing = await Product.findOne({
                    $or: [
                        { id: prod.id },
                        { slug: prod.slug },
                        { name: prod.name }
                    ]
                });

                if (existing) {
                    console.log(`Skipping: "${prod.name}" (Already exists)`);
                    skipCount++;
                    continue;
                }

                await Product.create(safeProd);
                console.log(`Migrated: "${prod.name}"`);
                successCount++;
            } catch (err) {
                console.error(`Failed to migrate "${prod.name}":`, err.message);
                failCount++;
            }
        }

        console.log('\n---------------------------');
        console.log(`Migration results:`);
        console.log(`Success: ${successCount}`);
        console.log(`Skipped: ${skipCount}`);
        console.log(`Failed:  ${failCount}`);
        console.log('---------------------------\n');

        await mongoose.disconnect();
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();
