/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Component} from '@angular/core';
import {AuthService} from "../user/auth.service";
import {Router} from "@angular/router";
import {User} from "../user/user";
import {AppConfig} from "../app-config";

@Component({
  selector: 'content',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  user: User = new User();
  error: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {

    this.authService.login(this.user).then((result) => {
      if (result) {
        this.router.navigate(['/home']);
      }
      else {
        this.error = 'Username or password is incorrect';
      }
    });
  }
}
