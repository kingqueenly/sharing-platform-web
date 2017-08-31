/**
 * Created by paulliu on 2017/1/18.
 */

import {Component} from '@angular/core';
import {Value} from "./value";
import {PagedList} from "../home/pagedlist";
import {ValueService} from "./value.service";
import {DataAnalysisModel} from "./data-analysis-model";
import {DataAnalysisModelService} from "./data.analysis.model.service";

@Component({
  templateUrl: './data-analysis-model-management.component.html'
})
export class DataAnalysisModelManagementComponent {
  dataAnalysisModelList: PagedList<DataAnalysisModel>;
  editDataAnalysisModel: DataAnalysisModel;

  constructor(private dataAnalysisModelService: DataAnalysisModelService) {
    this.dataAnalysisModelList = new PagedList<DataAnalysisModel>();
    this.editDataAnalysisModel = new DataAnalysisModel();
  }

  ngOnInit(): void {

    this.dataAnalysisModelService.listDataAnalysisModels().then(values => {
      this.dataAnalysisModelList = values;
    });
  }

  create() {
    if (this.editDataAnalysisModel.id != null)
      this.editDataAnalysisModel = new DataAnalysisModel();
  }

  edit(value) {
    this.editDataAnalysisModel = value;
  }

  delete(event, value) {
    event.cancelBubble = true;
    this.editDataAnalysisModel = new DataAnalysisModel();
    this.dataAnalysisModelService.deleteDataAnalysisModel(value).then(() => {
      this.dataAnalysisModelList.list.splice(this.dataAnalysisModelList.list.indexOf(value), 1);
    });
  }

  onSubmit() {
    if (this.editDataAnalysisModel.id == null) {
      this.dataAnalysisModelService.createDataAnalysisModel(this.editDataAnalysisModel).then((id) => {
        this.editDataAnalysisModel.id = id;
        this.dataAnalysisModelList.list.push(this.editDataAnalysisModel);
        this.editDataAnalysisModel = new DataAnalysisModel();
      });
    }
    else {
      this.dataAnalysisModelService.updateDataAnalysisModel(this.editDataAnalysisModel).then(() => {
        this.editDataAnalysisModel = new DataAnalysisModel();
      });
    }
  }
}
