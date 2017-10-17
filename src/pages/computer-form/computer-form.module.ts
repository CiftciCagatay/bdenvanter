import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComputerFormPage } from './computer-form';

@NgModule({
  declarations: [
    ComputerFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ComputerFormPage),
  ],
})
export class ComputerFormPageModule {}
