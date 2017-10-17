import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeReadersListPage } from './barcode-readers-list';

@NgModule({
  declarations: [
    BarcodeReadersListPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodeReadersListPage),
  ],
})
export class BarcodeReadersListPageModule {}
