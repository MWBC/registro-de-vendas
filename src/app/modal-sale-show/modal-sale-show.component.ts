import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { ModalSaleStoreComponent } from '../modal-sale-store/modal-sale-store.component';
import { ModalSaleUpdateComponent } from '../modal-sale-update/modal-sale-update.component';
import { ServicesService } from '../services/services.service';
import { changeValue, convertToFloat } from 'src/utils';
import { SalesService } from '../services/sales.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-sale-show',
  templateUrl: './modal-sale-show.component.html',
  styleUrls: ['./modal-sale-show.component.scss'],
})
export class ModalSaleShowComponent implements OnInit {

  @Input() sale:any;
  @Input() services:any;
  @Input() showLabels:boolean;
  @ViewChild('ionItem') ionItem: ElementRef;
  
  private apliedPrice;
  private clientName: string;
  private serviceId: number;
  private date: Date;
  private showInvalidWarning = false;

  constructor(
    
    private modalController: ModalController, 
    private salesService: SalesService
  ) { }

  ngOnInit() {

    this.apliedPrice = new CurrencyPipe('pt-BR', 'BRL').transform(this.sale.aplied_price);
    this.clientName = this.sale.client_name;
    this.serviceId = this.sale.service_id;
    this.date = this.sale.date;

  }

  // public async showModalSaleUpdate(sale:any) {

  //   console.log(sale);
  //   const modal = await this.modalController.create({

  //     id: 'modalSaleUpdate', 
  //     component: ModalSaleUpdateComponent, 
  //     cssClass: 'customModal', 
  //     componentProps: {

  //       'sale': sale, 
  //       'services': this.services

  //     }
  //   });

  //   return await modal.present();
  // }

  public async showModalSaleUpdate(): Promise<void> {

    const modal = await this.modalController.create({

      id: 'modalSaleUpdate', 
      component: ModalSaleStoreComponent, 
      componentProps: {

        services: this.services, 
        action: 'update', 
        sale: this.sale
      }, 
      cssClass: 'customModal'
    });

    return await modal.present();
  }

  async updateSale() {

    console.log('olhjadasdasds: '  + this.sale["id"]);
    let request = {

      "aplied_price": convertToFloat(this.apliedPrice), 
      "client_name": this.clientName, 
      "service_id": this.serviceId, 
      "date": this.date, 
      "id": this.sale["id"]
    };

    if(await this.salesService.validateSale(request)){

      this.salesService.updateSale(request);
      this.showLabels = true;

      this.sale.aplied_price = request.aplied_price;
      this.sale.client_name = request.client_name;
      this.sale.service_id = request.service_id;
      this.sale.date = new Date(request.date).toISOString().slice(0, 10);
      
//      this.modalController.dismiss();
    }else if(request.aplied_price == undefined || request.aplied_price.length == 0){

      this.ionItem['el'].classList.remove('ion-valid');
      this.ionItem['el'].classList.add('ion-invalid');

      this.apliedPrice = '';
      
      this.showInvalidWarning = true;
    }
  }

  public changeStatusShowLabels():void {

    this.showLabels = !this.showLabels;

    this.apliedPrice = new CurrencyPipe('pt-BR', 'BRL').transform(this.sale.aplied_price);
    this.clientName = this.sale.client_name;
    this.serviceId = this.sale.service_id;
    this.date = this.sale.date;
  }

  changeSaleValue(event: any){

    this.apliedPrice = this.salesService.changeSaleValue(event, this.showInvalidWarning);
    this.showInvalidWarning = ! this.salesService.validateSaleValue(this.apliedPrice);
    // this.formSaleStore.controls['aplied_price'].setValue(this.salesService.changeSaleValue(event, this.showInvalidWarning));
  }

}
