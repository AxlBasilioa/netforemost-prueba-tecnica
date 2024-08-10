import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { MealListComponent } from './meal-list.component';
import { MealService } from 'src/app/services/meal.service';
import { of } from 'rxjs';
import { MealDetailComponent } from '../meal-detail/meal-detail.component';
import { ComponentProps } from '@ionic/core';

describe('MealListComponent', () => {
  let component: MealListComponent;
  let fixture: ComponentFixture<MealListComponent>;
  let modalControllerMock: any;
  let mealServiceMock: any;

  beforeEach(waitForAsync(() => {
    // Mock  ModalController
    modalControllerMock = {
      create: jasmine.createSpy('create').and.callFake((options: { component: any; componentProps: ComponentProps }) => {
        return {
          present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
          onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve())
        };
      })
    };

    // Mock MealService
    mealServiceMock = {
      searchMeals: jasmine.createSpy('searchMeals').and.returnValue(Promise.resolve([
        { idMeal: '52771', strMeal: 'Spicy Arrabiata Penne', strCategory: 'Vegetarian' }
      ]))
    };

    TestBed.configureTestingModule({
      declarations: [ MealListComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: modalControllerMock },
        { provide: MealService, useValue: mealServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call mealService.searchMeals and open modal with meal details', async () => {
    const meal = { strMeal: 'Spicy Arrabiata Penne' };
    
    await component.openMealDetail(meal);
    
    expect(mealServiceMock.searchMeals).toHaveBeenCalledWith('Spicy Arrabiata Penne');
    
    expect(modalControllerMock.create).toHaveBeenCalledWith({
      component: MealDetailComponent,
      componentProps: { meal: { idMeal: '52771', strMeal: 'Spicy Arrabiata Penne', strCategory: 'Vegetarian' } }
    });
    
    const modalInstance = await modalControllerMock.create.calls.mostRecent().returnValue;
    expect(modalInstance.present).toHaveBeenCalled();
  });
});
