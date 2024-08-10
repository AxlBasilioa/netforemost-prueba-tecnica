import { TestBed } from '@angular/core/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return categories when requestCategories is called', async () => {
    const mockResponse = {
      categories: [
        { idCategory: '1', strCategory: 'Category 1' },
        { idCategory: '2', strCategory: 'Category 2' }
      ]
    };

    spyOn(window, 'fetch').and.resolveTo({
      ok: true,
      json: async () => mockResponse
    } as Response);

    const categories = await service.requestCategories();
    expect(categories).toEqual(mockResponse);
  });

  it('should return null when requestCategories encounters a network error', async () => {
    spyOn(window, 'fetch').and.rejectWith(new Error('Network error'));

    const categories = await service.requestCategories();
    expect(categories).toBeNull();
  });

  it('should return meals by category when searchMealsByCategory is called', async () => {
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

    const meals = await service.searchMealsByCategory('Seafood');
    expect(meals).toEqual(mockResponse.meals);
  });

  it('should return null when searchMealsByCategory encounters a network error', async () => {
    spyOn(window, 'fetch').and.rejectWith(new Error('Network error'));

    const meals = await service.searchMealsByCategory('Seafood');
    expect(meals).toBeNull();
  });
});
