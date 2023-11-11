import { Order } from '../../models/order';
import { OrdersService } from '../../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  orderData: any;

  totalPrice: number;
  totalQuantity: number;

  creditCardYears: number[];
  creditCardMonths: number[];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private ordersService: OrdersService,
    private cartService: CartService
  ) {
    this.totalPrice = 0;
    this.totalQuantity = 0;
    this.creditCardMonths = [];
    this.creditCardYears = [];
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populate credit card months

    const startMonth = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);
    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieve credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
    // populate credit card years
    this.formService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieve credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    this.checkoutTotals();
  }

  getFirstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  getLastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  getEmail() {
    return this.checkoutFormGroup.get('customer.email');
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      // bug fix for states
      // this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // bug fix for states
      // this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log('Handling submit button');
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched;
    }

    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
  }

  handleMonthsAndYears() {
    const creditCardFormGroup: any = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.get('expirationYear').value
    );
    console.log(creditCardFormGroup.get('expirationYear').value);
    // if the current year equals selected year, then start with the current month

    let startMonth: number;
    console.log(currentYear, selectedYear);
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieve credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
      console.log(this.creditCardMonths);
    });
  }

  checkoutTotals() {
    this.cartService.totalQuantity$.subscribe(
      (res) => (this.totalQuantity = res)
    );
    this.cartService.totalPrice$.subscribe((res) => (this.totalPrice = res));
  }

  placeOrder() {
    const orderData = {
      ...this.checkoutFormGroup.value,
      products: this.cartService.cartItems,
      totalQuantity: this.totalQuantity,
      totalPrice: this.totalPrice,
    };
    this.ordersService.placeOrder(orderData).subscribe((res) => {
      alert('Your order has been placed.');
      this.checkoutFormGroup.reset;
    });
  }
}
