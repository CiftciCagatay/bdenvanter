import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeReaderDetailsPage } from './barcode-reader-details';

@NgModule({
  declarations: [
    BarcodeReaderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BarcodeReaderDetailsPage),
  ],
})
export class BarcodeReaderDetailsPageModule {}
