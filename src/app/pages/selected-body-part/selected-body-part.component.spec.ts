import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBodyPartComponent } from './selected-body-part.component';

describe('SelectedBodyPartComponent', () => {
  let component: SelectedBodyPartComponent;
  let fixture: ComponentFixture<SelectedBodyPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedBodyPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBodyPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
