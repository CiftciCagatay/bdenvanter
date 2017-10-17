import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the ReportServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportServiceProvider {

  constructor(
    public http: Http,
    private globals: GlobalsProvider
  ) {
    console.log('Hello ReportServiceProvider Provider');
  }

  getItemCountReport (location: string) {
    return this.http.get(`${this.globals.ref}/reports/count?location=${location}`)
  }

}
