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
    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    // subscribe to the cart totalPrice
    this.cartService.totalPrice$.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity$.subscribe(
      (data) => (this.totalQuantity = data)
    );
    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  removeCartItem(index: number) {
    this.cartService.removeCartItem(index);
    this.cartService.computeCartTotals();
  }

  addItemToWishlist(product: any, index: number) {
    let wishlist;
    this.wishlistService.getWishlistItems().subscribe((res) => {
      wishlist = res;
      console.log(wishlist);
      let addedWishlistItem = new Wishlist(product); // new item to be added
      wishlist.push(product);

      let existingWishlistItem = this.wishlistService.wishlistItems.find(
        (item) => item.sku === addedWishlistItem.sku
      );
      if (existingWishlistItem) {
        this.showExistingMessage = true;
        setTimeout(() => {
          this.showExistingMessage = false;
        }, 2000);
      } else {
        this.wishlistService.wishlistItems.push(addedWishlistItem);

        this.wishlistService.postWishlistItem(wishlist).subscribe((res) => {
          this.showMovedMessage = true;
          setTimeout(() => {
            this.showMovedMessage = false;
          }, 2000);
          this.removeCartItem(index);
        });
      }
    }); // existing wishlist
  }
}
