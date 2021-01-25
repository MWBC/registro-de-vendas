import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ChartDataSets, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';

import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { URL_BASE, moneyMask, fillsWithZeros, showLoading } from '../../../utils';

import { ProgressPopoverComponent } from '../../progress-popover/progress-popover.component';
import { ProgressButtonsPopoverComponent } from './../../progress-buttons-popover/progress-buttons-popover.component';
import { PopoverController, LoadingController, ModalController } from '@ionic/angular';
import { SalesService } from '../../services/sales.service';
import { GoalsService } from '../../services/goals.service';
import { ServicesService } from './../../services/services.service';
import { AuthService } from './../../services/auth.service';
import { ModalGoalStoreComponent } from '../../modal-goal-store/modal-goal-store.component';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.page.html',
  styleUrls: ['./main-tab.page.scss'],
})
export class MainTabPage implements OnInit {
  
  total: number;
  percentageAchieved:number;
  period: string;
  goal: string;
  hiddenProgressBar: boolean;
  hiddenChart: boolean = false;
  hiddenAll: boolean = true;
  progressValue = '';
  missingProgressValue = '';
  monthSales: any;
  actualGoal: any;
  services: any;
  months: any = {'01': 'Janeiro', '02': 'Fevereiro', '03': 'Março', '04': 'Abril', '05': 'Maio', '06': 'Junho', '07': 'Julho', '08': 'Agosto', '09': 'Setembro', "10": 'Outubro', '11': 'Novembro', '12': 'Dezembro'};

  chartData: ChartDataSets[] = [{data: [], label: ''}];
  chartLabels: Label[];

  divProgress = {

    "width": '50vw', 
    "height": '34vh'
  };

  //estilização do circle progressbar
  circleProgressStyle = {};
  
  circleProgressInsideStyle = {};
  
  chartOptions = {

    responsive: false, 
    aspectRatio: 1,  
    title: {

      display: true, 
    }, 
    pan: {

      enabled: true, 
      mode: 'xy'
    }, 
    zoom: {

      enabeld: true, 
      mode: 'xy'
    }
  };

  chartColors: Color[] = [{

    borderColor: '#000000', 
    backgroundColor: []
  }];

  chartType = 'doughnut';
  showLegend = false;

  constructor(
    
    private http: HttpClient, 
    private http2: HTTP, 
    private popoverController: PopoverController, 
    private salesService: SalesService, 
    private goalsService: GoalsService, 
    private servicesService: ServicesService, 
    private loadingCtrl: LoadingController, 
    private authService: AuthService, 
    private modalController: ModalController
    ) {

      this.goalsService.refreshView$.subscribe(resp => {

        this.prepareMainPage();
      }, error => console.log(error));
    }

  ngOnInit() {
    
    this.authService.checkToken();
    moneyMask(3000.82);
    // this.prepareMainPage();
  }

