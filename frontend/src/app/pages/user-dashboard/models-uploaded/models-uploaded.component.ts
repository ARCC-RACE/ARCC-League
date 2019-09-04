import { Component, OnInit } from '@angular/core';
import {ModelData} from '../../../@core/interfaces/common/model';

@Component({
  selector: 'ngx-models-uploaded',
  templateUrl: './models-uploaded.component.html',
  styleUrls: ['./models-uploaded.component.scss'],
})
export class ModelsUploadedComponent implements OnInit {

  constructor(
    private modelService: ModelData,
  ) { }

  ngOnInit() {
    this.modelService.getAllModels().subscribe(models => {
      console.log(models);
    });
    // console.log()
  }
}
