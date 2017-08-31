/**
 * Created by hongying.fu on 12/29/2016.
 */

import {Headers, Http, RequestOptions} from "@angular/http";
import {Injectable} from "@angular/core";
import {UserToken} from "../user/user-token";
import {AppConfig} from "../app-config";
import {PubSubService} from "./event/pub-sub.service";
import {Router} from "@angular/router";

@Injectable()
export class HttpService {
    private baseUrl: string;
    private headerOptions = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };

    constructor(private http: Http, private appConfig: AppConfig, private router: Router, private pubSub: PubSubService) {
        this.baseUrl = appConfig.apiEndpoint;
    }

    post<T>(relativePath: string, parameter: any = null): Promise<T> {
        this.pubSub.beforeRequest.emit("beforeRequestEvent");
        //console.log("xxxxxxxxx:"+this.baseUrl + relativePath);
        return this.http.post(this.baseUrl + relativePath, parameter, this.requestOptions())
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    put(relativePath: string, parameter: any = null) {
        return this.http.post(this.baseUrl + relativePath, parameter, this.requestOptions())
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    get<T>(relativePath): Promise<T> {
        console.log("get:"+this.baseUrl + relativePath);
        return this.http.get(this.baseUrl + relativePath, this.requestOptions())
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    delete(relativePath) {
        //console.log("delete:"+this.baseUrl + relativePath);
        return this.http.post(this.baseUrl + relativePath, this.requestOptions())
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    }

    private requestOptions() {
        return new RequestOptions({headers: this.requestHeaders()});
    }

    private requestHeaders() {

        let headers: Headers = new Headers(this.headerOptions);
        // if (UserToken.existing()) {
        //   headers.append('Authorization', 'Bearer ' + UserToken.getValue().token);
        // }
        return headers;
    }

    private handleResponse = <T>(response: any): T => {
        this.pubSub.afterRequest.emit("afterRequestEvent");

        if (response.text().length == 0)
            return null;

        try {
            // console.log(response.json());
            return response.json() as T;
        }
        catch (e) {
            return response.text() as T;
        }
    };

    private handleError = (error: any): Promise<any> => {
        // let message = "";
        // if (error.status == 0) {
        //   message = "Network error";
        // }
        // else {
        //   message = error.json().message;
        // }
        // return Promise.reject(message);

        this.pubSub.afterRequest.emit("afterRequestEvent");

        // console.log(error);
        return Promise.reject(error);
    };
}
