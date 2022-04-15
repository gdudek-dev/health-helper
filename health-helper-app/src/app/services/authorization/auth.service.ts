import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/app/models/user/session.model';
import { LocalStorageService } from '../local-storage.service';
import { LoginRequest } from './loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public email?: string;
  public password?: string;
  protected apiUrl = "http://localhost:8081/api/";

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  signIn(loginRequest: LoginRequest, url: string): Observable<Session> {
    return this.http.post<Session>(this.apiUrl + url, loginRequest);
  }

  logout() {
    const sessionKey = this.localStorageService.getSessionKey();
    return this.http.delete(this.apiUrl + 'auth/logout', {
      headers: { sessionKey: sessionKey },
    });
  }

  isSessionKeyIsAlive(): Observable<boolean> {
    const session = {} as Session;
    session.sessionKey = this.localStorageService.getSessionKey();
    return this.http.post<boolean>(
      this.apiUrl + 'auth/session/check-alive-session',
      session
    );
  }
}
