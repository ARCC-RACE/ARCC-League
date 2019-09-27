import { Component, OnInit } from '@angular/core';
import {ModelStore} from '../../../@core/stores/model.store';

@Component({
  selector: 'ngx-models-uploaded',
  templateUrl: './models-uploaded.component.html',
  styleUrls: ['./models-uploaded.component.scss'],
})
export class ModelsUploadedComponent implements OnInit {

  modelsUploaded = 0;

  constructor(
    private modelStore: ModelStore,
  ) { }

  ngOnInit() {
    this.modelStore.getUserModels().subscribe(models => {
      this.modelsUploaded = models.length;
    });
  }
}
