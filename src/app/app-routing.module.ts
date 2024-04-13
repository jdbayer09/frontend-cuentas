import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'z',
    pathMatch: 'full'
  },
  {
    path: 'p',
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'z',
    loadChildren: () => import('./pages/zone/zone.module').then(m => m.ZoneModule)
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
