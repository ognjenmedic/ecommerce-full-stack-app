import { Wishlist } from './wishlist';

export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  wishlists: Wishlist[];
  expiry?: number;
}
