import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Wishlist } from 'src/app/models/wishlist';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  showLoginFirstMessage: boolean;

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
    private wishlistService: WishlistService,
    public authService: AuthService
  ) {
    this.showLoginFirstMessage = false;
  }

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

  fetchProduct(productId: number): void {
    this.productsService
      .getProduct(productId)
      .subscribe((data) => (this.product = data));
  }

  addToCart(product: Product) {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.userService.currentUser.subscribe((user) => {
          if (user && user.userId) {
            console.log(
              `Adding to cart: ${product.productName}, ${product.unitPrice}`
            );

            const userId = user.userId;
            const productId = product.productId;
            const quantity = this.num;

            this.cartService
              .addToCart(userId, productId, quantity)
              .subscribe(() => {
                console.log(product);
              });
          }
        });
      } else {
        this.showLoginFirst();
      }
    });
  }

  addItemToWishlist(product: Product) {
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.wishlistService
          .isItemInWishlist(user.userId, product.productId)
          .subscribe((isInWishlist) => {
            if (isInWishlist) {
              alert('Product already in Wish List!');
            } else {
              this.wishlistService
                .addToWishlist(user.userId, product.productId)
                .subscribe(() => {
                  alert('Product added to Wish List!');
                });
            }
          });
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
