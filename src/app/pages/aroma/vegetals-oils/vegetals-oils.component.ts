import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VegetalOil } from 'src/app/models/config';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';
import { ListsOilsService } from 'src/app/services/lists-oils.service';
import { ScrollService } from 'src/app/services/scroll/scroll.service';
import { alphabet } from 'src/app/tools/alphabet';

/* tslint:disable:object-literal-shorthand*/

@Component({
  selector: 'app-vegetals-oils',
  templateUrl: './vegetals-oils.component.html',
  styleUrls: ['./vegetals-oils.component.scss']
})
export class VegetalsOilsComponent implements OnInit {

  listOils: VegetalOil[];
  alphabet: {letter: string, active: boolean}[];

  @ViewChild('scrollEl')
  scrollRef: ElementRef;

  @HostListener('scroll', ['$event'])
  scrollMe(event) {

    console.log('scrolerl');
    console.log(event);
    console.log((event.target as Element).scrollTop);

  }

  constructor(
    private listsOils: ListsOilsService,
    private scrollService: ScrollService,
    private createDatasService: CreateDatasService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.createDatasService.vegetalOils.subscribe((vegetalOils) => {
      this.listOils = vegetalOils;
      this.alphabet = alphabet.map((letter: string) => {
        return {
          letter: letter,
          active: this.listOils.some((oil: VegetalOil) => {
            return oil.name.charAt(0).toLocaleLowerCase() === letter.toLocaleLowerCase();
          })
        };
      });
    });
  }

  backToHome(): void {
    this.router.navigate(['/aroma']);
  }

  divHasScrolled(evt) {
    // console.log(evt, 'teste viewChildren :' , (this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top);
    this.scrollService.dispatchEvent((this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top);
  }
}
