import { Product } from './product';

export interface Wishlist {
  userId: number;
  productId: number;
  productDetails: Product;
}
