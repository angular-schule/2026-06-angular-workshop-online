import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink, JsonPipe],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
})
export class BookDetailsPage {
  readonly isbn = input.required<string>();
  readonly book = inject(BookStore).getSingleResource(this.isbn);

  
  // Alternativ: mit RxJS/Observables
  /*route = inject(ActivatedRoute);
  bs = inject(BookStore);

  readonly bookX = toSignal(this.route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(isbn => isbn !== null),
    switchMap(isbn => this.bs.getSingle(isbn))
  ));
 
  readonly bookY = toSignal(toObservable(this.isbn).pipe(
    switchMap(isbn => this.bs.getSingle(isbn))
  ));*/ 


}