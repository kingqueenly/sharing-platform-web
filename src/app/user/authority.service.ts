import {Injectable} from "@angular/core";
import {HttpService} from "../common/http.service";
import {Authority} from "./authority";

/**
 * Created by paulliu on 2017/1/19.
 */

@Injectable()
export class AuthorityService {

  constructor(private httpHelper: HttpService) {
  }

  listRoles() {
    let roleList = [];
    roleList.push(new Authority("user", "user"));
    roleList.push(new Authority("administrator", "administrator"));
    return roleList;
  }

}
