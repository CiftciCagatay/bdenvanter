import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the ActivityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActivityServiceProvider {

  constructor(
    public http: Http,
    private globals: GlobalsProvider
  ) {
    console.log('Hello ActivityServiceProvider Provider');
  }

  getActivities () {
    return this.http.get(`${this.globals.ref}/activities`)
  }

  insertActivity (props) {
    return this.http.post(`${this.globals.ref}/activities`, props)
  }

}
