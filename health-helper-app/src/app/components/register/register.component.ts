import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public formSubmitted: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

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

    if (this.registerForm.valid) {
      const user = {} as User;

      user.firstName = this.registerForm.get('firstName')?.value;
      user.lastName = this.registerForm.get('lastName')?.value;
      user.email = this.registerForm.get('email')?.value;
      user.password = this.registerForm.get('password')?.value;

      console.log(user);
      this.userService.register(user).subscribe({
        next: () => {
          console.log("succesfull")
          this.router.navigate(['login']);
        },
        error: error => {
          console.error('There was an error!', error.error);
          //TODO TOAST SERVICE
        }
      });
    }
  }
}
