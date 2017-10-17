import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComputerDetailsPage } from './computer-details';

@NgModule({
  declarations: [
    ComputerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ComputerDetailsPage),
  ],
})
export class ComputerDetailsPageModule {}
