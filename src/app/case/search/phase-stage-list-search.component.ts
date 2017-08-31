import {OnInit, Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {UseCaseService} from "../use-case.service";
import {PagedList} from "../../home/pagedlist";
import {SiteCaseResult} from "../../home/site-case-result";
import {AppConfig} from "../../app-config";
import {PhaseStageParameter} from "./PhaseStageParameter";
/**
 * Created by hongying.fu on 1/20/2017.
 */
@Component({
  selector: 'content',
  templateUrl: './phase-stage-list-search.component.html'
})
export class PhaseStageListSearchComponent implements OnInit {
  pagedList: PagedList<SiteCaseResult>;
  queryParameter: PhaseStageParameter;
  phase:string;
  stage:string;
  phases: string[];
  stages: string[];

  constructor(private appConfig: AppConfig, private route: ActivatedRoute, private useCaseSercice: UseCaseService) {
    this.pagedList = new PagedList<SiteCaseResult>();
    this.phases = appConfig.phasesForQuery;
    this.stages = appConfig.stagesForQuery;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.phase=params['phase'];
      this.stage=params['stage'];
      let tphase: string = "";
      let tstage: string = "";
      if(this.phase != "All"){
        tphase = this.phase;
      }
      if(this.stage != "All"){
        tstage = this.stage;
      }
      this.queryParameter = new PhaseStageParameter(tphase,tstage);

      this.useCaseSercice.getPhaseStageCaseList(1, this.queryParameter).then(cases => {
        this.pagedList = cases;
      });
    });
  }

  showMore() {
    this.useCaseSercice.getPhaseStageCaseList(this.pagedList.pageNum + 1, this.queryParameter)
      .then(
        cases => {
          var nextPagedList = cases;
          this.pagedList.pageNum = nextPagedList.pageNum;
          this.pagedList.pageSize = nextPagedList.pageSize;
          this.pagedList.size = nextPagedList.size;
          this.pagedList.total = nextPagedList.total;
          this.pagedList.pages = nextPagedList.pages;
          for (let siteCase of nextPagedList.list) {
            this.pagedList.list.push(siteCase);
          }
          this.pagedList.hasPreviousPage = nextPagedList.hasPreviousPage;
          this.pagedList.hasNextPage = nextPagedList.hasNextPage;
          this.pagedList.firstPage = nextPagedList.firstPage;
          this.pagedList.lastPage = nextPagedList.lastPage;
        }
      );
  }

}
