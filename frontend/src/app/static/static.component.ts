import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-static',
  template: `
    <nb-layout>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['./static.component.scss'],
})
export class StaticComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
