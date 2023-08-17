import { Order } from '../../models/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  orders: Order[];
  constructor(private http: HttpClient) {
    this.orders = [];
  }

  placeOrder(orderData) {
    return this.http.post<any>('http://localhost:3000/orders', orderData);
  }
}
