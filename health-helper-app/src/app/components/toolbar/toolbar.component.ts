import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKey } from 'src/app/enums/local-storage.enum';
import { AuthService } from 'src/app/services/authorization/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ContentChild('parent') hamburgerRef!: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem(LocalStorageKey.SESSION_KEY);
        this.router.navigate(['login']);
      },
      error: error => {
        this.toastService.showNotification(
          this.translationService.getTranslation("unable_to_connect")!,
          this.translationService.getTranslation("cancel")!,
          "error");
      }
    });
  }
}
