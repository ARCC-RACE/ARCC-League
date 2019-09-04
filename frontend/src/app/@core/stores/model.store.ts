import { Injectable } from '@angular/core';
import { Model } from '../interfaces/common/model';

@Injectable({
  providedIn: 'root',
})
export class ModelStore {
  private model: Model;

  getModel(): Model {
    return this.model;
  }

  setModel(paramModel: Model) {
    this.model = paramModel;
  }
}
