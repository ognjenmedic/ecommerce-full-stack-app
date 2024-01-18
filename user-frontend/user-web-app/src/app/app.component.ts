import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';

// import { PRODUCTS } from 'src/db-data';
// import { Product } from './common/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.initializeUserState();
  }
}
