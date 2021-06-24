import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavingPageRoutingModule } from './saving-routing.module';

import { SavingPage } from './saving.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavingPageRoutingModule
  ],
  declarations: [SavingPage]
})
export class SavingPageModule {}
