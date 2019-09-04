import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { StaticComponent } from './static.component';
import {StaticRoutingModule} from './static-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {NbLayoutModule} from '@nebular/theme';

@NgModule({
  declarations: [
    LandingPageComponent,
    StaticComponent,
  ],
  imports: [
    StaticRoutingModule,
    CommonModule,
    ThemeModule,
    NbLayoutModule,
  ],
})
export class StaticModule { }
