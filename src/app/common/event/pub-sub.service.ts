/**
 * Created by paul.a.liu on 2/15/2017.
 */

import {Injectable} from "@angular/core";
import {RequestEventEmitter} from "./request-event-emitter";
import {ResponseEventEmitter} from "./response-event-emitter";

@Injectable()
export class PubSubService {
  beforeRequest: RequestEventEmitter;
  afterRequest: ResponseEventEmitter;

  constructor() {
    this.beforeRequest = new RequestEventEmitter();
    this.afterRequest = new ResponseEventEmitter();
  }
}
