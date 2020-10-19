import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AromaComponent } from './aroma.component';

describe('AromaComponent', () => {
  let component: AromaComponent;
  let fixture: ComponentFixture<AromaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AromaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AromaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
