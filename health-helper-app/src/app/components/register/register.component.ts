import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['login'])
  }

  signUp(){
    
  }

}
