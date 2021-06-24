import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Mode2PageRoutingModule } from './mode2-routing.module';

import { Mode2Page } from './mode2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Mode2PageRoutingModule
  ],
  declarations: [Mode2Page]
})
export class Mode2PageModule {}
