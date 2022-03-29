import { Injectable } from '@angular/core';
import pl from '../../../translation/pl-PL.json'
import en from '../../../translation/en-EN.json';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Injectable({ providedIn: 'root' })
export class TranslationService {
  constructor(private localStorageService: LocalStorageService) {}

  private plLang = JSON.parse(JSON.stringify(pl));
  private enLang = JSON.parse(JSON.stringify(en));

  getTranslation(value: string): string | undefined {
    const lang = this.localStorageService.getLanguage();
      if (lang === 'PL') {
        return this.plLang[value];
      }
      return this.enLang[value];
    }
}