/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {UserProfile} from "./user-profile";
import {NotificationsService} from "angular2-notifications";

@Injectable()
export class AuthManagementGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private notificationsService: NotificationsService  ) {
  }

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      //console.log("not loggedin");
      this.userService.getUser().then(user => {
        let userProfile = UserProfile.fromJsonObj(user);
        //console.log("authority:"+userProfile.authority);
        if(userProfile.authority=='administrator'){
          userProfile.setValue();
          this.router.navigate(['/management']);
          return true;
        }else{
          this.notificationsService.alert('this user ','is not authed');
          return false;
        }
      });
    }else if (! this.authService.isAdministrator()) {
      //console.log("loggedin and is not  administrator");
      this.notificationsService.alert('this user ','is not authed');
      return false;
    }else{
      this.authService.isAdministrator();
      return true;
    }
  }
}
