/**
 * Created by paul.a.liu on 2/15/2017.
 */

import {Subject} from 'rxjs/Subject';

export class ResponseEventEmitter extends Subject<String> {
  constructor() {
    super();
  }

  emit(value) {
    super.next(value);
  }
}
