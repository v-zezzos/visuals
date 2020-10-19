import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegetalsOilsComponent } from './vegetals-oils.component';

describe('VegetalsOilsComponent', () => {
  let component: VegetalsOilsComponent;
  let fixture: ComponentFixture<VegetalsOilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegetalsOilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VegetalsOilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
