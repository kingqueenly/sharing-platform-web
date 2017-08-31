import {Component, OnInit, OnDestroy} from "@angular/core";
import {QuestionResult} from "./question-result";
import {FAQService} from "./faq.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'content',
    templateUrl: 'faq-question-detail.component.html'
})
export class FAQQuestionDetailComponent implements OnInit, OnDestroy {

    question: QuestionResult;
    isUseful: boolean;
    showReplyBlock: boolean;

    constructor(private faqService: FAQService, private route: ActivatedRoute, private router: Router) {
        this.question = new QuestionResult();
        this.showReplyBlock = false;
    }

    ngOnInit(): void {
        if (this.router.url.indexOf("management") >= 0) {
            this.showReplyBlock = true;
        }
        this.route.params.forEach((params: Params) => {
            let questionId = params['id'];
            this.faqService.getQuestion(questionId).then(question => {
                this.question = question;
                this.isUseful = question.useful;
            });
        });

    }

    ngOnDestroy() {

    }

    markYes() {
        this.faqService.makeQuestionUseful(this.question.id).then(() => {
            this.isUseful = true;
        });
    }

    markNo() {
        this.faqService.makeQuestionUnuseful(this.question.id).then(() => {
            this.isUseful = false;
        });
    }

    submitReply() {
        this.faqService.replyAnswer(this.question.id, this.question.answer).then(() => {
            this.router.navigate(['/management/panel/feedback']);
        });
    }

}
