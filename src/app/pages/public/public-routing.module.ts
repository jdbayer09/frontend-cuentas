import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from '../../guards/auth';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
        canActivate: [noAuthGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        canActivate: [noAuthGuard]
      },
      {
        path: 'forgot-pass',
        loadChildren: () => import('./forgot-pass/forgot-pass.module').then(m => m.ForgotPassModule),
        canActivate: [noAuthGuard]
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
        redirectTo: 'login'
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
