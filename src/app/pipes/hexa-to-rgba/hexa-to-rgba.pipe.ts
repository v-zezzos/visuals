import { Pipe, PipeTransform } from '@angular/core';
import { hexToRgba } from 'src/app/tools/hex-to-rgba';

@Pipe({
  name: 'hexaToRgba'
})
export class HexaToRgbaPipe implements PipeTransform {

  transform(value: string, alpha: string): unknown {

    return hexToRgba(value, alpha);
  }

}
