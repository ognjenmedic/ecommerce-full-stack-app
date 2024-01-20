import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:8080/';
  private currentCart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    new Cart()
  );

  totalPrice$: Subject<number>;
  totalQuantity$: Subject<number>;

  constructor(private http: HttpClient) {
    this.totalPrice$ = new BehaviorSubject<number>(0);
    this.totalQuantity$ = new BehaviorSubject<number>(0);
  }

  getCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/cart/user/${userId}`);
  }

  addToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}/cart/add`, {
      userId,
      productId,
      quantity,
    });
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
    return this.http
      .post<Cart>(`${this.baseUrl}/cart/remove`, { userId, productId })
      .pipe(
        tap((cart) => {
          this.updateCurrentCart(cart);
        })
      );
  }
}
