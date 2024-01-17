import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  allProducts: Product[];
  filteredProducts: Product[];

  constructor(
    public productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.allProducts = [];
    this.filteredProducts = [];
  }

  ngOnInit() {
    firstValueFrom(this.productService.getProducts()).then(
      (products: Product[]) => {
        this.allProducts = products;
        this.filterByCategory();
      }
    );
  }

  filterByCategory() {
    this.route.queryParams.subscribe((params: any) => {
      const categoryId = params.categoryId;
      console.log('Selected Category ID:', categoryId);

      if (categoryId) {
        this.productService
          .getProductByCategoryId(categoryId)
          .subscribe((products: Product[]) => {
            this.filteredProducts = products;
          });
      } else {
        // If no category ID is specified, show all products
        this.filteredProducts = this.allProducts;
      }
    });
  }
}
