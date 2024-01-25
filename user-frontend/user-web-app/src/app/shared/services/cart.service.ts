import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, throwError } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:8080';
  private currentCart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    new Cart()
  );

  totalPrice$: Subject<number>;
  totalQuantity$: Subject<number>;

  constructor(private http: HttpClient) {
    this.totalPrice$ = new BehaviorSubject<number>(0);
    this.totalQuantity$ = new BehaviorSubject<number>(0);
  }

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/cart/user/${userId}`);
  }

  addToCart(
    userId: string,
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

  removeCartItem(userId: string, productId: number): Observable<Cart> {
    if (userId == null || productId == null) {
      console.error('Cannot remove cart item: userId or productId is null');
      return throwError('UserId or ProductId is null');
    }

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString());

    return this.http
      .post<Cart>(`${this.baseUrl}/cart/remove`, null, { params })
      .pipe(
        tap((cart) => {
          this.updateCurrentCart(cart);
        })
      );
  }
}
