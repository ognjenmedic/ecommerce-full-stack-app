import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { Wishlist } from 'src/app/models/wishlist';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cart: Cart;
  cartItems: CartItem[];
  showMovedMessage: boolean;
  showExistingMessage: boolean;
  showRemovedMessage: boolean;
  currentUserId: number | null;
  movingToWishlist: boolean;

  constructor(
    private cartService: CartService,
    public wishlistService: WishlistService,
    private userService: UserService
  ) {
    this.cart = new Cart();
    this.cartItems = [];
    this.showMovedMessage = false;
    this.showExistingMessage = false;
    this.showRemovedMessage = false;
    this.movingToWishlist = false;
    this.currentUserId = null;
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        console.log('User found in ngOnInit', user);
        this.currentUserId = user.userId;
        this.loadCartDetails();
      } else {
        console.log('No user found in ngOnInit');
        this.currentUserId = null;
        this.cart = new Cart();
      }
    });
  }

  loadCartDetails() {
    if (this.currentUserId) {
      this.cartService.getCart(this.currentUserId).subscribe((cartData) => {
        console.log('Complete Cart Data:', cartData);
        this.cart = cartData;
        this.cartItems = cartData.cartItems;
        console.log('Cart Items:', this.cartItems);
      });
    }
  }

  removeCartItem(productId: number) {
    if (this.currentUserId && productId != null) {
      this.cartService
        .removeCartItem(this.currentUserId, productId)
        .subscribe((cartData) => {
          console.log(`Cart item removed. New cart data: `, cartData);
          this.loadCartDetails();

          if (!this.movingToWishlist) {
            this.showRemovedMessage = true;
            setTimeout(() => {
              this.showRemovedMessage = false;
            }, 2000);
          }

          this.movingToWishlist = false;
        });
    } else {
      console.error('User ID or Product ID is null');
    }
  }

  addItemToWishlist(productId: number) {
    if (this.currentUserId && productId != null) {
      this.wishlistService
        .isItemInWishlist(this.currentUserId, productId)
        .subscribe((isInWishlist) => {
          if (isInWishlist) {
            this.showExistingMessage = true;
            setTimeout(() => {
              this.showExistingMessage = false;
            }, 2000);
          } else {
            this.wishlistService
              .addToWishlist(this.currentUserId, productId)
              .subscribe(() => {
                this.showMovedMessage = true;
                setTimeout(() => {
                  this.showMovedMessage = false;
                }, 2000);
                this.movingToWishlist = true;
                this.removeCartItem(productId);
              });
          }
        });
    }
  }
}
