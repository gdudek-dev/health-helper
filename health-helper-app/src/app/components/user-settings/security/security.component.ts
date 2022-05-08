import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  public newPasswordForm!: FormGroup;
  public newMailForm!: FormGroup;
  step: number = 0;

  setStep(stepNumb: number) {
    this.step = stepNumb;
  }

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.initNewPasswordForm();
    this.initNewMailForm();
  }

  initNewPasswordForm() {
    this.newPasswordForm = new FormGroup({
      current_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  initNewMailForm() {
    this.newMailForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      new_mail: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  changePassword() {
    if (this.newPasswordForm.valid) {
      if (!this.arePasswordMatching()) {
        this.toastService.showNotification(
          this.translationService.getTranslation("new_confirm_password_diffrent")!,
          this.translationService.getTranslation("cancel")!,
          "error")
      } else {
        this.userService.updatePassword(this.newPasswordForm.get('current_password')?.value,
          this.newPasswordForm.get('new_password')?.value).subscribe({
            next: (value) => {
              if (value) {
                this.toastService.showNotification(
                  this.translationService.getTranslation("password_updated")!,
                  this.translationService.getTranslation("cancel")!,
                  "success");
              } else {
                this.toastService.showNotification(
                  this.translationService.getTranslation("wrong_current_password")!,
                  this.translationService.getTranslation("cancel")!,
                  "error");
              }
            },
            error: () => {
              this.unableToConnectError();
            }
          })
      }
    }
  }

  changeMail() {
    if (this.newMailForm.valid) {
      this.userService.updateEmail(this.newMailForm.get('password')?.value,
        this.newMailForm.get('new_mail')?.value).subscribe({
          next: (value) => {
            if (value) {
              this.toastService.showNotification(
                this.translationService.getTranslation("email_updated")!,
                this.translationService.getTranslation("cancel")!,
                "success");
            } else {
              this.toastService.showNotification(
                this.translationService.getTranslation("wrong_current_password")!,
                this.translationService.getTranslation("cancel")!,
                "error");
            }
          },
          error: () => {
            this.unableToConnectError();
          }
        })
    }
  }

  arePasswordMatching(): boolean {
    if (this.newPasswordForm.get('new_password')?.value === this.newPasswordForm.get('confirm_password')?.value) {
      return true;
    }
    return false;
  }

  unableToConnectError() {
    this.toastService.showNotification(
      this.translationService.getTranslation("unable_to_connect")!,
      this.translationService.getTranslation("cancel")!,
      "error");
  }
}

