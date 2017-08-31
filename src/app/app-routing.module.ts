/**
 * Created by paulliu on 2016/12/7.
 */

import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from "./user/auth-guard";
import {DashboardComponent}   from './home/dashboard.component';
import {DataGovernanceComponent} from './datagovernance/data-governance.component';
import {DataGovernancePolicyComponent} from './datagovernance/data-governance-policy.component';
import {DataGovernanceApplicationComponent} from './datagovernance/data-governance-application.component';
import {DataGovernanceMyApplicationComponent} from './datagovernance/data-governance-my-application.component';
import {DataGovernanceMyTaskComponent} from './datagovernance/data-governance-my-task.component';
import {DetailComponent}   from './case/detail/detail.component';
import {EditCaseComponent} from "./case/edit/edit-case.component";
import {DeatilComponent} from "./user/detail/detail.component";
import {ListSearchComponent} from "./case/search/list-search.component";
import {ListSearchUseCaseComponent} from "./case/search/list-search-usecase.component";
import {UserMoreComponent} from "./case/my/user-more.component";
import {HomeComponent} from "./home/home.component";
import {CaseComponent} from "./case/case.component";
import {ManagementComponent} from "./management/management.component";
import {UserManagementComponent} from "./management/user-management.component";
import {UsecaseManagementComponent} from "./management/usecase-management.component";
import {UsecaseListManagementComponent} from "./management/usecase-list-management.component";
import {ValueManagementComponent} from "./management/value-management.component";
import {BuManagementComponent} from "./management/bu-management.component";
import {AuthManagementGuard} from "./user/auth-management-guard";
import {KeyvaluesComponent} from "./management/keyvalues.component";
import {Management2Component} from "./management/management2.component";
import {ContributionBuListSearchComponent} from "./case/search/contributionbu-list-search.component";
import {DataSourceManagementComponent} from "./management/data-source-management.component";
import {DataAnalysisModelManagementComponent} from "./management/data-analysis-model-management.component";
import {PhaseStageListSearchComponent} from "./case/search/phase-stage-list-search.component";
import {ListUserSearchComponent} from "./user/list/list-user-search.component";
import {RoleManagementComponent} from "./management/role-management.component";
import {DataCommunityComponent} from "./user/datacommunity/data-community.component";
import {UserComponent} from "./user/user.component";
import {P404Component} from "./common/404.component";
import {P500Component} from "./common/500.component";
import {buildPath} from "selenium-webdriver/http";

import {FAQComponent} from "./faq/faq.component";
import {FAQNeedHelpComponent} from "./faq/faq-needhelp.component";
import {FAQMyQuestionComponent} from "./faq/faq-my-question.component";
import {FAQQuestionDetailComponent} from "./faq/faq-question-detail.component";
import {FAQQuestionBackendComponent} from "./faq/faq-question-backend.component";


const routes: Routes =
    [
        // {path: 'home', redirectTo: 'home', pathMatch: 'full'},
        // {path: 'login', component: LoginComponent},
        {path: 'home', redirectTo: 'shopfloor', pathMatch: 'full'},
        {
            path: '', component: HomeComponent,
            children: [
                {path: '', redirectTo: 'shopfloor', pathMatch: 'full'},
                {path: 'shopfloor', component: DashboardComponent},
                {
                    path: 'datagovernance', component: DataGovernanceComponent,
                    children: [
                        {path: 'policy', component: DataGovernancePolicyComponent},
                        {path: 'policy/application', component: DataGovernanceApplicationComponent},
                        {path: 'flow-process/:taskId', component: DataGovernanceApplicationComponent},
                        {path: 'myapplication', component: DataGovernanceMyApplicationComponent},
                        {path: 'mytask', component: DataGovernanceMyTaskComponent}
                    ]
                },
                {
                    path: 'case', component: CaseComponent,
                    children: [
                        {path: '', redirectTo: 'search/1', pathMatch: 'full'},
                        {path: 'create', component: EditCaseComponent},
                        {path: 'edit/:id', component: EditCaseComponent},
                        {path: 'clone/:id', component: EditCaseComponent},
                        {path: 'detail/:id', component: DetailComponent},
                        {path: 'search/:valueType/:subject', component: ListSearchComponent},
                        {path: 'search/:valueType', component: ListSearchComponent},
                        {path: 'search/:objective/:company/:dept/:stage', component: ListSearchUseCaseComponent},
                        {path: 'my/:type/:id', component: UserMoreComponent},
                        {path: 'contributionBU/:type', component: ContributionBuListSearchComponent},
                        {path: 'phase/:phase/:stage', component: PhaseStageListSearchComponent},
                        {path: 'phase/:phase', component: PhaseStageListSearchComponent},
                        {path: 'stage/:stage', component: PhaseStageListSearchComponent}
                    ]
                },
                {
                    path: 'user', component: UserComponent,
                    children: [
                        {path: '', redirectTo: 'community', pathMatch: 'full'},
                        {path: 'detail/:id', component: DeatilComponent},
                        {path: 'search/:item/:inputValue', component: ListUserSearchComponent},
                        {path: 'search/:item', component: ListUserSearchComponent},
                        {path: 'community', component: DataCommunityComponent}
                    ]
                },
                {
                    path: 'faq', component: FAQComponent,
                    children: [
                        {path: 'needhelp', component: FAQNeedHelpComponent},
                        {path: 'myquestion', component: FAQMyQuestionComponent},
                        {path: 'question/:id', component: FAQQuestionDetailComponent},
                    ]
                },
                {path: '404', component: P404Component},
                {path: '500', component: P500Component}
                // {path: 'user/:id', component: DeatilComponent},
                // {path: 'user/search/:item/:inputValue', component: ListUserSearchComponent},
                // {path: 'user/search/:item', component: ListUserSearchComponent},
                // {path: 'user/community', component: DataCommunityComponent}
            ],
            canActivate: [AuthGuard]
        },
        {
            path: 'management', component: Management2Component,
            children: [
                {path: '', redirectTo: 'panel', pathMatch: 'full'},
                // {path: 'login', component: ManagementLoginComponent},
                {
                    path: 'panel', component: ManagementComponent,
                    children: [
                        {path: '', redirectTo: 'user', pathMatch: 'full'},
                        {path: 'user', component: UserManagementComponent},
                        {path: 'feedback', component: FAQQuestionBackendComponent},
                        {path: 'feedback/detail/:id', component: FAQQuestionDetailComponent},
                        {
                            path: 'keyvalues', component: KeyvaluesComponent,
                            children: [
                                {path: '', redirectTo: 'bu', pathMatch: 'full'},
                                {path: 'bu', component: BuManagementComponent},
                                {path: 'value', component: ValueManagementComponent},
                                {path: 'dataSource', component: DataSourceManagementComponent},
                                {path: 'dataAnalysisModel', component: DataAnalysisModelManagementComponent},
                                {path: 'role', component: RoleManagementComponent}
                            ]
                        },
                        {
                            path: "usecase", component: UsecaseManagementComponent,
                            children: [
                                {path: "", redirectTo: "list", pathMatch: 'full'},
                                {path: "list", component: UsecaseListManagementComponent},
                                {path: 'edit/:id', component: EditCaseComponent}
                            ]
                        }
                    ],
                    canActivate: [AuthManagementGuard]
                }
            ]
        }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
