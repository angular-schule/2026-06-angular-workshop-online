import { TestBed } from '@angular/core/testing';

import { BookRatingHelper } from './book-rating-helper';

describe('BookRatingHelper', () => {
  let service: BookRatingHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {});
  
  it('should rate down a book by one', () => {});

  it('should not rate higher than 5', () => {})
  
  it('should not rate lower than 1', () => {})
});
