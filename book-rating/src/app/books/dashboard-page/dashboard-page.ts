import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);

  constructor() {
    this.books.set([
      {
        isbn: '456',
        title: 'Angular',
        description: 'Das Praxisbuch',
        rating: 5,
        price: 39.9,
        authors: ['Ferdinand Malcher', 'Danny Koppenhagen', 'Johannes Hoppe']
      },
      {
        isbn: '789',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 36.9,
        authors: ['Fabian Deitelhoff']
      }
    ]);
  }
}