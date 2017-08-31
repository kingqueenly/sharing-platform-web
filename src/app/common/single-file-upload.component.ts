import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {FileInfo} from "./file-info";
import {FileUploader} from "ng2-file-upload";
import {AppConfig} from "../app-config";
import {NotificationsService} from "angular2-notifications";
/**
 * Created by paul.a.liu on 1/12/2017.
 */

@Component({
  selector: 'single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css']
})
export class SingleFileUploadComponent implements OnInit {

  private uploadUrl = '/upload';
  filePath: string;

  @Input() userSrc: FileInfo;
  @Output() uploadFinished = new EventEmitter();
  // imgUrls: FileInfo[];
  uploader: FileUploader;
  hasDropZoneOver: boolean;

  constructor(private appConfig: AppConfig, private notificationsService: NotificationsService) {
    this.filePath = this.appConfig.filePath;
  }

  ngOnInit() {
    // if(this.userSrc.url==null || this.userSrc.url=='' || this.userSrc.url==undefined){
    //   this.userSrc.url ='assets/header.png';
    // }
    this.uploader = new FileUploader({
      url: this.appConfig.apiEndpoint + this.uploadUrl,
      autoUpload: false
    });

    if (!this.uploader.options.headers) {
      this.uploader.options.headers = [];
    }

    this.hasDropZoneOver = false;

  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;

  }

  selectedFileOnChanged(e:any){
    this.uploadFile();
  }
  uploadFile() {
    this.uploader.queue.forEach(fileItem => {
      if (fileItem.file.type.indexOf('image') < 0) {
        this.notificationsService.info("system", "only support upload image");
        this.uploader.queue.pop();
        return;
      }else {
        let suffixs = ['.jpg', '.png'];
        let fileSuffix = fileItem.file.name.substring(fileItem.file.name.lastIndexOf('.'));
        //符合图片格式要求
       //console.log("image size:"+ fileItem.file.size);
       if(suffixs.indexOf(fileSuffix) <0){
         this.notificationsService.info("system", "only support .jpg and .png");
         this.uploader.queue.pop();
         return;
       }else if(fileItem.file.size > 100 * 1024){
         this.notificationsService.info("system", " support image max size 100k");
         this.uploader.queue.pop();
         return;
       }else{
          this.uploadFinished.emit(false);
          fileItem.onSuccess = (response, status, headers) => {
            if (status == 200) {
              this.uploadFinished.emit(true);
              let tempRes = JSON.parse(response);
              this.userSrc.url = tempRes.url;
            } else {
              //
            }
          };
        }
        fileItem.upload();
      }


    });

  }

}
