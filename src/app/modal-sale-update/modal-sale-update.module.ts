import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalSaleUpdateComponent } from './modal-sale-update.component';

@NgModule({
    imports: [

        CommonModule, 
        ReactiveFormsModule, 
        FormsModule
    ], 
    declarations: [ModalSaleUpdateComponent]
})

export class ModalSaleUpdateModule {}