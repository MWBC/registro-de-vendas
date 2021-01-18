import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainTabPageRoutingModule } from './main-tab-routing.module';

import { ChartsModule } from 'ng2-charts';
import { ProgressPopoverComponentModule } from '../../progress-popover/progress-popover.module';
import { ProgressButtonsPopoverComponentModule } from '../../progress-buttons-popover/progress-buttons-popover.module';
import { MainTabPage } from './main-tab.page';
import { ModalGoalUpdateModule } from './../../modal-goal-update/modal-goal-update.module';
import { ModalGoalStoreModule } from './../../modal-goal-store/modal-goal-store.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainTabPageRoutingModule, 
    ChartsModule, 
    ProgressPopoverComponentModule, 
    ProgressButtonsPopoverComponentModule, 
    ModalGoalUpdateModule, 
    ModalGoalStoreModule

  ], 
  declarations: [MainTabPage]
})
export class MainTabPageModule {}
