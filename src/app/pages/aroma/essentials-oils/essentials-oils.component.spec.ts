import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialsOilsComponent } from './essentials-oils.component';

describe('EssentialsOilsComponent', () => {
  let component: EssentialsOilsComponent;
  let fixture: ComponentFixture<EssentialsOilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssentialsOilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssentialsOilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
