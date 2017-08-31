/**
 * Created by paulliu on 2016/12/7.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {QueryParameterUseCase} from "./query-parameter-usecase";
import {PagedList} from "../../home/pagedlist";
import {UseCaseService} from "../use-case.service";
import {SiteCaseResult} from "../../home/site-case-result";
import {ValueService} from "../../management/value.service";
import {Value} from "../../management/value";
import {AppConfig} from "../../app-config";
import {BUService} from "../../management/bu.service";

@Component({
    selector: 'content',
    templateUrl: './list-search-usecase.component.html'
})
export class ListSearchUseCaseComponent implements OnInit {
    pagedList: PagedList<SiteCaseResult>;
    queryParameter: QueryParameterUseCase;
    valueType: string;
    objectiveList: Value[];
    companyList: String[];
    deptList: Value[];
    deptHidden: boolean;

    objective: string = "";
    company: string = "";
    dept: string = "";
    stage: string = "";
    stages: string[];

    constructor(private buService: BUService, private valueService: ValueService, private router: Router, private route: ActivatedRoute, private useCaseSercice: UseCaseService, private appConfig: AppConfig) {
        this.pagedList = new PagedList<SiteCaseResult>();
        this.objectiveList = [];
        this.companyList = appConfig.companiesForQuery;
        this.deptList = [];
        this.stages = appConfig.stagesForQuery;
    }

    ngOnInit(): void {
        this.deptHidden = true;
        this.valueService.listValues().then(vals => {
            this.objectiveList = vals.list
        });

        this.route.params.forEach((params: Params) => {

            this.objective = params['objective'];
            this.company = params['company'];
            this.dept = params['dept'];
            this.stage = params['stage'];

            this.valueType = this.objective;

            this.queryParameter = new QueryParameterUseCase();
            this.queryParameter.objective = (this.objective == "All" ? "" : this.objective);
            this.queryParameter.company = (this.company == "All" ? "" : this.company);
            this.queryParameter.dept = (this.dept == "All" ? "" : this.dept);
            this.queryParameter.stage = (this.stage == "All" ? "" : this.stage);

            if (this.company != null && this.company != "" && this.company != "All") {
                console.log("searching dept...");
                this.buService.listDepts(this.company).then(ds => {
                    this.deptList = ds.list
                    let all: Value = new Value();
                    all.id = "0";
                    all.text = "All";
                    this.deptList.splice(0, 0, all);
                });
                this.deptHidden = false;
            }
            //console.log(this.deptHidden);

            this.useCaseSercice.getCaseList(1, this.queryParameter).then(cases => {
                this.pagedList = cases;
                //console.log(this.pagedList.hasNextPage);
            });
        });
    }

    showMore() {
        this.useCaseSercice.getCaseList(this.pagedList.pageNum + 1, this.queryParameter)
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

    changeCompany(event, c) {

        event.preventDefault();

        if(this.company == c) return;

        this.company = c;
        if (c == "All") {
            console.log("company : " + c);
            this.deptHidden = true;
        }
        this.dept = "All";
        this.deptList = [];
        this.router.navigate(['case/search', this.objective, this.company, this.dept, this.stage]);
    }

}
