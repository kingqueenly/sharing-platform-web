/**
 * Created by paulliu on 2016/12/7.
 */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {UseCaseService} from "../use-case.service";
import {SiteCaseResult} from "../../home/site-case-result";
import {Value} from "../../home/value";
import {isNullOrUndefined} from "util";
import {AppConfig} from "../../app-config";
import {BUService} from "../../management/bu.service";
import {PagedList} from "../../home/pagedlist";
import {BU} from "../../management/bu";
import {NotificationsService} from "angular2-notifications";
import {ValueService} from "../../management/value.service";
import {DataSourceService} from "../../management/data.source.service";
import {DataSource} from "../../management/data-source";
import {DataAnalysisModelService} from "../../management/data.analysis.model.service";
import {UserProfile} from "../../user/user-profile";

@Component({
    selector: 'content',
    templateUrl: './edit-case.component.html'
})
export class EditCaseComponent implements OnInit, OnDestroy {
    idFromRoute: string;
    siteCase: SiteCaseResult;
    values: Value[];
    dataSource: DataSource[];
    dataAnalysisModel: Value[];
    step: number = 1;

    active = true;
    contribution_BU_S = new PagedList<BU>();
    stages: string[];
    private sub: any;
    isClone: boolean = false;
    caseUrl: string = "";
    private baseUrl: string;
    isEdit: boolean = false;
    isCreate: boolean = true;
    timelineFor: string = "";

    submitBtnText: string = "Submit";
    processing: boolean = false;
    isUploadFinished: boolean = true;
    userInfo: UserProfile;
    phases: string[];

