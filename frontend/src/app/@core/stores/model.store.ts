import { Injectable } from '@angular/core';
import { Model } from '../interfaces/common/model';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

/**
 * Temporarily holds userModels in local storage to prevent having to make multiple API calls for the same purpose
 */
@Injectable({
  providedIn: 'root',
})
export class ModelStore {
  private userModels: Subject<Model[]> = new Subject<Model[]>();
  private allModels: Subject<Model[]> = new Subject<Model[]>();

  /**
   * Gets all userModels
   */
  getUserModels(): Subject<Model[]> {
    return this.userModels;
  }

  /**
   * Sets model in storage
   * @param paramModel
   */
  setUserModels(paramModel: Model[]) {
    this.userModels.next(paramModel);
  }
}
