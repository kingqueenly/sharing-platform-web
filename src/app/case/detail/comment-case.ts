import {User} from "../../user/user";
/**
 * Created by hongying.fu on 1/14/2017.
 */
export class CommentCase {
  public children: CommentCase[];

  constructor(public id: string,
              public content: string,
              public createTime: Date,
              public userId:string,
              public userName: string,
              public userImgUrl: string,
              public useCaseId: string) {

  }
}
