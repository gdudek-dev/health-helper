import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKey } from '../enums/local-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private router: Router) { }

  set(key: LocalStorageKey | string, data: any, type: Storage) {
    type.setItem(key, data);
  }

  get(key: LocalStorageKey | string, type: Storage) {
    return type.getItem(key);
  }

  set Language(lang: string) {
    localStorage.setItem(LocalStorageKey.LANGUAGE, lang);
  }

  getLanguage(): string {
    const lang = localStorage.getItem(LocalStorageKey.LANGUAGE)
    if (lang !== null) {
      return lang;
    }
    this.Language = "PL";
    return "PL";
  }

  getSessionKey(): string {
    const sessionKey = localStorage.getItem(LocalStorageKey.SESSION_KEY);
    if (sessionKey != null) {
      return sessionKey;
    }
    this.router.navigate(['login'])
    return "";
  }

  getIsAdmin(): string {
    const isAdmin = localStorage.getItem(LocalStorageKey.IS_ADMIN);
    if (isAdmin != null) {
      return isAdmin;
    }
    return "";
  }

  clearSessionKey(): void {
    localStorage.removeItem(LocalStorageKey.SESSION_KEY);
  }
}
