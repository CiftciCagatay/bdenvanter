import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Events } from 'ionic-angular';
import { PrinterServiceProvider } from '../../providers/printer-service/printer-service';

/**
 * Generated class for the PrinterFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-printer-form',
  templateUrl: 'printer-form.html',
})
export class PrinterFormPage {

  index
  mode

  printer = {
    u_id: null,
    p_id: null,
    type: '',
    model: '',
    state: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private printerService: PrinterServiceProvider,

    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,

    private events: Events
  ) {
    this.printer.u_id = this.navParams.get('u_id')
    this.mode = this.navParams.get('mode')

    if (this.mode == 'update') {
      this.printer.p_id = this.navParams.get('p_id')

      this.getPrinter()
    }
  }

  getPrinter() {
    let loading = this.loadingCtrl.create({ content: 'Lütfen Bekleyin...' })

    loading.present()

    this.printerService.getPrinter(this.printer.p_id).subscribe((response) => {
      if (response['_body']) {
        this.printer = response.json().printer

        loading.dismiss()
      } else {
        loading.dismiss()

        let toast = this.toastCtrl.create({
          message: 'Yazıcı kaydı bulunamadı. Yazıcı silinmiş veya taşınmış olabilir',
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
      title: this.mode == 'update' ? 'Yazıcı Güncellensin Mi?' : 'Yazıcı Oluşturulsun Mu?',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: this.mode == 'update' ? 'Güncelle' : 'Oluştur',
          handler: () => {
            if (this.mode == 'update') {
              this.updatePrinter()
            } else {
              this.createNewPrinter()
            }
          }
        }
      ]
    })

    alert.present()
  }

  createNewPrinter() {
    let loading = this.loadingCtrl.create({ content: 'Yazıcı Oluşturuluyor...' })

    loading.present()

    this.printerService.insertPrinter(this.printer).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      this.printer.p_id = response.json().p_id

      let toast = this.toastCtrl.create({
        message: 'Yazıcı oluşturuldu',
        duration: 750
      })

      toast.present()

      this.events.publish('printerCreated', {
        printer: this.printer
      })

      this.navCtrl.pop()
    })
  }

  updatePrinter() {
    let loading = this.loadingCtrl.create({ content: 'Yazıcı Güncelleniyor...' })

    loading.present()

    this.printerService.updatePrinter(this.printer.p_id, this.printer).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      let toast = this.toastCtrl.create({
        message: 'Yazıcı güncellendi',
        duration: 750
      })

      toast.present()

      this.events.publish('printerUpdated', {
        printer: this.printer,
        index: this.index
      })

      this.navCtrl.pop()
    })
  }

}
