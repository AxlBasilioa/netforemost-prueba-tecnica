import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search.component';
import { MealService } from '../../services/meal.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { HistoryService } from 'src/app/services/history.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mealServiceMock: any;
  let categoriesServiceMock: any;
  let historyServiceMock: any;

  beforeEach(waitForAsync(() => {
    // Mock servicios
    mealServiceMock = {
      searchMeals: jasmine.createSpy('searchMeals').and.returnValue(Promise.resolve({
        meals: [
          {
            idMeal: '52771',
            strMeal: 'Spicy Arrabiata Penne',
            strCategory: 'Vegetarian',
            strArea: 'Italian',
            strInstructions: 'Bring a large pot of water to a boil...',
            strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
            strTags: 'Pasta,Curry',
            strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
            strIngredient1: 'penne rigate',
            strMeasure1: '1 pound'
          }
        ]
      }))
    };

    categoriesServiceMock = {
      searchMealsByCategory: jasmine.createSpy('searchMealsByCategory').and.returnValue(Promise.resolve({
        meals: [
          {
            idMeal: '52772',
            strMeal: 'Lasagna',
            strCategory: 'Pasta',
            strMealThumb: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg'
          }
        ]
      }))
    };

    historyServiceMock = {
      addSearchQuery: jasmine.createSpy('addSearchQuery'),
      getHistory: jasmine.createSpy('getHistory').and.returnValue(['Test'])
    };

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: MealService, useValue: mealServiceMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: HistoryService, useValue: historyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear meals if search query is empty', () => {
    component.searchQuery = '';
    component.onSearch();
    expect(component.meals.length).toBe(0);
  });

});
