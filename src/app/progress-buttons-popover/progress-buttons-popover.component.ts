import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { GoalsService } from './../services/goals.service';
import { ModalGoalUpdateComponent } from './../modal-goal-update/modal-goal-update.component';

@Component({
  selector: 'app-progress-buttons-popover',
  templateUrl: './progress-buttons-popover.component.html',
  styleUrls: ['./progress-buttons-popover.component.scss'],
})
export class ProgressButtonsPopoverComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private goalService: GoalsService, 
    private modalController: ModalController) { }

  ngOnInit() {}

  async showUpdateGoalModal(goalId: number) {

    const modal = await this.modalController.create({

      component: ModalGoalUpdateComponent, 
      componentProps: {

        id: goalId
      }, 
      id: 'goalUpdateModal', 
      cssClass: 'customModal'
    });

    await modal.present();

    console.log('Id da meta: ', goalId);
  }

  async deleteGoal(goalId: number) {

    await this.goalService.confirmeDeleteGoalAlert(goalId);
    console.log('Id da meta: ', goalId);

  }

  doDismiss() {

    this.popoverController.dismiss().then(() => {

      console.log('popover fechado');
    });
  }
}
