import { TestBed, inject } from '@angular/core/testing';

import { OpenSearchService } from './open-search.service';

describe('OpenSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenSearchService]
    });
  });

  it('should ...', inject([OpenSearchService], (service: OpenSearchService) => {
    expect(service).toBeTruthy();
  }));
});
