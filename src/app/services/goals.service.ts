import { AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { URL_BASE, showLoading, showAlert, convertToFloat, changeValue, validateValue } from '../../utils';
import { Subject } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  constructor(
    private http: HTTP, 
    private alertCtrl: AlertController, 
    private loadingController: LoadingController) {}

  private refreshViewSource = new Subject<boolean>();
  public refreshView$ = this.refreshViewSource.asObservable();

  async getActualGoal(){

    let date = new Date().toISOString();
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);

    let token = localStorage.getItem('token');
    let url = URL_BASE + 'goals/actual-goal?year=' + year + '&month=' + month;

    const headers = {

      Authorization: 'Bearer ' + token
    };

    return this.http.get(url, {}, headers);

  }

  async storeGoal(goalValue: string) {

    let value = convertToFloat(goalValue);
    let date_start = new Date();
    let date_end = new Date();
    
    let url = URL_BASE + 'goals/store';
    const token = localStorage.getItem('token');
    const options = {

      Authorization: 'Bearer ' + token
    }

    let content = {

      value: value, 
      date_start: date_start, 
      date_end: date_end
    };

    showLoading('Salvando meta...');

    try{

      let resp = await this.http.post(url, content, options);
      resp = JSON.parse(resp.data);
      this.loadingController.dismiss('', '', 'defaultLoading');
      this.showSuccessAlert(resp['success']);
    }catch(e){

      console.log(e);
      this.loadingController.dismiss('', '', 'defaultLoading');
      showAlert('Erro', e.error);
    }
  }

  async updateGoal(id: number, goalValue: string) {

    let value = convertToFloat(goalValue);
    let content = {
      id: id, 
      value: value
    };

    let url = URL_BASE + 'goals/update'
    const token = localStorage.getItem('token');
    const options = {

      Authorization: 'Bearer ' + token
    };

    showLoading('Atualizando meta...');
    try{

      let resp = await this.http.put(url, content, options);
      resp = JSON.parse(resp.data);
      this.loadingController.dismiss('', '', 'defaultLoading');
      this.showSuccessAlert(resp['success']);
      
    }catch(e){

      console.log(e);
      this.loadingController.dismiss('', '', 'defaultLoading');
      showAlert('Erro', e.error);

    }
    
  }

  async deleteGoal(id: number) {

    let url = URL_BASE + 'goals/delete';
    
    await showLoading('Excluíndo meta atual...');

    const token = localStorage.getItem('token');
    const options = {
      Authorization: 'Bearer ' + token
    };

    let parameter = {

      id: id.toString()
    };

    try{

      await this.http.delete(url, parameter, options);

      await this.loadingController.dismiss('', '', 'defaultLoading');

      showAlert('Aviso', 'Meta atual excluída com sucesso');

      this.refreshViewSource.next(true);

    }catch(e){

      await this.loadingController.dismiss('', '', 'defaultLoading');

      let errorMessage = JSON.parse(e.error);
      console.log(e);
      showAlert('Erro', errorMessage.error);
    }
    
  }

  async confirmeDeleteGoalAlert(id: number) {

    let alertCtrl = new AlertController();

    let alert = await alertCtrl.create({

        header: 'Confirmação de exclusão', 
        cssClass: 'customAlert', 
        message: 'Deseja excluir a meta atual?', 
        buttons: [{
            
            text: 'Não', 
            role: 'cancel'
        }, 
      {

        text: 'Sim', 
        handler: () => {

          this.deleteGoal(id);
        }
      }]
    });

    await alert.present();
}

async showSuccessAlert(message: string) {

  let alertCtrl = new AlertController();
  let alert = await alertCtrl.create({

    header: 'Aviso', 
    cssClass: 'customAlert', 
    message: message, 
    buttons: [{

      text: 'Ok', 
      handler: () => {

        this.refreshViewSource.next(true);  
      }
    }]
  });

  await alert.present();
}

changeGoalValue(event: any, showInvalidWarning: boolean) {

  return changeValue(event, showInvalidWarning);
}

validateGoalValue(goalValue: string) {

  return validateValue(goalValue);
}
}
