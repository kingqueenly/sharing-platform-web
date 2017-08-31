/**
 * Created by paulliu on 2017/1/18.
 */

import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {PagedList} from "../home/pagedlist";
import {UserData} from "./user-data";
import {Authority} from "../user/authority";
import {AuthorityService} from "../user/authority.service";
import {FileInfo} from "../common/file-info";
import {Role} from "./role";
import {RoleService} from "./role.service";
import {UserProfile} from "../user/user-profile";
import {AppConfig} from "../app-config";

@Component({
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {

  userList: PagedList<UserData>;
  editUser: UserData;
  authorityList: Authority[];
  userSrc=new FileInfo();
  isUploadFinished:boolean=true;
  isCreate:boolean=false;
  roleList: PagedList<Role>;
  appellations:string[];
  organizations:string[];
  loginUserId:string="";

  constructor(private userService: UserService, private authorityService: AuthorityService,private roleService: RoleService,private appConfig: AppConfig) {
    this.userList = new PagedList<UserData>();
    this.editUser = new UserData();
    this.authorityList = [];
    this.roleList = new PagedList<Role>();
    this.appellations=this.appConfig.appellations;
    this.organizations=this.appConfig.organizations;
  }

  ngOnInit(): void {
    this.authorityList = this.authorityService.listRoles();
    this.loginUserId=UserProfile.getValue().id;
    this.userService.listUsers().then(users => {
      this.userList = users;
    });

    this.roleService.listRoles().then(roles => {
      this.roleList = roles;
    });
  }

  create() {
    if (this.editUser.id != null)
      this.editUser = new UserData();
    this.isCreate=true;
  }

  edit(user) {
    this.editUser = user;
    this.userSrc.url=user.imgUrl;
    this.isCreate=true;
    // console.log(this.editUser);
  }

  delete(event, user) {
    event.cancelBubble = true;
    this.editUser = new UserData();
    user.deleted=true;
    this.userService.updateUser(user).then(() => {
      this.userList.list.splice(this.userList.list.indexOf(user), 1);
      this.isCreate=false;
    });
  }

  onSubmit() {
    if(this.editUser.appellation==undefined || this.editUser.appellation==null){
      this.editUser.appellation='Mr.';
    }

    if(this.editUser.organization==undefined || this.editUser.organization==null){
      this.editUser.organization='BMBS';
    }

    if(this.editUser.authority==undefined || this.editUser.authority==null){
      this.editUser.authority='user';
    }

    // if(this.editUser.role==undefined || this.editUser.role==null){
    //   this.editUser.role='pacemaker';
    // }

    if(this.editUser.isDCRemember==undefined || this.editUser.isDCRemember==null){
      this.editUser.isDCRemember=false;
    }

    this.editUser.imgUrl=this.userSrc.url;
    if(this.editUser.imgUrl=='assets/header.png'){
      this.editUser.imgUrl='';
    }
    if (this.editUser.id == null) {
      this.userService.createUser(this.editUser).then((id) => {
        this.editUser.id = id;
        this.userList.list.push(this.editUser);
        this.editUser = new UserData();
        this.userSrc.url=null;
        this.isCreate=false;
      });
    }
    else {
      this.userService.updateUser(this.editUser).then(() => {
        this.editUser = new UserData();
        this.userSrc.url=null;
        this.isCreate=false;
      });
    }
  }

  uploadFinished($event){
    this.isUploadFinished=$event;
    // console.log("upload:"+this.isUploadFinished);
  }

  showMore() {
    this.userService.listUsers(this.userList.pageNum + 1)
      .then(
        users => {
          var nextPagedList = users;
          this.userList.pageNum = nextPagedList.pageNum;
          this.userList.pageSize = nextPagedList.pageSize;
          this.userList.size = nextPagedList.size;
          this.userList.total = nextPagedList.total;
          this.userList.pages = nextPagedList.pages;
          for (let siteCase of nextPagedList.list) {
            this.userList.list.push(siteCase);
          }
          this.userList.hasPreviousPage = nextPagedList.hasPreviousPage;
          this.userList.hasNextPage = nextPagedList.hasNextPage;
          this.userList.firstPage = nextPagedList.firstPage;
          this.userList.lastPage = nextPagedList.lastPage;
        }
      );
  }
}
