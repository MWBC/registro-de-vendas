import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { URL_BASE, showAlert } from './../../utils';
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HTTP, 
    private router: Router, 
    private alertCtrl: AlertController
    ) { }

  login(email: string, password: string) {

    let url = URL_BASE + 'login';

    let credentials = {

      email: email.replace(/<.*?>/g, '').trim(), 
      password: password.replace(/<.*?>/g, '').trim()
    };

    return this.http.post(url, credentials, {});
  }

  logout() {

    let url = URL_BASE + 'logout';

    return this.http.post(url, {}, {});
  }

  async checkToken() {

    console.log('Entrou no checkToken');

    let url = URL_BASE + 'checkToken';
    let options = {

      Authorization: 'Bearer ' + localStorage.getItem('token')
    }

    try{

      let resp = await this.http.get(url, {}, options);
  
      return true;
    }catch(error) {
      
      console.log('Erro no checkToken: ', error.error);

      this.router.navigateByUrl('/login');

      return false;
    }
    
  }

  redirectToLogin(error: any) {

    if(error.status =='401'){

      console.log('Unalthorized, faça login novamente');

      showAlert('Aviso', 'Token expirou. Por favor faça login novamente.');
      
      this.router.navigateByUrl('/login', {replaceUrl: true});
    }
  }
}
