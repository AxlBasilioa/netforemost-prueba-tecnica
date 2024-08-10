import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { HistoryComponent } from './history.component';
import { HistoryService } from 'src/app/services/history.service';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let historyServiceMock: any;
  let modalControllerMock: any;

  beforeEach(waitForAsync(() => {
    // Mock de HistoryService
    historyServiceMock = {
      getHistory: jasmine.createSpy('getHistory').and.returnValue(['Pizza', 'Pasta']),
      clearHistory: jasmine.createSpy('clearHistory')
    };

    // Mock de ModalController
    modalControllerMock = {
      dismiss: jasmine.createSpy('dismiss')
    };

    TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: HistoryService, useValue: historyServiceMock },
        { provide: ModalController, useValue: modalControllerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize history on ngOnInit', () => {
    component.ngOnInit();
    expect(historyServiceMock.getHistory).toHaveBeenCalled();
    expect(component.history).toEqual(['Pizza', 'Pasta']);
  });

  it('should close the modal when close is called', () => {
    component.close();
    expect(modalControllerMock.dismiss).toHaveBeenCalled();
  });

  it('should clear history and reset history array when clearHistory is called', () => {
    component.clearHistory();
    expect(historyServiceMock.clearHistory).toHaveBeenCalled();
    expect(component.history).toEqual([]);
  });

  it('should dismiss modal with selected item when selectSearch is called', () => {
    const item = 'Pizza';
    component.selectSearch(item);
    expect(modalControllerMock.dismiss).toHaveBeenCalledWith(item);
  });
});
