/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Component, OnInit, AfterViewInit, ViewChild} from "@angular/core";
import {AppConfig} from "../app-config";
import {DataGovernanceService} from "./data-governance.service";
import {Value} from "../home/value";
import {Application} from "./application";
import {SelectComponent} from "ng2-select";
import {SystemNameResult} from "./SystemNameResult";
import {FlowCommand} from "./flow-command";
import {UserProfile} from "../user/user-profile";
import {FlowButton} from "./flow-button";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Modal} from "ngx-modal";
import {TaskResult} from "./task-result";
import {TaskQueryParameter} from "./task-query-parameter";


@Component({
    selector: 'content',
    templateUrl: 'data-governance-application.component.html'
})
export class DataGovernanceApplicationComponent implements OnInit, AfterViewInit {

    @ViewChild("systemNameSelect")
    private systemNameSelect: SelectComponent;

    @ViewChild("systemLocationSelect")
    private systemLocationSelect: SelectComponent;

    @ViewChild("commentsModal")
    private commentsModal: Modal;

    systemNamesSimple: Value[];
    dataTypes: Value[];
    systemLocations: Value[];
    application: Application;
    prevApplication: Application;
    systemNames: SystemNameResult[];
    selectedSystemNames: SystemNameResult[];
    prevSelectedSystemNames: SystemNameResult[];
    stepKey: string = "form-filling";
    flowButtons: FlowButton[];
    flowCommand: FlowCommand;
    taskId: string = "";
    clickedButton: string;
    tracking: TaskResult[];
    checkPreIconDisplay: boolean = false;
    form_readonly: boolean = true;

    constructor(private appConfig: AppConfig, private dgService: DataGovernanceService, private route: ActivatedRoute, private router: Router) {
        this.systemNamesSimple = [];
        this.systemNames = [];
        this.selectedSystemNames = [];
        this.prevSelectedSystemNames = [];
        this.dataTypes = [];
        this.systemLocations = [];
        this.application = new Application();
        this.prevApplication = new Application();
        this.flowButtons = [];
        this.flowCommand = new FlowCommand();
        this.tracking = [];
    }

    isApplicationValid(): boolean {
        return (this.application.systemNames.length > 0) && (this.application.systemLocations.length > 0);
    }

    ngOnInit(): void {
        this.dgService.listSystemNamesSimple().then(sns => this.systemNamesSimple = sns);
        this.dgService.listDataTypes().then(dts => this.dataTypes = dts);
        this.dgService.listSystemLocations().then(sls => this.systemLocations = sls);
        this.dgService.listSystemNames().then(sns => this.systemNames = sns);
        // approve application
        this.route.params.forEach((params: Params) => {
            this.taskId = params['taskId'];
        });

        if(this.taskId != null) {
            let parameter: TaskQueryParameter = new TaskQueryParameter();
            parameter.taskId = this.taskId;
            this.dgService.getTaskOne(parameter).then(task => {
                this.initPage(task);
            });
        } else { // submit application
            this.dgService.getFlowButtons(this.stepKey).then(fbs => {
                this.flowButtons = fbs.slice(0,1);
            });

            if(this.stepKey == "form-filling") {
                this.form_readonly = false;
                this.dgService.findSupervisor(UserProfile.getValue().userId).then(supervisor => this.flowCommand.supervisor = supervisor);
            }
        }
    }

    ngAfterViewInit(): void {
        this.initRequired();
    }

    initRequired() {
        if(!this.form_readonly) {
            var systemNameContainer = this.systemNameSelect.element.nativeElement.querySelector(".ui-select-container");
            if(this.application.systemNames.length <= 0) {
                systemNameContainer.className = "ui-select-container ng-invalid ui-select-multiple dropdown form-control open";
            } else {
                systemNameContainer.className = "ui-select-container ng-valid ui-select-multiple dropdown form-control open";
            }

            var systemLocationContainer = this.systemLocationSelect.element.nativeElement.querySelector(".ui-select-container");
            if(this.application.systemLocations.length <= 0) {
                systemLocationContainer.className = "ui-select-container ng-invalid ui-select-multiple dropdown form-control open";
            } else {
                systemLocationContainer.className = "ui-select-container ng-valid ui-select-multiple dropdown form-control open";
            }
        }
    }

    refreshSystemNames(values: any) {
        this.application.systemNames = values;
        this.initDataOwnerTable();

        var container = this.systemNameSelect.element.nativeElement.querySelector(".ui-select-container");
        if(values.length <= 0) {
            container.className = "ui-select-container ng-invalid ui-select-multiple dropdown form-control open";
        } else {
            container.className = "ui-select-container ng-valid ui-select-multiple dropdown form-control open";
        }
    }

    initDataOwnerTable() {
        this.selectedSystemNames = [];
        this.initDataOwnerTable2(this.selectedSystemNames, this.application.systemNames);
    }

    initPrevDataOwnerTable() {
        this.prevSelectedSystemNames = [];
        this.initDataOwnerTable2(this.prevSelectedSystemNames, this.prevApplication.systemNames);
    }

