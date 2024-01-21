import { Order } from '../../models/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orderPlacedMessage: string;
  private baseUrl: string;
  orders: Order[];
  constructor(private http: HttpClient) {
    this.orderPlacedMessage = 'Your order has been placed!';
    this.orders = [];
    this.baseUrl = 'http://localhost:8080';
  }

  placeOrder(orderData) {
    return this.http.post<any>(`${this.baseUrl}/orders`, orderData);
  }
}
