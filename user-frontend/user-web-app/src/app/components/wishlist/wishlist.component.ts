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
  showRemovedFromWishlistMessage: boolean;
  showAddedToCartMessage: boolean;
  showShopNowButton: boolean;
  userId: number;
  message: string = '';

  constructor(
    public wishlistService: WishlistService,
    private cartService: CartService,
    private userService: UserService,
    private productService: ProductsService
  ) {
    this.showEmptyWishlistMessage = false;
    this.showRemovedFromWishlistMessage = false;
    this.showAddedToCartMessage = false;
    this.showShopNowButton = false;
    this.wishlistItems = [];
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user: User | null) => {
      if (user) {
        this.userId = user.userId;
        this.wishlistService
          .getWishlistItems(this.userId)
          .subscribe((items: any[]) => {
            this.wishlistItems = items.map((item) => ({
              userId: item.userId,
              productId: item.productId,
              productDetails: {
                productId: item.productId,
                productName: item.productName,
                imageUrl: item.imageUrl,
                description: item.description,
                unitPrice: item.unitPrice,
              },
            }));
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

    this.removeWishlistItem(wishlistItem.productId, true);

    this.showAddedToCartMessage = true;
    setTimeout(() => {
      this.showAddedToCartMessage = false;
      if (this.wishlistItems.length === 0) {
        this.showEmptyWishlistMessage = true;
        this.showShopNowButton = true;
        this.message = this.wishlistService.emptyWishlistMessage;
      }
    }, 2000);
  }

  removeWishlistItem(productId: number, isAddingToCart: boolean = false): void {
    this.wishlistService
      .removeFromWishlist(this.userId, productId)
      .subscribe(() => {
        this.wishlistItems = this.wishlistItems.filter(
          (item) => item.productId !== productId
        );
        this.showEmptyWishlistMessage = this.wishlistItems.length === 0;

        if (!isAddingToCart) {
          this.showRemovedFromWishlistMessage = true;
          setTimeout(() => {
            this.showRemovedFromWishlistMessage = false;
            if (this.wishlistItems.length === 0) {
              this.showEmptyWishlistMessage = true;
              this.showShopNowButton = true;
              this.message = this.wishlistService.emptyWishlistMessage;
            }
          }, 2000);
        } else {
          if (this.wishlistItems.length === 0) {
            setTimeout(() => {
              this.showEmptyWishlistMessage = true;
              this.showShopNowButton = true;
              this.message = this.wishlistService.emptyWishlistMessage;
            }, 2000);
          }
        }
      });
  }
}
