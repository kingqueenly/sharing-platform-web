import {Component, OnInit, OnDestroy} from "@angular/core";
import {Question} from "./question";
import {FAQService} from "./faq.service";
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'content',
    templateUrl: 'faq-needhelp.component.html'
})
export class FAQNeedHelpComponent implements OnInit, OnDestroy{

    customForm = new FormGroup({
        question: new FormControl('', [Validators.maxLength(500)]),
    });

    question: Question;
    processing: boolean = false;
    submitBtnText: string = "Submit";
    success: boolean = false;

    constructor(private faqService: FAQService) {
        this.question = new Question();
    }

    ngOnInit(): void {

    }

    ngOnDestroy() {

    }

    setSubmitBtnStatus(processing: boolean) {
        if (processing) {
            this.submitBtnText = "Process...";
            this.processing = processing;
        } else {
            this.submitBtnText = "Submit";
            this.processing = false;
        }
    }

    submitQuestion(){
        this.setSubmitBtnStatus(true);
        this.faqService.createQuestion(this.question).then((id)=>{
            this.question.question = "";
            this.setSubmitBtnStatus(false);
            console.log(id);
            this.success = true;
        });
    }
}
