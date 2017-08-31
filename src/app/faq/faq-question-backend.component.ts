import {Component, OnInit, OnDestroy} from "@angular/core";
import {QuestionResult} from "./question-result";
import {FAQService} from "./faq.service";
import {PagedList} from "./../home/pagedlist";

@Component({
    selector: 'content',
    templateUrl: 'faq-question-backend.component.html'
})
export class FAQQuestionBackendComponent implements OnInit, OnDestroy{

    pagedList: PagedList<QuestionResult>;

    constructor(private faqService: FAQService) {
        this.pagedList = new PagedList<QuestionResult>();
    }

    ngOnInit(): void {
        this.faqService.listQuestions(1).then(questions => {
            this.pagedList = questions;
        });
    }

    ngOnDestroy() {

    }

    showMore() {
        this.faqService.listQuestions(this.pagedList.pageNum + 1)
            .then(
                questions => {
                    var nextPagedList = questions;
                    this.pagedList.pageNum = nextPagedList.pageNum;
                    this.pagedList.pageSize = nextPagedList.pageSize;
                    this.pagedList.size = nextPagedList.size;
                    this.pagedList.total = nextPagedList.total;
                    this.pagedList.pages = nextPagedList.pages;
                    for (let question of nextPagedList.list) {
                        this.pagedList.list.push(question);
                    }
                    this.pagedList.hasPreviousPage = nextPagedList.hasPreviousPage;
                    this.pagedList.hasNextPage = nextPagedList.hasNextPage;
                    this.pagedList.firstPage = nextPagedList.firstPage;
                    this.pagedList.lastPage = nextPagedList.lastPage;
                }
            );
    }

}
