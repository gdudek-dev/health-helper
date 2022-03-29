import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../enums/local-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

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
}
