import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';
  //un servicio que se dedica unicamente al SearchMeals, regresa arreglo, en caso de error de network, mandamos este response
  constructor() { }
  async searchMeals(query: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/search.php?s=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    }
  }
}
