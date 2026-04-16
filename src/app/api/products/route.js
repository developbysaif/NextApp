import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        await dbConnect();
        const products = await Product.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json(
            {
                success: true,
                message: 'Products fetched successfully from MongoDB',
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
        await dbConnect();
        const body = await request.json();
        
        // Ensure discount is a string if the schema expects it
        const productData = {
            ...body,
            discount: body.discount ? String(body.discount) : "0"
        };

        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Product created successfully in MongoDB',
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

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Product deleted from MongoDB',
            data: deletedProduct 
        }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
