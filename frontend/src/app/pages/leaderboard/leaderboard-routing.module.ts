

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardComponent } from './leaderboard.component';
import { BoardComponent } from './board/board.component';
import { AdminGuard } from '../../@auth/admin.guard';

const routes: Routes = [{
  path: '',
  component: LeaderboardComponent,
  children: [
    {
      path: 'edit/:id',
      canActivate: [AdminGuard],
      component: LeaderboardComponent,
    },
    {
      path: 'current',
      component: BoardComponent,
    },
    {
      path: 'add',
      canActivate: [AdminGuard],
      component: LeaderboardComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderboardRoutingModule {

}
