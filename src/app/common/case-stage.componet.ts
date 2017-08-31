import {Component, OnInit, Input} from "@angular/core";
/**
 * Created by hongying.fu on 1/18/2017.
 */
@Component({
  selector: 'case-stage',
  templateUrl: './case-stage.component.html',
  styleUrls: ['./case-stage.component.css']
})
export class CaseStageComponent implements OnInit {
  @Input() stage: string;
  widthProgress: string;
  stageNum:number=0;
  constructor() {
  }

  ngOnInit() {
    //console.log("stage:" + this.stage);
    if (this.stage == 'Concept') {
      // this.widthProgress = '25%';
      this.stageNum=1;
    }else if(this.stage == 'Analysis'){
      // this.widthProgress = '50%';
      this.stageNum=2;
    }else if(this.stage == 'Validation'){
      // this.widthProgress = '75%';
      this.stageNum=3;
    }else if(this.stage == 'Implementation'){
      // this.widthProgress = '100%';
      this.stageNum=4;
    }else {
      // this.widthProgress = '25%';
      this.stageNum=1;
    }
  }
}
