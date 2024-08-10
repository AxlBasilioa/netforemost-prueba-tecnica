import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { HistoryService } from 'src/app/services/history.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnChanges {
  //aqui pasamos del home al search el history action
  @Input() searchQueryHistory: string = ''; 
  searchQuery: string = '';
  meals: any[] = [];
  private searchSubject: Subject<string> = new Subject<string>(); 

  constructor(
    private mealService: MealService,
    private categories: CategoriesService,
    private historyService: HistoryService
  ) {
    //este pequeño debounceTime es para no guardar en el historial cada escritura, esperar 300ms 
    //a que el usuario deje de escribir, guardar el dato en el historial y buscar las meals
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(async query => {
      this.meals = await this.mealService.searchMeals(query);
      this.historyService.addSearchQuery(query);
    });
  }

  //cuando usamos un registro del historial, aqui leemos los cambios para buscarlos
  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQueryHistory'] && changes['searchQueryHistory'].currentValue) {
      this.searchQuery = this.searchQueryHistory; 
      this.onSearch(); 
    }
  }
  //busqueda encapsulada
  async onSearch() {
    if (this.searchQuery.trim().length > 0) {
      this.searchSubject.next(this.searchQuery);
    } else {
      this.meals = [];
    }
  }
  //busqueda mediante categorias
  onCategorySelected(category: string) {
    this.categories.searchMealsByCategory(category).then((meals) => {
      if (meals && meals.length > 0) {
        this.meals = meals.map((meal: any) => ({
          ...meal,
          strCategory: category
        }));
      } else {
        this.meals = [];
      }
    });
  }
}
