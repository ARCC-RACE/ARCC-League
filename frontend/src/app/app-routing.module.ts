import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/auth.guard';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('app/@auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import ('app/static/static.module')
      .then((m => m.StaticModule),
      ),
  },
  // { path: '', redirectTo: 'landing-', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing-page' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
