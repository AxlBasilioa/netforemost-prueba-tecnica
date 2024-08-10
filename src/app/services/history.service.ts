import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  //este service es para manejar la logica de guardar de manera local el historial de busquedas
  private historyKey = 'searchHistory';
  constructor() { }
  addSearchQuery(query: string) {
    let history = this.getHistory();
    if (!history.includes(query)) {
      history.push(query);
      localStorage.setItem(this.historyKey, JSON.stringify(history));
    }
  }
  getHistory(): string[] {
    const history = localStorage.getItem(this.historyKey);
    return history ? JSON.parse(history) : [];
  }

  clearHistory() {
    localStorage.removeItem(this.historyKey);
  }
}
