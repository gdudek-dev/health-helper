import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public updatePassword(current_password: string, new_password: string): Observable<boolean> {
    const updatePasswordRequest = {} as UpdatePasswordRequest;
    updatePasswordRequest.sessionKey = this.localStorageService.getSessionKey();
    updatePasswordRequest.password = current_password;
    updatePasswordRequest.newPassword = new_password;

    return this.http.post<boolean>(
      this.apiUrl + '/update/password',
      updatePasswordRequest
    );
  }
}
