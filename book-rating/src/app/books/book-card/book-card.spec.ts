import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCard } from './book-card';
import { inputBinding, outputBinding, signal } from '@angular/core';
import { Book } from '../shared/book';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookCard, {
      bindings: [
        // Input dynamisch setzen: Wenn Signals verwendet werden, reagiert das Binding darauf
        inputBinding('book', () => ({
          isbn: '456',
          title: '',
          description: '',
          authors: [],
          rating: 4,
          price: 10
        })),
        // outputBinding('rateUp', (payload) => {})
      ]
    });
    
    // Input imperativ setzen
    // fixture.componentRef.setInput('bookx', { isbn: '', title: '' });
    
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
