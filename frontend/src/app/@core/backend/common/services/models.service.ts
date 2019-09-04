import { Injectable } from '@angular/core';
import {Model, ModelData} from '../../../interfaces/common/model';
import {ModelsApi} from '../api/models.api';
import {Observable} from 'rxjs';

@Injectable()
export class ModelsService extends ModelData {

  constructor(private api: ModelsApi) {
    super();
  }

  getAllModels(): Observable<Model[]> {
    return this.api.getAllModels();
  }

  getById(id: number): Observable<Model> {
    return this.api.get(id);
  }

  create(model: any): Observable<Model> {
    return this.api.add(model);
  }

  update(model: any): Observable<Model> {
    return this.api.update(model);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
