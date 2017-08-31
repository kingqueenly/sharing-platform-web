/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from "./auth.service";
import {UserProfile} from "./user-profile";
import {UserService} from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  canActivate() {
    // console.log("canActivate:"+this.router.url);
    if (this.authService.isLoggedIn()) {
      return true;
    }

    //console.log("not loggedin");
    this.userService.getUser().then(user => {
      //console.log("not loggedin");
      let userProfile = UserProfile.fromJsonObj(user);
      userProfile.setValue();
      this.router.navigate(['/home']);
      return true;
    });
  }
}
