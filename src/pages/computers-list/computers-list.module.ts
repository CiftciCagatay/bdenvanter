import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComputersListPage } from './computers-list';

@NgModule({
  declarations: [
    ComputersListPage,
  ],
  imports: [
    IonicPageModule.forChild(ComputersListPage),
  ],
})
export class ComputersListPageModule {}
