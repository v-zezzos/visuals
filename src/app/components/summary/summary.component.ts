import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollOnSummaryService } from 'src/app/services/scroll-on-summary/scroll-on-summary.service';
import { SummaryService } from 'src/app/services/summary/summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  @Input()
  public alphabet: {letter: string, active: boolean}[];
  @Input()
  public idSummary: string;
  public selectedLetter: string = 'a';
  private scrollOnsummarySub: Subscription;

  constructor(
    private summaryService: SummaryService,
    private scrollOnSummary: ScrollOnSummaryService
    ) { }

  ngOnInit(): void {
    this.scrollOnsummarySub = this.scrollOnSummary.observeSummary().subscribe((letter) => {
     // console.log('de la liste a l\'alphabet ', letter);
      this.selectedLetter = letter;
    });
  }

  selectLetter(letter: {letter: string, active: boolean}) {
    if (!letter.active) {
      return;
    }
    this.summaryService.dispatchEvent(letter.letter, this.idSummary);
    this.selectedLetter = letter.letter;
  }

  ngOnDestroy() {
    this.scrollOnsummarySub.unsubscribe();
  }
}
