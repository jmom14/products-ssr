export type Product = {
    id: number | null,
    title: string,
    price: number,
    description: string,
    category: string,
    rating: { rate: number, count: number },
    image: string,
}

export type Category = string;
