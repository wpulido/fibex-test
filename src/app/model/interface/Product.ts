export interface Product {
  id: number;
  title: string;
  price: number | null;
  description: string;
  categoryId: number;
  images: string[];
}
