import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { Book } from '../shared/book';
import { Mock } from 'vitest';
import { BookStore } from '../shared/book-store';
import { of } from 'rxjs';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let rateUpMockFn: Mock;

  beforeEach(async () => {
    // Mock-Funktion
    rateUpMockFn = vi.fn();

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        // BRH ersetzen: Immer wenn jemand den Service anfordert,
        // wird stattdessen das Ersatzobjekt ausgeliefert.
        {
          provide: BookRatingHelper,
          useValue: {
            rateUp: rateUpMockFn,
            // Mock-Funktion mit eigener Implementierung
            rateDown: vi.fn().mockImplementation(b => b),
          }
        },
        {
          provide: BookStore,
          useValue: {
            getAll: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    // TS-Klasseninstanz:
    component = fixture.componentInstance;
    // DOM-Element: fixture.nativeElement
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for doRateUp()', () => {
    // ARRANGE
    // Testbuch
    const testBook = { isbn: '456', rating: 5 } as Book; // Type Assertion: gefährlich, aber im Test OK.
    
    // Mock-Verhalten steuern
    rateUpMockFn.mockReturnValue(testBook);

    // alternativ: Spy (Objekt überwachen)
    // vi.spyOn(bookRatingHelper, 'rateUp')
    
    // ACT
    component.doRateUp(testBook);

    // ASSERT
    expect(rateUpMockFn).toHaveBeenCalledExactlyOnceWith(testBook);
  });
});
