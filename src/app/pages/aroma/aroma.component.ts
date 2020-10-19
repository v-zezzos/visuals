import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { News } from 'src/app/models/config';
import { ConfigService } from 'src/app/services/config/config.service';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';
import { ListsOilsService } from 'src/app/services/lists-oils.service';

@Component({
  selector: 'app-aroma',
  templateUrl: './aroma.component.html',
  styleUrls: ['./aroma.component.scss']
})
export class AromaComponent implements OnInit, AfterViewInit {

  viewReady: boolean = false;
  width: number;
  height: number;
  news: News[]; // { title: string, subtitle: string, text: string, img: string}[];

  @ViewChild('carouselEl')
  carouselRef: ElementRef;

  constructor(
    private router: Router,
    private createDatasService: CreateDatasService,
  ) {
  }

  ngOnInit(): void {
    // this.news = this.listOilsService.getListNews();
    this.createDatasService.getNews().subscribe((data) => {
      this.news = data;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const rect = (this.carouselRef.nativeElement as HTMLDivElement).getBoundingClientRect();
      this.width = rect.width;
      this.height = this.height;
      console.log(this.width);
      this.viewReady = true;
    }, 0);
  }

  navigate(): void {
    this.router.navigate(['/home']);
  }

  goToVegetalsOils(): void {
    this.router.navigate(['/vegetals-oils']);
  }

  goToEssentialsOils(): void {
    this.router.navigate(['/essentials-oils']);
  }

  goToNews(id: number) {
    this.router.navigate(['/news', id]);
  }

  goToMaux() {
    this.router.navigate(['/maux']);
  }

  testHttpGet() {
    this.createDatasService.getDatasCache().subscribe((data) => {
      console.log('test', data);
      console.log(Object.keys(data.recettes[0].fields));
    });
    this.createDatasService.getDatasCache().subscribe((data: any) => {
      console.log(data);
      console.log(data.maux);
    });
    this.createDatasService.vegetalOils.subscribe((datas) => {
      console.log('retour getVegetalsOils', datas);
    });
    this.createDatasService.essentialOils.subscribe((data) => {
      console.log('retour getEssentialsOils', data);
    });
    this.createDatasService.getNews().subscribe((data) => {
      console.log('retour getNews', data);
    });
    this.createDatasService.getRecettes().subscribe((data) => {
      console.log('retour getRecettes', data);
    });
  }
}
