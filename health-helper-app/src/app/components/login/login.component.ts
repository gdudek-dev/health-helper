import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password!: string;
  public email!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {

  }

  signUp() {
      this.router.navigate(['register'])
  }

}
