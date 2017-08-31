/**
 * Created by paul.a.liu on 2/16/2017.
 */

import {Injectable} from "@angular/core";
import {HttpService} from "../common/http.service";
import {ChartData} from "./chart";

@Injectable()
export class ChartService {

  private getUrl = '/statistics/total/value';

  constructor(private httpHelper: HttpService) {
  }

  getData() {
    return this.httpHelper.get<Promise<ChartData>>(this.getUrl).then(data => data);
  }
}
