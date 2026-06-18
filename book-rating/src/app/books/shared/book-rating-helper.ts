import { Service } from '@angular/core';
import { Book } from './book';

// bis Angular 21: @Injectable({ providedIn: 'root' })
@Service() // ab Angular 22
export class BookRatingHelper {
    rateUp(book: Book): Book {
        if (book.rating >= 5) {
            return book;
        }
        
        return {
            ...book,
            rating: book.rating + 1
        };
    }

    rateDown(book: Book): Book {
        return {
            ...book,
            rating: Math.max(1, book.rating - 1)
        };
    }
}