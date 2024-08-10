import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
    localStorage.clear(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a search query to the history', () => {
    service.addSearchQuery('Pasta');
    const history = service.getHistory();
    expect(history).toEqual(['Pasta']);
  });


  it('should retrieve the search history from localStorage', () => {
    localStorage.setItem('searchHistory', JSON.stringify(['Burger', 'Salad']));
    const history = service.getHistory();
    expect(history).toEqual(['Burger', 'Salad']);
  });

  it('should clear the search history', () => {
    service.addSearchQuery('Soup');
    service.clearHistory();
    const history = service.getHistory();
    expect(history).toEqual([]);
  });
});
