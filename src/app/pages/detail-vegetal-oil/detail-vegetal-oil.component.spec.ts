import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVegetalOilComponent } from './detail-vegetal-oil.component';

describe('DetailVegetalOilComponent', () => {
  let component: DetailVegetalOilComponent;
  let fixture: ComponentFixture<DetailVegetalOilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailVegetalOilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVegetalOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
