import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { showAlert, showLoading, changeValue, validateValue, convertToFloat } from 'src/utils';
import { SalesService } from '../services/sales.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-modal-sale-store',
  templateUrl: './modal-sale-store.component.html',
  styleUrls: ['./modal-sale-store.component.scss'],
})
export class ModalSaleStoreComponent implements OnInit {

  @ViewChild('ionItem') ionItem: ElementRef;
  @Input()  services: any;
  @Input() action: string;
  @Input() sale: any;

  // private formSaleStore: FormGroup;
  private apliedPrice;
  private clientName: string;
  private serviceId: number;
  private date: Date;

  showInvalidWarning = false;

  constructor(

    private modalController: ModalController, 
    private fb: FormBuilder, 
    private loadingController: LoadingController, 
    private salesService: SalesService, 
    private changeDetectorRef: ChangeDetectorRef
  ) {

    // this.formSaleStore = fb.group({

    //   "client_name": ['', []], 
    //   "aplied_price": ['', [Validators.required]], 
    //   "service_id": ['', [Validators.required]], 
    //   "date": ['', [Validators.required]]
    // });
  }

  ngOnInit() {}

  ionViewWillEnter() {

    if(this.action == 'update'){

      this.apliedPrice = new CurrencyPipe('pt-BR', 'BRL').transform(this.sale['aplied_price']);
      this.clientName = this.sale['client_name'];
      this.serviceId = this.sale['service_id'];
      this.date = this.sale['date'];
    }
  }

  ngAfterViewChecked(){

    this.changeDetectorRef.detectChanges();
  }
  
    changeSaleValue(event: any){

      this.apliedPrice = this.salesService.changeSaleValue(event, this.showInvalidWarning);
      this.showInvalidWarning = ! this.salesService.validateSaleValue(this.apliedPrice);
      // this.formSaleStore.controls['aplied_price'].setValue(this.salesService.changeSaleValue(event, this.showInvalidWarning));
    }

  chooseAction(){

    if(this.action == 'store'){

      console.log("escolheu salvar");
      this.storeSale();
    }

    if(this.action == 'update'){

      console.log("escolheu atualizar");
      this.updateSale();
    }
  }

  async storeSale() {

    let request = {

      "aplied_price": convertToFloat(this.apliedPrice), 
      "client_name": this.clientName, 
      "service_id": this.serviceId, 
      "date": this.date
    };

    if(await this.salesService.validateSale(request)){

      this.salesService.storeSale(request);
      this.modalController.dismiss();
    }else if(request.aplied_price == undefined || request.aplied_price.length == 0){

      this.ionItem['el'].classList.remove('ion-valid');
      this.ionItem['el'].classList.add('ion-invalid');

      this.apliedPrice = '';

      this.showInvalidWarning = true;
    }
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

    }else if(request.aplied_price == undefined || request.aplied_price.length == 0){

      this.ionItem['el'].classList.remove('ion-valid');
      this.ionItem['el'].classList.add('ion-invalid');

      this.apliedPrice = '';
      
      this.showInvalidWarning = true;
    }
  }
  
  async dismissModal() {

    if(this.action == 'store'){

      await this.modalController.dismiss('', '', 'modalSaleStore');
    }

    if(this.action == 'update'){

      await this.modalController.dismiss('', '', 'modalSaleUpdate');
    }
  }
  public getApliedPrice() {

    return this.apliedPrice;
  }

  public setApliedPrice(apliedPrice): void {

    this.apliedPrice = apliedPrice;
  }

  public getClientName(): string {

    return this.clientName;
  }

  public setClientName(clientName): void {

    this.clientName = clientName;
  }

  public getServiceId(): number {

    return this.serviceId;
  }
}
