import { Component, effect, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { form, FormField, FormRoot, min, max, required, minLength, maxLength, provideSignalFormsConfig, pattern, schema, apply, applyWhen, validate, debounce, disabled, hidden, applyEach } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { BookStore } from '../shared/book-store';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


const isbnSchema = schema<string>(path => {
  required(path, { message: 'ISBN muss angegeben werden.' });
  minLength(path, 13, { message: 'ISBN ist zu kurz.' });
  maxLength(path, 13, { message: 'ISBN ist zu lang.' });
  pattern(path, /^[0-9]*$/, { message: 'ISBN muss aus Zahlen bestehen.' });

  validate(path, (ctx) => {
    if (!ctx.value().startsWith('978')) {
      return [
        { kind: 'isbnFormat', message: 'ISBN muss mit 978 beginnen.' }
      ];
    } else {
      return undefined;
    }
  })
});


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
  readonly #store = inject(BookStore);
  readonly #router = inject(Router);

  // Datenmodell
  protected readonly bookFormData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: ['', '']
  });

  // Formularmodell
  protected readonly bookForm = form(
    this.bookFormData,
    path => {
      apply(path.isbn, isbnSchema);
      /*applyWhen(
        path.title,
        (ctx) => {
          return ctx.stateOf(path.isbn).valid();
        },
        titlePath => {
          required(titlePath);
        }
      )*/
      
      required(path.title, { message: 'Titel muss angegeben werden.' });
      debounce(path.title, 150);

      hidden(path.description, { when: (ctx) => !ctx.valueOf(path.title) });
      
      required(path.rating, { message: 'Bewertung muss angegeben werden.' });
      min(path.rating, 1, { message: 'Bewertung muss zwischen 1 und 5 sein.' });
      max(path.rating, 5, { message: 'Bewertung muss zwischen 1 und 5 sein.' });
      
      required(path.price, { message: 'Preis muss angegeben werden.' });
      min(path.price, 0, { message: 'Preis darf nicht < 0 sein.' });

      /*applyEach(path.authors, authorPath => {
        required(authorPath);
        minLength(authorPath, 3);
      });*/

      validate(path.authors, (ctx) => {
        if (!ctx.value().some(value => value.length > 0)) {
          return [
            { kind: 'minOneAuthor', message: 'Mindestens 1 Autor notwendig' }
          ];
        } else {
          return undefined;
        }
      })
    },
    {
      submission: {
        action: async (f) => {
          const book = {
            ...f().value(),
            authors: f.authors().value().filter(a => a.length > 0)
          };

          try {
            await firstValueFrom(this.#store.create(book));
            await this.#router.navigate(['/books', book.isbn]);
          } catch (e: unknown) {
            if (e instanceof HttpErrorResponse) {
              console.error('FEHLER!', e.status);
              if (e.status === 409) {
                return [
                  { kind: 'isbnExists', message: 'ISBN ist schon belegt.', fieldTree: f.isbn }
                ];
              } else {
                return [];
              }
            }
          }
          return [];
        }
      }
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

  addAuthorField() {
    this.bookForm.authors().value.update(oldAuthors => [...oldAuthors, '']);

    /*this.bookFormData.update(oldData => ({
      ...oldData,
      authors: [...oldData.authors, '']
    }))*/
  }

}


/*
TODO
- Submit-Button
- nur abschicken, wenn gültig
- Daten aus dem Formular holen
- BookStore.create() Anlegen per HTTP
- bei Erfolg:
  - a) Nachricht anzeigen, auf der Seite bleiben, Formular zurücksetzen
  - b) Navigieren zur Detailseite

*/