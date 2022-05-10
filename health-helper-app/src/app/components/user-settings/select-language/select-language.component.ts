import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  public lang!: string;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.lang = this.getLang();
  }

  getLang = (): string => {
    return this.localStorageService.getLanguage();
  };

  setLang(value: any) {
    this.lang = value;
    this.localStorageService.Language = value;
    window.location.reload();
  }
}
