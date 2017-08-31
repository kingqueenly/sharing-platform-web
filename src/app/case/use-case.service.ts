/**
 * Created by paulliu on 2016/12/8.
 */

import {Injectable}    from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {CommentCase} from "./detail/comment-case";
import {CommentCommand} from "./detail/comment-command";
import {LikeCaseCommand} from "./detail/like-case-command";
import {ShareCommand} from "./detail/share-command";
import {LikeCase} from "./detail/like-case";
import {UserLevel} from "../user/user-level";
import {SiteCaseResult} from "../home/site-case-result";
import {PhaseList} from "../home/phase-list";
import {StageList} from "../home/stage-list";
import {CategoryList} from "../home/category-list";
import {CategoryListParameter} from "./search/categorylist-parameter";

@Injectable()
export class UseCaseService {
  private caseListUrl = '/usecase/search/';
  private createUrl = "/usecase/create";
  private detailUrl = "/usecase/detail/";
  private updateUrl = "/usecase/update/";
  private deleteUrl = "/usecase/delete/";
  private contributionBUCaseListUrl = "/usecase/contributionBU/";
  private phaseListUrl="/usecase/phase";
  private categoryListUrl="/usecase/category";
  private commentListUrl = "/comment/search/";
  private createCommentUrl = "/comment/create";
  private deleteCommentUrl = "/comment/delete/";
  private createLikeCaseUrl = "/like/create";
  private createShareCaseUrl = "/share/create";
  private userCreateCaseListUrl = '/usecase/userCreateCase/';
  private userLikeCaseListUrl = '/usecase/userLikeCase/';
  private detailLikeCaseUrl = "/like/detail";
  private userScoreRuleUrl = "/user/rule";
  private PhaseStageCaseListUrl = "/usecase/phaseStage/";
  constructor(private httpHelper: HttpService) {
  }

  getCaseList(pageNo: number = 1, paramter: any = null): Promise<PagedList<SiteCaseResult>> {
    return this.httpHelper.post(this.caseListUrl + pageNo, paramter).then(cases => cases);
  }

  getDetail(caseId: string): Promise<SiteCaseResult> {
    return this.httpHelper.get(this.detailUrl + caseId).then(siteCase => siteCase);
  }

  delete(usecaseId: string) {
    //console.log(usecaseId);
    this.httpHelper.delete(this.deleteUrl + usecaseId);
  }

  updateCase(siteCase): Promise<{}> {
    return this.httpHelper.put(this.updateUrl + siteCase.id, siteCase);
  }

  createCase(siteCase): Promise<{}> {
    return this.httpHelper.post(this.createUrl, siteCase);
  }

  getCommentList(pageNo: number = 1, paramter: any = null): Promise<PagedList<CommentCase>> {

    return this.httpHelper.post(this.commentListUrl + pageNo, paramter).then(comments => comments);
  }

  createComment(comment: CommentCommand): Promise<string> {
    return this.httpHelper.post(this.createCommentUrl, comment).then(commentId => commentId);
  }

  getUserCreateCaseList(pageNo: number = 1, paramter: any = null): Promise<PagedList<SiteCaseResult>> {
    return this.httpHelper.post(this.userCreateCaseListUrl + pageNo, paramter).then(cases => cases);
  }

  getUserLikeCaseList(pageNo: number = 1, paramter: any = null): Promise<PagedList<SiteCaseResult>> {
    return this.httpHelper.post(this.userLikeCaseListUrl + pageNo, paramter).then(cases => cases);
  }

  getContributionBUCaseList(pageNo: number = 1, paramter: any = null): Promise<PagedList<SiteCaseResult>> {
    return this.httpHelper.post(this.contributionBUCaseListUrl + pageNo, paramter).then(cases => cases);
  }

  createLikeCase(likeCase: LikeCaseCommand): Promise<{}> {
    return this.httpHelper.post(this.createLikeCaseUrl, likeCase);
  }

  createShareCase(shareCase: ShareCommand): Promise<{}> {
    return this.httpHelper.post(this.createShareCaseUrl, shareCase).then(shareNum => shareNum);
  }

  getLikeCase(likeCommand: LikeCaseCommand): Promise<LikeCase> {
    return this.httpHelper.post(this.detailLikeCaseUrl, likeCommand).then(likeCase => likeCase);
  }

  getScoreRule(): Promise<UserLevel[]> {
    return this.httpHelper.get(this.userScoreRuleUrl).then(userLevels=>userLevels);
  }

  deleteComment(id:string) {
   return this.httpHelper.delete(this.deleteCommentUrl+id);
  }

  getShoopFloor(param:string[]):Promise<PhaseList<StageList<SiteCaseResult>>[]> {
    return this.httpHelper.post(this.phaseListUrl,param).then(pagedLists=>pagedLists);
  }

  getShopFloorCategory(param:CategoryListParameter):Promise<CategoryList<StageList<SiteCaseResult>>[]>{
    return this.httpHelper.post(this.categoryListUrl, param).then(pagedLists=>pagedLists);
  }

  getPhaseStageCaseList(pageNo: number = 1, paramter: any = null):Promise<PagedList<SiteCaseResult>> {
    return this.httpHelper.post(this.PhaseStageCaseListUrl + pageNo, paramter).then(cases => cases);
  }
}
