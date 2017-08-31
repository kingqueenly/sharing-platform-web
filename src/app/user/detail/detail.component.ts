/**
 * Created by paulliu on 2016/12/7.
 */

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {validateEmail, validatePhone} from '../../common/custom-validators';
import {PagedList} from "../../home/pagedlist";
import {UseCaseService} from "../../case/use-case.service";
import {UserProfile} from "../user-profile";
import {QueryParameter} from "../../case/search/query-parameter";
import {UserLevel} from "../user-level";
import {SiteCaseResult} from "../../home/site-case-result";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../user.service";
import {AppConfig} from "../../app-config";
import {FileInfo} from "../../common/file-info";
import {Role} from "../../management/role";
import {RoleService} from "../../management/role.service";
import {BUService} from "../../management/bu.service";

@Component({
    selector: 'content',
    templateUrl: './detail.component.html'
})
export class DeatilComponent implements OnInit {
    customForm = new FormGroup({
        appellation: new FormControl('', [Validators.maxLength(20)]),
        username: new FormControl('', [Validators.maxLength(50)]),
        organization: new FormControl('', [Validators.maxLength(100)]),
        department: new FormControl('', [Validators.maxLength(100)]),
        workArea: new FormControl('', [Validators.maxLength(200)]),
        role: new FormControl('', [Validators.maxLength(50)]),
        professional: new FormControl('', [Validators.maxLength(200)]),
        email: new FormControl('', [validateEmail]),
        phone: new FormControl('', [validatePhone, Validators.maxLength(20)]),
        mobile: new FormControl('', [validatePhone, Validators.maxLength(20)])
    });
    createdCaseList: PagedList<SiteCaseResult>;
    likeCaseList: PagedList<SiteCaseResult>;
    queryParameter: QueryParameter = new QueryParameter(null, null);
    userProfile: UserProfile;
    levelRule: UserLevel[];
    filePath: string;
    loginUser: UserProfile;
    isUpdateUser: boolean = false;
    isUploadFinished: boolean = true;
    appellations: string[];
    organizations: string[];
    userSrc = new FileInfo();

    searchUserItems: string[];
    searchItem: string;
    inputValue: string;
    user: UserProfile;
    roleList: PagedList<Role>;

    skypeChat: SafeUrl;
    emailto: SafeUrl;
    deptList: string[];

