import { Component } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {ModelStore} from '../../../@core/stores/model.store';
import {NbToastrService} from '@nebular/theme';


@Component({
  selector: 'ngx-user',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      trackName: {
        title: 'Track Name',
        type: 'string',
      },
      modelName: {
        title: 'Model Name',
        type: 'string',
      },
      ownerId: {
        title: 'Owner ID',
        type: 'string',
      },
      dateUploaded: {
        title: 'Date Uploaded',
        type: 'string',
      },
      time: {
        title: 'Time',
        type: 'string',
      },
    },
  };

  public source: LocalDataSource;

  constructor(
    private modelStore: ModelStore,
    // private modelService: ModelData,
    private toastrService: NbToastrService,
  ) {
    this.source = new LocalDataSource();
    this.loadData();
  }

  loadData() {
    this.modelStore.getAllModels().subscribe(models => {
      if (models) {
        // Load all models that are evaluated
        this.source.load(models.filter(model => model.isEvaluated)).then(r =>
          this.toastrService.success(
            '',
            'Data Loaded!',
          ));
        }
    });
  }

}
