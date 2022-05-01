import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote/quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userFirstName!: String;
  randomQuote!: String;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.getRandomQuote();
  }

  getRandomQuote() {
    this.randomQuote = this.quoteService.getRandomQuote();
  }
}
