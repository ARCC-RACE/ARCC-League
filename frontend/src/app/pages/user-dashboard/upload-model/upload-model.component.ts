import {Component, OnInit, Input, NgZone, ViewChild, Renderer2} from '@angular/core';
import {FileLikeObject, FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {NbToastrService} from '@nebular/theme';
import {Model, ModelData} from '../../../@core/interfaces/common/model';
import {UserStore} from '../../../@core/stores/user.store';
import {ModelStore} from '../../../@core/stores/model.store';
import {first} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ngx-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.scss'],
})
export class UploadModelComponent implements OnInit {
  responses: Array<any>;

  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  private title: string;
  private description: string;
  public uploaded: boolean = false;
  private uploadLink: string;
  public success: boolean;
  public errorMessage: string;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private toastrService: NbToastrService,
    private user: UserStore,
    private modelService: ModelData,
    private modelStore: ModelStore,
  ) {
    this.responses = [];
    this.title = '';
    this.description = '';
  }

  ngOnInit(): void {
    /**
     * Set uploader options
     */
    // const uploaderOptions: FileUploaderOptions = {
    //   url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
    //   autoUpload: true,
    //   isHTML5: true,
    //   removeAfterUpload: true,
    //   // allowedMimeType: ['image/png'], // Only allow certain types
    //   headers: [
    //     {
    //       name: 'X-Requested-With',
    //       value: 'XMLHttpRequest',
    //     },
    //   ],
    // };
    const uploaderOptions: FileUploaderOptions = {
      url: `${environment.apiUrl}/models/upload`,
      autoUpload: true,
      itemAlias: 'image',
      // isHTML5: true,
      // removeAfterUpload: true,
      // // allowedMimeType: ['image/png'], // Only allow certain types
      // headers: [
      //   {
      //     name: 'X-Requested-With',
      //     value: 'XMLHttpRequest',
      //   },
      // ],
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

    /**
     * When upload is complete
     * @param item
     * @param response
     * @param status
     * @param headers
     */
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
      if (status === 400) { // If the upload failed (server error, etc)
        this.showToast('Upload Failed',
          JSON.stringify(data),
          'danger');
        this.uploaded = false;
        this.responses = []; // Clear results
      } else if (status === 422) {
        this.responses = [];
        this.success = false;
        this.errorMessage = 'Are you sure you uploaded the right file?';
        this.toastrService.danger(
          this.errorMessage,
          'Upload Failed!',
        );
        this.uploaded = false;
      } else if (status === 200) { // TODO replace with proper status returner (if 200)
        // this.uploaded = true;
        this.uploadLink = data.modelUrl;
        // Uploads model data through to the databse
        this.uploadModelThroughApi(data).then(result => {
          if (result) {
            this.showToast('Completed Upload!',
              'We\'re working on evaluating your model, it\'ll be done soon!',
              'success');
            this.success = true;
          } else {
            this.showToast('Error Uploading to MongoDB!',
              'I think the backend must have died :(. Send Caelin an email caelinsutch@gmail.com',
              'danger');
            this.success = false;
          }
        });
        // Upload the cached models to show updates on the table
        this.modelStore.updateUsersModels();
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

  /**
   * Setter for value
   * @param value
   */
  updateTitle(value: string) {
    this.title = value;
  }

  /**
   * Setter for descirption
   * @param value
   */
  updateDescription(value: string) {
    this.description = value;
  }

  /**
   * If file is over the base
   * @param e
   */
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  /***
   * Gets file properties from uploaded file
   * @param fileProperties
   */
  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }

  /**
   * Simplifies showing toasts for me hehe
   * @param title
   * @param description
   * @param status
   */
  showToast(title, description, status) {
    this.toastrService.show(description, title, { status } );
  }

  /**
   * Uplaods file, acts as shadow because default file input is ugly
   */
  uploadFile() {
    const element: HTMLElement = document.getElementById('fileupload') as HTMLElement;
    element.click();
  }

  /**
   * Uploads model data to databse through API
   * @param data
   * @return Promise<boolean> If successful or not
   */
  uploadModelThroughApi(data): Promise<boolean> {
    const d = new Date();
    const n = d.toLocaleString();
    const newModel: Model = {
      id: null,
      ownerId: String(this.user.getUser().id),
      trackName: 're:Invent 2019',
      modelName: this.title, // (Name of the model) Can be changed by User
      modelDescription: this.description, // (User description) Can be changed by User
      dateUploaded: n, // (Date the model was uploaded)
      isEvaluated: false,
      time: null, // (Encoded Time it completed track)
      speedTested: null, // (Speed the model was tested at (percentage))
      videoLink: null, // (Link to video upload)
      modelLink: data.modelUrl, // (Link to the file)
      modelId: data.public_id,
      invoiceNumber: null, // (Paypal Order ID)
      isPaid: false, // (If users payed for it yet)
    };

    return new Promise(resolve => {
      this.modelService.create(newModel).pipe(first()).subscribe(res => {
        // @ts-ignore
        resolve(res.n === 1);
      });
    });
  }
}
