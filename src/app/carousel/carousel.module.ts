import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent } from './components/carousel/carousel.component';



@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CarouselComponent,
  ]
})
export class CarouselModule { }
