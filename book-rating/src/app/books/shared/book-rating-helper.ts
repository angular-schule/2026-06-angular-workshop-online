import { Service } from '@angular/core';
import { Book } from './book';

@Service() // ab Angular 22
// bis Angular 21: @Injectable({ providedIn: 'root' })
export class BookRatingHelper {
    rateUp(book: Book): Book {
        return book; // TODO!
    }

    rateDown(book: Book): Book {
        return book; // TODO!
    }
}
