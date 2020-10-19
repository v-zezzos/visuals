import { TestBed } from '@angular/core/testing';

import { CreateDatasService } from './create-datas.service';

describe('CreateDatasService', () => {
  let service: CreateDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
