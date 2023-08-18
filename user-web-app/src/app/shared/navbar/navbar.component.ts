import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductCategory } from '../../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  products!: Product[];
  searchResult: undefined | Product[];
  public ProductCategoryEnum: typeof ProductCategory;
  searchInput: FormControl;
  mobileMenu: boolean = true;
  mobileMenuBtn() {
    this.mobileMenu = !this.mobileMenu;
  }

  constructor(public productService: ProductsService, private router: Router) {
    this.ProductCategoryEnum = ProductCategory;
    this.searchResult = [];
    this.products = []; //new
  }

  ngOnInit(): void {
    this.searchInput = new FormControl();
  }

  selectCategory(productCategory: ProductCategory): void {
    this.router.navigateByUrl(`/products?categoryId=${productCategory}`);
  }

  searchProducts() {
    if (this.searchInput.value) {
      this.productService
        .searchProducts(this.searchInput.value)
        .subscribe((products) => {
          this.products = products;
        });
    } else {
      this.products = [];
    }
  }

  hideSearch() {
    setTimeout(() => {
      console.log('blur event fired');
      this.products = [];
      this.searchInput.reset();
    }, 150);
  }

  redirectToDetails(sku: number) {
    this.router.navigate(['/products/' + sku]);
    this.productService.products.next([]);
    this.searchInput.reset();
  }
}
