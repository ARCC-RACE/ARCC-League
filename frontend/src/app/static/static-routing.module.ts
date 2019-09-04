import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StaticComponent } from './static.component';
import {LandingPageComponent} from './landing-page/landing-page.component';

const routes: Routes = [{
  path: '',
  component: StaticComponent,
  children: [
    {
      path: '',
      component: LandingPageComponent,
    },
    {
      path: '**',
      component: LandingPageComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticRoutingModule { }
