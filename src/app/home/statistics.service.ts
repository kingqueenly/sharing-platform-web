/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Injectable}    from '@angular/core';
import {HttpService} from "../common/http.service";
import {Total} from "./total";

@Injectable()
export class StatisticsService {
  private totalUrl = '/statistics/total';

  constructor(private httpHelper: HttpService) {
  }

  viewTotal(): Promise<Total> {
    return this.httpHelper.get(this.totalUrl).then(total => {
      return total;
    });
  }

}
