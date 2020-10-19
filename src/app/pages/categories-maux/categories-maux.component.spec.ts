import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesMauxComponent } from './categories-maux.component';

describe('CategoriesMauxComponent', () => {
  let component: CategoriesMauxComponent;
  let fixture: ComponentFixture<CategoriesMauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesMauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesMauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
