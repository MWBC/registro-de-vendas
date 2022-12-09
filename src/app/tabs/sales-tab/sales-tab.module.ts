import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesTabPageRoutingModule } from './sales-tab-routing.module';
import { ModalSaleShowModule } from '../../modal-sale-show/modal-sale-show.module';
import { ModalSaleStoreModule } from '../../modal-sale-store/modal-sale-store.module';

import { SalesTabPage } from './sales-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesTabPageRoutingModule, 
    ModalSaleShowModule, 
    ModalSaleStoreModule
  ],
  declarations: [SalesTabPage]
})
export class SalesTabPageModule {}
