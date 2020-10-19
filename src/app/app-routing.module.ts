import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AromaComponent } from './pages/aroma/aroma.component';
import { EssentialsOilsComponent } from './pages/aroma/essentials-oils/essentials-oils.component';
import { VegetalsOilsComponent } from './pages/aroma/vegetals-oils/vegetals-oils.component';
import { CategoriesMauxComponent } from './pages/categories-maux/categories-maux.component';
import { DetailEssentialOilComponent } from './pages/detail-essential-oil/detail-essential-oil.component';
import { DetailVegetalOilComponent } from './pages/detail-vegetal-oil/detail-vegetal-oil.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { TestCarouselComponent } from './pages/test-carousel/test-carousel.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'aroma',
    component: AromaComponent,
  },
  {
    path: 'vegetals-oils',
    component: VegetalsOilsComponent,
  },
  {
    path: 'essentials-oils',
    component: EssentialsOilsComponent,
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'news/:id',
    component: NewsComponent
  },
  {
    path: 'maux',
    component: CategoriesMauxComponent
  },
  {
    path: 'details-oil-essential/:id',
    component: DetailEssentialOilComponent
  },
  {
    path: 'details-oil-vegetal/:id',
    component: DetailVegetalOilComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'test-carousel',
    component: TestCarouselComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
