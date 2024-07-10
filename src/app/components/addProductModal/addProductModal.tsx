import React from 'react'
import Modal from '../modal/modal'
import ProductForm from '../productForm/productForm'
import { Product } from '@/app/types';

type AddProductModalProps = {
    isOpen: boolean;
    title: string;
    initialData?: Product;
    onClose: () => void;
    onSubmit: (product: Product) => void;
}


export default function AddProductModal(props: AddProductModalProps) {
    const { isOpen, title, initialData, onClose, onSubmit } = props;

    const handleSave = async (product: Product) => {
        onSubmit(product);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h1>{title}</h1>
            <ProductForm initialData={initialData} isEditMode={true} onSubmit={handleSave} />
        </Modal>
    )
}
