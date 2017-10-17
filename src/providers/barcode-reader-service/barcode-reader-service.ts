import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the BarcodeReaderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BarcodeReaderServiceProvider {

  models = [
    'Honeywell',
    'ZEBEX'
  ]

  constructor(
    public http: Http,
    private globals: GlobalsProvider
  ) {
    console.log('Hello BarcodeReaderServiceProvider Provider');
  }

  getBarcodeReader (br_id) {
    return this.http.get(`${this.globals.ref}/barcodeReaders/${br_id}`)
  }

  insertBarcodeReader (props) {
    return this.http.post(`${this.globals.ref}/barcodeReaders`, props)
  }

  updateBarcodeReader (br_id, props) {
    return this.http.put(`${this.globals.ref}/barcodeReaders/${br_id}`, props)
  }

  deleteBarcodeReader (br_id) {
    return this.http.delete(`${this.globals.ref}/barcodeReaders/${br_id}`)
  }

}
