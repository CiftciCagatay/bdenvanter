import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ComputerServiceProvider } from '../../providers/computer-service/computer-service';
import { PrinterServiceProvider } from '../../providers/printer-service/printer-service';
import { BarcodeReaderServiceProvider } from '../../providers/barcode-reader-service/barcode-reader-service';
import { BarcodePrinterServiceProvider } from '../../providers/barcode-printer-service/barcode-printer-service';
import { CitiesProvider } from '../../providers/cities/cities';
import { ActivityServiceProvider } from '../../providers/activity-service/activity-service';

@IonicPage()
@Component({
  selector: 'page-new-user-form',
  templateUrl: 'new-user-form.html',
})
export class NewUserFormPage {

  hasBarcodeReader = false
  hasBarcodePrinter = false
  hasPrinter = false
  hasComputer = false

  user = {
    name: '',
    department: '',
    internal_code: '',
    location: '',
    district: '',
    city: 'İstanbul'
  }

  computer = {
    u_id: null,
    monitor_type: '',
    ip_number: '',
    type: '',
    processor_name: '',
    disc_type: '',
    disc_amount: null,
    ram_amount: null,
    arch: '',
    os: '',
    switch_connection: ''
  }

  printer = {
    u_id: null,
    type: '',
    model: '',
    state: ''
  }

  barcodeReader = {
    u_id: null,
    model: ''
  }

  barcodePrinter = {
    u_id: null,
    model: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,

    private cities: CitiesProvider,
    private userService: UserServiceProvider,
    private computerService: ComputerServiceProvider,
    private printerService: PrinterServiceProvider,
    private barcodeReaderService: BarcodeReaderServiceProvider,
    private barcodePrinterService: BarcodePrinterServiceProvider
  ) {

  }

  onSaveButtonClicked() {
    this.showSaveAlert()
  }

  createUser() {
    let loading = this.loadingCtrl.create({ content: 'Kullanıcı oluşturuluyor...' })

    loading.present()

    this.userService.insertUser(this.user).subscribe((response) => {
      let u_id = response.json().u_id

      this.computer.u_id = u_id
      this.printer.u_id = u_id
      this.barcodeReader.u_id = u_id
      this.barcodePrinter.u_id = u_id

      if (this.hasComputer) {
        loading.setContent('Bilgisayar oluşturuluyor...')
        this.computerService.insertComputer(this.computer).subscribe((response) => {
          //console.log(response)
        })
      }

      if (this.hasPrinter) {
        loading.setContent('Yazıcı oluşturuluyor...')
        this.printerService.insertPrinter(this.printer).subscribe((response) => {
          //console.log(response)
        })
      }

      if (this.hasBarcodeReader) {
        loading.setContent('Barkod Okuyucu oluşturuluyor...')
        this.barcodeReaderService.insertBarcodeReader(this.barcodeReader).subscribe((response) => {
          //console.log(response)
        })
      }

      if (this.hasBarcodePrinter) {
        loading.setContent('Barkod Yazıcı oluşturuluyor...')
        this.barcodePrinterService.insertBarcodePrinter(this.barcodePrinter).subscribe((response) => {
          //console.log(response)
        })
      }

      let title = 'Yeni Bir Kullanıcı Oluşturuldu'

      loading.dismiss()

      let toast = this.toastCtrl.create({
        message: 'Kullanıcı oluşturuldu. Eğer değişiklikler uygulanmadıysa yenile butonunu kullanınız',
        duration: 1350
      })

      toast.present()

      this.navCtrl.pop()
    })
  }

  showSaveAlert() {
    let alert = this.alertCtrl.create({
      title: 'Yeni Kullanıcı Oluştur',
      buttons: [
        {
          text: 'Geri Dön'
        },
        {
          text: 'Oluştur',
          handler: () => {
            this.createUser()
          }
        }
      ]
    })

    alert.present()
  }
}
