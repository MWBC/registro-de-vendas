import { CurrencyPipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { convertToFloat } from '../../utils';
import { GoalsService } from '../services/goals.service';

@Component({
  selector: 'app-modal-goal-store',
  templateUrl: './modal-goal-store.component.html',
  styleUrls: ['./modal-goal-store.component.scss'],
})
export class ModalGoalStoreComponent implements OnInit {

  @ViewChild('ionItem') ionItem: ElementRef;
  goalValue: string;
  showInvalidWarning = false;


  constructor(
    private modalController: ModalController, 
    private goalService: GoalsService
  ) { }

  ngOnInit() {}

  changeGoalValue(event: any) {

    this.showInvalidWarning = false;
    let currencyPipe = new CurrencyPipe('pt-BR', 'BRL');
    let value = convertToFloat(event);
    this.goalValue = currencyPipe.transform(value);
    console.log(this.ionItem['el'].classList);
  }

  async storeGoal() {

    if(this.goalService.validateGoalValue(this.goalValue)){

      this.goalService.storeGoal(this.goalValue);
      this.doDismiss();
      // showLoading('Atualizando meta...');

      // try{
  
      //   let resp = await this.goalService.updateGoal(id, this.goalValue);
  
      //   resp = JSON.parse(resp.data);
      //   console.log(resp);
      //   this.loadingController.dismiss('', '', 'defaultLoading');
      //   showAlert('Aviso', resp['success']);
      //   this.goalService.refreshView$
      // }catch(e){
  
      //   console.log(e);
      //   this.loadingController.dismiss('', '', 'defaultLoading');
      //   showAlert('Erro', e.error);
      // }
    }else{

      this.ionItem['el'].classList.remove('ion-valid');
      this.ionItem['el'].classList.add('ion-invalid');
      this.showInvalidWarning = true;
    }
  }

  doDismiss() {

    this.modalController.dismiss('', '', 'modalGoalStore');
  }
}