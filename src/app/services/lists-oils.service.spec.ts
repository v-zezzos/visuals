import { TestBed } from '@angular/core/testing';

import { ListsOilsService } from './lists-oils.service';

describe('ListsOilsService', () => {
  let service: ListsOilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsOilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
