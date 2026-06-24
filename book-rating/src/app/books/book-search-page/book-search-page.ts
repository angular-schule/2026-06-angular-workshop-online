import { Component, computed, debounced, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { BookStore } from '../shared/book-store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-search-page',
  imports: [FormField, JsonPipe],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss',
})
export class BookSearchPage {
  protected readonly searchTerm = signal('');
  protected readonly searchForm = form(this.searchTerm);

  protected readonly debouncedSearchTerm = debounced(this.searchTerm, 1000);
  protected readonly searchTermMin3 = computed(() => this.debouncedSearchTerm.value().length >= 3 ? this.debouncedSearchTerm.value() : undefined);

  protected readonly results = inject(BookStore).searchResource(this.searchTermMin3);
}
