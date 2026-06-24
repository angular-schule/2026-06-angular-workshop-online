import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-book-search-page',
  imports: [FormField],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss',
})
export class BookSearchPage {
  protected readonly searchTerm = signal('');
  protected readonly searchForm = form(this.searchTerm);

  constructor() {
    toObservable(this.searchTerm).subscribe(e => console.log(e));
  }
}
