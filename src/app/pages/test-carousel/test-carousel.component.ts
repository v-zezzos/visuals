import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { News } from 'src/app/models/config';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';

@Component({
  selector: 'app-test-carousel',
  templateUrl: './test-carousel.component.html',
  styleUrls: ['./test-carousel.component.scss']
})
export class TestCarouselComponent implements OnInit {


  items: string[];

  constructor(private createDataService: CreateDatasService) { }

  ngOnInit(): void {
    this.createDataService.news.subscribe((newsDatas) => {
      this.items = newsDatas.map(newData => newData.img);
    });
  }

}
