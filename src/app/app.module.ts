import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SimpleNotificationsModule, NotificationsService} from "angular2-notifications";
import {MyErrorHandler} from "./common/my-error-handler";
import {ReactiveFormsModule} from '@angular/forms';
import {AppConfig} from "./app-config";
import {AppRoutingModule}     from './app-routing.module';
import {SelectModule}  from 'ng2-select';
import {ProgressbarModule, TabsModule} from 'ng2-bootstrap';
import {BsDropdownModule} from "ng2-bootstrap/dropdown";
import {PaginationModule} from 'ng2-bootstrap/pagination';
import {AccordionModule} from 'ng2-accordion';
import {FileUploadModule} from "ng2-file-upload";
import {Ng2DatetimePickerModule} from 'ng2-datetime-picker';
import {ModalModule} from "ngx-modal";
import {MomentModule} from "angular2-moment";
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {FileUploadComponent} from "./common/file-upload.component";
import {AppComponent} from './app.component';
import {DashboardComponent}   from './home/dashboard.component';
import {ImageComponent} from "./common/image.component";
import {DetailComponent}   from './case/detail/detail.component';
import {EditCaseComponent} from "./case/edit/edit-case.component";
import {DeatilComponent} from "./user/detail/detail.component";
import {ListSearchComponent} from "./case/search/list-search.component";
import {ListSearchUseCaseComponent} from "./case/search/list-search-usecase.component";
import {UserMoreComponent} from "./case/my/user-more.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CaseComponent} from "./case/case.component";
import {ManagementComponent} from "./management/management.component";
import {UserManagementComponent} from "./management/user-management.component";
import {ValueManagementComponent} from "./management/value-management.component";
import {BuManagementComponent} from "./management/bu-management.component";
import {KeyvaluesComponent} from "./management/keyvalues.component";
import {ChartComponent} from "./chart/chart.component";
import {Management2Component} from "./management/management2.component";
import {ManagementLoginComponent} from "./management/management-login.component";
import {StatisticsComponent} from "./home/statistics.component";
import {CaseStageComponent} from "./common/case-stage.componet";
import {UserLevelComponent} from "./common/user-level.component";
import {CaseListComponent} from "./common/case-list.component";
import {ContributionBuListSearchComponent} from "./case/search/contributionbu-list-search.component";
import {DataSourceManagementComponent} from "./management/data-source-management.component";
import {DataAnalysisModelManagementComponent} from "./management/data-analysis-model-management.component";

import {HttpService} from "./common/http.service";
import {AuthGuard} from "./user/auth-guard";
import {AuthManagementGuard} from "./user/auth-management-guard";
import {UseCaseService} from './case/use-case.service';
import {AuthService} from "./user/auth.service";
import {PubSubService} from "./common/event/pub-sub.service";
import {PageTransition} from "./common/page-transition";
import {UserService} from "./user/user.service";
import {AuthorityService} from "./user/authority.service";
import {BUService} from "./management/bu.service";
import {StatisticsService} from "./home/statistics.service";
import {ValueService} from "./management/value.service";
import {DataSourceService} from "./management/data.source.service";
import {DataAnalysisModelService} from "./management/data.analysis.model.service";
import {ChartService} from "./chart/chart.service";
import {ShopFloorComponent} from "./home/shopfloor.component";
import {PhaseStageListSearchComponent} from "./case/search/phase-stage-list-search.component";
import {SingleFileUploadComponent} from "./common/single-file-upload.component";
import {ListUserSearchComponent} from "./user/list/list-user-search.component";
import {UserListComponent} from "./user/list/user-list.component";
import {RoleService} from "./management/role.service";
import {RoleManagementComponent} from "./management/role-management.component";
import {DataCommunityComponent} from "./user/datacommunity/data-community.component";
import {UserComponent} from "./user/user.component";
import {UsecaseManagementComponent} from "./management/usecase-management.component";
import {UsecaseListManagementComponent} from "./management/usecase-list-management.component";
import {P404Component} from "./common/404.component";
import {P500Component} from "./common/500.component";

import {FAQService} from "./faq/faq.service";
import {FAQComponent} from "./faq/faq.component";
import {FAQNeedHelpComponent} from "./faq/faq-needhelp.component";
import {FAQMyQuestionComponent} from "./faq/faq-my-question.component";
import {FAQQuestionDetailComponent} from "./faq/faq-question-detail.component";
import {FAQQuestionBackendComponent} from "./faq/faq-question-backend.component";

import {DataGovernanceService} from './datagovernance/data-governance.service';
import {DataGovernanceComponent} from './datagovernance/data-governance.component';
import {DataGovernancePolicyComponent} from './datagovernance/data-governance-policy.component';
import {DataGovernanceApplicationComponent} from './datagovernance/data-governance-application.component';
import {DataGovernanceMyApplicationComponent} from './datagovernance/data-governance-my-application.component';
import {DataGovernanceMyTaskComponent} from './datagovernance/data-governance-my-task.component';

@NgModule({
    declarations: [
        PageTransition,
        AppComponent,
        LoginComponent,
        HomeComponent,
        CaseComponent,
        FileUploadComponent,
        ImageComponent,
        ChartComponent,
        DashboardComponent,
        DataGovernanceComponent,
        DataGovernancePolicyComponent,
        DataGovernanceApplicationComponent,
        DataGovernanceMyApplicationComponent,
        DataGovernanceMyTaskComponent,
        DetailComponent,
        EditCaseComponent,
        DeatilComponent,
        ListUserSearchComponent,
        UserListComponent,
        ListSearchComponent,
        ListSearchUseCaseComponent,
        UserMoreComponent,
        Management2Component,
        ManagementComponent,
        ManagementLoginComponent,
        UserManagementComponent,
        ValueManagementComponent,
        BuManagementComponent,
        KeyvaluesComponent,
        StatisticsComponent,
        CaseStageComponent,
        UserLevelComponent,
        CaseListComponent,
        ContributionBuListSearchComponent,
        DataSourceManagementComponent,
        DataAnalysisModelManagementComponent,
        ShopFloorComponent,
        PhaseStageListSearchComponent,
        SingleFileUploadComponent,
        RoleManagementComponent,
        DataCommunityComponent,
        UserComponent,
        UsecaseManagementComponent,
        UsecaseListManagementComponent,
        P404Component,
        P500Component,
        FAQComponent,
        FAQMyQuestionComponent,
        FAQNeedHelpComponent,
        FAQQuestionDetailComponent,
        FAQQuestionBackendComponent
    ],
    providers: [{
        provide: ErrorHandler,
        useClass: MyErrorHandler
    }, NotificationsService,
        AuthGuard,
        AuthManagementGuard,
        AppConfig,
        HttpService,
        AuthService,
        PubSubService,
        UseCaseService,
        UserService,
        FAQService,
        DataGovernanceService,
        AuthorityService,
        BUService,
        StatisticsService,
        ValueService,
        DataSourceService,
        DataAnalysisModelService,
        ChartService,
        RoleService],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        SimpleNotificationsModule,
        FileUploadModule,
        SelectModule,
        Ng2DatetimePickerModule,
        ProgressbarModule,
        BsDropdownModule.forRoot(),
        AccordionModule,
        TabsModule,
        ModalModule,
        ChartsModule,
        MomentModule,
        PaginationModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
