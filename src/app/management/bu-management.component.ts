/**
 * Created by paulliu on 2017/1/18.
 */

import {Component, OnInit} from '@angular/core';
import {BU} from "./bu";
import {BUService} from "./bu.service";
import {PagedList} from "../home/pagedlist";

@Component({
  templateUrl: './bu-management.component.html'
})
export class BuManagementComponent implements OnInit {

  buList: PagedList<BU>;
  editBU: BU;

  constructor(private buService: BUService) {
    this.buList = new PagedList<BU>();
    this.editBU = new BU();
  }

  ngOnInit(): void {

    this.buService.listBUs().then(bus => {
      this.buList = bus;
    });
  }

  create() {
    if (this.editBU.id != null)
      this.editBU = new BU();
  }

  edit(bu) {
    this.editBU = bu;
  }

  delete(event, bu) {
    event.cancelBubble = true;
    this.editBU = new BU();
    this.buService.deleteBU(bu).then(() => {
      this.buList.list.splice(this.buList.list.indexOf(bu), 1);
    });
  }

  onSubmit() {
    if (this.editBU.id == null) {
      this.buService.createBU(this.editBU).then((id) => {
        this.editBU.id = id;
        this.buList.list.push(this.editBU);
        this.editBU = new BU();
      });
    }
    else {
      this.buService.updateBU(this.editBU).then(() => {
        this.editBU = new BU();
      });
    }
  }
}
