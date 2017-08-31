/**
 * Created by hongying.fu on 1/13/2017.
 */
export class QueryParameter {
  public likeUserId:string;
  public createUserId:string;

  constructor(public subject: string,
              public valueType: string) {
  }
}
