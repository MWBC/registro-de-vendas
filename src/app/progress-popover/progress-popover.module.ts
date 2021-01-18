import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressPopoverComponent } from './progress-popover.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [ProgressPopoverComponent]
})
export class ProgressPopoverComponentModule {}