import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  public formSubmitted: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslationService) { }

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


      this.userService.register(user).subscribe({
        next: () => {
          this.toastService.showNotification(
            this.translationService.getTranslation("registered_successfully")!,
            this.translationService.getTranslation("cancel")!,
            "success"
          );
          this.router.navigate(['login']);
        },
        error: error => {
          if (error.status === 0) {
            this.toastService.showNotification(
              this.translationService.getTranslation("unable_to_connect")!,
              this.translationService.getTranslation("cancel")!,
              "error");
          } else {
            this.toastService.showNotification(error.error, "Close", "error");
            //TO DO TRANSLATE ERRORS, MAYBE USE ID IN BACKEND
          }
        }
      });
    }
  }
}
