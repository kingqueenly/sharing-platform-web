/**
 * Created by paul.a.liu on 1/12/2017.
 */

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {FileInfo} from "./file-info";
import {AppConfig} from "../app-config";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  private uploadUrl = '/upload';
  filePath: string;

  @Input() isImageUpload: boolean;
  @Input() files: FileInfo[];
  @Output() uploadFinished = new EventEmitter();
  ImageThumbs: FileInfo[];
  otherTypeFiles: FileInfo[];
  widthProcess: string;
  uploader: FileUploader;
  hasDropZoneOver: boolean;


  constructor(private appConfig: AppConfig, private notificationsService: NotificationsService) {
    this.filePath = this.appConfig.filePath;
  }

  ngOnInit() {

    this.uploader = new FileUploader({
      url: this.appConfig.apiEndpoint + this.uploadUrl,
      autoUpload: false
    });

    if (!this.uploader.options.headers) {
      this.uploader.options.headers = [];
    }
    // this.uploader.options.headers.push({'name': 'Authorization', 'value': 'Bearer ' + UserToken.getValue().token});

    this.uploader.onCompleteAll = () => {
      this.uploader.clearQueue();
    };
    this.hasDropZoneOver = false;

    this.ImageThumbs = new Array<FileInfo>();
    this.otherTypeFiles = new Array<FileInfo>();

    for (let fileInfo of this.files) {
      let fileSuffix = fileInfo.fileName.substring(fileInfo.fileName.lastIndexOf('.'));
      //判断文件是图片还是其他格式文件
      let suffixs = ['.jpg', '.png', '.bmp'];
      if (suffixs.indexOf(fileSuffix) >= 0) {
        let index = fileInfo.url.lastIndexOf("_");
        let thumbFileInfo = new FileInfo();
        thumbFileInfo.url = fileInfo.url.substring(0, index);
        this.ImageThumbs.push(thumbFileInfo);
      } else {
        this.otherTypeFiles.push(fileInfo);
      }
    }
  }

  fileOver(e: any): void {
    this.hasDropZoneOver = e;
  }

  fileDropOver(e: any): void {
    this.uploadFile();
  }

  selectedFileOnChanged(e: any): void {
    this.uploadFile();
  }
  uploadFile() {

    this.uploader.queue.forEach(fileItem => {
      if (this.isImageUpload == null) {
        this.uploadFinished.emit(false);
        // console.log(111111);
        let suffixs = ['.jpg', '.png', '.bmp'];
        //上传图片
        if (fileItem.file.type.indexOf('image') > -1) {
          let fileSuffix = fileItem.file.name.substring(fileItem.file.name.lastIndexOf('.'));
          //符合图片格式要求
          if (suffixs.indexOf(fileSuffix) >= 0) {
            fileItem.onSuccess = (response, status, headers) => {
              this.uploadFinished.emit(true);
              if (status == 200) {
                let tempRes = JSON.parse(response);
                let fileInfo = new FileInfo();
                fileInfo.fileName = fileItem.file.name;
                fileInfo.url = tempRes.url;
                this.files.push(fileInfo);
                //缩略图
                for (let suffix of suffixs) {
                  if (fileInfo.url.includes(suffix)) {
                    let index = fileInfo.url.lastIndexOf("_");
                    let thumbFileInfo = new FileInfo();
                    thumbFileInfo.fileName = fileItem.file.name;
                    thumbFileInfo.url = fileInfo.url.substring(0, index);
                    this.ImageThumbs.push(thumbFileInfo);
                    break;
                  }
                }

              } else {
                //
              }
            };
            this.uploader.progress = 5;
            fileItem.upload();
          } else {
            this.notificationsService.info("system", "don't support " + fileSuffix + " file");
            this.uploader.queue.pop();
          }
        } else {
          //上传其他格式文件
          fileItem.onSuccess = (response, status, headers) => {
            this.uploadFinished.emit(true);
            if (status == 200) {
              let tempRes = JSON.parse(response);
              let fileInfo = new FileInfo();
              fileInfo.fileName = fileItem.file.name;
              fileInfo.url = tempRes.url;
              this.files.push(fileInfo);
              this.otherTypeFiles.push(fileInfo);

            } else {
              //
            }
          };
          this.uploader.progress = 5;
          fileItem.upload();
        }
      } else if (this.isImageUpload) {
        // console.log(22222222);
        if (fileItem.file.type.indexOf('image') < 0) {
          this.notificationsService.info("system", "only support upload image");
          this.uploader.queue.pop();
          return;
        } else {
          let suffixs = ['.jpg', '.png', '.bmp'];
          let fileSuffix = fileItem.file.name.substring(fileItem.file.name.lastIndexOf('.'));
          //符合图片格式要求
          if (suffixs.indexOf(fileSuffix) >= 0) {
            this.uploadFinished.emit(false);
            fileItem.onSuccess = (response, status, headers) => {
              this.uploadFinished.emit(true);
              if (status == 200) {
                let tempRes = JSON.parse(response);
                let fileInfo = new FileInfo();
                fileInfo.fileName = fileItem.file.name;
                fileInfo.url = tempRes.url;
                this.files.push(fileInfo);
                //缩略图
                for (let suffix of suffixs) {
                  if (fileInfo.url.includes(suffix)) {
                    let index = fileInfo.url.lastIndexOf("_");
                    let thumbFileInfo = new FileInfo();
                    thumbFileInfo.fileName = fileItem.file.name;
                    thumbFileInfo.url = fileInfo.url.substring(0, index);
                    this.ImageThumbs.push(thumbFileInfo);
                    break;
                  }
                }
              } else {
                //
              }
            };
            fileItem.onError = function (response, status, headers) {
              this.uploadFinished.emit(true);
            };
            this.uploader.progress = 5;
            fileItem.upload();
          } else {
            this.notificationsService.info("system", "don't support " + fileSuffix + " file");
            this.uploader.queue.pop();
          }
        }
      } else {
        // console.log(3333333333);
        if (fileItem.file.type.indexOf('image') > -1) {
          this.notificationsService.info("system", "don't support upload image");
          this.uploader.queue.pop();
        } else {
          // console.log(4444);
          //上传其他格式文件
          this.uploadFinished.emit(false);
          fileItem.onSuccess = (response, status, headers) => {
            this.uploadFinished.emit(true);
            if (status == 200) {
              let tempRes = JSON.parse(response);
              let fileInfo = new FileInfo();
              fileInfo.fileName = fileItem.file.name;
              fileInfo.url = tempRes.url;
              this.files.push(fileInfo);
              this.otherTypeFiles.push(fileInfo);

            } else {
              //
            }
          };
          fileItem.onError = function (response, status, headers) {
            this.uploadFinished.emit(true);
          };
          this.uploader.progress = 5;
          fileItem.upload();
        }
      }

    });
  }

  delelteImage(file: FileInfo) {
    let url = file.url + "_300x224" + file.url.substring(file.url.lastIndexOf('.'));
    let index: number;
    for (let fileInfo of this.files) {
      if (fileInfo.url == url) {
        index = this.files.indexOf(fileInfo);
      }
    }
    this.files.splice(index, 1);
    this.ImageThumbs.splice(this.ImageThumbs.indexOf(file), 1);
    if (this.files.length == 0) {
      this.uploader.progress = 0;
    }
  }

  delelteFile(file: FileInfo) {
    this.files.splice(this.files.indexOf(file), 1);
    this.otherTypeFiles.splice(this.otherTypeFiles.indexOf(file), 1);
    if (this.files.length == 0) {
      this.uploader.progress = 0;
    }
  }
}
