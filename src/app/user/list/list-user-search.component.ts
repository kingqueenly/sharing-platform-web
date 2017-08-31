import {Component, OnInit} from "@angular/core";
import {UserProfile} from "../user-profile";
import {PagedList} from "../../home/pagedlist";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {AppConfig} from "../../app-config";
import {UserService} from "../user.service";
/**
 * Created by paulliu on 2016/12/7.
 */



@Component({
  selector: 'content',
  templateUrl: './list-user-search.component.html'
})
export class ListUserSearchComponent implements OnInit{
  pagedList: PagedList<UserProfile>;
  searchUserItems:string[];
  searchItem:string;
  inputValue:string;
  filePath:string;
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute,private appConfig: AppConfig) {
    this.pagedList = new PagedList<UserProfile>();
    this.searchUserItems=this.appConfig.searchUserItems;
    this.searchItem=this.searchUserItems[0];
    this.filePath=this.appConfig.filePath;
  }
  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let item = params['item'];
      let inputValue=params['inputValue'];
      this.inputValue=inputValue;
      let condition=new UserProfile(null, null, null, null, null, null, null,null,null,null,null,null,null,null,null,null);
      if(item=='Name'){
        condition.username=inputValue;
      }else if(item=='Skill'){
        condition.professional=inputValue;
      }else if(item=='Department'){
        condition.department=inputValue;
      }

      this.userService.searchUserList(1,condition).then(users=>{
        // console.log(condition.username);
        // console.log(condition.professional);
        // console.log(condition.department);
        // console.log(users.list);
        // console.log(users.list.length);
        if(users != null && users.list != null) {
          this.pagedList=users;
          //console.log("user size:"+this.pagedList.list.length);
        }
      });
    });

  }

  showMore(){
    this.userService.searchUserList(this.pagedList.pageNum + 1)
      .then(
        users => {
          var nextPagedList = users;
          this.pagedList.pageNum = nextPagedList.pageNum;
          this.pagedList.pageSize = nextPagedList.pageSize;
          this.pagedList.size = nextPagedList.size;
          this.pagedList.total = nextPagedList.total;
          this.pagedList.pages = nextPagedList.pages;
          for (let user of nextPagedList.list) {
            this.pagedList.list.push(user);
          }
          this.pagedList.hasPreviousPage = nextPagedList.hasPreviousPage;
          this.pagedList.hasNextPage = nextPagedList.hasNextPage;
          this.pagedList.firstPage = nextPagedList.firstPage;
          this.pagedList.lastPage = nextPagedList.lastPage;
        }
      );
  }

  selectSearchItem(event, item): void {
    event.preventDefault();
    this.searchItem = item;
  }

  searchUser(){
    if(this.inputValue==undefined || this.inputValue==null){
      this.inputValue='';
    }
    this.router.navigate(['/user/search', this.searchItem, this.inputValue]);

  }
}
