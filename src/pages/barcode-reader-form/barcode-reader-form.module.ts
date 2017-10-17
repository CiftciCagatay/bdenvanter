import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeReaderFormPage } from './barcode-reader-form';

@NgModule({
  declarations: [
    BarcodeReaderFormPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodeReaderFormPage),
  ],
})
export class BarcodeReaderFormPageModule {}
