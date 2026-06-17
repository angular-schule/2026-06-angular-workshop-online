import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from '../book-card/book-card';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
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
      },
      {
        isbn: '123',
        title: 'React',
        description: 'Komponentenbasierte UI-Entwicklung',
        rating: 4,
        price: 34.9,
        authors: ['Oliver Zeigermann', 'Nils Hartmann']
      },
      {
        isbn: '321',
        title: 'TypeScript',
        description: 'Typsichere JavaScript-Entwicklung',
        rating: 5,
        price: 29.9,
        authors: ['Stefan Baumgartner']
      },
      {
        isbn: '654',
        title: 'RxJS',
        description: 'Reaktive Programmierung mit Observables',
        rating: 4,
        price: 32.9,
        authors: ['Michael Kaaden']
      },
      {
        isbn: '987',
        title: 'NestJS',
        description: 'Skalierbare Server-Anwendungen mit Node.js',
        rating: 4,
        price: 42.9,
        authors: ['Johannes Hoppe', 'Gregor Woiwode']
      },
      {
        isbn: '147',
        title: 'Svelte',
        description: 'Das Framework ohne virtuelles DOM',
        rating: 4,
        price: 31.9,
        authors: ['Rich Harris']
      },
      {
        isbn: '258',
        title: 'Node.js',
        description: 'Serverseitige JavaScript-Entwicklung',
        rating: 5,
        price: 38.9,
        authors: ['Sebastian Springer']
      }
    ]);
  }
}