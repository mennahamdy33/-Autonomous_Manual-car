import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Mode2Page } from './mode2.page';

const routes: Routes = [
  {
    path: '',
    component: Mode2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Mode2PageRoutingModule {}
