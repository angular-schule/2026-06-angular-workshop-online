import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { DatePipe } from '@angular/common';
import { map, tap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, DatePipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  readonly #bookStore = inject(BookStore);
  readonly #ratingHelper = inject(BookRatingHelper);

  protected readonly books = this.#bookStore.booksResource;

  protected readonly currentTimestamp = toSignal(
    timer(0, 1000).pipe(
      map(() => Date.now()),
      tap(e => console.log('TAP', e))
    ),
    { initialValue: Date.now() }
  );

  constructor() {
    this.books.reload();
    /*this.#bookStore.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/

    /*const interval = setInterval(() => this.currentTimestamp.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(interval));*/
  }

  doRateUp(book: Book) {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }
  
  doRateDown(book: Book) {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  doLikeBook(book: Book) {
    this.#bookStore.addLikedBook(book);
  }

  doDelete(book: Book) {
    this.#bookStore.delete(book.isbn).subscribe(() => {
      this.books.reload();
      // ODER: lokal aktualisieren
      // this.books.value.update(books => books.filter(b => b.isbn !== book.isbn));
    });
  }

  #updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,6,7,8,9,10].filter(e => e > 5) // [6, 7, 8, 9, 10]
    
    this.books.value.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      });
    });
    // this.books.update(currentList => currentList.map(b => b.isbn === ratedBook.isbn ? ratedBook : b));
  }
}