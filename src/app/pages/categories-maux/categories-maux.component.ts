import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-maux',
  templateUrl: './categories-maux.component.html',
  styleUrls: ['./categories-maux.component.scss']
})
export class CategoriesMauxComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToSelectedMaux(selectedMaux: string) {
    this.router.navigate(['/selected-body-part']);
  }

  backToHome() {
    this.router.navigate(['/aroma']);
  }
}
