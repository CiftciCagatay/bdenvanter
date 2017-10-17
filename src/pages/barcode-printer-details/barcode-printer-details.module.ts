import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodePrinterDetailsPage } from './barcode-printer-details';

@NgModule({
  declarations: [
    BarcodePrinterDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodePrinterDetailsPage),
  ],
})
export class BarcodePrinterDetailsPageModule {}
