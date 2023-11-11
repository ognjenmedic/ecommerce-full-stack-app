import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[];

  totalPrice$: Subject<number>;
  totalQuantity$: Subject<number>;

  constructor() {
    this.cartItems = [];
    this.totalPrice$ = new BehaviorSubject<number>(0);
    this.totalQuantity$ = new BehaviorSubject<number>(0);
  }

  addToCart(addedCartItem: CartItem) {
    // check if we already have the item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.product.sku === addedCartItem.product.sku
      );
      // check if we found it
      alreadyExistsInCart = existingCartItem != undefined;
    }
    if (alreadyExistsInCart) {
      // increment existing item quantity
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(addedCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let addedCartItem of this.cartItems) {
      totalPriceValue +=
        addedCartItem.quantity * addedCartItem.product.unitPrice;
      totalQuantityValue += addedCartItem.quantity;
    }

    // publish the new values
    this.totalPrice$.next(totalPriceValue);
    this.totalQuantity$.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice =
        tempCartItem.quantity * tempCartItem.product.unitPrice;
      console.log(
        `name: ${tempCartItem.product.productName}, quantity = ${tempCartItem.quantity}, price = ${tempCartItem.product.unitPrice}, subTotalPrice = ${subTotalPrice}`
      );
      console.log(
        `totalPrice = ${totalPriceValue.toFixed(
          2
        )}, totalQuantity = ${totalQuantityValue}}`
      );
      console.log('------');
    }
  }

  removeCartItem(index: number) {
    return this.cartItems.splice(index, 1);
  }
}
