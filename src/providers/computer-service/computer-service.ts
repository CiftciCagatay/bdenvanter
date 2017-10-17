import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the ComputerServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComputerServiceProvider {

  monitorTypes = [
    'CRT',
    'LCD'
  ]

  archs = [
    'x64',
    'x86'
  ]

  oses = [
    'Windows7 Pro',
    'Windows 8.1 Pro',
    'Windows XP',
    'Windows 10',
    'Pardus'
  ]

  switches = [
    'Kıraç Satın Alma',
    'Kıraç Punch',
    'Kıraç Bilgi İşlem',
    'BDZ Sistem Odası',
    'BDZ Muhasebe'
  ]

  discTypes = [
    'HDD',
    'SSD'
  ]

  processors = [
    'i7',
    'i5',
    'i3',
    'Pentium'
  ]

  types = [
    'Desktop',
    'Laptop',
    'TC'
  ]

  constructor(
    public http: Http,
    private globals: GlobalsProvider
  ) {
    console.log('Hello ComputerServiceProvider Provider');
  }

  getComputer (c_id) {
    return this.http.get(`${this.globals.ref}/computers/${c_id}`)
  }

  insertComputer (props) {
    return this.http.post(`${this.globals.ref}/computers`, props)
  }

  updateComputer (c_id, props) {
    return this.http.put(`${this.globals.ref}/computers/${c_id}`, props)
  }

  deleteComputer (c_id) {
    return this.http.delete(`${this.globals.ref}/computers/${c_id}`)
  }
}