    constructor(private buService: BUService, private domSanitizer: DomSanitizer, private useCaseSercice: UseCaseService, private route: ActivatedRoute, private userService: UserService, private appConfig: AppConfig, private router: Router, private roleService: RoleService) {
        this.createdCaseList = new PagedList<SiteCaseResult>();
        this.likeCaseList = new PagedList<SiteCaseResult>();
        this.userProfile = new UserProfile(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.levelRule = [];
        this.filePath = this.appConfig.filePath;
        this.searchUserItems = this.appConfig.searchUserItems;
        this.searchItem = this.searchUserItems[0];
        this.roleList = new PagedList<Role>();
        this.user = new UserProfile(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.appellations = this.appConfig.appellations;
        this.organizations = this.appConfig.organizations;
        this.deptList = [];
    }

    selectSearchItem(event, item): void {
        event.preventDefault();
        this.searchItem = item;
    }

    changeOrg() {
        this.deptList = this.findByOrg(this.user.organization);
        if (this.deptList.length > 0) {
            this.user.department = this.deptList[0];
            this.userProfile.department = this.deptList[0];
        }
    }

    findByOrg(org: string) {
        let depts: string[] = [];
        if (org == "BMBS") {
            depts = this.appConfig.BMBS;
        } else if (org == "DGRC") {
            depts = this.appConfig.DGRC
        } else if (org == "MBAFC") {
            depts = this.appConfig.MBAFC;
        } else if (org == "HQ") {
            depts = this.appConfig.HQ;
        }
        return depts;
    }

    ngOnInit(): void {
        this.loginUser = UserProfile.getValue();

        this.roleService.listRoles().then(roles => {
            this.roleList = roles;
        });

        this.route.params.forEach((params: Params) => {
            this.userService.getDetailUser(params['id']).then(user => {
                this.deptList = this.findByOrg(user.organization);
                let skypeChat = "javascript:void(0);";
                let emailto = "javascript:void(0);";
                if (user.email != null && user.email != "") {
                    skypeChat = "im:<sip:" + user.email + ">";
                    emailto = "mailto:" + user.email;
                }
                this.userProfile = user;
                this.skypeChat = this.domSanitizer.bypassSecurityTrustUrl(skypeChat);
                this.emailto = this.domSanitizer.bypassSecurityTrustUrl(emailto);
                this.userSrc.url = this.userProfile.imgUrl;
                this.user.id = this.userProfile.id;
                this.user.userId = this.userProfile.userId;
                this.user.appellation = this.userProfile.appellation;
                this.user.username = this.userProfile.username;
                this.user.organization = this.userProfile.organization;
                this.user.department = this.userProfile.department;
                this.user.imgUrl = this.userProfile.imgUrl;
                this.user.workArea = this.userProfile.workArea;
                this.user.professional = this.userProfile.professional;
                this.user.email = this.userProfile.email;
                this.user.phone = this.userProfile.phone;
                this.user.mobile = this.userProfile.mobile;
                this.user.score = this.userProfile.score;
                this.user.level = this.userProfile.level;
                this.user.role = this.userProfile.role;
                this.user.authority = this.userProfile.authority;
                this.user.isDCRemember = this.userProfile.isDCRemember;
            });
            this.queryParameter.createUserId = params['id'];
            this.useCaseSercice.getUserCreateCaseList(1, this.queryParameter).then(cases => {
                this.createdCaseList = cases;
            });
            this.queryParameter.createUserId = null;
            this.queryParameter.likeUserId = params['id'];
            this.useCaseSercice.getUserLikeCaseList(1, this.queryParameter).then(cases => {
                this.likeCaseList = cases;
            });
        });

        this.useCaseSercice.getScoreRule().then(userLevels => {
            this.levelRule = userLevels;
            // console.log(this.levelRule);
        });

    }

    editUser() {
        this.isUpdateUser = true;
    }

    cancelEditUser() {
        this.isUpdateUser = false;
        this.user.id = this.userProfile.id;
        this.user.userId = this.userProfile.userId;
        this.user.appellation = this.userProfile.appellation;
        this.user.username = this.userProfile.username;
        this.user.organization = this.userProfile.organization;
        this.user.department = this.userProfile.department;
        this.user.imgUrl = this.userProfile.imgUrl;
        this.user.workArea = this.userProfile.workArea;
        this.user.professional = this.userProfile.professional;
        this.user.email = this.userProfile.email;
        this.user.phone = this.userProfile.phone;
        this.user.mobile = this.userProfile.mobile;
        this.user.score = this.userProfile.score;
        this.user.level = this.userProfile.level;
        this.user.role = this.userProfile.role;
        this.user.authority = this.userProfile.authority;
        this.user.isDCRemember = this.userProfile.isDCRemember;
    }

    onSubmit() {

        if (this.user.appellation == undefined || this.user.appellation == null) {
            this.user.appellation = 'Mr.';
        }

        if (this.user.organization == undefined || this.user.organization == null) {
            this.user.organization = 'BMBS';
        }

        this.user.imgUrl = this.userSrc.url;
        if (this.user.imgUrl == 'assets/header.png') {
            this.user.imgUrl = '';
        }

        // if(this.user.role==undefined || this.user.role==null){
        //   this.user.role='pacemaker';
        // }

        this.userService.updateUser(this.user).then(() => {
            this.isUpdateUser = false;
            this.userProfile.id = this.user.id;
            this.userProfile.userId = this.user.userId;
            this.userProfile.appellation = this.user.appellation;
            this.userProfile.username = this.user.username;
            this.userProfile.organization = this.user.organization;
            this.userProfile.department = this.user.department;
            this.userProfile.imgUrl = this.user.imgUrl;
            this.userProfile.workArea = this.user.workArea;
            this.userProfile.professional = this.user.professional;
            this.userProfile.email = this.user.email;
            this.userProfile.phone = this.user.phone;
            this.userProfile.mobile = this.user.mobile;
            this.userProfile.score = this.user.score;
            this.userProfile.level = this.user.level;
            this.userProfile.role = this.user.role;
            this.userProfile.authority = this.user.authority;
            this.userProfile.isDCRemember = this.user.isDCRemember;
            if (this.loginUser.id == this.userProfile.id) {
                this.loginUser = this.userProfile;
                UserProfile.fromJsonObj(this.loginUser).setValue();
                this.userService.profileChanged.emit(this.loginUser);
            }
        });
    }

    uploadFinished($event) {
        this.isUploadFinished = $event;
        // console.log("upload:"+this.isUploadFinished);
    }

    searchUser() {
        if (this.inputValue == undefined || this.inputValue == null) {
            this.inputValue = '';
        }
        this.router.navigate(['/user/search', this.searchItem, this.inputValue]);

    }
}
