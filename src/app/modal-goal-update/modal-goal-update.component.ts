import { element } from 'protractor';
import { ModalController, LoadingController } from '@ionic/angular';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { convertToFloat, showAlert, showLoading } from '../../utils';
import { HTTP } from '@ionic-native/http/ngx';
import { GoalsService } from './../services/goals.service';

@Component({
  selector: 'app-modal-goal-update',
  templateUrl: './modal-goal-update.component.html',
  styleUrls: ['./modal-goal-update.component.scss'],
})
export class ModalGoalUpdateComponent implements OnInit {

  @ViewChild('ionItem') ionItem: ElementRef;
  goalValue: string;
  showInvalidWarning = false;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private http: HTTP,
    private goalService: GoalsService,
  ) {}

  ngOnInit() {


  }

  //criar nova funcao para converter a entrada para float
  changeGoalValue(event: any) {

    this.showInvalidWarning = false;
    let currencyPipe = new CurrencyPipe('pt-BR', 'BRL');
    let value = convertToFloat(event);
    this.goalValue = currencyPipe.transform(value);
    console.log(this.ionItem['el'].classList);
  }

  //atualizar a meta mensal
  async updateGoal(id: any) {

    console.log('BOTAO PRESSIONADO');
    if(this.goalService.validateGoalValue(this.goalValue)){

      this.goalService.updateGoal(id, this.goalValue);
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

      console.log('BOTAO PRESSIONADO 2');

      this.ionItem['el'].classList.remove('ion-valid');
      this.ionItem['el'].classList.add('ion-invalid');

      this.showInvalidWarning = true;
    }
  }
  doDismiss() {

    this.modalController.dismiss('', '', 'goalUpdateModal');
  }
//   changeGoalValue(event: any) {

//     var valor = event;
//     valor = valor + '';
//     valor = parseInt(valor.replace(/[\D]+/g, ''));
//     valor = valor + '';

//     if(valor.length == 1){

//       valor = valor.replace(/(\d)/g, '00,0$1');
//     }else if(valor.length == 2){

//       valor = valor.replace(/(\d{2})/g, '00,$1');
//     }else {

//       valor = valor.replace(/([0-9]{2})$/g, ",$1");

//     }

//     if (valor.length > 6) {



//       // valor = valor.replace(/(\d)(\d{2}$)/, '$1,$2');
//       // valor = valor.replace(/(\d)(\d{3})(^,)/, '$1.$2$3');
// //      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
//     }

//     this.goalValue = valor;

//     if(valor == 'NaN'){

//       this.goalValue = '';
//     }
// }
}
