import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-sale-update',
  templateUrl: './modal-sale-update.component.html',
  styleUrls: ['./modal-sale-update.component.scss'],
})
export class ModalSaleUpdateComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

}
