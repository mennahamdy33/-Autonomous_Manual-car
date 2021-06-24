import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mode1Page } from './mode1.page';

const routes: Routes = [
  {
    path: '',
    component: Mode1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mode1PageRoutingModule {}
