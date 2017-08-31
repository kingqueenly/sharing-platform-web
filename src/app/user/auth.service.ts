/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Injectable}    from '@angular/core';
import {HttpService} from "../common/http.service";
import {User} from "./user";
import {UserToken} from "./user-token";
import {UserProfile} from "./user-profile";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {
  private loginUrl = '/auth/login';
  private logoutUrl='/user/logout';
  constructor(private httpHelper: HttpService, private userService: UserService) {
  }

  login(user: User) {
    return this.httpHelper.post<Promise<UserToken>>(this.loginUrl, user).then(result => {
      // console.log("resut:"+result);
      return Promise.resolve(result).then(ret => {
        if (ret != null) {
          // console.log("ret:"+ret);
          let userToken = new UserToken(ret.token, ret.refreshToken);
          userToken.setValue();
          return this.userService.getUser().then(user => {
            let userProfile = UserProfile.fromJsonObj(user);
            userProfile.setValue();
            return true;
          });
        }
        return false;
      });
    });
  }

  logout() {
    // UserToken.removeValue();
    UserProfile.removeValue();
    this.httpHelper.post(this.logoutUrl);
  }

  isLoggedIn() {
    // return UserToken.existing();
    return UserProfile.existing();
  }

  isAdministrator() {
    return UserProfile.getValue().isAdministrator();
  }
}
