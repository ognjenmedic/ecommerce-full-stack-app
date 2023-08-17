import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
    this.registrationForm.valueChanges.subscribe((x) => {});
  }

  register() {
    this.userService.register(this.registrationForm.value).subscribe(
      (res) => {
        alert('Registration Successful');
        this.registrationForm.reset;
        this.router.navigate(['/categories']);
      },
      (error) => {
        alert('Something went wrong');
      }
    );
  }
}
