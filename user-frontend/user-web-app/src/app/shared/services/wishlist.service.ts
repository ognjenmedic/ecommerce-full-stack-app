import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Wishlist } from 'src/app/models/wishlist';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private baseUrl: string = 'http://localhost:8080/wishlist';

  addedToWishListMessage = 'Product added to Wish List!';
  existingWishListMessage = 'Product already in Wish List!';
  removedMessage = 'Product removed from Wish List!';
  emptyWishlistMessage =
    'Your Wish List is empty... Check out our latest products now!';
  loginFirstMessage = 'Please Log In';

  constructor(private http: HttpClient, private userService: UserService) {}

  getWishlistItems(userId: number): Observable<Wishlist[]> {
    if (!userId) return EMPTY;
    return this.http.get<Wishlist[]>(`${this.baseUrl}/${userId}`);
  }

  addToWishlist(userId: number, productId: number): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.baseUrl}/add`, {
      userId,
      productId,
    });
  }

  removeFromWishlist(userId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove`, {
      params: { userId, productId },
    });
  }

  isItemInWishlist(userId: number, productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check`, {
      params: { userId, productId },
    });
  }
}
