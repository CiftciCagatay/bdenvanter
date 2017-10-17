import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { BarcodePrinterServiceProvider } from '../../providers/barcode-printer-service/barcode-printer-service';

/**
 * Generated class for the BarcodePrinterFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode-printer-form',
  templateUrl: 'barcode-printer-form.html',
})
export class BarcodePrinterFormPage {

  mode
  index // BPs sayfasındaki dizi indexi

  barcodePrinter = {
    u_id: null,
    bp_id: null,
    model: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private barcodePrinterService: BarcodePrinterServiceProvider,

    private events: Events,

    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.index = this.navParams.get('index')
    this.barcodePrinter.u_id = this.navParams.get('u_id')
    this.mode = this.navParams.get('mode')

    if (this.mode == 'update') {
      this.barcodePrinter.bp_id = this.navParams.get('bp_id')

      this.getBarcodePrinter()
    }
  }

  getBarcodePrinter() {
    let loading = this.loadingCtrl.create({ content: 'Lütfen bekleyin...' })

    loading.present()

    this.barcodePrinterService.getBarcodePrinter(this.barcodePrinter.bp_id).subscribe((response) => {
      if (response['_body']) {
        this.barcodePrinter = response.json().barcodeprinter

        loading.dismiss()
      } else {
        loading.dismiss()

        let toast = this.toastCtrl.create({
          message: 'Barkod Yazıcı kaydı bulunamadı. Barkod Yazıcı silinmiş veya taşınmış olabilir',
          closeButtonText: 'OK',
          showCloseButton: true
        })

        toast.present()

        this.navCtrl.pop()
      }
    })
  }

  createNewBarcodePrinter() {
    let loading = this.loadingCtrl.create({ content: 'Barkod Yazıcı Oluşturuluyor...' })

    loading.present()

    this.barcodePrinterService.insertBarcodePrinter(this.barcodePrinter).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      this.barcodePrinter.bp_id = response.json().bp_id

      let toast = this.toastCtrl.create({
        message: 'Barkod Yazıcı oluşturuldu',
        duration: 750
      })

      toast.present()

      this.events.publish('barcodePrinterCreated', {
        barcodePrinter: this.barcodePrinter,
        index: this.index
      })

      this.navCtrl.pop()
    })
  }

  updateBarcodePrinter() {
    let loading = this.loadingCtrl.create({ content: 'Barkod Yazıcı Güncelleniyor...' })

    loading.present()

    this.barcodePrinterService.updateBarcodePrinter(this.barcodePrinter.bp_id, this.barcodePrinter).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      let toast = this.toastCtrl.create({
        message: 'Barkod Yazıcı güncellendi',
        duration: 750
      })

      toast.present()

      this.events.publish('barcodePrinterUpdated', {
        barcodePrinter: this.barcodePrinter,
        index: this.index
      })

      this.navCtrl.pop()
    })
  }

  onSaveButtonClicked() {
    let alert = this.alertCtrl.create({
      title: this.mode == 'update' ? 'Barkod Yazıcı Güncellensim Mi?' : 'Barkod Yazıcı Oluşturulsun Mu?',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: this.mode == 'update' ? 'Güncelle' : 'Oluştur',
          handler: () => {
            if (this.mode == 'update') {
              this.updateBarcodePrinter()
            } else {
              this.createNewBarcodePrinter()
            }
          }
        }
      ]
    })

    alert.present()
  }

}
