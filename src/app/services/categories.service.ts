import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  //aqui aislamos la logica por categorias, busqueda de categorias y busqueda por categorias
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';
  constructor() { }
  async requestCategories():Promise<any>{
    try {
      const response = await fetch(`${this.apiUrl}/categories.php`);
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    }catch(error){
      console.error('There was a problem with the fetch operation:', error);
      return null;
    }
  }
  async searchMealsByCategory(category: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/filter.php?c=${category}`);
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
