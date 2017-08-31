/**
 * Created by paulliu on 2016/12/7.
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UseCaseService} from "../use-case.service";
import {PagedList} from "../../home/pagedlist";
import {CommentQueryParamenter} from "./comment-query-parameter";
import {CommentCase} from "./comment-case";
import {CommentCommand} from "./comment-command";
import {LikeCaseCommand} from "./like-case-command";
import {ShareCommand} from "./share-command";
import {NotificationsService} from "angular2-notifications";
import {UserProfile} from "../../user/user-profile";
import {SiteCaseResult} from "../../home/site-case-result";
import {AppConfig} from "../../app-config";

@Component({
  selector: 'content',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  siteCase: SiteCaseResult;
  pagedListComment: PagedList<CommentCase>;
  commentQueryParameter: CommentQueryParamenter;
  isExistComment: boolean = false;
  isClickComment: boolean = false;
  isReplyComment: string = '';
  addCommentValue: string;
  replyCommentValue: string;
  userInfo: UserProfile;
  isLoginUserLikeCase: boolean = false;
  fileTypes = ['.docx', '.xlsx', '.xlx', '.pptx', '.pdf'];
  filePath: string;
  timelineFor: string;

  constructor(private route: ActivatedRoute, private useCaseSercice: UseCaseService, private notificationsService: NotificationsService, private appConfig: AppConfig) {
    this.siteCase = new SiteCaseResult();
    this.pagedListComment = new PagedList<CommentCase>();
    this.filePath = this.appConfig.filePath;
  }

  getTimelineFor(stage) {
    let tf: string = "";
    if(stage == "Concept"){
      tf = "'Concept'";
    } else if(stage == "Analysis") {
      tf = "'Concept + Analysis'";
    } else if(stage == "Validation") {
      tf = "'Concept + Analysis + Validation'";
    } else if(stage == "Implementation") {
      tf = "'Concept + Analysis + Validation + Implementation'";
    }
    return tf;
  }

  ngOnInit() {
    this.userInfo = UserProfile.getValue();
    this.route.params.forEach((params: Params) => {
      this.useCaseSercice.getDetail(params['id']).then(
        siteCase => {
          this.siteCase = siteCase;
          //console.log("siteCase:" + this.siteCase);
          this.timelineFor = this.getTimelineFor(this.siteCase.stage);
          let likeCommand = new LikeCaseCommand(this.siteCase.id);
          this.useCaseSercice.getLikeCase(likeCommand).then(likeCase => {
            if (likeCase != null) {
              this.isLoginUserLikeCase = true;
            }
          });
          this.commentQueryParameter = new CommentQueryParamenter();
          this.commentQueryParameter.useCaseId = this.siteCase.id;
          this.useCaseSercice.getCommentList(1, this.commentQueryParameter).then(comments => {
            this.pagedListComment = comments;
            if (this.pagedListComment.list != null && this.pagedListComment.list.length != 0) {
              this.isExistComment = true;
            }
          });

        }
      )
    });
  }

  showComment() {
    this.isClickComment = true;
  }

  addComment() {
    let comment: CommentCommand = new CommentCommand();
    comment.content = this.addCommentValue;
    comment.useCaseId = this.siteCase.id;
    if (this.addCommentValue == null || this.addCommentValue == '') {
      this.notificationsService.info("comment", "is not empty");
      return;
    }
    this.useCaseSercice.createComment(comment).then(commentId => {
      let commentCase = new CommentCase(commentId, comment.content, new Date(), this.userInfo.id, this.userInfo.username, this.userInfo.imgUrl, this.siteCase.id);
      commentCase.children = [];
      let comments = this.pagedListComment.list;
      this.pagedListComment.list = [];
      this.pagedListComment.list.push(commentCase);
      for (let comment of comments) {
        this.pagedListComment.list.push(comment);
      }
    });

    this.addCommentValue = '';
    this.isClickComment = false;
    this.siteCase.commentNum = Number(this.siteCase.commentNum) + 1;
    this.isExistComment = true;
  }

  showReplyComment(commentId: string) {
    this.isReplyComment = commentId;
  }

  cancelReplyComment() {
    this.isReplyComment = '';
  }

  replyComment(parentCommentId: string) {
    let commentNew: CommentCommand = new CommentCommand();
    commentNew.content = this.replyCommentValue;
    commentNew.useCaseId = this.siteCase.id;
    commentNew.parentCommentId = parentCommentId;
    if (this.replyCommentValue == null || this.replyCommentValue == '') {
      this.notificationsService.info("comment", "is not empty");
      return;
    }
    this.useCaseSercice.createComment(commentNew).then(
      id => {
        let commentCase = new CommentCase(id, commentNew.content, new Date(), this.userInfo.id, this.userInfo.username, this.userInfo.imgUrl, this.siteCase.id);
        for (let comment of this.pagedListComment.list) {
          if (comment.id == parentCommentId) {
            let comments = comment.children;
            comment.children = [];
            comment.children.push(commentCase);
            for (let child of comments) {
              comment.children.push(child);
            }
          }
        }
      }
    );
    this.replyCommentValue = '';
    this.cancelReplyComment();
    var defaultValue = 0;
    this.siteCase.commentNum = Number(this.siteCase.commentNum) + 1;
  }

  deleteComment(id: string) {
    //console.log("comment id is " + id);
    this.useCaseSercice.deleteComment(id).then(() => {
      for (let comment of this.pagedListComment.list) {
        if (comment.id == id) {
          this.pagedListComment.list.splice(this.pagedListComment.list.indexOf(comment), 1);
          this.siteCase.commentNum = Number(this.siteCase.commentNum) - 1 - comment.children.length;
        }
        for (let child of comment.children) {
          if (child.id == id) {
            comment.children.splice(comment.children.indexOf(child), 1);
            this.siteCase.commentNum = Number(this.siteCase.commentNum) - 1;
          }
        }

      }

      if (this.pagedListComment.list.length == 0) {
        this.isExistComment = false;
      }
    });


  }

  likeCase() {
    if (this.isLoginUserLikeCase) {
      this.siteCase.likeNum = Number(this.siteCase.likeNum) - 1;
      this.isLoginUserLikeCase = false;
    } else {
      this.siteCase.likeNum = Number(this.siteCase.likeNum) + 1;
      this.isLoginUserLikeCase = true;
    }
    let likeCase: LikeCaseCommand = new LikeCaseCommand(this.siteCase.id);
    this.useCaseSercice.createLikeCase(likeCase).then(likeNum => {
      if (this.isLoginUserLikeCase) {
        this.notificationsService.info("like case", "success");
      } else {
        this.notificationsService.info("cancel like case", "success");
      }
    });
  }

  shareCase() {
    let shareCase: ShareCommand = new ShareCommand(this.siteCase.id);
    this.siteCase.shareNum = Number(this.siteCase.shareNum) + 1;
    this.useCaseSercice.createShareCase(shareCase);
  }

  showMore() {
    this.commentQueryParameter = new CommentQueryParamenter();
    this.commentQueryParameter.useCaseId = this.siteCase.id;
    this.useCaseSercice.getCommentList(this.pagedListComment.pageNum + 1, this.commentQueryParameter).then(comments => {
      var nextPagedList = comments;
      this.pagedListComment.pageNum = nextPagedList.pageNum;
      this.pagedListComment.pageSize = nextPagedList.pageSize;
      this.pagedListComment.size = nextPagedList.size;
      this.pagedListComment.total = nextPagedList.total;
      this.pagedListComment.pages = nextPagedList.pages;
      for (let comment of nextPagedList.list) {
        this.pagedListComment.list.push(comment);
      }
      this.pagedListComment.hasPreviousPage = nextPagedList.hasPreviousPage;
      this.pagedListComment.hasNextPage = nextPagedList.hasNextPage;
      this.pagedListComment.firstPage = nextPagedList.firstPage;
      this.pagedListComment.lastPage = nextPagedList.lastPage;
    });

  }

}
