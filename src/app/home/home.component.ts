/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Component, OnInit} from "@angular/core";
import {UserProfile} from "../user/user-profile";
import {AppConfig} from "../app-config";
import {BU} from "../management/bu";
import {BUService} from "../management/bu.service";
import {PagedList} from "./pagedlist";
import {ValueService} from "../management/value.service";
import {Value} from "../management/value";
import {Router} from "@angular/router";
import {AuthService} from "../user/auth.service";
import {UserService} from "../user/user.service";

@Component({
    selector: 'content',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    showSidebar = true;
    sidebarStyle;
    mainContentStyle;
    showObjective = false;
    showCompany = false;

    userProfile: UserProfile;
    buList: PagedList<BU>;
    valueList: PagedList<Value>;
    searchInputValue: string = "";
    // filePath='/filePath';
    filePath: string;
    companyListHome: string[];

    constructor(private buService: BUService, private valueService: ValueService, private appConfig: AppConfig, private router: Router, private authService: AuthService, private userService: UserService) {
        this.userProfile = UserProfile.getValue();
        this.userService.profileChanged.subscribe((newProfile: UserProfile)=>{
            this.userProfile = newProfile;
        });
        this.buList = new PagedList<BU>();
        this.valueList = new PagedList<Value>();
        this.filePath = this.appConfig.filePath;
        this.companyListHome = this.appConfig.companiesForQuery;
    }

    ngOnInit(): void {
        this.valueService.listValues().then(values => {
            this.valueList = values;
        });

        this.buService.listBUs().then(bus => {
            this.buList = bus;
        });
    }

    toggleSidebar() {

        this.showSidebar = !this.showSidebar;

        if (!this.showSidebar) {
            this.sidebarStyle = {
                'margin-left': '-240px'
            };
            this.mainContentStyle = {
                'margin-left': '0'
            };
        }
        else {
            this.sidebarStyle = {};
            this.mainContentStyle = {};
        }
    }

    toggleObjective() {
        this.showObjective = !this.showObjective;
    }

    toggleCompany() {
        this.showCompany = !this.showCompany;
    }

    onEnter() {
        console.log("Header search begin ...");
        if (this.searchInputValue == undefined || this.searchInputValue == null) {
            this.searchInputValue = '';
        }
        this.router.navigate(['/case/search', 'All', this.searchInputValue]);
        //this.searchInputValue = '';
    }

    logOut() {
        this.authService.logout();
        window.location.assign("https://login.i.daimler.com/internet/logout");
        // this.router.navigate(['/login']);
    }
}
