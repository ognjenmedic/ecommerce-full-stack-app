import { OrdersService } from './shared/services/orders.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { ProductsService } from './shared/services/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { UserService } from './shared/services/user.service';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProductsComponent,
    CheckoutComponent,
    NavbarComponent,
    ProductCardComponent,
    NotFoundComponent,
    CategoriesComponent,
    ProductDetailsComponent,
    FooterComponent,
    CartStatusComponent,
    CartDetailsComponent,
    LoginStatusComponent,
    LoginComponent,
    RegisterComponent,
    PaymentComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductsService, UserService, OrdersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
