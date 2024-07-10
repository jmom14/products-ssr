import React, { useEffect, useState } from 'react'
import Image from "next/image";
import TextArea from '@/app/components/TextArea';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Product } from '@/app/types';
import styles from './productForm.module.css';

type ProductFormProps = {
    isEditMode: boolean;
    initialData?: Product;
    onSubmit?: (product: Product) => Promise<void>;
}

export default function ProductForm(props: ProductFormProps) {
    const [product, setProduct] = useState<Product>({
        id: 0,
        title: "",
        price: 0,
        description: "",
        category: "",
        rating: { rate: 0, count: 0 },
        image: ""
    });
    const { onSubmit, isEditMode } = props;

    useEffect(() => {
        if (props.initialData) {
            setProduct(props.initialData);
        }
    }, [props.initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'rate') {
            setProduct(prevState => ({
                ...prevState,
                rating: { ...prevState.rating, rate: Number(value) }
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(product);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {isEditMode ? null : <Image src={product.image} className={styles.img} alt="src" width={200} height={300} />}
            <TextField name="title" variant="outlined" value={product.title} label="Titulo" size='small' required onChange={handleChange} />
            <TextArea name="description" value={product.description} required placeholder="Descripcion" onChange={handleChange} />
            <TextField name="category" variant="outlined" value={product.category} label="Categoria" size='small' required onChange={handleChange} />
            <TextField name="rate" variant="outlined" value={product.rating?.rate} label="Calificacion" size='small' onChange={handleChange} />
            <TextField name="price" variant="outlined" value={product.price} label="Precio" size='small' required onChange={handleChange} />
            {isEditMode ? <Button variant="contained" size="large" type="submit">Submit</Button> : null}
        </form>
    )
}
