import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { URL_BASE } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HTTP) { }

  getServices() {

    let url = URL_BASE + 'services';
    let token = localStorage.getItem('token');
    let options = {

      Authorization: 'Bearer ' + token
    };

    return this.http.get(url, {}, options);
  }

  getServicesIds(services: any) {

    let ids = []

    for(let i = 0; i < services.services.length; i++){

        ids.push(services.services[i].id);
    }

    return ids;
  }

  //format = 1 para retornar % e format 2 para retornar valor
  totalPerService(obj: any, sales: any, format: number) {

    let serviceIndex;
    let total = 0;

    for(let i = 0; i < sales.sales.length; i++){

      total += parseFloat(sales.sales[i].aplied_price);
      serviceIndex = obj.ids.indexOf(sales.sales[i].service_id);
      obj.values[serviceIndex] = obj.values[serviceIndex] + parseFloat(sales.sales[i].aplied_price);
      console.log(obj.values[serviceIndex], sales.sales[i].aplied_price);    
    }

    switch(format) {

      case 1: 

        obj.values = obj.values.map(p => ((p/total) * 100).toFixed(2));
        break;

      case 2:

        break;

      default: 

        obj.values = obj.values.map(p => ((p/total) * 100).toFixed(2));

        break;
    }

    console.log(obj);
    return obj;
  }

  getServicesLabels(services) {

    let labels = [];

    for(let i = 0; i < services.services.length; i++){

      labels.push(services.services[i].title);
    }

    return labels;
  }
}
