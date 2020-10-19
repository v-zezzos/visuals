import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SummaryEvent } from 'src/app/models/summary-event';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private summary: BehaviorSubject<SummaryEvent> = new BehaviorSubject(new SummaryEvent('a', 'all'));

  constructor() { }

  observeSummary(id: string) {
    return this.summary.asObservable().pipe(
      filter((evt: SummaryEvent) => {
        return evt.id === id;
      })
    );
  }

  dispatchEvent(letter: string, id: string) {
    this.summary.next(new SummaryEvent(letter, id));
  }
}
