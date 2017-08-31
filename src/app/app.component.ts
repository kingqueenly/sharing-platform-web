import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet><simple-notifications [options]="options"></simple-notifications></router-outlet>`
})
export class AppComponent {

  options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  };

}
