import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EssentialOil } from 'src/app/models/config';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';
import { ListsOilsService } from 'src/app/services/lists-oils.service';
import { ScrollService } from 'src/app/services/scroll/scroll.service';
import { alphabet } from 'src/app/tools/alphabet';

/* tslint:disable:object-literal-shorthand*/

@Component({
  selector: 'app-essentials-oils',
  templateUrl: './essentials-oils.component.html',
  styleUrls: ['./essentials-oils.component.scss']
})
export class EssentialsOilsComponent implements OnInit {

  listOils: EssentialOil[];
  alphabet: {letter: string, active: boolean}[];

  @ViewChild('scrollEl')
  scrollRef: ElementRef;

  constructor(
    private listsOils: ListsOilsService,
    private scrollService: ScrollService,
    private createDatasService: CreateDatasService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    // this.listOils = this.listsOils.getListEssentialsOils();
    this.createDatasService.essentialOils.subscribe((essentialOils) => {
      this.listOils = essentialOils;
      this.alphabet = alphabet.map((letter: string) => {
        return {
          letter: letter,
          active: this.listOils.some((oil: EssentialOil) => {
            return oil.name.charAt(0).toLocaleLowerCase() === letter.toLocaleLowerCase();
          })
        };
      });
    });
  }

  divHasScrolled(evt) {
    // console.log(evt, 'teste viewChildren :' , (this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top);
    this.scrollService.dispatchEvent((this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top);
  }

  backToHome() {
    this.router.navigate(['/aroma']);
  }
}
