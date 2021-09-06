import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = null!;
  password1: string = null!;
  password2: string = null!;

  

  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }
  
  registerUser() {
      this.authentication.registerUser(this.username, this.password1).subscribe(data => console.log(`Account credentials sent  ${this.username} ${this.password1} `));
  }
}
