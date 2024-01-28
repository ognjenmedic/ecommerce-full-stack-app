import { ProductsService } from 'src/app/shared/services/products.service';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CartItem } from 'src/app/models/cart-item';
import { Wishlist } from 'src/app/models/wishlist';
import { User } from 'src/app/models/user';
import * as feather from 'feather-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishlistItems: Wishlist[];

  emptyWishlistMessage: string;
  removedFromWishlistMessage: string;
  addedToCartMessage: string;
  loginFirstMessage: string;

  showEmptyWishlistMessage: boolean;
  showRemovedFromWishlistMessage: boolean;
  showAddedToCartMessage: boolean;
  showLoginFirstMessage: boolean;
  showShopNowButton: boolean;
  userId: number;
  message: string = '';

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private userService: UserService,
    private authService: AuthService,
    private productService: ProductsService
  ) {
    this.emptyWishlistMessage = this.wishlistService.emptyWishlistMessage;
    this.removedFromWishlistMessage =
      this.wishlistService.removedFromWishlistMessage;
    this.addedToCartMessage = this.wishlistService.addedToCartMessage;
    this.loginFirstMessage = this.wishlistService.loginFirstMessage;
    this.showEmptyWishlistMessage = false;
    this.showRemovedFromWishlistMessage = false;
    this.showAddedToCartMessage = false;
    this.showLoginFirstMessage = false;
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
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.userService.currentUser.subscribe((user) => {
          if (user && user.userId) {
            const product = wishlistItem.productDetails;
            const userId = user.userId;
            const productId = product.productId;
            const quantity = 1;

            this.cartService
              .addToCart(userId, productId, quantity)
              .subscribe(() => {
                console.log('Product added to cart');
              });

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
        });
      } else {
        this.showLoginFirst();
      }
    });
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

  showLoginFirst(): void {
    this.showLoginFirstMessage = true;
    console.log(this.showLoginFirstMessage);
    setTimeout(() => {
      this.showLoginFirstMessage = false;
    }, 2000);
  }
}
