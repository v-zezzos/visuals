import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quableImg'
})
export class QuableImgPipe implements PipeTransform {

  transform(value: string): string {
    return `https://cdn.quable.com/sandbox_zento/${value}/original/${value}.png`;
  }

}
