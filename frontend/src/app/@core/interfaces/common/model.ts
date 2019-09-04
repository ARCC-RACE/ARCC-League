import {Observable} from 'rxjs';

export interface Model {
  id: string;
  ownerId: string;
  trackName: string; // Track model was tested on)
  modelName: string; // (Name of the model) Can be changed by User
  modelDescription: string; // (User description) Can be changed by User
  dateUploaded: string; // (Date the model was uploaded)
  isEvaluated: boolean;
  time: string; // (Encoded Time it completed track)
  speedTested: string; // (Speed the model was tested at (percentage))
  videoLink: string; // (Link to video upload)
  modelLink: string; // (Link to the file)
  modelId: string;
  invoiceNumber: string; // (Paypal Order ID)
  isPaid: boolean; // (If users payed for it yet)
}

export abstract class ModelData {
  abstract getAllModels(): Observable<Model[]>;
  abstract getById(id: number): Observable<Model>;
  abstract create(model: any): Observable<Model>;
  abstract update(model: any): Observable<Model>;
  abstract delete(id: number): Observable<boolean>;
}
