import {Component, OnInit, Input} from "@angular/core";
import {UserLevel} from "../user/user-level";
/**
 * Created by hongying.fu on 1/19/2017.
 */

@Component({
  selector: 'user-level',
  templateUrl: './user-level.component.html',
  styleUrls: ['./user-level.component.css']
})
export class UserLevelComponent implements OnInit {
  @Input() level: string;
  @Input() levelRule: UserLevel[];
  @Input() userScore:number;
  userLevelIcon: string;
  widthProgress: string;
  nextLevel:string;
  ngOnInit(): void {
    //console.log(this.level);
   // console.log(this.levelRule);
    for(let rule of this.levelRule){

      if(this.level==rule.name){
        if(this.level=='Diamond'){
          this.widthProgress='100%';
        }else{
          // console.log(111);
          this.widthProgress =(this.userScore-rule.minScore)/(rule.maxScore-rule.minScore)*100+'%';
          // console.log(this.widthProgress);
        }

      }
    }
    if (this.level == 'Iron') {
      this.nextLevel='Copper';
    } else if (this.level == 'Copper') {
      this.userLevelIcon = '25%';
      this.nextLevel='Sliver';
    } else if (this.level == 'Sliver') {
      this.userLevelIcon = '50%';
      this.nextLevel="Golden";
    } else if (this.level == 'Golden') {
      this.userLevelIcon = '75%';
      this.nextLevel='Diamond';
    } else if (this.level == 'Diamond') {
      this.userLevelIcon = '100%';
      this.nextLevel='';
    } else {
      this.nextLevel=='Copper';
    }
  }

}
