/**
 * Created by hongying.fu on 2/10/2017.
 */
import {FileInfo} from "../common/file-info";
import {Value} from "./value";
import {CaseCommentLikeShare} from "./case-comment-like-share";
import {User} from "../user/user";
import {BU} from "../management/bu";
export class SiteCaseResult{
  public id: string;
  public subject: string;
  public values: Value[];
  public vtext: string;
  public scenario: string;
  public dataSource: Value[];
  public dataTypeDescription: string;
  public dataAnalysisModel: Value[];
  public dataAnalysisModelOther: string;
  public dataSourceOther: string;
  public analysisMethodResultText: string;
  public analysisMethodResultFiles: FileInfo[];
  public validationMethodResultText: string;
  public validationMethodResultFiles: FileInfo[];
  public implMethodResultText: string;
  public implMethodResultFiles: FileInfo[];
  public contributionBU: BU[];
  public stage: string;
  public fromDate: string;
  public toDate: string;
  public needHelp: string;
  public attachments: FileInfo[];
  public createTime: Date;
  public viewNum: number;
  public commentNum: number;
  public likeNum: number;
  public shareNum: number;
  public userId: string;
  public userName: string;
  public userImgUrl: string;
  public userDepartment: string;
  public userScore: number;
  public userLevel: string;
  public email: string;
  public referenceCase: string;
  public phase:string;
  constructor() {

  }
}
