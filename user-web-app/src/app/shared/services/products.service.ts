import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import { Product, ProductCategory } from 'src/app/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:8080';
  products: Subject<Product[]>;
  public selectedCategory$: ReplaySubject<ProductCategory>;
  constructor(private http: HttpClient) {
    this.selectedCategory$ = new ReplaySubject();
    this.products = new Subject();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/findAllProducts`);
  }

  getProduct(productIdFromRoute: number): Observable<Product> {
    const productUrl = `/PRODUCTS?sku=${productIdFromRoute} `;
    return this.http.get<Product>(productUrl).pipe(map((res: any) => res[0]));
  }

  getProductByCategoryId(categoryIdFromRoute: number): Observable<Product[]> {
    const categoryUrl = `${this.baseUrl}/products?categoryId=${categoryIdFromRoute} `;
    return this.http.get<Product[]>(categoryUrl);
  }

  // getProductByCategoryId(cid: number): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.baseUrl}/category/${cid}`);
  // }

  searchProducts(query: string) {
    return this.http.get<Product[]>(
      `http://localhost:3000/PRODUCTS?q=${query}`
    );
  }
}
