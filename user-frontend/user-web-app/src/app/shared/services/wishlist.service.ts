import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Wishlist } from 'src/app/models/wishlist';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private baseUrl: string;

  addedToWishListMessage: string;
  existingWishListMessage: string;
  movedToWishListMessage: string;
  removedFromWishlistMessage: string;
  addedToCartMessage: string;
  removedMessage: string;
  emptyWishlistMessage: string;
  loginFirstMessage: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.addedToWishListMessage = 'Product added to Wish List!';
    this.existingWishListMessage = 'Product already in Wish List!';
    this.movedToWishListMessage = 'Product moved to Wish List!';
    this.removedFromWishlistMessage = 'Product removed from Wishlist';
    this.addedToCartMessage = 'Product added to Cart';
    this.removedMessage = 'Product removed from Cart!';
    this.emptyWishlistMessage =
      'Your Wish List is empty... Check out our latest products now!';
    this.loginFirstMessage = 'Please Log In';
    this.baseUrl = 'http://localhost:8080/wishlist';
  }

  getWishlistItems(userId: string): Observable<Wishlist[]> {
    if (!userId) return EMPTY;
    return this.http.get<Wishlist[]>(`${this.baseUrl}/${userId}`);
  }

  addToWishlist(userId: string, productId: number): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.baseUrl}/add`, {
      userId,
      productId,
    });
  }

  removeFromWishlist(userId: string, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove`, {
      params: { userId, productId },
    });
  }

  isItemInWishlist(userId: string, productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check`, {
      params: { userId, productId },
    });
  }
}
