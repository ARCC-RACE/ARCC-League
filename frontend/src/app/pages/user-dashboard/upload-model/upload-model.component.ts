import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { NbToastrService } from '@nebular/theme';
import { FormControl } from '@angular/forms';

const URL = 'path_to_api';

@Component({
  selector: 'ngx-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.scss'],
})
export class UploadModelComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL});

  constructor(private toastrService: NbToastrService) { }

  ngOnInit() {

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('File Failed', item);
      const duration = 0;
      status = 'danger';
      this.toastrService.show('Contact Support', 'Error Uploading', { status, duration });
    };
  }

  modelNameControl = new FormControl();
  modelDescriptionControl = new FormControl();

}
