import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'

import { ModalSaleStoreComponent } from './modal-sale-store.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [

        CommonModule, 
        ReactiveFormsModule, 
        FormsModule, 
        IonicModule
    ], 
    declarations: [ModalSaleStoreComponent]
})
export class ModalSaleStoreModule {}