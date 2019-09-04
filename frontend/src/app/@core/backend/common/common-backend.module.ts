import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';
import { CountryData } from '../../interfaces/common/countries';
import { CountriesService } from './services/countries.service';
import { CountriesApi } from './api/countries.api';
import { SettingsApi } from './api/settings.api';
import { NbAuthModule } from '@nebular/auth';
import { SettingsData } from '../../interfaces/common/settings';
import { SettingsService } from './services/settings.service';
import {ModelData} from '../../interfaces/common/model';
import {ModelsService} from './services/models.service';
import {ModelsApi} from './api/models.api';

const API = [UsersApi, CountriesApi, SettingsApi,  HttpService, ModelsApi];

const SERVICES = [
  { provide: UserData, useClass: UsersService },
  { provide: CountryData, useClass: CountriesService },
  { provide: SettingsData, useClass: SettingsService },
  { provide: ModelData, useClass: ModelsService },
];

@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
