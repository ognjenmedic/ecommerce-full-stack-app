import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {
  NavigationEnd,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
// import { PRODUCTS } from 'src/db-data';
// import { Product } from './common/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {
    router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
      }
    });
  }
  ngOnInit() {}
}
