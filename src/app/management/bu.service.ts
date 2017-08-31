/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Injectable}    from '@angular/core';
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {BU} from "./bu";
import {Value} from "../management/value";

@Injectable()
export class BUService {
  private listCompanyUrl = '/bu/search/company';
  private listDeptUrl = "/bu/search/dept/";
  private listUrl = '/bu/search';
  private createUrl = '/bu/create';
  private updateUrl = '/bu/update';
  private deleteUrl = '/bu/delete';

  constructor(private httpHelper: HttpService) {
  }

  listDepts(company: string) {
    return this.httpHelper.get<Promise<PagedList<Value>>>(this.listDeptUrl + company).then(ds => ds);
  }

  listCompanies() {
    return this.httpHelper.get<Promise<PagedList<Value>>>(this.listCompanyUrl).then(cs => cs);
  }

  listBUs() {
    return this.httpHelper.post<Promise<PagedList<BU>>>(this.listUrl).then(bus => bus);
  }

  createBU(bu): Promise<string> {
    return this.httpHelper.post(this.createUrl, bu);
  }

  updateBU(bu): Promise<void> {
    return this.httpHelper.put(this.updateUrl + '/' + bu.id, bu);
  }

  deleteBU(bu): Promise<void> {
    return this.httpHelper.delete(this.deleteUrl + '/' + bu.id);
  }
}
