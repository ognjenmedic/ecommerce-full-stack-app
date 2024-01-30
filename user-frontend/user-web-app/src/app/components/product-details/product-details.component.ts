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
  showAddedMessage: boolean;
  showExistingMessage: boolean;
  showAddedToCartMessage: boolean;
  addedToCartMessage: string;
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
    public cartService: CartService,
    private userService: UserService,
    public wishlistService: WishlistService,
    public authService: AuthService
  ) {
    this.showLoginFirstMessage = false;
    this.showAddedMessage = false;
    this.showExistingMessage = false;
    this.showLoginFirstMessage = false;
    this.showAddedToCartMessage = false;
    this.addedToCartMessage = this.cartService.addedToCartMessage;
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
            const quantity = 1;

            this.cartService
              .addToCart(userId, productId, quantity)
              .subscribe(() => {
                this.showAddedToCartMessage = true;
                setTimeout(() => {
                  this.showAddedToCartMessage = false;
                }, 2000);
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
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.userService.currentUser.subscribe((user) => {
          if (user && user.userId) {
            this.wishlistService
              .getWishlistItems(user.userId)
              .subscribe((wishlist) => {
                let existingWishlistItem = wishlist.find(
                  (item) => item.productId === product.productId
                );
                if (existingWishlistItem) {
                  this.showExistingMessage = true;
                  setTimeout(() => {
                    this.showExistingMessage = false;
                  }, 2000);
                } else {
                  const userId = user.userId;
                  const productId = product.productId;
                  this.wishlistService
                    .addToWishlist(userId, productId)
                    .subscribe((res) => {
                      this.showAddedMessage = true;
                      setTimeout(() => {
                        this.showAddedMessage = false;
                      }, 2000);
                    });
                }
              });
          }
        });
      } else {
        this.showLoginFirst();
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
