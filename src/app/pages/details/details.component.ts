import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EssentialOil, VegetalOil } from 'src/app/models/config';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';
import { ListsOilsService } from 'src/app/services/lists-oils.service';
import { ScrollService } from 'src/app/services/scroll/scroll.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  idOil: any; // VegetalOil | EssentialOil;
  detailVegetalOilSelected: VegetalOil;
  detailEssentialOilSelected: EssentialOil;
  selectedOil: any;
  @ViewChild('scrollEl')
  scrollRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private createDataService: CreateDatasService,
    private scrollService: ScrollService,
    private listOilService: ListsOilsService,
  ) { }

  ngOnInit(): void {
    if (!this.listOilService.selectedOil) {
      this.backToHome();
    }

    this.idOil = this.route.snapshot.paramMap.get('id');
    this.selectedOil = this.listOilService.selectedOil;
    /*if (this.listOilService.selectedOilIsEssential) {
      this.detailEssentialOilSelected = this.listOilService.selectedEssentialOil;
    } else {
      this.detailVegetalOilSelected = this.listOilService.selectedVegetalOil;
    }
     this.detailOilSelected = (
      this.listOilService.selectedOilIsEssential ? this.listOilService.selectedEssentialOil : this.listOilService.selectedVegetalOil
      ); */
    console.log('test variable', this.detailVegetalOilSelected, this.detailEssentialOilSelected,
    'dans list oil vegetal selectionné', this.listOilService.selectedVegetalOil,
    'essential selectionné', this.listOilService.selectedEssentialOil,
    'boolean isEssential', this.listOilService.selectedOilIsEssential);
  }

  divHasScrolled(evt) {
    console.log(evt, 'teste viewChildren :' , (this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top);
    this.scrollService.dispatchEvent((this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top);
  }

  buttonBack() {
    if (this.selectedOil.isEssential) {
      this.router.navigate(['/essentials-oils']);
    } else {
      this.router.navigate(['/vegetals-oils']);
    }
  }

  backToHome() {
    this.router.navigate(['/aroma']);
  }
}
