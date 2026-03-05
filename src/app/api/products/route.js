import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        let products = [];
        let source = 'memory';

        try {
            // Try MongoDB first if URI is provided
            if (process.env.MONGODB_URI) {
                await dbConnect();
                products = await Product.find({}).lean();
                source = 'mongodb';
            }
        } catch (dbError) {
            console.error('MongoDB connection failed, falling back to JSON:', dbError.message);
        }

        // If no products found via MongoDB (or DB failed), use JSON file
        if (products.length === 0) {
            products = ServerStorage.getProducts();
            source = 'json';
        }

        return NextResponse.json(
            {
                success: true,
                message: `Products fetched successfully from ${source}`,
                data: products,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch products',
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        let savedProduct;
        let source = 'memory';

        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
                const newProduct = new Product(body);
                savedProduct = await newProduct.save();
                source = 'mongodb';
            }
        } catch (dbError) {
            console.error('MongoDB POST failed, falling back to JSON:', dbError.message);
        }

        // If MongoDB failed or not available, save to JSON file
        if (!savedProduct) {
            const products = ServerStorage.getProducts();

            // Generate a numeric ID if not provided
            const nextId = products.length > 0
                ? Math.max(...products.map(p => typeof p.id === 'number' ? p.id : 0)) + 1
                : 1;

            savedProduct = {
                ...body,
                id: body.id || nextId,
                _id: Date.now().toString(), // Fallback _id
                createdAt: new Date().toISOString()
            };

            products.push(savedProduct);
            ServerStorage.saveProducts(products);
            source = 'json';
        }

        return NextResponse.json(
            {
                success: true,
                message: `Product created successfully in ${source}`,
                data: savedProduct,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create product',
                error: error.message,
            },
            { status: 500 }
        );
    }
}
