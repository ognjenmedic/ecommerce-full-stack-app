import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];
  private categoryMap: { [categoryName: string]: number } = {};

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    // this.auth.isAuthenticated$.subscribe((isLoggedIn) => {
    //   if (isLoggedIn) {
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // });

    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.createCategoryMap(categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
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
}
