import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginAuth0Component } from './auth/login-auth0/login-auth0.component';
import { CallbackComponent } from './components/callback/callback.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-auth0', component: LoginAuth0Component },
  { path: 'payment', component: PaymentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', component: CategoriesComponent },
  { path: 'categories', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      enableTracing: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
