import {Component, OnInit} from "@angular/core";
import {AppConfig} from "../app-config";
import {UseCaseService} from "../case/use-case.service";
import {SiteCaseResult} from "./site-case-result";
import {PagedList} from "./pagedlist";
import {PhaseList} from "./phase-list";
import {StageList} from "./stage-list";
import {CategoryListParameter} from "../case/search/categorylist-parameter";
import {CategoryList} from "./category-list";
import {CategoryParameter} from "../case/search/category-parameter";

/**
 * Created by hongying.fu on 4/17/2017.
 */

@Component({
  selector: 'shopfloor',
  templateUrl: './shopfloor.component.html',
  styleUrls: ['./shopfloor.component.css']
})
export class ShopFloorComponent implements OnInit{

  isCustomer:boolean=true;
  listPagedList:PhaseList<StageList<SiteCaseResult>>[];
  //customerList:PhaseList<StageList<SiteCaseResult>>[];
  categoryList:CategoryList<StageList<SiteCaseResult>>[];
  //functionalList:PhaseList<StageList<SiteCaseResult>>[];
  phases: string[];
  customerPhases: string[];
  othersPhases: string[];

  expanded: boolean = false;

  constructor(private useCaseSercice: UseCaseService, private appConfig: AppConfig){
    this.phases=this.appConfig.phases;
    this.customerPhases=this.appConfig.customerPhases;
    this.othersPhases=this.appConfig.othersPhases;
  }

  toggleCategory(){
    this.expanded = !this.expanded;
  }

  ngOnInit(): void {
    this.useCaseSercice.getShoopFloor(this.phases).then(pagedLists=>{
      this.listPagedList=pagedLists;
    });

    let categoryParameter1 = new CategoryParameter();
    categoryParameter1.category = "Customer Journey";
    categoryParameter1.phases = this.customerPhases;

    let categoryParameter2 = new CategoryParameter();
    categoryParameter2.category = "Other Use Case";
    categoryParameter2.phases = this.othersPhases;

    let categoryListParameter = new CategoryListParameter();
    categoryListParameter.categoryParameterList.push(categoryParameter1);
    categoryListParameter.categoryParameterList.push(categoryParameter2);

    this.useCaseSercice.getShopFloorCategory(categoryListParameter).then(lists=>{
      this.categoryList = lists;
    });
  }

  getTooltip(phase: string):string {
    let tooltip: string = "";
    //console.log(phase);
    if(phase == "Awareness") {
      tooltip = '"Leads first become aware of your product or brand" Beginning of exploratory process and purchase path, the earliest time to make first impression.';
    } else if(phase == "Consideration") {
      tooltip = '"Prospects research and evaluate their options" Needs & demands identification and is beginning to weigh options.';
    } else if(phase == "Purchase") {
      tooltip = '"Leads are at the final stage of the buying portion of the journey" More personalized touch as a requirement and necessary quick communication step to provide confidence on purchase.';
    }else if(phase == "Customer Care/Usage") {
      tooltip = '"The customers evaluate and feedback on experience of services" More customized recommendation and individualized services would be provided for customer retention.';
    }else if(phase == "Loyalty/Repurchase") {
      tooltip = '"Customers as brand ambassadors are at the advocacy phase of the journey" With satisfaction and adoption, self-persuasion and relative-recommendation contribute on sustainable business.';
    } else if(phase == "Others") {
      tooltip = 'Others';
    }
    return tooltip;
  }
}
