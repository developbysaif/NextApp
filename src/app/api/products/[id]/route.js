import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ServerStorage } from '@/lib/server-storage';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        let product = null;
        let source = 'memory';

        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
                product = await Product.findById(id).lean();
                if (!product) {
                    product = await Product.findOne({ id: parseInt(id) }).lean();
                }
                if (product) source = 'mongodb';
            }
        } catch (dbError) {
            console.error('MongoDB GET failed, falling back to JSON:', dbError.message);
        }

        if (!product) {
            const products = ServerStorage.getProducts();
            product = products.find(p => p.id?.toString() === id?.toString() || p._id?.toString() === id?.toString());
            if (product) source = 'json';
        }

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: `Product fetched from ${source}`, data: product }, { status: 200 });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch product', error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        let updatedProduct = null;
        let source = 'memory';

        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
                updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
                if (updatedProduct) source = 'mongodb';
            }
        } catch (dbError) {
            console.error('MongoDB PUT failed, falling back to JSON:', dbError.message);
        }

        if (!updatedProduct) {
            const products = ServerStorage.getProducts();
            const index = products.findIndex(p => p.id?.toString() === id?.toString() || p._id?.toString() === id?.toString());

            if (index !== -1) {
                products[index] = { ...products[index], ...body, updatedAt: new Date().toISOString() };
                ServerStorage.saveProducts(products);
                updatedProduct = products[index];
                source = 'json';
            }
        }

        if (!updatedProduct) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: `Product updated in ${source}`, data: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ success: false, message: 'Failed to update product', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        let deletedProduct = null;
        let source = 'memory';

        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
                deletedProduct = await Product.findByIdAndDelete(id).lean();
                if (deletedProduct) source = 'mongodb';
            }
        } catch (dbError) {
            console.error('MongoDB DELETE failed, falling back to JSON:', dbError.message);
        }

        if (!deletedProduct) {
            const products = ServerStorage.getProducts();
            const index = products.findIndex(p => p.id?.toString() === id?.toString() || p._id?.toString() === id?.toString());

            if (index !== -1) {
                deletedProduct = products[index];
                products.splice(index, 1);
                ServerStorage.saveProducts(products);
                source = 'json';
            }
        }

        if (!deletedProduct) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: `Product deleted from ${source}`, data: deletedProduct }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ success: false, message: 'Failed to delete product', error: error.message }, { status: 500 });
    }
}
