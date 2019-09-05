import {Component, Input } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {Model, ModelData} from '../../../@core/interfaces/common/model';
import {ModelStore} from '../../../@core/stores/model.store';

@Component({
  selector: 'ngx-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss'],
})

export class ModelListComponent {

  settings = {
    actions: {
      add: false,
    },
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      modelDescription: {
        title: 'Model Description',
        type: 'string',
      },
      _id: {
        title: 'Model ID',
        type: 'string',
      },
      dateUploaded: {
        title: 'Date Uploaded',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
      time: {
        title: 'Time',
        type: 'string',
      },
      video: {
        title: 'Video',
        type: 'string',
      },
      isPaid: {
        title: 'Paid',
        type: 'boolean',
      },
    },
  };

  source: LocalDataSource;

  constructor(
    private modelStore: ModelStore,
  ) {
    this.source = new LocalDataSource();
    this.modelStore.getUserModels().subscribe(models => {
      if (models) {
        console.log(models)
        this.source.load(models);
      }
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}
