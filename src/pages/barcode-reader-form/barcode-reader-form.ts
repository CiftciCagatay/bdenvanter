import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { BarcodeReaderServiceProvider } from '../../providers/barcode-reader-service/barcode-reader-service';

/**
 * Generated class for the BarcodeReaderFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode-reader-form',
  templateUrl: 'barcode-reader-form.html',
})
export class BarcodeReaderFormPage {

  index
  mode 

  barcodeReader = {
    u_id: null,
    br_id: null,
    model: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private barcodeReaderService: BarcodeReaderServiceProvider,

    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,

    private events: Events
  ) {
    this.index = this.navParams.get('index')
    this.barcodeReader.u_id = this.navParams.get('u_id')
    this.mode = this.navParams.get('mode')

    if (this.mode == 'update') {
      this.barcodeReader.br_id = this.navParams.get('br_id')

      this.getBarcodeReader()
    }
  }

  getBarcodeReader() {
    let loading = this.loadingCtrl.create({ content: 'Lütfen Bekleyin...' })

    loading.present()

    this.barcodeReaderService.getBarcodeReader(this.barcodeReader.br_id).subscribe(response => {
      if (response['_body']) {
        this.barcodeReader = response.json().barcodereader

        loading.dismiss()
      } else {
        loading.dismiss()

        let toast = this.toastCtrl.create({
          message: 'Barkod Okuyucu kaydı bulunamadı. Barkod Okuyucu silinmiş veya taşınmış olabilir',
          closeButtonText: 'OK',
          showCloseButton: true
        })

        toast.present()

        this.navCtrl.pop()
      }
    })
  }

  onSaveButtonClicked() {
    let alert = this.alertCtrl.create({
      title: this.mode == 'update' ? 'Barkod Okuyucu Güncellensim Mi?' : 'Barkod Okuyucu Oluşturulsun Mu?',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: this.mode == 'update' ? 'Güncelle' : 'Oluştur',
          handler: () => {
            if (this.mode == 'update') {
              this.updateBarcodeReader()
            } else {
              this.createNewBarcodeReader()
            }
          }
        }
      ]
    })

    alert.present()
  }

  createNewBarcodeReader() {
    let loading = this.loadingCtrl.create({ content: 'Barkod Okuyucu Oluşturuluyor...' })

    loading.present()

    this.barcodeReaderService.insertBarcodeReader(this.barcodeReader).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      this.barcodeReader.br_id = response.json().br_id

      let toast = this.toastCtrl.create({
        message: 'Barkod Okuyucu oluşturuldu',
        duration: 750
      })

      toast.present()

      this.events.publish('barcodeReaderCreated', {
        barcodeReader: this.barcodeReader,
        index: this.index
      })

      this.navCtrl.pop()
    })
  }

  updateBarcodeReader() {
    let loading = this.loadingCtrl.create({ content: 'Barkod Okuyucu Güncelleniyor...' })

    loading.present()

    this.barcodeReaderService.updateBarcodeReader(this.barcodeReader.br_id, this.barcodeReader).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      let toast = this.toastCtrl.create({
        message: 'Barkod Okuyucu güncellendi',
        duration: 750
      })

      toast.present()

      this.events.publish('barcodeReaderUpdated', {
        index: this.index,
        barcodeReader: this.barcodeReader
      })

      this.navCtrl.pop()
    })
  }
}
