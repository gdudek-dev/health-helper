import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { BaseCrudService } from '../abstraction/base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseCrudService<User> {

  constructor(http: HttpClient) {
    super(http, 'user');
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/register', user);
  }

  public getUserBySessionKey(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/session/logged');
  }
}