    initDataOwnerTable2(ssns: SystemNameResult[], sns: Value[]) {
        for(var j = 0; j < sns.length; j++) {
            let selected = sns[j];
            for(var i = 0; i < this.systemNames.length; i++) {
                let sn = this.systemNames[i];
                if(selected.id == sn.id) {
                    ssns.push(sn);
                }
            }
        }
    }

    refreshDataTypes(values: any) {
        this.application.dataTypes = values;
    }

    refreshSystemLocations(values: any) {
        this.application.systemLocations = values;
        var container = this.systemLocationSelect.element.nativeElement.querySelector(".ui-select-container");
        if(values.length <= 0) {
            container.className = "ui-select-container ng-invalid ui-select-multiple dropdown form-control open";
        } else {
            container.className = "ui-select-container ng-valid ui-select-multiple dropdown form-control open";
        }
    }

    changeCanTrack(value: boolean){
        if(this.form_readonly) return;
        this.application.canTrack = value;
    }

    changeCustomerConsentObtained() {
        if(this.form_readonly) return;
        this.application.customerConsentObtained = !this.application.customerConsentObtained;
    }

    changeAnonymous() {
        if(this.form_readonly) return;
        this.application.anonymous = !this.application.anonymous;
    }

    changeAggregated() {
        if(this.form_readonly) return;
        this.application.aggregated = !this.application.aggregated;
    }

    changeIPD(value: boolean) {
        if(this.form_readonly) return;
        this.application.ipd = value;
    }
    changeICD(value: boolean) {
        if(this.form_readonly) return;
        this.application.icd = value;
    }
    changeAAPTR(value: boolean) {
        if(this.form_readonly) return;
        this.application.aaptr = value;
    }
    changeAAAR(value: boolean) {
        if(this.form_readonly) return;
        this.application.aaar = value;
    }
    changeRfyud(value: boolean) {
        if(this.form_readonly) return;
        this.application.rfyud = value;
    }
    changeAtoc(value: boolean) {
        if(this.form_readonly) return;
        this.application.atoc = value;
    }

    //share with any other party
    changeNoShare() {
        if(this.form_readonly) return;
        this.application.noShare = !this.application.noShare;
    }
    changeYesForAffiliate() {
        if(this.form_readonly) return;
        this.application.yesForAffiliate = !this.application.yesForAffiliate;
    }
    changeYesForCustom() {
        if(this.form_readonly) return;
        this.application.yesForCustom = !this.application.yesForCustom;
    }

    //data transmitter
    changeTransmitByEmail() {
        if(this.form_readonly) return;
        this.application.transmitByEmail = !this.application.transmitByEmail;
    }
    changeTransmitByPM() {
        if(this.form_readonly) return;
        this.application.transmitByPM = !this.application.transmitByPM;
    }
    changeTransmitBySW() {
        if(this.form_readonly) return;
        this.application.transmitBySW = !this.application.transmitBySW;
    }
    changeTransmitByOther() {
        if(this.form_readonly) return;
        this.application.transmitByOther = !this.application.transmitByOther;
    }
    changeIngested(ingested: boolean) {
        if(this.form_readonly) return;
        this.application.ingested = ingested;
    }

    //security control
    changeSecurityWithEncryption() {
        if(this.form_readonly) return;
        this.application.securityWithEncryption = !this.application.securityWithEncryption;
    }
    changeSecurityWithSecureTransport() {
        if(this.form_readonly) return;
        this.application.securityWithSecureTransport = !this.application.securityWithSecureTransport;
    }
    changeSecurityWithOther() {
        if(this.form_readonly) return;
        this.application.securityWithOther = !this.application.securityWithOther;
    }

    executeFlowProcess(buttonName: string) {
        this.clickedButton = buttonName;
        if(this.stepKey == "form-filling") {
            this.submitFlowProcess(this.clickedButton);
        } else {
            this.commentsModal.open();
        }
    }

    submitFlowProcess(buttonName: string) {
        this.flowCommand.application = this.application;
        this.flowCommand.userId = UserProfile.getValue().userId;
        this.flowCommand.buttonName = buttonName;
        this.flowCommand.stepKey = this.stepKey;
        this.flowCommand.taskId = this.taskId;

        this.dgService.processFlow(this.flowCommand).then(() => {this.router.navigate(['/datagovernance/mytask'])});
    }

    initPage(task: TaskResult) {
        this.stepKey = task.stepKey;
        // after rejected
        if(this.stepKey == "form-filling") {
            this.form_readonly = false;
            this.dgService.findSupervisor(UserProfile.getValue().userId).then(supervisor => this.flowCommand.supervisor = supervisor);
        }

        if(task.updateTime == null) {
            this.dgService.getFlowButtons(this.stepKey).then(fbs => this.flowButtons = fbs);
        }

        this.dgService.getApplicationById(task.applicationFormId).then(a => {
            this.application = a;
            this.initRequired();
            this.initDataOwnerTable()
        });

        this.dgService.listFlowTracking(task.flowInstanceId).then(tk => this.tracking = tk);

        if(task.prevFormId != null) {
            this.dgService.getApplicationById(task.prevFormId).then(a2 => {
                this.prevApplication = a2;
                this.checkPreIconDisplay = true;
                this.initPrevDataOwnerTable();
            });
        }
    }
}
