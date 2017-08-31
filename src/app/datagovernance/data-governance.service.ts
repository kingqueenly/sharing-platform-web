/**
 * Created by AMC on 2017/6/28.
 */

import {Injectable}    from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {Value} from "../home/value";
import {SystemNameResult} from "./SystemNameResult";
import {Application} from "./application";
import {FlowCommand} from "./flow-command";
import {FlowButton} from "./flow-button";
import {TaskQueryParameter} from "./task-query-parameter";
import {TaskResult} from "./task-result";
import {FlowInstanceQueryParameter} from "./flow-instance-query-parameter";
import {FlowInstanceResult} from "./flow-instance-result";
import {Task} from "protractor/built/taskScheduler";

@Injectable()
export class DataGovernanceService {

    private listSystemNamesSimpleUrl = "/datagovernance/systemnames";
    private listSystemNamesUrl = "/datagovernance/systemnameconfig";
    private listDataTypesUrl = "/datagovernance/datatypes";
    private listSystemLocationsUrl = "/datagovernance/systemlocations";
    private createApplicationUrl = "/datagovernance/datausageapplication/create";
    private getApplicationByIdUrl = "/datagovernance/datausageapplication/";
    private processFlowUrl = "/datagovernance/flowengine";
    private getFlowButtonsUrl = "/datagovernance/flowengine/flowbuttons/";
    private getTasksUrl = "/datagovernance/flowengine/tasks/";
    private getTaskOneUrl = "/datagovernance/flowengine/task";
    private listFlowInstancesUrl = "/datagovernance/flowengine/instances/";
    private findSupervisorUrl = "/datagovernance/flowengine/supervisor/";
    private listFlowTrackingUrl = "/datagovernance/flowengine/instance/{flowInstanceId}/tracking";

    constructor(private httpHelper: HttpService) {

    }

    listFlowTracking(flowInstanceId: string): Promise<TaskResult[]> {
        return this.httpHelper.get(this.listFlowTrackingUrl.replace("{flowInstanceId}",flowInstanceId));
    }

    findSupervisor(applicant: string): Promise<string> {
        return this.httpHelper.get(this.findSupervisorUrl + applicant);
    }

    listFlowInstances(pageNo: number = 1, parameter: FlowInstanceQueryParameter): Promise<PagedList<FlowInstanceResult>>  {
        return this.httpHelper.post(this.listFlowInstancesUrl + pageNo, parameter);
    }

    getTaskOne(parameter: TaskQueryParameter): Promise<TaskResult> {
        return this.httpHelper.post(this.getTaskOneUrl, parameter);
    }

    getTasks(pageNo: number = 1, paramter: TaskQueryParameter): Promise<PagedList<TaskResult>> {
        return this.httpHelper.post(this.getTasksUrl + pageNo, paramter);
    }

    getFlowButtons(stepKey: string): Promise<FlowButton[]> {
        return this.httpHelper.get(this.getFlowButtonsUrl + stepKey);
    }

    processFlow(flowCommand: FlowCommand): Promise<void> {
        return this.httpHelper.post(this.processFlowUrl, flowCommand);
    }

    getApplicationById(id: string): Promise<Application> {
        return this.httpHelper.get(this.getApplicationByIdUrl + id);
    }

    createApplication(application: Application): Promise<void> {
        return this.httpHelper.post(this.createApplicationUrl, application);
    }

    listSystemNamesSimple(): Promise<Value[]> {
        return this.httpHelper.get(this.listSystemNamesSimpleUrl);
    }

    listSystemNames(): Promise<SystemNameResult[]> {
        return this.httpHelper.get(this.listSystemNamesUrl);
    }

    listDataTypes(): Promise<Value[]> {
        return this.httpHelper.get(this.listDataTypesUrl);
    }

    listSystemLocations(): Promise<Value[]> {
        return this.httpHelper.get(this.listSystemLocationsUrl);
    }
}
