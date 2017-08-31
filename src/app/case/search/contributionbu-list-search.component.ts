import {OnInit, Component} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {UseCaseService} from "../use-case.service";
import {PagedList} from "../../home/pagedlist";
import {ContributionBUParameter} from "./contributionbu-parameter";
import {SiteCaseResult} from "../../home/site-case-result";
import {BUService} from "../../management/bu.service";
import {BU} from "../../management/bu";
import {AppConfig} from "../../app-config";
/**
 * Created by hongying.fu on 1/20/2017.
 */
@Component({
  selector: 'content',
  templateUrl: './contributionbu-list-search.component.html'
})
export class ContributionBuListSearchComponent implements OnInit {
  pagedList: PagedList<SiteCaseResult>;
  queryParameter: ContributionBUParameter;
  type: number;
  buList: PagedList<BU>;

  constructor(private router: Router, private route: ActivatedRoute, private useCaseSercice: UseCaseService,private buService: BUService, private appConfig: AppConfig) {
    this.pagedList = new PagedList<SiteCaseResult>();
    this.buList = new PagedList<BU>();
  }

  ngOnInit(): void {
    this.buService.listBUs().then(bus => {
      this.buList = bus;
    });

    this.route.params.forEach((params: Params) => {
      let type = params['type'];
      this.queryParameter = new ContributionBUParameter(type);
      //console.log("type:"+type);
      this.useCaseSercice.getContributionBUCaseList(1, this.queryParameter).then(cases => {
        this.pagedList = cases;
      });
    });
  }

  showMore() {
    this.useCaseSercice.getContributionBUCaseList(this.pagedList.pageNum + 1, this.queryParameter)
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

  searchByContributionBUType(valueType: string) {
    if (valueType == this.queryParameter.contributionBU) {
      return;
    }
    this.queryParameter.contributionBU = valueType;
    this.useCaseSercice.getContributionBUCaseList(1, this.queryParameter).then(cases => {
      this.pagedList = cases;
    });
  }
}
