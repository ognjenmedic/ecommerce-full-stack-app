import { Category } from './category';

export interface Product {
  productId: number;
  sku: string;
  productName: string;
  imageUrl: string;
  description: string;
  unitPrice: number;
  category: Category;
  unitsInStock: number;
}
