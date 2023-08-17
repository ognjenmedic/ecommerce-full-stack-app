import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Wishlist } from 'src/app/models/wishlist';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, AfterViewInit {
  product!: Product;
  index: number;
  showEmptyWishlistMessage: boolean;

  constructor(
    public wishlistService: WishlistService,
    private cartService: CartService
  ) {
    this.showEmptyWishlistMessage = false;
  }

  ngOnInit(): void {
    this.wishlistService.getWishlistItems().subscribe((wishlist: any) => {
      if (wishlist && wishlist.length > 0) {
        this.wishlistService.wishlistItems = wishlist;
      } else {
        this.wishlistService.wishlistItems = [];
        this.showEmptyWishlistMessage = true;
      }
    });
    // this.listWishlistItems();
  }

  // listWishlistItems() {
  //   this.wishlistItems = this.wishlistService.wishlistItems;
  // }

  addToCart(tempWishlistItem, index) {
    let addedCartItem = new CartItem(tempWishlistItem);
    this.cartService.addToCart(addedCartItem);
    this.removeWishlistItem(index);
  }

  removeWishlistItem(index: number) {
    this.wishlistService.wishlistItems.splice(index, 1);

    const sub = this.wishlistService
      .postWishlistItem(this.wishlistService.wishlistItems)
      .subscribe((res) => {
        sub.unsubscribe();
      });
  }

  ngAfterViewInit() {
    feather.replace();
  }
}
