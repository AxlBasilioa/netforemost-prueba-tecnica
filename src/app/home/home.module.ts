import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SearchComponent } from '../components/search/search.component';
import { MealListComponent } from '../components/meal-list/meal-list.component';
import { HomePageRoutingModule } from './home-routing.module';
import { CategoryComponent } from '../components/category/category.component';
import { MealDetailComponent } from '../components/meal-detail/meal-detail.component';
import { HistoryComponent } from '../components/history/history.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, SearchComponent, MealListComponent,CategoryComponent, MealDetailComponent,HistoryComponent]
})
export class HomePageModule {}
