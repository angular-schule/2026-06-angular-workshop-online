import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    function myOf<T>(...values: T[]): Observable<T> {
      return new Observable<T>(sub => {
        values.forEach(v => sub.next(v));
        sub.complete();
      });
    }

    // interval(1000)         // ---0---1---2---3---4---5---6 ...
    // timer(3000)            // ---------0|
    // timer(3000, 1000)      // ---------0---1---2---3---4---5---6 ...
    // timer(0, 1000)         // 0---1---2---3---4---5---6 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE'),
    });




    /******************************/

    // PRODUCER: generiert Werte
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(5);
      sub.next(10);
      sub.complete();
      sub.next(15);
      // fetch('/api').then(res => res.json()).then(data => sub.next(data))

      setTimeout(() => sub.next(100), 2000);
      setTimeout(() => sub.next(500), 4000);
      setTimeout(() => sub.complete(), 6000);
    }

    // OBSERVER: verarbeitet die Werte
    const obs: Observer<number> = {
      next: (e) => console.log(e),
      error: (error: any) => console.error(error),
      complete: () => console.log('FERTIG')
    };

    // producer(obs);
    // OBSERVABLE: Schnittstelle zwischen PRODUCER und OBSERVER
    // vermittelt die Werte zwischen Quelle und Ziel
    // Finnische Notation $
    const myObs$ = new Observable(producer);
    // myObs$.subscribe(obs);

    
    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
