/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Component} from '@angular/core';
import {AuthService} from "../user/auth.service";
import {Router} from "@angular/router";
import {User} from "../user/user";

@Component({
  selector: 'content',
  templateUrl: './management-login.component.html'
})
export class ManagementLoginComponent {

  user: User = new User();
  error: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.user).then((result) => {
      if (result) {
        //console.log("management true");
        // this.router.navigate(['/management']);
        this.router.navigate(['/management']);
      }
      else {
        this.error = 'Username or password is incorrect';
      }
    });
  }
}
