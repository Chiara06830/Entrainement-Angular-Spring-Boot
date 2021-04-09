import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService : LoginService,
    private router: Router) {
      // redirect to home if already logged in
      if (this.loginService.currentUserValue) {
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit(): void {
  }

  connect(username : string, password : string) : void{
    this.loginService.getUser(username, password)
      .subscribe(u => {
        if(u !== undefined)
          this.router.navigate(['/dashboard']);
      });
  }
}
