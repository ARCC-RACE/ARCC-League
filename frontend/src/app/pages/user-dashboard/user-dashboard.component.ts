import { Component, OnInit } from '@angular/core';
import {ModelData} from '../../@core/interfaces/common/model';
import {ModelStore} from '../../@core/stores/model.store';
import {UserStore} from '../../@core/stores/user.store';

@Component({
  selector: 'ngx-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private modelService: ModelData,
    private modelStore: ModelStore,
    private userStore: UserStore,
  ) {
  }

  ngOnInit() {
    this.modelService.getUsersModels(this.userStore.getUser().id).subscribe(models => {
      models ? this.modelStore.setModels(models) : '';
    });
  }

}
