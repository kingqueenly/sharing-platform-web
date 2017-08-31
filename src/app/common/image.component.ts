/**
 * Created by paul.a.liu on 2/10/2017.
 */

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'img-popup',
  template: `<img class="img-responsive img-thumbnail" src="{{thumbUrl}}" (click)="imgModal.open()">
<modal #imgModal modalClass="modal-lg" [hideCloseButton]="true">
  <modal-content>
    <img class="img-responsive" src="{{originalUrl}}">
  </modal-content>
  <modal-footer>
    <button class="btn btn-primary" (click)="imgModal.close()">Close</button>
  </modal-footer>
</modal>
`
})
export class ImageComponent implements OnInit {
  ngOnInit(): void {
    this.thumbUrl = this.imageUrl;
    this.originalUrl = this.thumbUrl.substring(0, this.thumbUrl.indexOf('_'));
  }

  @Input() imageUrl: string;
  thumbUrl: string;
  originalUrl: string;
}
