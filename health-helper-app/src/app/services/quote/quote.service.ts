import { Injectable } from '@angular/core';
import pl from '../../../assets/quotes/pl-quotes.json';
import en from '../../../assets/quotes/en-quotes.json';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private plQuotes = JSON.parse(JSON.stringify(pl));
  private enQuotes = JSON.parse(JSON.stringify(en));

  constructor(private localStorageService: LocalStorageService) { }

  getRandomQuote(): string {
    const randomIndex = Math.floor(Math.random() * (23)) + 1;
    const lang = this.localStorageService.getLanguage();

    if (lang === 'PL') {
      return this.plQuotes[randomIndex];
    }
    return this.enQuotes[randomIndex];
  }
}
