import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mode1PageRoutingModule } from './mode1-routing.module';

import { Mode1Page } from './mode1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mode1PageRoutingModule
  ],
  declarations: [Mode1Page]
})
export class Mode1PageModule {}
