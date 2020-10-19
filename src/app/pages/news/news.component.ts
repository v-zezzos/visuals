import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/config';
import { CreateDatasService } from 'src/app/services/create-datas/create-datas.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  idNews: string;
  newsData: News[];
  newsToShow: News;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private createDatasService: CreateDatasService
  ) { }

  ngOnInit(): void {
    this.idNews = this.route.snapshot.paramMap.get('id');
    this.createDatasService.news.subscribe((newsArray) => {
      this.newsData = newsArray;
      if (this.idNews !== null) {
        this.newsToShow = this.newsData.find(newsData => {
          return newsData.id === this.idNews;
        });
        console.log('ici c\'est IF!');
      } else {
        this.newsToShow = this.newsData[0];
        console.log('ici c\'est ELSE');
      }
      console.log('après subscribre', this.newsToShow, this.idNews);
    });
  }

  goToHome() {
    this.router.navigate(['aroma']);
  }
}
