import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private localStorageService: LocalStorageService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isSessionKeyIsAlive();
  }
}
