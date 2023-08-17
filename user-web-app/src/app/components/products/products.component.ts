import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product, ProductCategory } from 'src/app/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[];
  filteredProducts: Product[];
  selectedCategory: ProductCategory;
  ProductCategoryEnum: typeof ProductCategory;

  constructor(
    public productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.allProducts = [];
    this.filteredProducts = [];
    this.ProductCategoryEnum = ProductCategory;
  }

  ngOnInit() {
    firstValueFrom(this.productService.getProducts()).then(
      (value: Product[]) => {
        this.filteredProducts = value;
        this.allProducts = value;
      }
    );

    this.route.queryParams.subscribe((params: any) => {
      const categoryId = params.categoryId;
      console.log(params);
      if (categoryId != this.ProductCategoryEnum.ALL) {
        this.productService
          .getProductByCategoryId(categoryId)
          .subscribe((products: any) => {
            this.filteredProducts = products;
          });
      } else {
        this.filteredProducts = this.allProducts;
      }
    });
  }
}
