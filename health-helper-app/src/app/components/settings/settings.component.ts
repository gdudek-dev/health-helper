import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  private sidenav!: MatSidenav;

  public lang!: string;
  public events: string[] = [];
  public opened!: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.lang = this.getLang();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 550px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.cd.detectChanges();
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
