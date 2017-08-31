/**
 * Created by paulliu on 2016/12/7.
 */

import {Component, OnInit} from '@angular/core';
import {PagedList} from "../../home/pagedlist";
import {UseCaseService} from "../use-case.service";
import {ActivatedRoute, Params} from "@angular/router";
import {QueryParameter} from "../search/query-parameter";
import {SiteCaseResult} from "../../home/site-case-result";
import {AppConfig} from "../../app-config";

@Component({
  selector: 'content',
  templateUrl: './user-more.component.html'
})
export class UserMoreComponent implements OnInit {
  pagedList: PagedList<SiteCaseResult>;
  type: string = 'userCreateCase';
  queryParameter: QueryParameter=new QueryParameter(null,null);
  userId:string;

  constructor(private route: ActivatedRoute, private useCaseSercice: UseCaseService, private appConfig: AppConfig) {
    this.pagedList = new PagedList<SiteCaseResult>();
  }

  ngOnInit(): void {
    // this.useCaseSercice.getCaseList().then(cases => {
    //   this.pagedList = cases;
    // });
    this.route.params.forEach((params: Params) => {
      this.type = params['type'];
      this.userId=params['id'];
      if (this.type == 'userCreateCase') {
        this.queryParameter.createUserId=params['id'];
        this.queryParameter.likeUserId=null;
        this.useCaseSercice.getUserCreateCaseList(1,this.queryParameter).then(cases => {
          this.pagedList = cases;
        });
      } else if (this.type == 'userLikeCase') {
        this.queryParameter.createUserId=null;
        this.queryParameter.likeUserId=params['id'];
        this.useCaseSercice.getUserLikeCaseList(1,this.queryParameter).then(cases => {
          this.pagedList = cases;
        });
      }

    });
  }

  showMore() {
    if (this.type == 'userCreateCase') {
      this.queryParameter.createUserId=this.userId;
      this.queryParameter.likeUserId=null;
      this.useCaseSercice.getUserCreateCaseList(this.pagedList.pageNum + 1,this.queryParameter).then(
        cases => {
          var nextPagedList = cases;
          this.pagedList.pageNum = nextPagedList.pageNum;
          this.pagedList.pageSize = nextPagedList.pageSize;
          this.pagedList.size = nextPagedList.size;
          this.pagedList.total = nextPagedList.total;
          this.pagedList.pages = nextPagedList.pages;
          for (let siteCase of nextPagedList.list) {
            this.pagedList.list.push(siteCase);
          }
          this.pagedList.hasPreviousPage = nextPagedList.hasPreviousPage;
          this.pagedList.hasNextPage = nextPagedList.hasNextPage;
          this.pagedList.firstPage = nextPagedList.firstPage;
          this.pagedList.lastPage = nextPagedList.lastPage;
        }
      );
    } else if (this.type == 'userLikeCase') {
      this.queryParameter.createUserId=null;
      this.queryParameter.likeUserId=this.userId;
      this.useCaseSercice.getUserLikeCaseList(this.pagedList.pageNum + 1,this.queryParameter).then(
        cases => {
          var nextPagedList = cases;
          this.pagedList.pageNum = nextPagedList.pageNum;
          this.pagedList.pageSize = nextPagedList.pageSize;
          this.pagedList.size = nextPagedList.size;
          this.pagedList.total = nextPagedList.total;
          this.pagedList.pages = nextPagedList.pages;
          for (let siteCase of nextPagedList.list) {
            this.pagedList.list.push(siteCase);
          }
          this.pagedList.hasPreviousPage = nextPagedList.hasPreviousPage;
          this.pagedList.hasNextPage = nextPagedList.hasNextPage;
          this.pagedList.firstPage = nextPagedList.firstPage;
          this.pagedList.lastPage = nextPagedList.lastPage;
        }
      );
    }
  }

  searchUserList(type:string){
    if(this.type == type){
      return;
    }
    this.type = type;
    if (this.type == 'userCreateCase') {
      this.queryParameter.createUserId=this.userId;
      this.queryParameter.likeUserId=null;
      this.useCaseSercice.getUserCreateCaseList(1,this.queryParameter).then(cases => {
        this.pagedList = cases;
      });
    } else if (this.type == 'userLikeCase') {
      this.queryParameter.createUserId=null;
      this.queryParameter.likeUserId=this.userId;
      this.useCaseSercice.getUserLikeCaseList(1,this.queryParameter).then(cases => {
        this.pagedList = cases;
      });
    }
  }
}
