import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderStringsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderStrings',
})
export class OrderStringsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Array<String>, ...args) {
    return value.sort()
  }
}
