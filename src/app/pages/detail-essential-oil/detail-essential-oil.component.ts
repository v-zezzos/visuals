import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EssentialOil, Maux } from 'src/app/models/config';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';
import { ListsOilsService } from 'src/app/services/lists-oils.service';
import { ScrollService } from 'src/app/services/scroll/scroll.service';

@Component({
  selector: 'app-detail-essential-oil',
  templateUrl: './detail-essential-oil.component.html',
  styleUrls: ['./detail-essential-oil.component.scss']
})
export class DetailEssentialOilComponent implements OnInit {

  selectedOil: EssentialOil;
  mauxForThisOil: Maux[];
  compatibilitiesOfUses: {key: string, value: string}[];
  selectedSummary: string = 'info';
  summary: {label: string, id: string}[] = [
    { label: 'Informations', id: 'info'},
    { label: 'Propriétés', id: 'properties' },
    { label: 'Conseils d\'utilisation', id: 'uses' },
    { label: 'Précautions d\'utilisation', id: 'precaution' },
    { label: 'Le saviez-vous?', id: 'dyk' },
  ];
  autoscroll: boolean = false;

  @ViewChild('scrollEl')
  scrollRef: ElementRef;

  @ViewChild('info')
  infoRef: ElementRef<HTMLDivElement>;
  @ViewChild('properties')
  propertiesRef: ElementRef<HTMLDivElement>;
  @ViewChild('uses')
  usesRef: ElementRef<HTMLDivElement>;
  @ViewChild('precaution')
  precautionRef: ElementRef<HTMLDivElement>;
  @ViewChild('didYouKnow')
  didYouKnowRef: ElementRef<HTMLDivElement>;
  idRefMap: {
    info: ElementRef<HTMLDivElement>,
    properties: ElementRef<HTMLDivElement>,
    uses: ElementRef<HTMLDivElement>,
    precaution: ElementRef<HTMLDivElement>,
    dyk: ElementRef<HTMLDivElement>,
    [prop: string]: ElementRef<HTMLDivElement>,
  };
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
    this.createDataService.getEssentialOil('' + idOil).subscribe((oil) => {
      this.selectedOil = oil;
      setTimeout(() => {
        this.initIdRefMap();
      }, 0);
      this.compatibilitiesOfUses = Object.entries(this.selectedOil.compatibilitiesOfUses).filter(([, value]) => {
        return value;
      }).map(([key, value]) => {
        return {key, value};
      });
      // console.log('HUILE SELECTIONNE', this.selectedOil, typeof(idOil), typeof(oil.id), this.compatibilitiesOfUses);
      // console.log('debug', '' + idOil === this.selectedOil.id);
    });
    this.createDataService.getMauxOfOil(idOil).subscribe((maux) => {
      // console.log('test retour getMaux', maux);
      this.mauxForThisOil = maux;
    });
  }

  initIdRefMap() {
    this.idRefMap = {
      info: this.infoRef,
      properties: this.propertiesRef,
      uses: this.usesRef,
      precaution: this.precautionRef,
      dyk: this.didYouKnowRef,
    };
    console.log(this.idRefMap);
  }

  divHasScrolled(evt) {
    if (this.autoscroll) {
      return ;
    }
    const topScrollRef = (this.scrollRef.nativeElement as HTMLDivElement).getBoundingClientRect().top;
    const idRef = Object.entries(this.idRefMap).find(([, ref]) => {
      return ref.nativeElement.getBoundingClientRect().top >= topScrollRef;
    });
    this.selectedSummary = idRef[0];
  }

  clickOnSummary(id: string) {
    this.autoscroll = true;
    this.selectedSummary = id;
    this.idRefMap[id].nativeElement.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      this.autoscroll = false;
    }, 750);
  }

  buttonBack() {
    this.router.navigate(['/essentials-oils']);
  }

  backToHome() {
    this.router.navigate(['/aroma']);
  }
}
