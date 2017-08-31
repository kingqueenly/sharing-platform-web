/**
 * Created by paulliu on 2017/1/18.
 */

import {Component} from '@angular/core';
import {Value} from "./value";
import {PagedList} from "../home/pagedlist";
import {ValueService} from "./value.service";

@Component({
  templateUrl: './value-management.component.html'
})
export class ValueManagementComponent {
  valueList: PagedList<Value>;
  editValue: Value;

  constructor(private valueService: ValueService) {
    this.valueList = new PagedList<Value>();
    this.editValue = new Value();
  }

  ngOnInit(): void {

    this.valueService.listValues().then(values => {
      this.valueList = values;
    });
  }

  create() {
    if (this.editValue.id != null)
      this.editValue = new Value();
  }

  edit(value) {
    this.editValue = value;
  }

  delete(event, value) {
    event.cancelBubble = true;
    this.editValue = new Value();
    this.valueService.deleteValue(value).then(() => {
      this.valueList.list.splice(this.valueList.list.indexOf(value), 1);
    });
  }

  onSubmit() {
    if (this.editValue.id == null) {
      this.valueService.createValue(this.editValue).then((id) => {
        this.editValue.id = id;
        this.valueList.list.push(this.editValue);
        this.editValue = new Value();
      });
    }
    else {
      this.valueService.updateValue(this.editValue).then(() => {
        this.editValue = new Value();
      });
    }
  }
}
