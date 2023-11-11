import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit {
  totalPrice: number;
  totalQuantity: number;

  constructor(private cartService: CartService) {
    this.totalPrice = 0.0;
    this.totalQuantity = 0;
  }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    // subscribe to cart totalPrice$
    this.cartService.totalPrice$.subscribe((data) => (this.totalPrice = data));

    // subscribe to cart totalQuantity$
    this.cartService.totalQuantity$.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
}
