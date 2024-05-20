import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashReceiptsComponent } from './cash-receipts.component';

const routes: Routes = [{ path: '', component: CashReceiptsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashReceiptsRoutingModule { }
