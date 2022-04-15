import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private localStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (route.data['adminOnly'] == 'true') {
      if (this.localStorageService.getIsAdmin() == 'true') {
        return this.authService.isSessionKeyIsAlive();
      }
    }
    return of(false);
  }
}
