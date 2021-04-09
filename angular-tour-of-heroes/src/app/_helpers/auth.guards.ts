import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../_services/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  profile : { profile: string; path: string[]; } [] = [
    {profile : 'admin' , path : ['heroes', 'dashboard']},
    {profile : 'writer' , path : ['heroes', 'dashboard']},
    {profile : 'reader' , path : ['dashboard']},
  ]

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var res : Boolean;
        const currentUser = this.loginService.currentUserValue;
        if (currentUser) {
          this.profile.forEach (pro => {
            if(pro.profile === currentUser.profile){
              pro.path.forEach(path => {
                if(path === route.routeConfig.path){
                  res = true;
                }
              })
            }
          })
          if(res === true){
            return true;
          }
          this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
          return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
