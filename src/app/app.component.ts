import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateDatasService } from './services/create-datas/create-datas.service';
import { ListsOilsService } from './services/lists-oils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'visuals';

  constructor(
    private router: Router,
    private createDatas: CreateDatasService
  )
  {  }

  ngOnInit(): void {
    this.createDatas.createCache();
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
