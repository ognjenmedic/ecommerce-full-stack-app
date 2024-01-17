import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../services/products.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  products!: Product[];
  categories: Category[];
  actualMenCategoryId!: number;
  actualWomenCategoryId!: number;
  actualKidsCategoryId!: number;
  searchResult: undefined | Product[];
  searchInput: FormControl;
  private categoryMap: { [categoryName: string]: number } = {};
  mobileMenu: boolean = true;
  mobileMenuBtn() {
    this.mobileMenu = !this.mobileMenu;
  }

  constructor(
    public productService: ProductsService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.searchResult = [];
    this.products = [];
    this.categories = [];
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.createCategoryMap(categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.searchInput = new FormControl();
  }

  createCategoryMap(categories: Category[]): void {
    categories.forEach((cat) => {
      this.categoryMap[cat.categoryName] = cat.categoryId;
    });
  }

  selectCategory(categoryName: string): void {
    const categoryId = this.categoryMap[categoryName];
    if (categoryId) {
      this.router.navigateByUrl(`/products?categoryId=${categoryId}`);
    } else {
      console.error('Category ID is undefined for:', categoryName);
    }
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

  redirectToDetails(productId: number) {
    this.router.navigate(['/products/' + productId]);
    this.productService.products.next([]);
    this.searchInput.reset();
  }
}
