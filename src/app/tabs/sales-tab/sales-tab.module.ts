import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesTabPageRoutingModule } from './sales-tab-routing.module';

import { SalesTabPage } from './sales-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesTabPageRoutingModule
  ],
  declarations: [SalesTabPage]
})
export class SalesTabPageModule {}
