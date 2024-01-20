import { CartItem } from './cart-item';

export class Cart {
  cartItems: CartItem[];
  totalPrice: number;

  constructor() {
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
