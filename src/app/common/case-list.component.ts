import {Component, OnInit, Input} from "@angular/core";
import {SiteCaseResult} from "../home/site-case-result";
import {AppConfig} from "../app-config";
import {PagedList} from "../home/pagedlist";

/**
 * Created by hongying.fu on 1/20/2017.
 */
@Component({
    selector: 'case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {
    @Input() pagedList: PagedList<SiteCaseResult>;
    @Input() valueType: string;

    constructor(private appConfig: AppConfig) {
    }

    ngOnInit(): void {
    }
}
