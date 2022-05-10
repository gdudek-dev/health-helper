import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SendEmailRequest } from 'src/app/models/request/send-email-request.model';
import { UpdateEmailRequest } from 'src/app/models/request/update-email-request.model';
import { UpdatePasswordRequest } from 'src/app/models/request/update-password-request.model';
import { User } from 'src/app/models/user/user.model';
import { BaseCrudService } from '../abstraction/base-crud.service';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseCrudService<User> {

  constructor(http: HttpClient, private localStorageService: LocalStorageService) {
    super(http, 'user');
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/register', user);
  }

  public getUserBySessionKey(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/session/logged');
  }

  public updatePassword(currentPassword: string, newPassword: string): Observable<boolean> {
    const updatePasswordRequest = {} as UpdatePasswordRequest;
    updatePasswordRequest.sessionKey = this.localStorageService.getSessionKey();
    updatePasswordRequest.password = currentPassword;
    updatePasswordRequest.newPassword = newPassword;

    return this.http.post<boolean>(
      this.apiUrl + '/update/password',
      updatePasswordRequest
    );
  }

  public updateEmail(password: string, newEmail: string): Observable<boolean> {
    const updateEmailRequest = {} as UpdateEmailRequest;
    updateEmailRequest.sessionKey = this.localStorageService.getSessionKey();
    updateEmailRequest.newEmail = newEmail;
    updateEmailRequest.password = password;

    return this.http.post<boolean>(
      this.apiUrl + '/update/email',
      updateEmailRequest
    );
  }

  public sendEmail(from: string, subject: string, message: string): Observable<boolean> {
    const sendEmailRequest = {} as SendEmailRequest;
    sendEmailRequest.from = from;
    sendEmailRequest.subject = subject;
    sendEmailRequest.message = message;

    return this.http.post<boolean>(
      this.apiUrl + '/send/email',
      sendEmailRequest
    );
  }
}
