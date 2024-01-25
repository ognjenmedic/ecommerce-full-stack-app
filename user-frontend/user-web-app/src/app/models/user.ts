import { Wishlist } from './wishlist';

export interface User {
  userId: string;
  name: string;
  email: string;
  wishlists: Wishlist[];
}
