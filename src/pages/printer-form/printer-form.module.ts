import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrinterFormPage } from './printer-form';

@NgModule({
  declarations: [
    PrinterFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PrinterFormPage),
  ],
})
export class PrinterFormPageModule {}
