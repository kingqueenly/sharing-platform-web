/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {AppConfig} from "../app-config";
import {DataGovernanceService} from "./data-governance.service";
import {PagedList} from "../home/pagedlist";
import {FlowInstanceResult} from "./flow-instance-result";
import {FlowInstanceQueryParameter} from "./flow-instance-query-parameter";
import {UserProfile} from "../user/user-profile";
import {TaskQueryParameter} from "./task-query-parameter";
import {Router} from "@angular/router";

@Component({
    selector: 'content',
    templateUrl: 'data-governance-my-application.component.html'
})
export class DataGovernanceMyApplicationComponent implements OnInit {

    pagedApplication: PagedList<FlowInstanceResult>;

    constructor(private appConfig: AppConfig, private dgService: DataGovernanceService, private router: Router) {
        this.pagedApplication = new PagedList<FlowInstanceResult>();
    }

    ngOnInit(): void {
        this.displayPage(1);
    }

    public pageChanged(event: any): void {
        this.displayPage(event.page);
    }

    displayPage(pageNum: number) {
        let parameter: FlowInstanceQueryParameter = new FlowInstanceQueryParameter();
        parameter.applicant = UserProfile.getValue().userId;
        this.dgService.listFlowInstances(pageNum, parameter).then(as => this.pagedApplication = as);
    }

    getTask(instance: FlowInstanceResult){
        let parameter: TaskQueryParameter = new TaskQueryParameter();
        parameter.flowInstanceId = instance.id;
        parameter.userId = instance.applicant;
        this.dgService.getTaskOne(parameter).then(task => {
            this.router.navigate(['/datagovernance/flow-process/', task.id]);
        });
    }
}
