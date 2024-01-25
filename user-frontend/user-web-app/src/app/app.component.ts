import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
// import { PRODUCTS } from 'src/db-data';
// import { Product } from './common/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {}
  ngOnInit() {}
}
