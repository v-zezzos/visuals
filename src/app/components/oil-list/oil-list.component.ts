import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EssentialOil, VegetalOil } from 'src/app/models/config';
import { SummaryEvent } from 'src/app/models/summary-event';
import { ListsOilsService } from 'src/app/services/lists-oils.service';
import { ScrollOnSummaryService } from 'src/app/services/scroll-on-summary/scroll-on-summary.service';
import { ScrollService } from 'src/app/services/scroll/scroll.service';
import { SummaryService } from 'src/app/services/summary/summary.service';

@Component({
  selector: 'app-oil-list',
  templateUrl: './oil-list.component.html',
  styleUrls: ['./oil-list.component.scss']
})
export class OilListComponent implements OnInit, OnDestroy {

  @Input()
  listOil: VegetalOil[] | EssentialOil[];
  @Input()
  idSummary: string;

  @ViewChildren('oilEl')
  oilRefs: QueryList<ElementRef>;

  selectedLetterSub: Subscription;
  scrollSub: Subscription;
  autoScroll: boolean = false;

  constructor(
    private summaryService: SummaryService,
    private scrollService: ScrollService,
    private scrollOnSummary: ScrollOnSummaryService,
    private listOilService: ListsOilsService,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.selectedLetterSub = this.summaryService.observeSummary(this.idSummary).subscribe((evt: SummaryEvent) => {
      this.autoScroll = true;
      this.scrollTo(evt.letter);
      setTimeout(() => {
        this.autoScroll = false;
      }, 500);
    });
    this.scrollSub = this.scrollService.observeSummary().subscribe((top) => {
      if (this.autoScroll) {
        return ;
      }
      this.showScroll(top);
    });
  }

  showScroll(top) {
    if (!this.oilRefs) {
      return ;
    }
    const index = this.oilRefs.toArray().findIndex((oilRef) => {
      return (oilRef.nativeElement as HTMLDivElement).getBoundingClientRect().top >= top;
    });
    if (index === -1) {
      return ;
    }
    this.scrollOnSummary.dispatchEvent(this.listOil[index].name[0]);
    // this.oilRefs.toArray().forEach((oilRef, indexRef) => {
    //   console.log(this.listOil[indexRef].name, (oilRef.nativeElement as HTMLDivElement).getBoundingClientRect().top);
    // });
  }

  scrollTo(letter: string) {
    const index = this.listOil.findIndex((oil: VegetalOil | EssentialOil) => {
      return oil.name.charAt(0).toLocaleLowerCase() === letter.toLocaleLowerCase();
    });
    if (index !== -1) {
      this.scrollToOilEl(index);
    }
  }

  scrollToOilEl(index: number) {
    if (!this.oilRefs) {
      return ;
    }
    (this.oilRefs.toArray()[index].nativeElement as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
  }

  goToDetailOil(oil: VegetalOil) {
    console.log(oil);
    this.listOilService.selectedOil = oil;
     /*if (!oil.isEssential) {
      this.listOilService.selectedVegetalOil = oil;
      this.listOilService.selectedOilIsEssential = false;
      this.listOilService.selectedEssentialOil = undefined;
    } else {
      this.listOilService.selectedEssentialOil = oil;
      this.listOilService.selectedOilIsEssential = true;
      this.listOilService.selectedVegetalOil = undefined;
    }*/
    if (oil.isEssential) {
      console.log('On prends la route oil-essential');
      this.router.navigate(['/details-oil-essential', oil.id]);
    } else {
      console.log('On prends la route oil-vegetal');
      this.router.navigate(['/details-oil-vegetal', oil.id]);
    }

  }

  ngOnDestroy(): void {
    this.selectedLetterSub.unsubscribe();
    this.scrollSub.unsubscribe();
  }
}
