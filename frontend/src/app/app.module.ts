import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { AuthModule } from './@auth/auth.module';
import { InitUserService } from './@theme/services/init-user.service';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import { MarkdownModule } from 'ngx-markdown';

import {NbEvaIconsModule} from '@nebular/eva-icons';
import {StaticModule} from './static/static.module';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import {CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x/';
import {environment} from '../environments/environment';

export const cloudinary = {
  Cloudinary: CloudinaryCore,
};

export const config: CloudinaryConfiguration = environment.cloudinary.upload;

export function init_app(injector: Injector) {
  return () =>
    new Promise<any>((resolve: Function) => {
      const initUserService = injector.get(InitUserService);
      initUserService.initCurrentUser().subscribe(() => { },
          error => {
        if (error.status === 401) {
          resolve();
        } else {
          throw new Error(error);
        } }, () => resolve());
    });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StaticModule,

    ThemeModule.forRoot(),
    AuthModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbEvaIconsModule,
    CoreModule.forRoot(),
    MarkdownModule.forRoot(),
    CloudinaryModule.forRoot({Cloudinary: CloudinaryCore}, environment.cloudinary.upload as CloudinaryConfiguration),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [Injector],
      multi: true,
    },
  ],
})
export class AppModule {
}
