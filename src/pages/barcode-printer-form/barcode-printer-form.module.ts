import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodePrinterFormPage } from './barcode-printer-form';

@NgModule({
  declarations: [
    BarcodePrinterFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodePrinterFormPage),
  ],
})
export class BarcodePrinterFormPageModule {}
