/**
 * Created by paul.a.liu on 1/13/2017.
 */

import {Injectable, EventEmitter}    from '@angular/core';
import {HttpService} from "../common/http.service";
import {UserProfile} from "./user-profile";
import {PagedList} from "../home/pagedlist";
import {UserData} from "../management/user-data";
import {Organization} from "./datacommunity/organization";

@Injectable()
export class UserService {

    profileChanged: EventEmitter<UserProfile>;

    private getUrl = '/user/profile';
    private listUrl = '/user/search';
    private createUrl = '/user/create';
    private updateUrl = '/user/update';
    private deleteUrl = '/user/delete';
    private detailUrl = '/user/detail/';
    private dataCommunityUrl = '/user/dataCommunity';

    constructor(private httpHelper: HttpService) {
        this.profileChanged = new EventEmitter<UserProfile>(true);
    }

    getUser() {
        return this.httpHelper.post<Promise<UserProfile>>(this.getUrl).then(user => user);
    }

    getDetailUser(userId: string): Promise<UserProfile> {
        return this.httpHelper.get(this.detailUrl + userId).then(user => user);
    }

    listUsers(pageNo: number = 1) {
        return this.httpHelper.post<Promise<PagedList<UserData>>>(this.listUrl + '/' + pageNo).then(users => users);
    }

    createUser(user): Promise<string> {
        return this.httpHelper.post(this.createUrl, user);
    }

    updateUser(user): Promise<void> {
        return this.httpHelper.put(this.updateUrl + '/' + user.id, user);
    }

    deleteUser(user): Promise<void> {
        return this.httpHelper.delete(this.deleteUrl + '/' + user.id);
    }

    searchUserList(pageNo: number = 1, paramter: any = null): Promise<PagedList<UserProfile>> {
        return this.httpHelper.post(this.listUrl + "/" + pageNo, paramter).then(users => users);
    }

    getDataCommunity(paramter: any = null): Promise<Organization[]> {
        return this.httpHelper.post(this.dataCommunityUrl, paramter).then(organizations => organizations);
    }
}
