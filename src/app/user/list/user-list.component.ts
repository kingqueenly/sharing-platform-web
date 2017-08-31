
import {Component, OnInit, Input} from "@angular/core";
import {UserProfile} from "../user-profile";
import {AppConfig} from "../../app-config";
/**
 * Created by hongying.fu on 1/20/2017.
 */
@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements  OnInit{
  @Input() userList: UserProfile[];
  filePath:string;

  constructor(private appConfig: AppConfig) {
    this.filePath=this.appConfig.filePath;
  }

  ngOnInit(): void {
  }
}
