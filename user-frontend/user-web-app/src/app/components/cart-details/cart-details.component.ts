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
  showMovedMessage: boolean;
  showExistingMessage: boolean;
  showRemovedMessage: boolean;

  constructor(
    private cartService: CartService,
    public wishlistService: WishlistService,
    private userService: UserService
  ) {
    this.cart = new Cart();
    this.showMovedMessage = false;
    this.showExistingMessage = false;
    this.showRemovedMessage = false;
  }

  ngOnInit(): void {
    this.loadCartDetails();
  }

  loadCartDetails() {
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.cartService.getCart(user.userId).subscribe((cartData) => {
          console.log(cartData);
          this.cart = cartData;
        });
      }
    });
  }

  removeCartItem(productId: number) {
    this.userService.currentUser.subscribe((user) => {
      console.log('Current user object:', user);
      console.log('User ID:', user?.userId);
      console.log('Product ID to remove:', productId);
      if (user && user.userId && productId != null) {
        console.log(
          `Removing product with ID ${productId} for user with ID ${user.userId}`
        );
        this.cartService
          .removeCartItem(user.userId, productId)
          .subscribe((cartData) => {
            this.cart = cartData;
            this.showRemovedMessage = true;
            setTimeout(() => {
              this.showRemovedMessage = false;
            }, 2000);
          });
      } else {
        console.error('User ID or Product ID is null');
      }
    });
  }

  addItemToWishlist(product: Product) {
    this.userService.currentUser.subscribe((user) => {
      if (user && user.userId) {
        this.wishlistService
          .isItemInWishlist(user.userId, product.productId)
          .subscribe((isInWishlist) => {
            if (isInWishlist) {
              this.showExistingMessage = true;
              setTimeout(() => {
                this.showExistingMessage = false;
              }, 2000);
            } else {
              let addedWishlistItem: Wishlist = {
                userId: user.userId,
                productId: product.productId,
                productDetails: product,
              };

              this.wishlistService
                .addToWishlist(user.userId, product.productId)
                .subscribe(() => {
                  this.showMovedMessage = true;
                  setTimeout(() => {
                    this.showMovedMessage = false;
                  }, 2000);
                  this.removeCartItem(product.productId);
                });
            }
          });
      }
    });
  }
}
