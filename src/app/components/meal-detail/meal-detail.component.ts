import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss'],
})
export class MealDetailComponent  implements OnInit {
  //aqui vemos solo los detalles, y su cierre del modal
  @Input() meal: any;
  constructor(private modalController: ModalController) { }
  ngOnInit() {}
  close() {
    this.modalController.dismiss();
  }
}
