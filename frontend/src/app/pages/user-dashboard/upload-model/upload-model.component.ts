import {Component, OnInit, Input, NgZone, ViewChild, Renderer2} from '@angular/core';
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {Cloudinary} from '@cloudinary/angular-4.x';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.scss'],
})
export class UploadModelComponent implements OnInit {
  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;
  private description: string;
  public uploaded: boolean = false;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private toastrService: NbToastrService,
  ) {
    this.responses = [];
    this.title = '';
    this.description = '';
  }

  ngOnInit(): void {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest',
        },
      ],
    };
    this.uploader = new FileUploader(uploaderOptions);

    // Add custom tag for displaying the uploaded photo in the list
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      const tags = 'model';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
      }
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      const data = JSON.parse(response);
      upsertResponse(
        {
          file: item.file,
          status,
          data,
        },
      );
      this.uploaded = true;
      if (status === 400) {
        this.showToast('Upload Failed',
          JSON.stringify(data),
          'danger');
        this.uploaded = false;
        this.responses = []; // Clear results
      } else {
        this.showToast('Completed Upload!',
          'We\'re working on evaluating your model, it\'ll be done soon!',
          'success');
        this.uploaded = true;
        // console.log(data);
      }

    };


    this.uploader.onProgressItem = (fileItem: any, progress: any) =>
      upsertResponse(
        {
          file: fileItem.file,
          progress,
        },
      );
  }

  updateTitle(value: string) {
    this.title = value;
  }

  updateDescription(value: string) {
    this.description = value;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }

  showToast(title, description, status) {
    this.toastrService.show(description, title, { status } );
  }

  uploadFile() {
    const element: HTMLElement = document.getElementById('fileupload') as HTMLElement;
    element.click();
  }
}
