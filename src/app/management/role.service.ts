/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Injectable}    from '@angular/core';
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {BU} from "./bu";
import {Role} from "./role";

@Injectable()
export class RoleService {
  private listUrl = '/role/search';
  private createUrl = '/role/create';
  private updateUrl = '/role/update';
  private deleteUrl = '/role/delete';

  constructor(private httpHelper: HttpService) {
  }

  listRoles() {
    return this.httpHelper.post<Promise<PagedList<Role>>>(this.listUrl).then(roles => roles);
  }

  createRole(role): Promise<string> {
    return this.httpHelper.post(this.createUrl, role);
  }

  updateRole(role): Promise<void> {
    return this.httpHelper.put(this.updateUrl + '/' + role.id, role);
  }

  deleteRole(role): Promise<void> {
    return this.httpHelper.delete(this.deleteUrl + '/' + role.id);
  }
}
