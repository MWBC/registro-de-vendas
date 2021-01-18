import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { URL_BASE } from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HTTP, private http2: HttpClient) { }

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
}
