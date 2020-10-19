import { Injectable } from '@angular/core';
import { VegetalOil, EssentialOil } from '../models/config';
import { compareOil } from '../tools/compare-oil';

@Injectable({
  providedIn: 'root'
})
export class ListsOilsService {

  private listVegetalsOils = [
    { name: 'amande douce', img: 'istockphoto-1153088551-1024x1024.jpg', property: '', describ: '', precaution: ''},
    { name: 'arachide', img: '', property: '', describ: '', precaution: ''},
    { name: 'argan', img: '', property: '', describ: '', precaution: ''},
    { name: 'colza', img: '', property: '', describ: '', precaution: ''},
    { name: 'coprah', img: '', property: '', describ: '', precaution: ''},
    { name: 'noix', img: '', property: '', describ: '', precaution: ''},
    { name: 'lin', img: '', property: '', describ: '', precaution: ''},
    { name: 'maïs', img: '', property: '', describ: '', precaution: ''},
    { name: 'cannelle de ceylan', img: '', property: '', describ: '', precaution: ''},
    { name: 'cardamone', img: '', property: '', describ: '', precaution: ''},
    { name: 'carvi', img: 'caraway-seeds-290973_960_720.webp', property: '', describ: '', precaution: ''},
    { name: 'cèdre de l\'atlas', img: '', property: '', describ: '', precaution: ''},
    { name: 'ciste', img: '', property: '', describ: '', precaution: ''},
    { name: 'citron', img: '', property: '', describ: '', precaution: ''},
    { name: 'ajowan', img: '', property: '', describ: '', precaution: ''},
    { name: 'aneth', img: '', property: '', describ: '', precaution: ''},
    { name: 'angélique', img: '', property: '', describ: '', precaution: ''},
    { name: 'basilic tropical', img: '', property: '', describ: '', precaution: ''},
    { name: 'bergamote', img: '', property: '', describ: '', precaution: ''},
    // new VegetalOil('cade', '')
  ];
  private listEssentialssOils = [
    { name: 'amande douce', img: 'istockphoto-1153088551-1024x1024.jpg', property: '', describ: '', precaution: ''},
    { name: 'arachide', img: '', property: '', describ: '', precaution: ''},
    { name: 'argan', img: '', property: '', describ: '', precaution: ''},
    { name: 'colza', img: '', property: '', describ: '', precaution: ''},
    { name: 'coprah', img: '', property: '', describ: '', precaution: ''},
    { name: 'noix', img: '', property: '', describ: '', precaution: ''},
    { name: 'wlin', img: '', property: '', describ: '', precaution: ''},
    { name: 'maïs', img: '', property: '', describ: '', precaution: ''},
    { name: 'cannelle de ceylan', img: '', property: '', describ: '', precaution: ''},
    { name: 'cardamone', img: '', property: '', describ: '', precaution: ''},
    { name: 'carvi', img: 'caraway-seeds-290973_960_720.webp', property: '', describ: '', precaution: ''},
    { name: 'cèdre de l\'atlas', img: '', property: '', describ: '', precaution: ''},
    { name: 'ciste', img: '', property: '', describ: '', precaution: ''},
    { name: 'citron', img: '', property: '', describ: '', precaution: ''},
    { name: 'ajowan', img: '', property: '', describ: '', precaution: ''},
    { name: 'raneth', img: '', property: '', describ: '', precaution: ''},
    { name: 'angélique', img: '', property: '', describ: '', precaution: ''},
    { name: 'basilic tropical', img: '', property: '', describ: '', precaution: ''},
    { name: 'bergamote', img: '', property: '', describ: '', precaution: ''},
    // new EssentialOil('cade', '')
  ];

  private news = [
    { title: 'Les allergies font leur retour…', subtitle: 'Démangeaisons, éternuements, plaques…', text: 'Le nez qui coule, la succession d’éternuements, la gorge irritée et les yeux gonflés qui picotent ou qui démangent : les signes sont là, vous êtes bel et bien confrontés à une allergie saisonnière. En effet, à l’approche du printemps, les arbres se chargent de pollen, un allergène pour certains d’entre nous.', img: '../../../assets/news/16082.jpg'},
    { title: '1', subtitle: '', text: '', img: '../../../assets/news/74765-nature-landscape.jpg'},
    { title: '2', subtitle: '', text: '', img: '../../../assets/news/mountain-landscape-trees-nature-scenery-8K-158.jpg'},
    { title: '3', subtitle: '', text: '', img: '../../../assets/news/wp4600617.jpg'}
  ];

  selectedOil: any = undefined;
  selectedEssentialOil: EssentialOil = undefined;
  selectedVegetalOil: VegetalOil = undefined;
  selectedOilIsEssential: boolean = undefined;

  constructor() { }

  getListVegetalsOils() {
    return this.listVegetalsOils.sort(compareOil);
  }

  getListEssentialsOils() {
    return this.listEssentialssOils.sort(compareOil);
  }

  getListNews() {
    return this.news;
  }

}
