import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatDatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let date = new Date(value)

    if (date) {
      let hours = date.getHours() > 10 ? date.getHours() : '0' + date.getHours()
      let minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()
      
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${hours}:${minutes}`
    }

    return ''
  }
}
