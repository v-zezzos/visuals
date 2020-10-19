import { EssentialOil } from '../models/essential-oil';
import { VegetalOil } from '../models/vegetals-oil';

export function compareOil(o1: VegetalOil | EssentialOil, o2: VegetalOil | EssentialOil) {
    return o1.name.localeCompare(o2.name);
}
