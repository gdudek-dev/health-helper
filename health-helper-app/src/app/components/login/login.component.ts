import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKey } from 'src/app/enums/local-storage.enum';
import { Session } from 'src/app/models/user/session.model';
import { AuthService } from 'src/app/services/authorization/auth.service';
import { LoginRequest } from 'src/app/services/authorization/loginRequest.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password!: string;
  public email!: string;
  public doNotLogout: boolean = false;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private translationService: TranslationService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.checkIfAlreadyLogged();
  }

  private checkIfAlreadyLogged(): void {
    if (
      this.localStorageService.get(LocalStorageKey.SESSION_KEY, localStorage)
    ) {
      this.authService.isSessionKeyIsAlive().subscribe((res) => {
        if (res) {
          console.log("user logged")
          //TODO go to main page
        }
      });
    }
  }

  signIn() {
    const loginRequest = {} as LoginRequest
    loginRequest.email = this.email;
    loginRequest.password = this.password;
    loginRequest.hasDoNotLogout = this.doNotLogout;

    this.authService.signIn(loginRequest, "auth/login").subscribe(
      (res: Session) => {
        this.localStorageService.set(
          LocalStorageKey.SESSION_KEY,
          res.sessionKey,
          localStorage
        );
        this.localStorageService.set(
          LocalStorageKey.IS_ADMIN,
          res.isAdmin,
          localStorage
        );
        //TODO navigate to main page
      },
      (error) => {
        if (error.status === 0) {
          this.toastService.showNotification(
            this.translationService.getTranslation("unable_to_connect")!,
            this.translationService.getTranslation("cancel")!,
            "error");
        } else {
          if (this.localStorageService.Language != 'PL') {
            this.toastService.showNotification(error.error, "Close", "error");
          }
          else {
            this.toastService.showNotification("Zły email lub hasło", "Zamknij", "error");
          }
        }
      }
    );
  }

  signUp() {
    this.router.navigate(['register'])
  }
}
