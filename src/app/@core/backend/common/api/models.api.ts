import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map} from 'rxjs/operators';

@Injectable()
export class ModelsApi {
  private readonly apiController: string = 'models';

  constructor(private api: HttpService) {}

  getAllModels(): Observable<any> {
    return this.api.get(`${this.apiController}`)
      .pipe(map(data => {
        return data;
    }));
  }

  getUsersModels(userid: string): Observable<Array<any>> {
    return this.api.get(`${this.apiController}/usersmodels/${userid}`)
      .pipe(map(data => {
        return data;
      }));
  }

  get(id: string): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  delete(id: string): Observable<any> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  update(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/${item.id}`, item);
  }
}
