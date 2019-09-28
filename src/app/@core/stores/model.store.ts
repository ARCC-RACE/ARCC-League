import { Injectable } from '@angular/core';
import {Model, ModelData} from '../interfaces/common/model';
import {Subject} from 'rxjs';
import {UserStore} from './user.store';

/**
 * Temporarily holds userModels in local storage to prevent having to make multiple API calls for the same purpose
 */
@Injectable({
  providedIn: 'root',
})
export class ModelStore {

  constructor(
    private  userStore: UserStore,
    private modelService: ModelData,
  ) { }

  private userModels: Subject<Model[]> = new Subject<Model[]>();
  private allModels: Subject<Model[]> = new Subject<Model[]>();

  /**
   * Updates current users models
   */
  updateUsersModels() {
    this.modelService.getUsersModels(this.userStore.getUser().id).subscribe(models => {
      models ? this.setUserModels(models) : '';
    });
  }

  updateAllModels() {
    this.modelService.getAllModels().subscribe(models => {
      models ? this.setAllModels(models) : '';
    });
  }

  // GETTERS AND SETTERS
  getUserModels(): Subject<Model[]> { return this.userModels; }
  setUserModels(paramModel: Model[]) { this.userModels.next(paramModel); }
  getAllModels(): Subject<Model[]> { return this.allModels; }
  setAllModels(paramModel: Model[]) { this.allModels.next(paramModel); }
}
