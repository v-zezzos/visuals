import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AromaComponent } from './pages/aroma/aroma.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VegetalsOilsComponent } from './pages/aroma/vegetals-oils/vegetals-oils.component';
import { LineComponent } from './components/line/line.component';
import { SummaryComponent } from './components/summary/summary.component';
import { OilListComponent } from './components/oil-list/oil-list.component';
import { EssentialsOilsComponent } from './pages/aroma/essentials-oils/essentials-oils.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './pages/news/news.component';
import { TestCarouselComponent } from './pages/test-carousel/test-carousel.component';
import { QuableImgPipe } from './pipes/quable-img/quable-img.pipe';
import { CarouselModule } from './carousel/carousel.module';
import { DetailsComponent } from './pages/details/details.component';
import { DetailEssentialOilComponent } from './pages/detail-essential-oil/detail-essential-oil.component';
import { HexaToRgbaPipe } from './pipes/hexa-to-rgba/hexa-to-rgba.pipe';
import { DetailVegetalOilComponent } from './pages/detail-vegetal-oil/detail-vegetal-oil.component';
import { CategoriesMauxComponent } from './pages/categories-maux/categories-maux.component';
import { SelectedBodyPartComponent } from './pages/selected-body-part/selected-body-part.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AromaComponent,
    VegetalsOilsComponent,
    LineComponent,
    SummaryComponent,
    OilListComponent,
    EssentialsOilsComponent,
    NewsComponent,
    TestCarouselComponent,
    QuableImgPipe,
    DetailsComponent,
    DetailEssentialOilComponent,
    HexaToRgbaPipe,
    DetailVegetalOilComponent,
    CategoriesMauxComponent,
    SelectedBodyPartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    IvyCarouselModule,
    HttpClientModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
