import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password!: string;
  public email!: string;

  constructor() { }

  ngOnInit(): void {
  }

  signIn() {

  }

  signUp() {

  }

}