  ionViewWillEnter() {

    this.chartData = [{data: [], label: ''}];
    this.prepareMainPage();
  }
getColors(qtd: number){

  let colors = [];

  for(let i = 0; i < qtd; i++){

    let value1 = Math.floor(Math.random() * 255);
    let value2 = Math.floor(Math.random() * 255);
    let value3 = Math.floor(Math.random() * 255);

    colors.push('rgb(' + value1 + ',' + value2 +',' + value3 + ')');
  }

  this.chartColors[0].backgroundColor = colors;

}

async presentButtonsPopover(ev: any) {

  let popover = await this.popoverController.create({

    component: ProgressButtonsPopoverComponent, 
    event: ev , 
    componentProps: {

      goalId: this.actualGoal.goal[0].id
    }

  });

  await popover.present();
}

async presentPopover(){

  let sales = this.monthSales;
  let services = this.services;
  let servicesIds = this.servicesService.getServicesIds(services);
  let obj = {ids: servicesIds, values: fillsWithZeros(servicesIds.length)};
  let associativeArrayServices = {};
  let salesPerService = [];

  this.servicesService.totalPerService(obj, sales, 2);

  for(let i = 0; i < services.services.length; i++){

    associativeArrayServices[services.services[i].id] = services.services[i];
  }

  for(let i = 0; i < servicesIds.length; i++){

    if(obj.values[i] != 0){

      salesPerService.push({title: associativeArrayServices[servicesIds[i]].title, value: obj.values[i]});
    }
  }

  const popover = await this.popoverController.create({

    component: ProgressPopoverComponent, 
    componentProps: {

      salesPerService
    }
   });

   await popover.present();

   let date = new Date().toISOString();
   console.log(date);
   date = date.slice(5, 7);

   console.log(date);
}

async prepareMainPage() {

  showLoading('Carregando informações...').then(async () => {

    try{

      this.actualGoal = await this.getActualGoal();
      this.monthSales = await this.getMonthSales();
      this.services = await this.getServices();
    
      this.prepareProgressBar(this.monthSales, this.actualGoal);
      await this.prepareChart(this.monthSales);

      this.hiddenAll = false;
      this.loadingCtrl.dismiss('', '', 'defaultLoading');

    }catch(e){

      this.loadingCtrl.dismiss('', '', 'defaultLoading');

      console.log(e);
      this.authService.redirectToLogin(e);
    }
      
  }).catch(error => {
    
    this.hiddenAll = true;
    console.log(error);
    this.loadingCtrl.dismiss('', '', 'defaultLoading');
  });
}

async prepareChart(sales: any) {

  if(sales.sales.length == 0){

    this.hiddenChart = true;
  }else{

    let services = this.services;
    let ids = this.servicesService.getServicesIds(services);
  
    this.getColors(ids.length);
    console.log('ids: ', ids);
    console.log('services: ', services);
  
    let obj = {ids: ids, values: []};
    obj.values = fillsWithZeros(ids.length);
    console.log(obj);
  
    this.servicesService.totalPerService(obj, sales, 1);
  
    console.log('obj final: ', obj);
  
    for(let i = 0; i < ids.length; i++){
  
      this.chartData[0].data.push(obj.values[i]);
    }
    //this.chartData[0].data = obj.values;
    console.log(this.chartData[0].data);
    console.log(this.chartColors[0].backgroundColor);
  
    this.chartLabels = this.servicesService.getServicesLabels(services);
  }
}

prepareProgressBar(sales: any, goal:any){

  let total = 0;
  let sale: any;

  console.log(sales);

  for(sale = 0; sale < sales.sales.length; sale++){

    console.log('sale: ' + sales.sales[sale]);
    total += parseFloat(sales.sales[sale].aplied_price);
  }

  if(goal.goal.length == 0){

    this.hiddenProgressBar = true;
  }else{

    this.goal = goal.goal[0].value;
    this.total = total;
    console.log('total: ' + this.total);
    this.percentageAchieved = parseFloat(((total/parseFloat(goal.goal[0].value)) * 100).toFixed(2));
    this.progressValue = (this.percentageAchieved + '%').toString();
    this.missingProgressValue = (100 - this.percentageAchieved + '%').toString();

    this.circleProgressStyle = {

      "background":'conic-gradient(#00FF00 ' + this.progressValue + ', 0, #ecf0f1' + this.missingProgressValue + ')', 
      "width": '100%', 
      "height": '100%' ,
      "border-radius": '50%', 
      "display": 'flex', 
      "justify-content": 'center', 
      "align-items": 'center'
    };
  
    this.circleProgressInsideStyle = {
  
      "width": '80%', 
      "height": '80%', 
       "background-color": '#fff', 
      "border-radius": '50%', 
      "display": 'flex', 
      "justify-content": 'center', 
      "align-items": 'center'
  
    };
  
    this.hiddenProgressBar = false;
    console.log('VALORES: ', this.progressValue, this.missingProgressValue);
    console.log(this.percentageAchieved);
    let actualMonth = goal.goal[0].date_start.slice(5, 7);
    this.period = this.months[actualMonth];

    console.log(this.total, this.percentageAchieved, this.period, this.hiddenProgressBar);
  }
}

async showModalGoalStore() {

  let modal = await this.modalController.create({

    id: 'modalGoalStore', 
    component: ModalGoalStoreComponent, 
    cssClass: 'customModal'
  });

  await modal.present();
}

async getActualGoal() {

  let response = await this.goalsService.getActualGoal();

  let actualGoal = JSON.parse(response.data);

  return actualGoal;
}

async getMonthSales() {

  let date = new Date().toISOString();

  const response = await this.salesService.getMonthSales(date);

  let monthSales = JSON.parse(response.data);
  
  return monthSales;
}

async getServices() {

  let response = await this.servicesService.getServices();

  let services = JSON.parse(response.data);

  return services;
}
}
