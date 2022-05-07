import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  public userEmail!: string;
  public emailForm!: FormGroup;


  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslationService) { }


  ngOnInit(): void {
    this.initNewMailForm();
  }

  initNewMailForm() {
    this.emailForm = new FormGroup({
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(4090)])
    });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      this.userService.getUserBySessionKey().subscribe({
        next: (res) => {
          this.userService.sendEmail(
            res.email,
            this.emailForm.get('subject')?.value,
            this.emailForm.get('message')?.value).subscribe({
              next: () => {
                this.toastService.showNotification(
                  this.translationService.getTranslation("email_send")!,
                  this.translationService.getTranslation("cancel")!,
                  "success");
              },
              error: () => {
                this.unableToConnectError();
              }
            })
        },
        error: () => {
          this.unableToConnectError();
        }
      });
    }
  }

  unableToConnectError() {
    this.toastService.showNotification(
      this.translationService.getTranslation("unable_to_connect")!,
      this.translationService.getTranslation("cancel")!,
      "error");
  }

}
