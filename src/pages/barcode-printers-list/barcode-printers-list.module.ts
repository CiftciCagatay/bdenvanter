import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodePrintersListPage } from './barcode-printers-list';

@NgModule({
  declarations: [
    BarcodePrintersListPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodePrintersListPage),
  ],
})
export class BarcodePrintersListPageModule {}
