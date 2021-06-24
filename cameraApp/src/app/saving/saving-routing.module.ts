import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavingPage } from './saving.page';

const routes: Routes = [
  {
    path: '',
    component: SavingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavingPageRoutingModule {}
