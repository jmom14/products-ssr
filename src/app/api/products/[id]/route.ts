import { fakestoreapi } from '@/app/constants';
import { NextRequest, NextResponse } from 'next/server';


type ProductRequestProps = {
    params: { id: string }
}

export async function GET(request: NextRequest, props: ProductRequestProps) {
    const { id } = props.params;
    const url = `${fakestoreapi.PRODUCTS}/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch product' }, { status: response.status });
        }
        const product = await response.json();
        return NextResponse.json({ data: product }, { status: 200 });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, props: ProductRequestProps) {
    const { id } = props.params;
    const url = `${fakestoreapi.PRODUCTS}/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to delete product' }, { status: response.status });
        }

        const result = await response.json();
        return NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, props: ProductRequestProps) {
    const { id } = props.params;
    const url = `${fakestoreapi.PRODUCTS}/${id}`;

    try {
        const product = await request.json();
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to update product' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
