import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CategoryComponent } from './category.component';
import { CategoriesService } from 'src/app/services/categories.service';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoriesServiceMock: any;

  beforeEach(waitForAsync(() => {
    // Mock de CategoriesService
    categoriesServiceMock = {
      requestCategories: jasmine.createSpy('requestCategories').and.returnValue(Promise.resolve({
        categories: [
          { idCategory: '1', strCategory: 'Vegetarian' },
          { idCategory: '2', strCategory: 'Seafood' }
        ]
      }))
    };

    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: CategoriesService, useValue: categoriesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on ngOnInit', async () => {
    await component.ngOnInit();
    expect(categoriesServiceMock.requestCategories).toHaveBeenCalled();
    expect(component.list.length).toBe(2);
    expect(component.list[0].strCategory).toBe('Vegetarian');
    expect(component.list[1].strCategory).toBe('Seafood');
  });

  it('should emit selected category when selectCategory is called', () => {
    spyOn(component.categorySelected, 'emit');

    const category = 'Vegetarian';
    component.selectCategory(category);

    expect(component.categorySelected.emit).toHaveBeenCalledWith(category);
  });
});
