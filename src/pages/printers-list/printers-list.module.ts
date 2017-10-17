import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrintersListPage } from './printers-list';

@NgModule({
  declarations: [
    PrintersListPage,
  ],
  imports: [
    IonicPageModule.forChild(PrintersListPage),
  ],
})
export class PrintersListPageModule {}
