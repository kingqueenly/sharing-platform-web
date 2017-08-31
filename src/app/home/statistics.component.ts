import {Component, OnInit} from "@angular/core";
import {Total} from "./total";
import {StatisticsService} from "./statistics.service";
/**
 * Created by paulliu on 2017/1/20.
 */

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {
  total: Total;


  constructor(private statisticsService: StatisticsService) {
    this.total = new Total(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.statisticsService.viewTotal().then(total => this.total = total);
  }
}
