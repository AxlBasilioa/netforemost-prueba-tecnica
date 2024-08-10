import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  //arreglo del historial, guardado de manera local en el dispositivo
  history: any[] = [];

  constructor(
    private modalController: ModalController,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.history = this.historyService.getHistory();
  }

  close() {
    this.modalController.dismiss();
  }

  clearHistory() {
    this.historyService.clearHistory(); 
    this.history = []; 
  }
  //este dismiss pasamos el item string a home.page.ts
  selectSearch(item: string) {
    this.modalController.dismiss(item); 
  }
}
