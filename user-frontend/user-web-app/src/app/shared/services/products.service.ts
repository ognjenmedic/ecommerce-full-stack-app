import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:8080';
  products: Subject<Product[]>;
  public selectedCategory$: ReplaySubject<Category>;
  constructor(private http: HttpClient) {
    this.selectedCategory$ = new ReplaySubject();
    this.products = new Subject();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/api/products/findAllProducts`
    );
  }

  getProduct(productIdFromRoute: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/api/products/${productIdFromRoute}`;
    return this.http.get<Product>(productUrl);
  }

  getProductByCategoryId(categoryIdFromRoute: number): Observable<Product[]> {
    const categoryUrl = `${this.baseUrl}/api/products/byCategory?categoryId=${categoryIdFromRoute}`;
    return this.http.get<Product[]>(categoryUrl);
  }

  searchProducts(searchTerm: string) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/api/products/search?query=${searchTerm}`
    );
  }
}
