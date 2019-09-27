import { Component, OnInit } from '@angular/core';
import {ModelStore} from '../../../@core/stores/model.store';

@Component({
  selector: 'ngx-models-awaiting-testing',
  templateUrl: './models-awaiting-testing.component.html',
  styleUrls: ['./models-awaiting-testing.component.scss'],
})
export class ModelsAwaitingTestingComponent implements OnInit {

  modelsAwaitingTesting: number;

  constructor(
    private modelStore: ModelStore,
  ) { }

  ngOnInit() {
    this.modelStore.getUserModels().subscribe(models => {
      for (let i = 0; i < models.length; i++) {
        if (!models[i].isEvaluated) {
          models.splice(i, 1);
        }
      }
      this.modelsAwaitingTesting = models.length;
    });
  }

}
