import { Injectable } from '@angular/core';
import { User } from '../interfaces/common/users';
import {Model} from '../interfaces/common/model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user: User;
  private userModels: Model[];

  getUser(): User {
      return this.user;
  }

  setUser(paramUser: User) {
      this.user = paramUser;
  }

  getModels(): Model[] {
    return this.userModels;
  }

  setModels(paramModels: Model[]) {
    this.userModels = paramModels;
  }

  setSetting(themeName: string) {
    if (this.user) {
      if (this.user.settings) {
        this.user.settings.themeName = themeName;
      } else {
        this.user.settings = { themeName: themeName };
      }
    }
  }
}
