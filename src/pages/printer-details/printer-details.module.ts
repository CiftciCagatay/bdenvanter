import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrinterDetailsPage } from './printer-details';

@NgModule({
  declarations: [
    PrinterDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PrinterDetailsPage),
  ],
})
export class PrinterDetailsPageModule {}
