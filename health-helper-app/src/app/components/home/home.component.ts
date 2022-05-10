import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { QuoteService } from 'src/app/services/quote/quote.service';
import { ToastService } from 'src/app/services/toast.service';
import { TranslationService } from 'src/app/services/translation/translation-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firstName!: String;
  randomQuote!: String;

  constructor(
    private quoteService: QuoteService,
    private userService: UserService,
    private toastService: ToastService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.getRandomQuote();
    this.getUser();
  }

  getRandomQuote() {
    this.randomQuote = this.quoteService.getRandomQuote();
  }

  getUser() {
    this.userService.getUserBySessionKey().subscribe({
      next: (res) => {
        this.firstName = res.firstName;
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
