import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  username: string;
  password: string;
  invalidLogin: boolean = true;

  ngOnInit(): void {
    
  }

  handleLogin() {
    this.authentication
      .executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
        (data) => {
          this.authentication.userInit();
          this.router.navigate([''])
          this.invalidLogin = false;
        },
        (error) => {
          this.invalidLogin = true;
        }
      );
  }
}
