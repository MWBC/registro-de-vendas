import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';

import { URL_BASE, showAlert, showLoading, changeValue, convertToFloat, validateValue } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    
    private http: HTTP, 
    private http2: HttpClient, 
    private loadingController: LoadingController) { }

    private refreshViewSource = new Subject<boolean>();
    public refreshView$ = this.refreshViewSource.asObservable();
  
  getSales(){

    let url = URL_BASE + 'sales';
    let token = localStorage.getItem('token');
    const options = {
 
      Authorization: 'Bearer ' + token
    };

    return this.http.get(url, {}, options);
  }

  getMonthSales(date:string){

    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let url = URL_BASE + 'month-sales?month=' + month + '&year=' + year;
    let token = localStorage.getItem('token');
    const options = {
 
      Authorization: 'Bearer ' + token
    };

    return this.http.get(url, {}, options);
  }

  getTodaySales(){

    let date = new Date().toISOString().slice(0, 10);
    console.log(date);
    let url = URL_BASE + 'today-sales?date=' + date;
    let token = localStorage.getItem('token');
    const options = {
 
      Authorization: 'Bearer ' + token
    };

    return this.http.get(url, {}, options);
  }

  getWeekSales(){

    let date = new Date().toISOString().slice(0, 10);
    let url = URL_BASE + 'week-sales?date=' + date;
    let token = localStorage.getItem('token');
    const options = {
 
      Authorization: 'Bearer ' + token
    };

    return this.http.get(url, {}, options);
  }

  async storeSale(request) {

      showLoading("Salvando venda...");

      let clientName = request.client_name;
      let apliedPrice = request.aplied_price;
      let serviceId = request.service_id;
      let date = request.date;
      let url = URL_BASE + 'sales/store';

      let data = {

        client_name: clientName, 
        service_id: serviceId, 
        date: date, 
        aplied_price: apliedPrice
      };

      const token = localStorage.getItem('token');
      const options = {

        Authorization: 'Bearer ' + token
      };

      try{

        const resp = await this.http.post(url, data, options);
        console.log(resp);
        this.loadingController.dismiss('', '', 'defaultLoading');
        showAlert('Aviso', JSON.parse(resp.data).success);
        this.refreshViewSource.next(true);

      }catch(error){

        console.log(error);
        this.loadingController.dismiss('', '', 'defaultLoading');
        showAlert('Erro', JSON.parse(error.error).error);
      }
  }

  async updateSale(request) {

    showLoading("Atualizando venda...");

    let clientName = request.client_name;
    let apliedPrice = request.aplied_price;
    let serviceId = request.service_id;
    let date = request.date;
    let id = request.id;
    let url = URL_BASE + 'sales/update';

    let data = {

      client_name: clientName, 
      service_id: serviceId, 
      date: date, 
      aplied_price: apliedPrice, 
      id: id
    };

    const token = localStorage.getItem('token');
    const options = {

      Authorization: 'Bearer ' + token
    };

    try{

      const resp = await this.http.put(url, data, options);
      console.log(resp);
      this.loadingController.dismiss('', '', 'defaultLoading');
      showAlert('Aviso', JSON.parse(resp.data).success);
      console.log('CHAMOU O OBSERAVABLE');

    }catch(error){

      console.log(error);
      this.loadingController.dismiss('', '', 'defaultLoading');
      showAlert('Erro', JSON.parse(error.error).error);
    }
}
  async validateSale(request): Promise<boolean>{

    // request.aplied_price = convertToFloat(request.aplied_price);

    if(request.aplied_price == undefined || request.aplied_price.length == 0){

      // await this.loadingController.dismiss('', '', 'defaultLoading');
      console.log("OLHA AQUI" + request.aplied_price);
      showAlert("Aviso", "Preencha o campo valor com um valor válido!");

      return false;
    }else if(request.service_id == '' || request.service_id == undefined){

      // await this.loadingController.dismiss('', '', 'defaultLoading');
      showAlert("Aviso", "Selecione o serviço prestado!");
0
      return false;
    }else if(request.date == '' || request.date == undefined){

      // await this.loadingController.dismiss('', '', 'defaultLoading');
      showAlert("Aviso", "Seleciona a data da venda!");

      return false;
    }else{

      return true;
  }
}

validateSaleValue(apliedPrice: any){

  return validateValue(apliedPrice);
}

changeSaleValue(event: any, showInvalidWarning: boolean) {

  return changeValue(event, showInvalidWarning);
}

public async deleteSale(id:number): Promise<void> {
 
  try{

    showLoading("Deletando venda...");

    let url = URL_BASE + 'sales/delete/' + id;

    const token = localStorage.getItem('token');
    const options = {

      Authorization: 'Bearer ' + token
    };

    const resp = await this.http.delete(url, '', options);

    this.loadingController.dismiss('', '', 'defaultLoading');
    console.log('deu bom');
    showAlert('Aviso', JSON.parse(resp.data).success);
    this.refreshViewSource.next(true);
  }catch(error){

    this.loadingController.dismiss('', '', 'defaultLoading');
    showAlert('Erro', JSON.parse(error.error).error);
  }
}

async confirmeDeleteSaleAlert(id: number) {

  let alertCtrl = new AlertController();

  let alert = await alertCtrl.create({

      header: 'Confirmação de exclusão', 
      cssClass: 'customAlert', 
      message: 'Deseja excluir essa venda?', 
      buttons: [{
          
          text: 'Não', 
          role: 'cancel'
      }, 
    {

      text: 'Sim', 
      handler: () => {

        this.deleteSale(id);
      }
    }]
  });

  await alert.present();
}
}
