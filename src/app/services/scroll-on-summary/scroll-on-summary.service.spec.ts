import { TestBed } from '@angular/core/testing';

import { ScrollOnSummaryService } from './scroll-on-summary.service';

describe('ScrollOnSummaryService', () => {
  let service: ScrollOnSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollOnSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
