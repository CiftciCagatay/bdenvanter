import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the BarcodePrinterServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BarcodePrinterServiceProvider {

  models = [
    'Toshiba SX4',
    'Zebra X4'
  ]

  constructor(
    public http: Http,
    private globals: GlobalsProvider
  ) {
    console.log('Hello BarcodePrinterServiceProvider Provider');
  }

  getBarcodePrinter (bp_id) {
    return this.http.get(`${this.globals.ref}/barcodePrinters/${bp_id}`)
  }

  insertBarcodePrinter (props) {
    return this.http.post(`${this.globals.ref}/barcodePrinters`, props)
  }

  updateBarcodePrinter (bp_id, props) {
    return this.http.put(`${this.globals.ref}/barcodePrinters/${bp_id}`, props)
  }

  deleteBarcodePrinter (bp_id) {
    return this.http.delete(`${this.globals.ref}/barcodePrinters/${bp_id}`)
  }

}
