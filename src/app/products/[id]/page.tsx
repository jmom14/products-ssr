"use client"
import React, { useEffect, useState } from 'react'
import { Product } from '@/app/types';
import styles from './productpage.module.css';
import ProductForm from '@/app/components/productForm/productForm';

export default function ProductPage({ params }: any) {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = params;

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(data => data.json())
            .then(({ data }) => setProduct(data));
    }, [id]);

    if (!product) {
        return null;
    }

    return (
        <div className={styles.main}>
            <ProductForm isEditMode={false} initialData={product} />
        </div >
    )
}
