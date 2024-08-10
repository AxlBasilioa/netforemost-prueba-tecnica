  import { Component, ElementRef, Input } from '@angular/core';
  import { MealDetailComponent } from '../meal-detail/meal-detail.component';
  import { ModalController } from '@ionic/angular';
import { MealService } from 'src/app/services/meal.service';
  @Component({
    selector: 'app-meal-list',
    templateUrl: './meal-list.component.html',
    styleUrls: ['./meal-list.component.scss'],
  })
  export class MealListComponent {
    //la lista, recibe un arreglo de meals
    @Input() meals: any[] = [];  
    constructor(private modalController: ModalController, private mealService:MealService) {}
    //los details, por temas esteticos opté por mostrarlos mediante un Modal (:
    async openMealDetail(meal: any) {
      const data = await this.mealService.searchMeals(meal.strMeal);
      const modal = await this.modalController.create({
        component: MealDetailComponent,
        //al modal le pasamos el meal data, posición 0, porque la API no nos da los datos correctos por categoria
        //asi que en caso de que sea por categoria, igualmente buscamos la meal y mostramos esa meal unica
        componentProps: { meal: data[0] }
      });
      return await modal.present();
    }
  }
