import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public ProductCategoryEnum: typeof ProductCategory;

  constructor(private productService: ProductsService, private router: Router) {
    this.ProductCategoryEnum = ProductCategory;
  }

  ngOnInit(): void {}
  selectCategory(productCategory: ProductCategory): void {
    this.router.navigateByUrl(`/products?categoryId=${productCategory}`);
  }
}
