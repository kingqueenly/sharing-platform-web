/**
 * Created by paulliu on 2016/12/7.
 */

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {QueryParameter} from "./query-parameter";
import {PagedList} from "../../home/pagedlist";
import {UseCaseService} from "../use-case.service";
import {SiteCaseResult} from "../../home/site-case-result";
import {ValueService} from "../../management/value.service";
import {Value} from "../../management/value";
import {AppConfig} from "../../app-config";

@Component({
    selector: 'content',
    templateUrl: './list-search.component.html'
})
export class ListSearchComponent implements OnInit {
    pagedList: PagedList<SiteCaseResult>;
    queryParameter: QueryParameter;
    valueType: string;
    valueList: PagedList<Value>;

    constructor(private router: Router, private route: ActivatedRoute, private useCaseSercice: UseCaseService, private valueService: ValueService, private appConfig: AppConfig) {
        this.pagedList = new PagedList<SiteCaseResult>();
        this.valueList = new PagedList<Value>();
    }

    ngOnInit(): void {
        this.valueService.listValues().then(values => {
            this.valueList = values;
            let all: Value = new Value();
            all.id = "0";
            all.text = "All";
            this.valueList.list.splice(0, 0, all);
        });

        this.route.params.forEach((params: Params) => {
            let valueType = params['valueType'];
            this.valueType = valueType;
            if (valueType == undefined || valueType == 'All') {
                valueType = '';
            }

            let subject = params['subject'];
            if (subject == undefined) {
                subject = '';
            }

            this.queryParameter = new QueryParameter(subject, valueType);
            this.useCaseSercice.getCaseList(1, this.queryParameter).then(cases => {
                this.pagedList = cases;
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

    searchByValueType(valueType: string) {

        if (valueType == this.queryParameter.valueType) {
            return;
        }
        this.valueType = valueType;
        this.queryParameter.valueType = valueType;
        this.useCaseSercice.getCaseList(1, this.queryParameter).then(cases => {
            this.pagedList = cases;
        });

    }
}
