import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public formSubmitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  cancel() {
    this.router.navigate(['login'])
  }

  signUp() {
    this.formSubmitted = true;

    //TODO ADD CONNETION TO API
  }

}
