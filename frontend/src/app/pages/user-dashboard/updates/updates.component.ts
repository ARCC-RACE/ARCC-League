import { Component, OnInit } from '@angular/core';
import {Update, UserData} from '../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
})
export class UpdatesComponent implements OnInit {

  updates: Update[];

  constructor(
    private userService: UserData,
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.updates = user.updates;
    });
  }

}
