import { Wishlist } from './wishlist';

export interface User {
  userId: number;
  auth0id: string;
  name: string;
  email: string;
  wishlists: Wishlist[];
}
