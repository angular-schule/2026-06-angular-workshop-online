import { Component, effect, signal } from '@angular/core';
import { Book } from '../shared/book';
import { form, FormField, FormRoot, min, max, required, minLength, maxLength, provideSignalFormsConfig, pattern } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-create-page',
  imports: [FormField, FormRoot, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss',
  providers: [
    provideSignalFormsConfig({
      classes: {
        invalid: (formField) => formField.state().invalid() && formField.state().touched()
      }
    })
  ]
})
export class BookCreatePage {
  // Datenmodell
  protected readonly bookFormData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: []
  });

  // Formularmodell
  protected readonly bookForm = form(
    this.bookFormData,
    path => {
      required(path.isbn, { message: 'ISBN muss angegeben werden.' });
      minLength(path.isbn, 13, { message: 'ISBN ist zu kurz.' });
      maxLength(path.isbn, 13, { message: 'ISBN ist zu lang.' });
      pattern(path.isbn, /^[0-9]*$/, { message: 'ISBN muss aus Zahlen bestehen.' });
      
      required(path.title, { message: 'Titel muss angegeben werden.' });
      
      required(path.rating, { message: 'Bewertung muss angegeben werden.' });
      min(path.rating, 1, { message: 'Bewertung muss zwischen 1 und 5 sein.' });
      max(path.rating, 5, { message: 'Bewertung muss zwischen 1 und 5 sein.' });
      
      required(path.price, { message: 'Preis muss angegeben werden.' });
      min(path.price, 0, { message: 'Preis darf nicht < 0 sein.' });
    }
  );

  constructor() {
    /*effect(() => {
      localStorage.setItem('formData', JSON.stringify(this.bookFormData()))
    })

    const fromStorage = localStorage.getItem('formData');
    if (fromStorage) {
      this.bookFormData.set(JSON.parse(fromStorage))
    }*/
  }

}
