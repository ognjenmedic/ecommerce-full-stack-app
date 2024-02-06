import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, throwError } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl: string;
  private currentCart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    new Cart()
  );
  addedToCartMessage: string;
  totalPrice$: Subject<number>;
  totalQuantity$: Subject<number>;

  constructor(private http: HttpClient) {
    this.totalPrice$ = new BehaviorSubject<number>(0);
    this.totalQuantity$ = new BehaviorSubject<number>(0);
    this.addedToCartMessage = 'Product added to Cart';
    this.baseUrl = environment.apiBaseUrl;
  }

  getCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/api/cart/user/${userId}`);
  }

  addToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Observable<Cart> {
    return this.http
      .post<Cart>(`${this.baseUrl}/api/cart/add`, {
        userId,
        productId,
        quantity,
      })
      .pipe(
        tap((cart) => {
          this.calculateTotals(cart);
        })
      );
  }

  getCurrentCart(): Observable<Cart> {
    return this.currentCart$.asObservable();
  }

  updateCurrentCart(cart: Cart): void {
    this.currentCart$.next(cart);
  }

  handleCartUpdate(cart: Cart): void {
    this.updateCurrentCart(cart);
  }

  removeCartItem(userId: number, productId: number): Observable<Cart> {
    if (userId == null || productId == null) {
      console.error('Cannot remove cart item: userId or productId is null');
      return throwError('UserId or ProductId is null');
    }

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString());

    return this.http
      .delete<Cart>(`${this.baseUrl}/api/cart/remove`, {
        params,
        responseType: 'json',
      })
      .pipe(
        tap((cart) => {
          this.updateCurrentCart(cart);
          this.calculateTotals(cart);
        })
      );
  }

  private calculateTotals(cart: Cart): void {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (let item of cart.cartItems) {
      totalPrice += item.quantity * item.unitPrice;
      totalQuantity += item.quantity;
    }

    this.totalPrice$.next(totalPrice);
    this.totalQuantity$.next(totalQuantity);
  }
}
