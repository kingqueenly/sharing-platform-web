/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {AppConfig} from "../app-config";
import {DataGovernanceService} from "./data-governance.service";
import {TaskQueryParameter} from "./task-query-parameter";
import {TaskResult} from "./task-result";
import {PagedList} from "../home/pagedlist";
import {Profile} from "selenium-webdriver/firefox";
import {UserProfile} from "../user/user-profile";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'content',
    templateUrl: 'data-governance-my-task.component.html'
})
export class DataGovernanceMyTaskComponent implements OnInit {

    pagedTasks: PagedList<TaskResult>;
    taskType: string = "in process";

    constructor(private appConfig: AppConfig, private dgService: DataGovernanceService, private _activatedRoute: ActivatedRoute) {
        this.pagedTasks = new PagedList<TaskResult>();
    }

    ngOnInit(): void {
        console.log("tasks inited");
        this.displayPage(1);
    }

    filterTasks(taskType: string) {
        this.taskType = taskType;
        this.displayPage(1);
    }

    public pageChanged(event: any): void {
        this.displayPage(event.page);
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }

    displayPage(pageNum: number) {
        let parameter: TaskQueryParameter = new TaskQueryParameter();
        parameter.status = this.taskType;
        parameter.userId = UserProfile.getValue().userId;
        this.dgService.getTasks(pageNum, parameter).then(p => this.pagedTasks = p);
    }
}
