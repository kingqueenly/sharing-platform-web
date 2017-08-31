/**
 * Created by paulliu on 2016/12/7.
 */

import {Component, OnInit} from '@angular/core';
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
import {Organization} from "./organization";
import {UserParameter} from "../user-parameter";

@Component({
  selector: 'content',
  templateUrl: './data-community.component.html'
})
export class DataCommunityComponent implements OnInit {

  searchUserItems: string[];
  searchItem: string;
  inputValue: string;
  selectedRole: string = "All";
  roleList: PagedList<Role>;
  condition = new UserParameter();
  organizationList: Organization[];
  BMBSOrganization: Organization;
  DGRCOrganization: Organization;
  MBAFCOrganization: Organization;
  showOrg: string = "";
  BMBSDepartments: string[];
  DGRCDepartments: string[];
  MBAFCDepartments: string[];
  dgrcTableWidth: string = "";
  bmbsTableWidth: string = "";
  mbafcTableWidth: string = "";


  constructor(private appConfig: AppConfig, private router: Router, private userService: UserService, private roleService: RoleService) {
    this.searchUserItems = this.appConfig.searchUserItems;
    this.searchItem = this.searchUserItems[0];
    this.roleList = new PagedList<Role>();
    this.BMBSOrganization = new Organization();
    this.DGRCOrganization = new Organization();
    this.MBAFCOrganization = new Organization();
    this.BMBSDepartments = [];
    this.DGRCDepartments = [];
    this.MBAFCDepartments = [];
  }

  ngOnInit(): void {
    this.roleService.listRoles().then(roles => {
      this.roleList = roles;
      let all = new Role();
      all.text = "All";
      this.roleList.list.splice(0,0,all);
    });


    this.userService.getDataCommunity(this.condition).then(organizations => {
      this.organizationList = organizations;
      for (let organization of this.organizationList) {
        if (organization.name == 'BMBS') {
          this.BMBSOrganization = organization;
        } else if (organization.name == 'DGRC') {
          this.DGRCOrganization = organization;
        } else if (organization.name == 'MBAFC') {
          this.MBAFCOrganization = organization;
        }
      }
      // console.log(this.BMBSOrganization);
      // console.log(this.DGRCOrganization);
      // console.log(this.MBAFCOrganization);
    });

    this.BMBSDepartments=this.appConfig.BMBS;
    this.DGRCDepartments=this.appConfig.DGRC;
    this.MBAFCDepartments=this.appConfig.MBAFC;

    this.dgrcTableWidth = this.DGRCDepartments.length * 80 + "px !important";
    this.bmbsTableWidth = this.BMBSDepartments.length * 80 + "px !important";
    this.mbafcTableWidth = this.MBAFCDepartments.length * 80 + "px !important";
    // console.log("DGRC table width : " + this.dgrcTableWidth);
    // console.log("BMBS table width : " + this.bmbsTableWidth);
    // console.log("MBAFC table width : " + this.mbafcTableWidth);

  }

  selectSearchItem(event, item): void {
    event.preventDefault();
    this.searchItem = item;
  }

  searchUser() {
    if (this.inputValue == undefined || this.inputValue == null) {
      this.inputValue = '';
    }
    this.router.navigate(['/user/search', this.searchItem, this.inputValue]);

  }

  roleFilter(event, role) {
    //console.log("role name:" + role);
    event.preventDefault();
    this.selectedRole = role;
    if(role == "All") {
      role = "";
    }
    this.condition.role = role;
    this.BMBSOrganization = new Organization();
    this.DGRCOrganization = new Organization();
    this.MBAFCOrganization = new Organization();
    this.userService.getDataCommunity(this.condition).then(organizations => {
      this.organizationList = organizations;
      for (let organization of this.organizationList) {
        if (organization.name == 'BMBS') {
          this.BMBSOrganization = organization;
        } else if (organization.name == 'DGRC') {
          this.DGRCOrganization = organization;
        } else if (organization.name == 'MBAFC') {
          this.MBAFCOrganization = organization;
        }
      }
      // console.log(this.BMBSOrganization);
      // console.log(this.DGRCOrganization);
      // console.log(this.MBAFCOrganization);
    });
  }

  show(org) {
    this.showOrg = org;
    //console.log("show org:" + this.showOrg);
  }

}
