/**
 * Created by AMC on 2017/6/28.
 */

import {Injectable}    from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {HttpService} from "../common/http.service";
import {PagedList} from "../home/pagedlist";
import {Question} from "./question";
import {QuestionResult} from "./question-result";
import {FAQQueryParameter} from "./faq-query-parameter";
import {UserProfile} from "../user/user-profile";

@Injectable()
export class FAQService {

    private createUrl = "/faq/question/create";
    private listUrl = "/faq/question/search/";
    private getUrl = "/faq/question/";
    private replyUrl = "/faq/question/{id}/reply";
    private solvedUrl = "/faq/question/{id}/useful";
    private unsolvedUrl = "/faq/question/{id}/unuseful";

    constructor(private httpHelper: HttpService) {
    }

    createQuestion(question: Question): Promise<number> {
        return this.httpHelper.post(this.createUrl, question);
    }

    getQuestion(questionId: string): Promise<QuestionResult> {
        return this.httpHelper.get(this.getUrl + questionId);
    }

    listQuestions(pageNo: number = 1, paramter: any = null): Promise<PagedList<QuestionResult>>{
        return this.httpHelper.post(this.listUrl + pageNo, paramter);
    }

    listMyQuestions(pageNo: number = 1): Promise<PagedList<QuestionResult>>{
        let paramter: FAQQueryParameter = new FAQQueryParameter();
        paramter.creatorId = UserProfile.getValue().id;
        return this.httpHelper.post(this.listUrl + pageNo, paramter);
    }

    replyAnswer(questionId: string, answer: string): Promise<void> {
        let question: Question = new Question();
        question.answer = answer;
        return this.httpHelper.post(this.replyUrl.replace("{id}", questionId), question);
    }

    makeQuestionUseful(questionId: string): Promise<void> {
        return this.httpHelper.post(this.solvedUrl.replace("{id}", questionId));
    }

    makeQuestionUnuseful(questionId: string): Promise<void> {
        return this.httpHelper.post(this.unsolvedUrl.replace("{id}", questionId));
    }

}
