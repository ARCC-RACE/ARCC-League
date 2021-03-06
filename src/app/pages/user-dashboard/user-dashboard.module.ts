import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { LeaderboardRankingComponent } from './leaderboard-ranking/leaderboard-ranking.component';
import { ModelsUploadedComponent } from './models-uploaded/models-uploaded.component';
import { ModelsAwaitingTestingComponent } from './models-awaiting-testing/models-awaiting-testing.component';
import { UpdatesComponent } from './updates/updates.component';
import { UploadModelComponent } from './upload-model/upload-model.component';
import {FsIconComponent, ModelListComponent} from './model-list/model-list.component';
import {
  NbAlertModule, NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule, NbStepperModule,
  NbTableModule, NbToastrModule,
  NbTreeGridModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const NB_MODULES = [
  NbCardModule,
  NbListModule,
  NbTreeGridModule,
  NbIconModule,
  NbTreeGridModule,
  NbInputModule,
  ThemeModule,
  NbTableModule,
  NbAlertModule,
  NbIconModule,
  NbButtonModule,
  NbToastrModule,
  NbInputModule,
  NbStepperModule,
  NbAlertModule,
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    LeaderboardRankingComponent,
    ModelsUploadedComponent,
    ModelsAwaitingTestingComponent,
    UpdatesComponent,
    UploadModelComponent,
    FsIconComponent,
    ModelListComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    FileUploadModule,
    ...NB_MODULES,
  ],

  providers: [
  ],
})
export class UserDashboardModule { }
