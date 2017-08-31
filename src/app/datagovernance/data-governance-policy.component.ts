/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {AppConfig} from "../app-config";

@Component({
  selector: 'content',
  templateUrl: 'data-governance-policy.component.html'
})
export class DataGovernancePolicyComponent implements OnInit {

  showPrinciples: boolean = true;
  showDownloads: boolean = false;
  filePath: string;

  constructor(private appConfig: AppConfig) {

  }

  ngOnInit(): void {
    this.filePath = this.appConfig.filePath;
  }

  agreePrinciples(){
    this.showPrinciples = false;
    this.showDownloads = true;
  }

  ifScrollBottom(event){
    //console.log(event);
    //console.log(event.target);
  }
}
