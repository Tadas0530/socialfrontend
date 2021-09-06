import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private authentication: AuthenticationService) {}

  loggedInUser: User = this.authentication.currentUser;

  ngOnInit(): void {}

  logout() {
    this.authentication.logout();
  }
}
