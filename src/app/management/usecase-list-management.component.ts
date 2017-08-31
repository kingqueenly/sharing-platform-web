/**
 * Created by paulliu on 2017/1/18.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UseCaseService} from  '../case/use-case.service'
import {PagedList} from "../home/pagedlist";
import {SiteCaseResult} from "../home/site-case-result";
import {NotificationsService} from "angular2-notifications";

@Component({
  templateUrl: './usecase-list-management.component.html'
})
export class UsecaseListManagementComponent implements OnInit {

  usecaseList: PagedList<SiteCaseResult>;

  constructor(private useCaseService: UseCaseService, private notificationsService: NotificationsService) {
    this.usecaseList = new PagedList<SiteCaseResult>();
    //console.log("test");
  }

  ngOnInit(): void {
    this.useCaseService.getCaseList(1).then(usecases=>{
      //console.log(usecases.size);
      this.usecaseList = usecases;
    });
  }

  deleteUsecase(usecase): void {
    try {
      //console.log(usecase.id);
      this.useCaseService.delete(usecase.id);
      this.notificationsService.success("success", "Deleted successfully");
      this.usecaseList.list.splice(this.usecaseList.list.indexOf(usecase), 1);
    } catch(e) {
      this.notificationsService.error("error", "Failed to delete");
    }
  }

  showMore() {
    this.useCaseService.getCaseList(this.usecaseList.pageNum + 1).then(usecases=>{
      var nextPagedList = usecases;
      this.usecaseList.pageNum = nextPagedList.pageNum;
      this.usecaseList.pageSize = nextPagedList.pageSize;
      this.usecaseList.size = nextPagedList.size;
      this.usecaseList.total = nextPagedList.total;
      this.usecaseList.pages = nextPagedList.pages;
      for (let usecase of nextPagedList.list) {
        this.usecaseList.list.push(usecase);
      }
      this.usecaseList.hasPreviousPage = nextPagedList.hasPreviousPage;
      this.usecaseList.hasNextPage = nextPagedList.hasNextPage;
      this.usecaseList.firstPage = nextPagedList.firstPage;
      this.usecaseList.lastPage = nextPagedList.lastPage;

    });
  }
}
