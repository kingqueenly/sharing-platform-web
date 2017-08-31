/**
 * Created by paulliu on 2017/1/18.
 */

import {Component, OnInit} from '@angular/core';
import {PagedList} from "../home/pagedlist";

import {Role} from "./role";
import {RoleService} from "./role.service";

@Component({
  templateUrl: './role-management.component.html'
})
export class RoleManagementComponent implements OnInit {

  roleList: PagedList<Role>;
  editRole: Role;

  constructor(private roleService: RoleService) {
    this.roleList = new PagedList<Role>();
    this.editRole = new Role();
  }

  ngOnInit(): void {

    this.roleService.listRoles().then(roles => {
      this.roleList = roles;
    });
  }

  create() {
    if (this.editRole.id != null)
      this.editRole = new Role();
  }

  edit(role) {
    this.editRole = role;
  }

  delete(event, role) {
    event.cancelBubble = true;
    this.editRole = new Role();
    this.roleService.deleteRole(role).then(() => {
      this.roleList.list.splice(this.roleList.list.indexOf(role), 1);
    });
  }

  onSubmit() {
    if (this.editRole.id == null) {
      this.roleService.createRole(this.editRole).then((id) => {
        console.log("role id:"+id);
        this.editRole.id = id;
        this.roleList.list.push(this.editRole);
        this.editRole = new Role();
      });
    }
    else {
      this.roleService.updateRole(this.editRole).then(() => {
        this.editRole = new Role();
      });
    }
  }
}
