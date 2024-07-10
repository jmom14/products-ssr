"use client"
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from 'next/link'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Category, Product } from "./types";
import ProductModal from "./components/addProductModal/addProductModal";
import { api } from "./constants";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const ALL = "*";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>(ALL);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    let url = api.PRODUCTS as string;
    if (category && category !== ALL) {
      const params = new URLSearchParams({ category: category }).toString();
      url = url.concat(`/?${params}`);
    }
    fetch(url)
      .then(data => data.json())
      .then(({ data }) => setProducts(data))
  }, [category]);

  useEffect(() => {
    fetch(api.CATEGORIES)
      .then(data => data.json())
      .then(({ data }) => setCategories(data));
  }, []);

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value)
  };

  const onModalClose = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
  }

  const handleDelete = (id: number) => {
    fetch(`${api.PRODUCTS}/${id}`, {
      method: "DELETE"
    })
      .then(data => data.json())
      .then(({ data }) => {
        if (data) {
          setProducts(products.filter(product => product.id !== id))
        }
      })
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const onAdd = async (product: Product) => {
    const response = await fetch(api.PRODUCTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    if (response.ok) {
      const data = await response.json();
      setProducts([data, ...products]);
    }
  }

  const onEdit = async (product: Product) => {
    const response = await fetch(`${api.PRODUCTS}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    if (response.ok) {
      const { data } = await response.json();
      setProducts(products.map(p => p.id === product.id ? data : p));
    }
  }

  const handleSubmit = async (product: Product) => {
    if (editingProduct) {
      await onEdit(product);
    } else {
      await onAdd(product);
    }
  }

  return (
    <main className={styles.main}>
      <div>
        <h1>Products</h1>
        <div className={styles.actions}>
          <Button variant="contained" onClick={() => setIsProductModalOpen(true)}>Agregar Producto</Button>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              className={styles.dropdown}
              onChange={handleCategoryChange}
              size="small"
            >
              <MenuItem value={"*"}>ALL</MenuItem>
              {categories.map(categoryItem => (
                <MenuItem key={categoryItem} value={categoryItem}>{categoryItem}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table sx={{ maxWidth: 1000, width: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width={200} sx={{ minWidth: '200px' }}>Nombre</TableCell>
                <TableCell align="left">Precio</TableCell>
                <TableCell align="left">Categoria</TableCell>
                <TableCell align="left">Descripcion</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left" width={200} sx={{ minWidth: '200px' }}>
                    <Link href={`/products/${row.id}`} className={styles.productTitle}>
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">
                    <div className={styles.actionColumn}>
                      <Button variant="contained" onClick={() => handleEdit(row)}>Editar</Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>Eliminar</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={onModalClose}
        title={editingProduct ? 'Editar Producto' : 'Agregar Producto'}
        onSubmit={handleSubmit}
        {...(editingProduct && { initialData: editingProduct })}
      />
    </main>
  );
}
