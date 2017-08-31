/**
 * Created by hongying.fu on 2/10/2017.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {Value} from "./value";
import {DataSource} from "./data-source";

@Injectable()
export class DataSourceService {
  private listUrl = '/dataSource/search';
  private createUrl = '/dataSource/create';
  private updateUrl = '/dataSource/update';
  private deleteUrl = '/dataSource/delete';

  constructor(private httpHelper: HttpService) {
  }

  listDataSources() {
    return this.httpHelper.post<Promise<PagedList<DataSource>>>(this.listUrl).then(bus => bus);
  }

  createDataSource(value): Promise<string> {
    return this.httpHelper.post(this.createUrl, value);
  }

  updateDataSource(value): Promise<void> {
    return this.httpHelper.put(this.updateUrl + '/' + value.id, value);
  }

  deleteDataSource(value): Promise<void> {
    return this.httpHelper.delete(this.deleteUrl + '/' + value.id);
  }
}
