import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-progress-popover',
  templateUrl: './progress-popover.component.html',
  styleUrls: ['./progress-popover.component.scss'], 

})
export class ProgressPopoverComponent implements OnInit {
  
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  doDismiss() {

    this.popoverController.dismiss().then(() => {

      console.log('popover fechado');
    });
  }
}
