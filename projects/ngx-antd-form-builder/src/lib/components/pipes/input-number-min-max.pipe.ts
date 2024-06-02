import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'inputNumberMinMax' })
export class InputNumberMinMaxPipe implements PipeTransform {
  transform(value: string, type: 'min'| 'max') {
    if (value) {
      return value
    } else {
      if (type == 'max') {
        return Infinity
      } else {
        return -Infinity
      }
    }
  }
}