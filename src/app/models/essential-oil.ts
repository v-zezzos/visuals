import { VegetalOil} from './vegetals-oil';

export class EssentialOil extends VegetalOil {
  constructor(
    public name: string,
    public img: string,
    public property: string = '',
    public describ: string = '',
    public precaution: string = ''
  ) {
    super(name, img, property, describ, precaution);
  }
}
