import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the PrinterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrinterServiceProvider {

  types = [
    'Laser',
    'Deskjet',
    'Nokta Vuruş'
  ]

  states = [
    'Kendine Bağlı',
    'Ortak'
  ]

  constructor(
    public http: Http,
    private globals: GlobalsProvider
  ) {
    console.log('Hello PrinterServiceProvider Provider');
  }

  getPrinter(p_id) {
    return this.http.get(`${this.globals.ref}/printers/${p_id}`)
  }

  insertPrinter(props) {
    return this.http.post(`${this.globals.ref}/printers`, props)
  }

  updatePrinter (p_id, props) {
    return this.http.put(`${this.globals.ref}/printers/${p_id}`, props)
  }

  deletePrinter(p_id) {
    return this.http.delete(`${this.globals.ref}/printers/${p_id}`)
  }

}
