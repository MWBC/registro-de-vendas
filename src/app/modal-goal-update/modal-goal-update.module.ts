import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalGoalUpdateComponent } from './modal-goal-update.component';

@NgModule({
    imports: [
        CommonModule, 
        IonicModule, 
        FormsModule
    ], 
    declarations: [ModalGoalUpdateComponent]
})
export class ModalGoalUpdateModule {}