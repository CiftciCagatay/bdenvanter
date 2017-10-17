import { Component } from '@angular/core';

import { UsersListPage } from '../users-list/users-list';
import { ComputersListPage } from '../computers-list/computers-list';
import { PrintersListPage } from '../printers-list/printers-list';
import { BarcodeReadersListPage } from '../barcode-readers-list/barcode-readers-list';
import { BarcodePrintersListPage } from '../barcode-printers-list/barcode-printers-list';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homePage = HomePage
  usersListPage = UsersListPage
  computersListPage = ComputersListPage
  printersListPage = PrintersListPage
  barcodeReadersListPage = BarcodeReadersListPage
  barcodePrintersListPage = BarcodePrintersListPage

  constructor() {

  }
}
