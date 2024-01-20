import { Product } from './product';

export class CartItem {
  quantity: number;
  product: Product;

  constructor(product: Product) {
    this.product = product;
    this.quantity = 1;
  }
}
