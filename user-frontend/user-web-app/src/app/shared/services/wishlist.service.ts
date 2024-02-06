import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Wishlist } from 'src/app/models/wishlist';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

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
    this.baseUrl = environment.apiBaseUrl;
  }

  getWishlistItems(userId: number): Observable<Wishlist[]> {
    if (!userId) return EMPTY;
    return this.http.get<Wishlist[]>(`${this.baseUrl}/api/wishlist/${userId}`);
  }

  addToWishlist(userId: number, productId: number): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.baseUrl}/api/wishlist/add`, {
      userId,
      productId,
    });
  }

  removeFromWishlist(userId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/wishlist/remove`, {
      params: { userId, productId },
    });
  }

  isItemInWishlist(userId: number, productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/api/wishlist/check`, {
      params: { userId, productId },
    });
  }
}
