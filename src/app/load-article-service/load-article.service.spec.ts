import { TestBed, inject } from '@angular/core/testing';

import { LoadArticleService } from './load-article.service';

describe('LoadArticleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadArticleService]
    });
  });

  it('should ...', inject([LoadArticleService], (service: LoadArticleService) => {
    expect(service).toBeTruthy();
  }));
});
