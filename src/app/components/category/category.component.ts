import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  list: any[] = [];
  //emitimos que categoria se le hace click
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private categories: CategoriesService) {}

  ngOnInit() {
    this.loadCategories();
  }
  //cargamos las categorias con la API
  async loadCategories() {
    const response = await this.categories.requestCategories();
    if (response && response.categories) {
      this.list = response.categories;
    }
  }
  //emitimos la categoria
  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }
}
