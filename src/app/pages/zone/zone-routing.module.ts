import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneComponent } from './zone.component';

const routes: Routes = [
  {
    path: '',
    component: ZoneComponent,
    children: [
      {
        path: 'dashboard',
        data: {
          breadcrumb: 'Dashboard'
        },
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'categories',
        data: {
          breadcrumb: 'Categorías'
        },
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'payment-methods',
        data: {
          breadcrumb: 'Métodos de Pago'
        },
        loadChildren: () => import('./payment-methods/payment-methods.module').then(m => m.PaymentMethodsModule)
      },
      {
        path: 'cash-receipts',
        data: {
          breadcrumb: 'Ingresos'
        },
        loadChildren: () => import('./cash-receipts/cash-receipts.module').then(m => m.CashReceiptsModule)
      },
      {
        path: 'costs',
        data: {
          breadcrumb: 'Gastos'
        },
        loadChildren: () => import('./costs/costs.module').then(m => m.CostsModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneRoutingModule { }
