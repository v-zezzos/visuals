import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scroll: BehaviorSubject<number> = new BehaviorSubject(undefined);

  constructor() { }

  observeSummary() {
    return this.scroll.asObservable();
  }

  dispatchEvent(evt: number) {
    this.scroll.next(evt);
  }
}
