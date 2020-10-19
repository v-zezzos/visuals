import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEssentialOilComponent } from './detail-essential-oil.component';

describe('DetailEssentialOilComponent', () => {
  let component: DetailEssentialOilComponent;
  let fixture: ComponentFixture<DetailEssentialOilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEssentialOilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEssentialOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
