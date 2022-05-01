import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isSessionKeyIsAlive()
  }
}
