import { Product } from './product';
import { Category } from './category';

export class CartItem {
  quantity: number;
  product: Product = {
    productId: 0,
    sku: '',
    productName: '',
    imageUrl: '',
    description: '',
    unitPrice: 0,
    category: {
      categoryId: 0,
      categoryName: '',
    },
    unitsInStock: 0,
  };

  constructor(product: Product) {
    this.product = product;
    this.quantity = 1;
  }
}
