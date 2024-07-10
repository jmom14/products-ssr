import { fakestoreapi } from '@/app/constants';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    try {
        const response = await fetch(fakestoreapi.CATEGORIES);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch categories' }, { status: response.status });
        }
        const categories = await response.json();
        return NextResponse.json({ data: categories }, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}