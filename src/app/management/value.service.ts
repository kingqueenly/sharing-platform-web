/**
 * Created by hongying.fu on 2/10/2017.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {Value} from "./value";

@Injectable()
export class ValueService {
  private listUrl = '/value/search';
  private createUrl = '/value/create';
  private updateUrl = '/value/update';
  private deleteUrl = '/value/delete';

  constructor(private httpHelper: HttpService) {
  }

  listValues() {
    return this.httpHelper.post<Promise<PagedList<Value>>>(this.listUrl).then(bus => bus);
  }

  createValue(value): Promise<string> {
    return this.httpHelper.post(this.createUrl, value);
  }

  updateValue(value): Promise<void> {
    return this.httpHelper.put(this.updateUrl + '/' + value.id, value);
  }

  deleteValue(value): Promise<void> {
    return this.httpHelper.delete(this.deleteUrl + '/' + value.id);
  }
}
