import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalSaleShowComponent } from './modal-sale-show.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({

    imports: [
        CommonModule, 
        IonicModule, 
        FormsModule
    ], 
    declarations: [ModalSaleShowComponent]
})
export class ModalSaleShowModule{}