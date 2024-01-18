import { Component, OnInit } from '@angular/core';
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
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  index: number;
  product: Product;
  showMovedMessage: boolean;
  showExistingMessage: boolean;
  showRemovedMessage: boolean;

  constructor(
    private cartService: CartService,
    public wishlistService: WishlistService,
    private userService: UserService
  ) {
    this.cartItems = [];
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.showMovedMessage = false;
    this.showExistingMessage = false;
    this.showRemovedMessage = false;
  }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice$.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity$.subscribe(
      (data) => (this.totalQuantity = data)
    );
    this.cartService.computeCartTotals();
  }

  removeCartItem(index: number) {
    this.cartService.removeCartItem(index);
    this.cartService.computeCartTotals();
  }

  addItemToWishlist(product: Product, index: number) {
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
                  this.removeCartItem(index);
                });
            }
          });
      }
    });
  }
}
