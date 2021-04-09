import { Component, OnInit } from '@angular/core';
import { LoginService } from './_services/login.service';
import { User } from "./_models/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tour of hereos';
  user: User;

  constructor(
    private router: Router,
    public loginService : LoginService) {
      this.loginService.currentUser.subscribe(x => this.user = x);
    }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
