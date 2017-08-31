/**
 * Created by paulliu on 2017/1/14.
 */

import {Component, Input, OnInit} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'page-transition',
  template: '<div [style.min-height]="autoHeight"><ng-content></ng-content></div>'
})
export class PageTransition implements  OnInit {
  @Input() scrollTop = true;
  autoHeight: string = "360px";
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        setTimeout(() => {
          if (this.scrollTop) {
            window.scrollTo(0, 0);
          }
        }, 300);
      }
    });
  }

  ngOnInit(): void {
    let windowHeight = window.outerHeight - 180;
    //console.log("height:" + windowHeight);
    this.autoHeight = windowHeight + "px";
  }
}
