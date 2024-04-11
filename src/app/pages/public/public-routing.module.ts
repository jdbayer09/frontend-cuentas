import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'info',
        loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
      },
      {
        path: 'activate/:code',
        loadChildren: () => import('./activate/activate.module').then(m => m.ActivateModule)
      },
      {
        path: 'change-pass/:code',
        loadChildren: () => import('./change-pass/change-pass.module').then(m => m.ChangePassModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'info'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