    selectedPhases: Value[];
    selectedStages: Value[];
    showModelOthers: boolean = false;
    showDataSourceOthers: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private useCaseSercice: UseCaseService, private buService: BUService, private appConfig: AppConfig, private notificationsService: NotificationsService, private valueService: ValueService, private dataSourceService: DataSourceService, private dataAnalysisModelService: DataAnalysisModelService) {
        this.baseUrl = this.appConfig.baseUrl;
        this.stages = this.appConfig.stages;
        this.selectedPhases = [];
        this.selectedStages = [];

        this.siteCase = new SiteCaseResult();
        this.siteCase.attachments = [];
        this.siteCase.implMethodResultFiles = [];
        this.siteCase.dataSource = [];
        this.siteCase.dataTypeDescription = "";
        this.siteCase.dataAnalysisModel = [];
        this.siteCase.analysisMethodResultText = "";
        this.siteCase.analysisMethodResultFiles = [];
        this.siteCase.validationMethodResultText = "";
        this.siteCase.validationMethodResultFiles = [];
        this.siteCase.implMethodResultText = "";
    }

    changeStage(event) {
        this.timelineFor = this.getTimelineFor(this.siteCase.stage);
    }

    getTimelineFor(stage) {
        let tf: string = "";
        if (stage == "Concept") {
            tf = "'Concept'";
        } else if (stage == "Analysis") {
            tf = "'Concept + Analysis'";
        } else if (stage == "Validation") {
            tf = "'Concept + Analysis + Validation'";
        } else if (stage == "Implementation") {
            tf = "'Concept + Analysis + Validation + Implementation'";
        }
        return tf;
    }

    ngOnInit() {

        if (this.isCreate) {
            this.timelineFor = "'Concept'";
        }

        this.phases = this.appConfig.phases;
        this.userInfo = UserProfile.getValue();
        let date = new Date();
        this.siteCase.fromDate = date.getFullYear() + "-" + (Number(date.getMonth()) + 1) + "-" + date.getDate();
        this.caseUrl = this.baseUrl + this.router.url.replace('clone', 'detail');


        this.isClone = this.router.url.includes("clone");
        this.isEdit = this.router.url.includes("edit");
        if (this.isClone || this.isEdit) {
            this.isCreate = false;
        }
        this.sub = this.route.params.subscribe(params => {
            this.idFromRoute = params['id'];
        });

        this.buService.listBUs().then(bus => this.contribution_BU_S = bus);

        this.valueService.listValues().then(values => {
            this.values = values.list;
        });

        this.dataSourceService.listDataSources().then(values => {
            this.dataSource = values.list;
        });
        this.dataAnalysisModelService.listDataAnalysisModels().then(values => {
            this.dataAnalysisModel = values.list;
        });

        if (isNullOrUndefined(this.idFromRoute)) {
            return;
        }

        this.route.params
            .switchMap((params: Params) => this.useCaseSercice.getDetail(params['id']))
            .subscribe(siteCase => {
                this.siteCase = siteCase;
                this.timelineFor = this.getTimelineFor(siteCase.stage);

                if (siteCase.dataAnalysisModelOther != null && siteCase.dataAnalysisModelOther.length > 0) {
                    this.showModelOthers = true;
                }

                if(siteCase.dataSourceOther != null && siteCase.dataSourceOther.length > 0) {
                    this.showDataSourceOthers = true;
                }

                let phaseOption: Value = new Value(siteCase.phase, siteCase.phase);
                this.selectedPhases.push(phaseOption);

                let stageOption: Value = new Value(siteCase.stage, siteCase.stage);
                this.selectedStages.push(stageOption);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    step1() {
        this.step = 1;
        this.timelineFor = "'Concept'";
    }

    step2() {
        this.step = 2;
        this.timelineFor = "'Concept + Analysis'";
    }

    step3() {
        this.step = 3;
        this.timelineFor = "'Concept + Analysis + Validation'"
    }

    step4() {
        this.step = 4;
        this.timelineFor = "'Concept + Analysis + Validation + Implementation'";
    }

    refreshValue(values: any) {
        this.siteCase.values = values;
    }

    refreshPhase(phaseOption: any) {
        this.siteCase.phase = phaseOption.text;
    }

    refreshStage(stageOption: any) {
        this.siteCase.stage = stageOption.text;
        this.timelineFor = this.getTimelineFor(this.siteCase.stage);
    }

    dataSourceValue(values: any) {
        this.siteCase.dataSource = values;
    }

    dataAnalysisModelValue(values: any) {
        this.siteCase.dataAnalysisModel = values;
    }

    dataAnalysisModelRemoved(model: any) {
        if (model.text == "Others") {
            this.siteCase.dataAnalysisModelOther = "";
            this.showModelOthers = false;
        }
    }

    dataAnalysisModelSelected(model: any) {
        if (model.text == "Others") {
            this.showModelOthers = true;
        }
    }

    dataSourceRemoved(source: any) {
        if (source.text == "Others") {
            this.siteCase.dataSourceOther = "";
            this.showDataSourceOthers = false;
        }
    }

    dataSourceSelected(source: any) {
        if (source.text == "Others") {
            this.showDataSourceOthers = true;
        }
    }

    contributionbuValue(contributionBU: any) {
        //console.log(contributionBU.length);
        let selected: BU[] = [];
        for (let j = 0; j < this.contribution_BU_S.list.length; j++) {
            let bu: BU = this.contribution_BU_S.list[j];
            //console.log(bu.id);
            for (let i = 0; i < contributionBU.length; i++) {
                let id: string = contributionBU[i].id;
                //console.log(id);
                if (bu.id == id) {
                    //console.log(bu.text);
                    selected.push(bu);
                }
            }
        }
        this.siteCase.contributionBU = selected;
    }

    setSubmitBtnStatus(processing: boolean) {
        if (processing) {
            this.submitBtnText = "Process...";
            this.processing = processing;
        } else {
            this.submitBtnText = "Submit";
            this.processing = false;
        }
    }

    onSubmit() {
        this.setSubmitBtnStatus(true);

        if (this.siteCase.subject != null && this.siteCase.subject.length > 255) {
            this.notificationsService.info("error", "Input text length is too long");
            this.setSubmitBtnStatus(false);
            return;
        }
        if (this.siteCase.values == null || this.siteCase.values.length == 0) {
            this.notificationsService.info("error", "Objective is necessary");
            this.setSubmitBtnStatus(false);
            return;
        }
        if (this.siteCase.phase == null || this.siteCase.phase == '') {
            this.notificationsService.info("error", "Category of Use Case is necessary");
            this.setSubmitBtnStatus(false);
            return;
        }
        if (this.siteCase.scenario != null && this.siteCase.scenario.length > 2000) {
            this.setSubmitBtnStatus(false);
            this.notificationsService.info("error", "Input text length is too long");
            return;
        }
        if (this.siteCase.dataTypeDescription != null && this.siteCase.dataTypeDescription.length > 2000) {
            this.setSubmitBtnStatus(false);
            this.notificationsService.info("error", "Input text length is too long");
            return;
        }
        if (this.siteCase.analysisMethodResultText != null && this.siteCase.analysisMethodResultText.length > 2000) {
            this.notificationsService.info("error", "Input text length is too long");
            this.setSubmitBtnStatus(false);
            return;
        }
        if (this.siteCase.validationMethodResultText != null && this.siteCase.validationMethodResultText.length > 2000) {
            this.notificationsService.info("error", "Input text length is too long");
            this.setSubmitBtnStatus(false);
            return;
        }
        if (this.siteCase.implMethodResultText != null && this.siteCase.implMethodResultText.length > 2000) {
            this.notificationsService.info("error", "Input text length is too long");
            this.setSubmitBtnStatus(false);
            return;
        }
        if (this.siteCase.fromDate >= this.siteCase.toDate) {
            this.notificationsService.info("error", "from date > to date");
            this.setSubmitBtnStatus(false);
            return;
        }
        if (this.siteCase.needHelp != null && this.siteCase.needHelp.length > 2000) {
            this.notificationsService.info("error", "Input text length is too long");
            this.setSubmitBtnStatus(false);
            return;
        }

        console.log(this.router.url);
        console.log(this.router.url.indexOf("management"));
        if (this.siteCase.id == null) {
            if (this.step == 1) {
                this.siteCase.stage = 'Concept';
            } else if (this.step == 2) {
                this.siteCase.stage = 'Analysis';
            } else if (this.step == 3) {
                this.siteCase.stage = 'Validation';
            } else if (this.step == 4) {
                this.siteCase.stage = 'Implementation';
            }
            // console.log(this.siteCase);
            this.useCaseSercice.createCase(this.siteCase).then(() => this.router.navigate(['/case/my', 'userCreateCase', this.userInfo.id]));
        }
        else {
            if (this.isClone) {
                this.siteCase.id = '';
                this.siteCase.referenceCase = this.caseUrl;
                // console.log(this.siteCase);
                this.useCaseSercice.createCase(this.siteCase).then(() => this.router.navigate(['/case/my', 'userCreateCase', this.userInfo.id]));
            } else {
                // console.log(this.siteCase);
                this.useCaseSercice.updateCase(this.siteCase).then(() => {
                        if (this.router.url.indexOf("management") > 0) {
                            this.router.navigate(['/management/panel/usecase/list']);
                        } else {
                            this.router.navigate(['/case/detail/', this.siteCase.id]);
                        }
                    }
                );

            }
        }
    }

    uploadFinished($event) {
        this.isUploadFinished = $event;
        // console.log("upload:"+this.isUploadFinished);
    }
}
