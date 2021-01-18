import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { showAlert, showLoading } from '../../utils';
import { AuthService } from './../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  showPassword = false;

  constructor(

    private fb: FormBuilder, 
    private authService: AuthService, 
    private loadingCtrl: LoadingController, 
    private router: Router
    ) {

    this.formLogin = fb.group({

      "email": ['', [Validators.required, Validators.email]], 
      "password": ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {

    let email = (this.formLogin.controls['email'].value).replace(/<.*?>/g, '').trim();
    let password = (this.formLogin.controls['password'].value).replace(/<.*?>/g, '').trim();

    if(email == "" || password == ""){

      showAlert('Aviso', 'Preencha os campos de email e senha para fazer login.');
    }else{

      showLoading('Validando credenciais...').then(async () => {

        this.authService.login(email, password).then(async resp => {

          await this.loadingCtrl.dismiss('', '', 'defaultLoading');

          resp = JSON.parse(resp.data);
          
          localStorage.setItem('token', resp['token']);

          this.router.navigateByUrl('tabs/home', {replaceUrl: true});
        }).catch(async error => {

          await this.loadingCtrl.dismiss('', '', 'defaultLoading');

          if(error.status == '401'){

            showAlert('Erro', 'Email ou senha incorretos, por favor verifique e tente novamente.');
          }else if(error.status == '500') {
            
            showAlert('Erro', 'Erro interno no sistema, por favor tente mais tarde.');
          } else if(error.status == '0'){
           
            showAlert('Erro', 'Erro de conexão, verifique a sua conexão com a internet e tente novamente.');
          }else{

            showAlert('Erro', 'Erro desconhecido, por favor tente acessar mais tarde.');
          }
        })
      }).catch(error => console.log('erro ao chamar o loading: ', error));
    }
  }

  logout() {

    this.authService.logout();

    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');
  }

  changePasswordVisibility() {

    this.showPassword = !this.showPassword;
  }
}
