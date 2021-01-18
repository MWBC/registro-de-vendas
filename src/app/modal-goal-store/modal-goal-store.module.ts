import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalGoalStoreComponent } from './modal-goal-store.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({

    imports: [
        CommonModule, 
        IonicModule, 
        FormsModule
    ], 
    declarations: [ModalGoalStoreComponent]
})
export class ModalGoalStoreModule{}