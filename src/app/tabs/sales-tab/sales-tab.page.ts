import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesService } from './../../services/sales.service';
import { showAlert, showLoading } from './../../../utils';
import { LoadingController } from '@ionic/angular';
import { ServicesService } from './../../services/services.service';

@Component({
  selector: 'app-sales-tab',
  templateUrl: './sales-tab.page.html',
  styleUrls: ['./sales-tab.page.scss'],
})
export class SalesTabPage implements OnInit {

  @ViewChild('itemTeste') itemTeste: ElementRef;
  salesArray = [];

  constructor(
    private salesService: SalesService, 
    private servicesService: ServicesService, 
    private loadingController: LoadingController
  ) { }

  salesSearchFilter;
  sales = [];
  services = null;
  hasError = false;
  arr = [{cliente: 'testando', valor: '20', data: '15-12-2020', open: false}, {cliente: 'teste', valor: '30', data: '15-12-2020', open: false}, {cliente: 'testando', valor: '20', data: '15-12-2020', open: false}, {cliente: 'teste', valor: '30', data: '15-12-2020', open:false}, {cliente: 'testando', valor: '20', open: false}, {cliente: 'teste', valor: '30', data: '15-12-2020', open: false}];

  async ngOnInit() {
    this.salesSearchFilter = 'hoje'
    await this.presentSales();
    // await showLoading('Carregando vendas...');
    
    // try{

    //   this.salesSearchFilter = 'hoje';
    //   this.sales = await this.salesService.getTodaySales();
    //   await this.loadingController.dismiss('defaultLoading');
    // }catch(e){

    //   await this.loadingController.dismiss('defaultLoading');
    //   let errorMessage = JSON.parse(e.error);
    //   showAlert('Erro', errorMessage.error);
    // }
  }

  async ionViewWillEnter() {

    this.services = null;
  }

  tus() {

    return 2020;
  }
  teste(event: any) {

    console.log(event.detail.value);
  }

  async presentSales(event: any = null) {

    console.log(event);
    await showLoading('Carregando vendas...');

    event != null ? event = event.detail.value: event = this.salesSearchFilter;
//    event.detail.value ? event = event.detail.value: '';

    switch(event) {

      case 'hoje':

        try{

          this.salesSearchFilter = 'hoje';
          let resp = await this.salesService.getTodaySales();
          resp = JSON.parse(resp.data);
          this.sales = resp['sales'];

          console.log('vendas diarias', this.sales);

          await this.getServices();

          this.sales.map(sale => {

            sale.service_name = this.getServiceName(sale.service_id);
            sale.open = false;
          });
          this.hasError =false;
          this.loadingController.dismiss('', '', 'defaultLoading');
        }catch(e){

          this.hasError = true;
          console.log(e);
          this.loadingController.dismiss('', '', 'defaultLoading');
          let errorMessage = JSON.parse(e.error);
          showAlert('Erro', errorMessage.error);
        }

        break;

      case '7 dias': 

        try{

          this.salesSearchFilter = '7 dias';
          let resp = await this.salesService.getWeekSales();
          resp = JSON.parse(resp.data);
          this.sales = resp['sales'];
          
          console.log(this.sales);

          await this.getServices();

          this.sales.map(sale => {

            sale.service_name = this.getServiceName(sale.service_id);
            sale.open = false;
          });

          this.hasError = false;
          this.loadingController.dismiss('', '', 'defaultLoading');
        }catch(e){

          this.hasError = true;
          this.loadingController.dismiss('', '', 'defaultLoading');
          let errorMessage = JSON.parse(e.error);
          showAlert('Erro', errorMessage.error);
        }

        break;
      
      case 'mes':

        try{

          this.salesSearchFilter = 'mes';
          let date = new Date().toISOString();
          let resp = await this.salesService.getMonthSales(date);
          resp = JSON.parse(resp.data);
          this.sales = resp['sales'];

          console.log(this.sales);

          await this.getServices();

          console.log('OS SERVICOS: ', this.services);
          this.sales.map(sale => {

            sale.service_name = this.getServiceName(sale.service_id);
            sale.open = false;
          });

          console.log('VENDA DO MES: ', this.sales);
          this.hasError = false;
          this.loadingController.dismiss('', '', 'defaultLoading');
        }catch(e){

          this.hasError = true;
          this.loadingController.dismiss('', '', 'defaultLoading');
          let errorMessage = JSON.parse(e.error);
          showAlert('Erro', errorMessage.error);
        }

        break;

      case 'total':

        try{

          this.salesSearchFilter = 'total';
          let resp = await this.salesService.getSales();
          resp = JSON.parse(resp.data);
          this.sales = resp['sales'];

          //console.log(this.sales);

          await this.getServices();

          this.sales.map(sale => {

            sale.service_name = this.getServiceName(sale.service_id);
            sale.open = false;
          });

          this.hasError = false;
          this.loadingController.dismiss('', '', 'defaultLoading');
        }catch(e){

          this.hasError = true;
          this.loadingController.dismiss('', '', 'defaultLoading');
          let errorMessage = JSON.parse(e.error);
          showAlert('Erro', errorMessage.error);
        }

        break;

      default:

        await this.loadingController.dismiss('', '', 'defaultLoading');

        this.presentSales(this.salesSearchFilter);
        // showAlert('Erro', 'Período de tempo inválido. Para listar as suas vendas, um período de tempo válido deve ser informado.');

        break;
    }
  }

  private getServiceName(serviceId: number) {

    let serviceName = '';
    console.log('Services: ', this.services);

    for(let i = 0; i < this.services.length; i++){

      console.log('servico: ', this.services[i].title);
      this.services[i].id == serviceId ? serviceName = this.services[i].title: '';
    }

    console.log('nome do serviço: ', serviceName);
    return serviceName;
  }

  private changeStatus(sale: any){

    sale.open = !sale.open;
  }

  async getServices() {

    if(this.services == null){

      let resp = await this.servicesService.getServices();
      resp = JSON.parse(resp.data);
      this.services = resp['services'];
    }
  }
}
