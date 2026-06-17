import { Component, computed, input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  // Input: hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  readonly book = input.required<Book>();

  // Computed Signal: Wert wird neu berechnet, wenn this.book sich ändert
  readonly authors = computed(() => this.book().authors.join(', '));
}
