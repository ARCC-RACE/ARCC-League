import {Component, Input, OnInit} from '@angular/core';
import {NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';

@Component({
  selector: 'ngx-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss'],
})

export class ModelListComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
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
      modelId: {
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
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
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
