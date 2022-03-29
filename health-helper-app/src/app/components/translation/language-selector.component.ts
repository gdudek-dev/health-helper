import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  public lang!: string;
  public flag!: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.lang = this.getLang();
    this.flag = this.getFlag();
  }

  getLang = (): string => {
    return this.localStorageService.getLanguage();
  };

  getFlag = (): string => {
    const flag = this.localStorageService.getLanguage();
    switch (flag) {
      case 'PL':
        return '../../../assets/translation/pl-flag.png';
      case 'EN':
        return '../../../assets/translation/en-flag.png';
      default:
        return '../../../assets/translation/pl-flag.png';
    }
  };

  setLang(value: any) {
    this.lang = value;
    this.localStorageService.Language = value;
    window.location.reload();
  }
}
