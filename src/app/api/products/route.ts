import { fakestoreapi } from '@/app/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    let url = fakestoreapi.PRODUCTS as string;
    const { searchParams } = request.nextUrl;
    const category = searchParams.get('category');

    if (category) {
        url = `${url}/category/${category}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch products' }, { status: response.status });
        }
        const products = await response.json();
        return NextResponse.json({ data: products }, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest, params: any) {
    try {
        const product = await request.json();
        const response = await fetch(fakestoreapi.PRODUCTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to create product' }, { status: response.status });
        }
        const data = await response.json();
        console.log('Product created:', data);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
