import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollOnSummaryService {

  private scrollOnSummary: BehaviorSubject<string> = new BehaviorSubject('a');

  constructor() { }

  observeSummary() {
    return this.scrollOnSummary.asObservable();
  }

  dispatchEvent(letter: string) {
    this.scrollOnSummary.next(letter);
  }
}
