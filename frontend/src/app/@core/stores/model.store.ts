import { Injectable } from '@angular/core';
import { Model } from '../interfaces/common/model';
import {BehaviorSubject, Observable} from 'rxjs';

/**
 * Temporarily holds models in local storage to prevent having to make multiple API calls for the same purpose
 */
@Injectable({
  providedIn: 'root',
})
export class ModelStore {
  private models: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>(null);

  /**
   * Gets all models
   */
  getModels(): BehaviorSubject<Model[]> {
    return this.models;
  }

  /**
   * Sets model in storage
   * @param paramModel
   */
  setModels(paramModel: Model[]) {
    this.models.next(paramModel);
  }
}
