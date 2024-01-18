import { ProductsService } from 'src/app/shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CartItem } from 'src/app/models/cart-item';
import { Wishlist } from 'src/app/models/wishlist';
import { User } from 'src/app/models/user';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistItems: Wishlist[];
  showEmptyWishlistMessage: boolean;
  userId: number;
  message: string = '';

  constructor(
    public wishlistService: WishlistService,
    private cartService: CartService,
    private userService: UserService,
    private productService: ProductsService
  ) {
    this.showEmptyWishlistMessage = false;
    this.wishlistItems = [];
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user: User | null) => {
      if (user) {
        this.userId = user.userId;
        this.wishlistService
          .getWishlistItems(this.userId)
          .subscribe((items: any) => {
            this.wishlistItems = items;
            this.showEmptyWishlistMessage = items.length === 0;
            this.message = this.showEmptyWishlistMessage
              ? this.wishlistService.emptyWishlistMessage
              : '';
          });
      }
    });
  }

  addToCart(wishlistItem: Wishlist): void {
    const product = wishlistItem.productDetails;

    let addedCartItem = new CartItem(product);
    this.cartService.addToCart(addedCartItem);
    this.removeWishlistItem(wishlistItem.productId);
    this.message = this.wishlistService.addedToWishListMessage;
  }

  removeWishlistItem(productId: number): void {
    this.wishlistService
      .removeFromWishlist(this.userId, productId)
      .subscribe(() => {
        this.wishlistItems = this.wishlistItems.filter(
          (item) => item.productId !== productId
        );
        this.showEmptyWishlistMessage = this.wishlistItems.length === 0;
        this.message =
          this.wishlistItems.length === 0
            ? this.wishlistService.emptyWishlistMessage
            : this.wishlistService.removedMessage;
      });
  }
}
