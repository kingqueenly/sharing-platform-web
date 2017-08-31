/**
 * Created by hongying.fu on 2/10/2017.
 */
import {Injectable} from "@angular/core";
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {Value} from "./value";
import {DataSource} from "./data-source";
import {DataAnalysisModel} from "./data-analysis-model";

@Injectable()
export class DataAnalysisModelService {
  private listUrl = '/dataAnalysisModel/search';
  private createUrl = '/dataAnalysisModel/create';
  private updateUrl = '/dataAnalysisModel/update';
  private deleteUrl = '/dataAnalysisModel/delete';

  constructor(private httpHelper: HttpService) {
  }

  listDataAnalysisModels() {
    return this.httpHelper.post<Promise<PagedList<DataAnalysisModel>>>(this.listUrl).then(bus => bus);
  }

  createDataAnalysisModel(value): Promise<string> {
    return this.httpHelper.post(this.createUrl, value);
  }

  updateDataAnalysisModel(value): Promise<void> {
    return this.httpHelper.put(this.updateUrl + '/' + value.id, value);
  }

  deleteDataAnalysisModel(value): Promise<void> {
    return this.httpHelper.delete(this.deleteUrl + '/' + value.id);
  }
}
