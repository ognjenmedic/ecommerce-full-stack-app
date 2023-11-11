import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from 'src/app/models/wishlist';
import { UserService } from './user.service';
import { of, tap, map, EMPTY } from 'rxjs';
import { WishlistResponse } from 'src/app/models/wishlist-response';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlistItems: Wishlist[];
  userId: number;
  addedToWishListMessage: string;
  existingWishListMessage: string;
  movedToWishListMessage: string;
  removedMessage: string;
  emptyWishlistMessage: string;
  loginFirstMessage: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.wishlistItems = [];
    this.checkUserState();
    this.addedToWishListMessage = 'Product added to Wish List!';
    this.existingWishListMessage = 'Product already in Wish List!';
    this.movedToWishListMessage = 'Product moved to Wish List!';
    this.removedMessage = 'Product removed from Cart!';
    this.emptyWishlistMessage =
      'Your Wish List is empty... Check out our latest products now!';
    this.loginFirstMessage = 'Please Log In';
  }

  checkUserState() {
    this.userService.userState.subscribe((res) => {
      if (res) {
        this.userId = res.id;
      } else {
        this.wishlistItems = [];
      }
    });
  }

  postWishlistItem(wishlist) {
    return this.http.patch(
      `http://localhost:3000/signedUpUsersList/${this.userId}`,
      {
        wishlist: wishlist,
      }
    );
  }

  getWishlistItems() {
    if (this.userId) {
      return this.http
        .get(`http://localhost:3000/signedUpUsersList/${this.userId}`)
        .pipe(
          map((data: any) => {
            return data.wishlist;
          })
        );
    } else {
      return EMPTY;
    }
  }
}
