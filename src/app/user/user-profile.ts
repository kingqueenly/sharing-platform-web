/**
 * Created by paulliu on 2017/1/16.
 */

const dataKey = "user_profile";

export class UserProfile {

  id: string;
  userId: string;
  appellation: string;
  username: string;
  organization:string;
  department: string;
  imgUrl: string;
  workArea: string;
  professional: string;
  email: string;
  phone: string;
  mobile: string;
  score: Number;
  level: string;
  role: string;
  authority:string;
  isDCRemember:boolean;
  deleted:boolean=false;
  constructor(id: string, userId: string, appellation: string, username: string, department: string, imgUrl: string, workArea: string,
              professional: string, email: string, phone: string, mobile: string, score: Number, level: string, role: string,authority:string,isDCRemember:boolean) {
    this.id = id;
    this.userId = userId;
    this.appellation = appellation;
    this.username = username;
    this.department = department;
    this.imgUrl = imgUrl;
    this.workArea = workArea;
    this.professional = professional;
    this.email = email;
    this.phone = phone;
    this.mobile = mobile;
    this.score = score;
    this.level = level;
    this.role = role;
    this.authority=authority;
    this.isDCRemember=isDCRemember;
    this.deleted=false;
  }

  setValue(): void {
    // localStorage.setItem(dataKey, JSON.stringify(this));
    sessionStorage.setItem(dataKey, JSON.stringify(this));
  }

  isAdministrator(): boolean {
    return this.authority == "administrator";
  }

  static getValue(): UserProfile {
    // console.log("3333");
    return UserProfile.fromJsonString(sessionStorage.getItem(dataKey));
  }

  static removeValue() {
    sessionStorage.removeItem(dataKey);
  }

  static existing() {
    // console.log("22222");
    let data = UserProfile.getValue();
    if (data == null) {
      return false;
    }
    return true;
  }

  static fromJsonObj(json: any) {
    let userProfile = new UserProfile(json.id, json.userId, json.appellation, json.username, json.department, json.imgUrl,
                          json.workArea, json.professional, json.email, json.phone, json.mobile, json.score, json.level, json.role,json.authority,json.isDCRemember);
    return userProfile;
  }

  private static fromJsonString(json: string) {
    var data = JSON.parse(json);
    let userProfile = null;
    if (data != null) {
      userProfile = new UserProfile(data.id,data.userId, data.appellation,  data.username, data.department, data.imgUrl,
                          data.workArea, data.professional, data.email, data.phone, data.mobile, data.score, data.level, data.role,data.authority,data.isDCRemember);
    }

    return userProfile;
  }
}
