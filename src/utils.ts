
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

export var URL_BASE = 'http://192.168.100.5/registroDeVendas/public/api/auth/';

export function moneyMask(value: number) {

    //300.580,65

    let milhar;
    let resto;
    let aux = [];
    let bol = true;

    while( bol){
    
        milhar = parseInt((value/1000).toString());
        value = value % 1000;
        
        if(milhar != 0){

            aux.push(milhar);
            aux.push('.');
        }else{
    
            bol = false;
            aux.push(value);
    
        }
        
        console.log('moneymask: ', aux);
    }

}

export function fillsWithZeros(qtd: number) {

    let arr = [];

    for(let i = 0; i < qtd; i++){

        arr.push(0);
    }

    return arr;
}

export async function showLoading(message: string) {

    let loadingCtrl = new LoadingController();

    let loading = await loadingCtrl.create({

        message: message, 
        id: 'defaultLoading'
    });

    await loading.present();
}

export async function showAlert(title: string, message: string) {

    let alertCtrl = new AlertController();

    let alert = await alertCtrl.create({

        header: title, 
        cssClass: 'customAlert', 
        message: message, 
        buttons: [{
            
            text: 'Fechar', 
            role: 'cancel'
        }]
    });

    await alert.present();
}

export function convertToFloat(event: any) {

    let value = event;
    value = value.replace(/[\D]+/g, '');

    console.log(value);

    if(value.length == 1){

      value = value.replace(/(\d)/g, '00.0$1');
    }else if(value.length == 2){

      value = value.replace(/(\d{2})/g, '00.$1');
    }else {

      value = value.replace(/([0-9]{2})$/g, ".$1");

    }

    value = parseFloat(value);
    value == 'NaN'? value = '': '';
    console.log(value);

    return value;
}