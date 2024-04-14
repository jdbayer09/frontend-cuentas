import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, noAuthGuard } from './guards/auth';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'z',
    pathMatch: 'full'
  },
  {
    path: 'p',
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule),
    canActivate: [noAuthGuard]
  },
  {
    path: 'z',
    loadChildren: () => import('./pages/zone/zone.module').then(m => m.ZoneModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'z'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
