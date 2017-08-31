/**
 * Created by paulliu on 2017/1/18.
 */

import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
@Component({
  templateUrl: './management.component.html'
})
export class ManagementComponent{

  constructor(private userService: UserService){
    //console.log("ManagementCom");
  }

  showSidebar = true;
  sidebarStyle;
  mainContentStyle;

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
}
