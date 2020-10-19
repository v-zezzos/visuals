import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VegetalOil } from 'src/app/models/config';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';
import { ListsOilsService } from 'src/app/services/lists-oils.service';
import { ScrollService } from 'src/app/services/scroll/scroll.service';

@Component({
  selector: 'app-detail-vegetal-oil',
  templateUrl: './detail-vegetal-oil.component.html',
  styleUrls: ['./detail-vegetal-oil.component.scss']
})
export class DetailVegetalOilComponent implements OnInit {

  selectedOil: VegetalOil;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private createDataService: CreateDatasService,
    private scrollService: ScrollService,
    private listOilService: ListsOilsService,
  ) { }

  ngOnInit(): void {
    const idOil = +this.route.snapshot.paramMap.get('id');
    // console.log('id de l\'huile', idOil);
    this.createDataService.getVegetalOil('' + idOil).subscribe((oil) => {
      this.selectedOil = oil;
      /*setTimeout(() => {
        this.initIdRefMap();
      }, 0);*/
      /*this.compatibilitiesOfUses = Object.entries(this.selectedOil.compatibilitiesOfUses).filter(([, value]) => {
          return value;
        }).map(([key, value]) => {
          return {key, value};
        });*/
      // console.log('HUILE SELECTIONNE', this.selectedOil, typeof(idOil), typeof(oil.id), this.compatibilitiesOfUses);
      // console.log('debug', '' + idOil === this.selectedOil.id);
    });
  }
  divHasScrolled(evt) {
    /*if (this.autoscroll) {
      return ;
    }
    const topScrollRef = (this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top;
    const idRef = Object.entries(this.idRefMap).find(([, ref]) => {
      return ref.nativeElement.getBoundingClientRect().top >= topScrollRef;
    });
    this.selectedSummary = idRef[0];*/
  }

  buttonBack() {
    this.router.navigate(['/vegetals-oils']);
  }

  backToHome() {
    this.router.navigate(['/aroma']);
  }

}
