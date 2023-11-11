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
    const now = new Date();
    const userState = JSON.parse(window.localStorage.getItem('user'));
    if (userState) {
      if (now.getTime() > userState.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem('user');
        return null;
      } else {
        this.userService.userState.next(userState);
      }
    }
  }
}
