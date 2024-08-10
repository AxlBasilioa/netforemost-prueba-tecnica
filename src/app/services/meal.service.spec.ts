import { TestBed } from '@angular/core/testing';
import { MealService } from './meal.service';

describe('MealService', () => {
  let service: MealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return meals when searchMeals is called with a valid query', async () => {
    const mockResponse = {
      meals: [
        { idMeal: '1', strMeal: 'Meal 1' },
        { idMeal: '2', strMeal: 'Meal 2' }
      ]
    };

    spyOn(window, 'fetch').and.resolveTo({
      ok: true,
      json: async () => mockResponse
    } as Response);

    const meals = await service.searchMeals('Meal');
    expect(meals).toEqual(mockResponse.meals);
  });

  it('should return null when the network response is not ok', async () => {
    spyOn(window, 'fetch').and.resolveTo({
      ok: false
    } as Response);

    const meals = await service.searchMeals('Meal');
    expect(meals).toBeNull();
  });

  it('should return null and log an error when fetch throws an error', async () => {
    const consoleErrorSpy = spyOn(console, 'error');
    spyOn(window, 'fetch').and.rejectWith(new Error('Network error'));

    const meals = await service.searchMeals('Meal');
    expect(meals).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith('There was a problem with the fetch operation:', jasmine.any(Error));
  });
});
