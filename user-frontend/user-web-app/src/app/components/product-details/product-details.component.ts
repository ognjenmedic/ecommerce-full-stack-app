import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Wishlist } from 'src/app/models/wishlist';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  num: number = 1;

  cal = (id: string) => {
    if (id === 'sub' && this.num > 1) {
      this.num--;
    }
    if (id === 'add' && this.num < 10) {
      this.num++;
    }
  };

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const initialProductIdFromRoute = Number(routeParams.get('productId'));
    this.fetchProduct(initialProductIdFromRoute);

    // Subscribe for subsequent changes in the route parameters
    this.route.params.subscribe((params) => {
      const productIdFromRoute = Number(params['productId']);
      this.fetchProduct(productIdFromRoute);
    });
  }

  // Find the product that corresponds with the id provided in route.

  fetchProduct(productId: number): void {
    this.productsService
      .getProduct(productId)
      .subscribe((data) => (this.product = data));
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.productName}, ${product.unitPrice}`);

    console.log(product);
    const addedCartItem = new CartItem(product);
    this.cartService.addToCart(addedCartItem);
  }

  addItemToWishlist(product: Product) {
    let wishlist: any = this.userService.userState.getValue().wishlist; // existing wishlist
    let addedWishlistItem = new Wishlist(product); // new item to be added
    wishlist.push(product);

    let existingWishlistItem = this.wishlistService.wishlistItems.find(
      (item) => item.productId === addedWishlistItem.productId
    );
    if (existingWishlistItem) {
      alert('Product already in Wish List!');
    } else {
      this.wishlistService.wishlistItems.push(addedWishlistItem);

      this.wishlistService.postWishlistItem(wishlist).subscribe((res) => {
        alert('Product added to Wish List!');
      });
    }
  }
}
