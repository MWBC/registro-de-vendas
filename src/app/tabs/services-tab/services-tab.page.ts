import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { showAlert, showLoading } from '../../../utils';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-services-tab',
  templateUrl: './services-tab.page.html',
  styleUrls: ['./services-tab.page.scss'],
})
export class ServicesTabPage implements OnInit {

  services:any = [];
  hasError = false;

  constructor(
    private servicesService: ServicesService, 
    private loadingController: LoadingController
    ) { 
  }

  async ngOnInit() {

    await this.presentServices();
  }

  async presentServices(){

    try{

      await showLoading("Carregando Serviços...");
      this.services = await this.servicesService.getServices();
      this.services = JSON.parse(this.services.data);
      this.services = this.services['services'];

      this.services.map(service => {

        service.open = false;
      });
      this.hasError = false;
      console.log(this.services);
      this.loadingController.dismiss('', '', 'defaultLoading');
    }catch(e){

      this.hasError = true;
      this.loadingController.dismiss('', '', 'defaultLoading');
      let errorMessage = JSON.parse(e.error);
      showAlert("Erro", errorMessage.error);
    }
  }

  changeStatus(service){

    service.open = !service.open;
  }
}
