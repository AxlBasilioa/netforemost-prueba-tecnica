/* **************************************************************************
personalmente preferiria comentarios del codigo en ingles pero en esta prueba
tecnica, opté por realizar comentarios en español

desarrollado por Ing. Kevin Axl Basilio Angeles

prueba tecnica angular Ionic NetForemost
*************************************************************************** */
import { Component } from '@angular/core';
import { HistoryComponent } from '../components/history/history.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //aqui simplificada la logica mediante modales
  searchQueryFromHistory:string = '';
  constructor(private modalController:ModalController) {}


  //para poder obtener acciones del historial, capturamos el valor capturado en el history modal
  async openHistoryModal() {
    const modal = await this.modalController.create({
      component: HistoryComponent
    });
    modal.onDidDismiss().then((detail) => {
      if (detail.data) {
        this.searchQueryFromHistory = detail.data; 
      }
    });

    return await modal.present();
  }
}
