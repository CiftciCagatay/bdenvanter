import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BarcodePrinterDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode-printer-details',
  templateUrl: 'barcode-printer-details.html',
})
export class BarcodePrinterDetailsPage {

  mode = null
  bp_id = null

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.mode = this.navParams.get('mode')

    if (this.mode == 'edit') {
      this.bp_id = this.navParams.get('bp_id')
    }
  }

  
}
