/**
 * Created by paulliu on 2017/1/18.
 */

import {Component} from '@angular/core';
import {Value} from "./value";
import {PagedList} from "../home/pagedlist";
import {ValueService} from "./value.service";
import {DataSource} from "./data-source";
import {DataSourceService} from "./data.source.service";

@Component({
  templateUrl: './data-source-management.component.html'
})
export class DataSourceManagementComponent {
  dataSourceList: PagedList<DataSource>;
  editDataSource: DataSource;

  constructor(private dataSourceService: DataSourceService) {
    this.dataSourceList = new PagedList<DataSource>();
    this.editDataSource = new DataSource();
  }

  ngOnInit(): void {

    this.dataSourceService.listDataSources().then(values => {
      this.dataSourceList = values;
    });
  }

  create() {
    if (this.editDataSource.id != null)
      this.editDataSource = new Value();
  }

  edit(value) {
    this.editDataSource = value;
  }

  delete(event, value) {
    event.cancelBubble = true;
    this.editDataSource = new DataSource();
    this.dataSourceService.deleteDataSource(value).then(() => {
      this.dataSourceList.list.splice(this.dataSourceList.list.indexOf(value), 1);
    });
  }

  onSubmit() {
    if (this.editDataSource.id == null) {
      this.dataSourceService.createDataSource(this.editDataSource).then((id) => {
        this.editDataSource.id = id;
        this.dataSourceList.list.push(this.editDataSource);
        this.editDataSource = new DataSource();
      });
    }
    else {
      this.dataSourceService.updateDataSource(this.editDataSource).then(() => {
        this.editDataSource = new DataSource();
      });
    }
  }
}
