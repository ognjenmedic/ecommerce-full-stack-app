import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { Wishlist } from 'src/app/models/wishlist';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;
  showAddedMessage: boolean;
  showExistingMessage: boolean;
  showLoginFirstMessage: boolean;

  constructor(
    private cartService: CartService,
    public wishlistService: WishlistService,
    public userService: UserService
  ) {
    this.showAddedMessage = false;
    this.showExistingMessage = false;
    this.showLoginFirstMessage = false;
  }

  ngOnInit(): void {}

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.productName}, ${product.unitPrice}`);

    console.log(product);
    const addedCartItem = new CartItem(product);
    this.cartService.addToCart(addedCartItem);
  }

  addItemToWishlist(product: Product) {
    // if (this.userService.isAuthenticated) {
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
          this.showAddedMessage = true;
          setTimeout(() => {
            this.showAddedMessage = false;
          }, 2000);
        });
      }
    }); // existing wishlist
  }
  // else {
  //   this.showLoginFirstMessage = true;
  //   setTimeout(() => {
  //     this.showLoginFirstMessage = false;
  //   }, 2000);
  // }

  showLoginFirst(): void {
    this.showLoginFirstMessage = true;
    console.log(this.showLoginFirstMessage);
    setTimeout(() => {
      this.showLoginFirstMessage = false;
    }, 2000);
  }
}
