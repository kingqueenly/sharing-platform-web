/**
 * Created by paulliu on 2017/1/16.
 */
const tokenKey = "auth_token";

export class UserToken {

  token: string;
  refreshToken: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }

  setValue(): void {
    localStorage.setItem(tokenKey, JSON.stringify(this));
  }

  static getValue(): UserToken {
    return JSON.parse(localStorage.getItem(tokenKey));
  }

  static removeValue() {
    localStorage.removeItem(tokenKey);
  }

  static existing() {
    let token = UserToken.getValue();
    if (token == null) {
      return false;
    }
    return true;
  }
}
