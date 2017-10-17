import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController, Events } from 'ionic-angular';

import { ComputerFormPage } from '../computer-form/computer-form';
import { PrinterFormPage } from '../printer-form/printer-form';
import { BarcodeReaderFormPage } from '../barcode-reader-form/barcode-reader-form';
import { BarcodePrinterFormPage } from '../barcode-printer-form/barcode-printer-form';
import { UserFormPage } from '../user-form/user-form';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ComputerServiceProvider } from '../../providers/computer-service/computer-service';


@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  u_id = ''

  // UsersListPage deki Users dizisindeki index değeri
  user_index = -1

  user = {}
  computers = []
  printers = []
  barcodePrinters = []
  barcodeReaders = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private events: Events,

    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private userService: UserServiceProvider
  ) {
    this.u_id = this.navParams.get('u_id')
    this.user_index = this.navParams.get('user_index')

    console.log('User ID : ' + this.u_id)

    this.getDatas()

    this.subscribeToCreationEvents()
    this.subscribeToDeletionEvents()
  }

  onUserDeleted () {
    this.events.publish('userDeleted', {
      user_index: this.user_index
    })

    this.navCtrl.pop()
  }

  getDatas() {
    this.getComputers()
    this.getPrinters()
    this.getBarcodePrinters()
    this.getBarcodeReaders()
  }

  getComputers() {
    this.userService.getComputersByUserId(this.u_id).subscribe((response) => {
      console.log(response)

      if (response['_body'] != '') {
        this.computers = response.json().computers ? response.json().computers : []
      }
    })
  }

  getPrinters() {
    this.userService.getPrintersByUserId(this.u_id).subscribe((response) => {
      console.log(response)

      if (response['_body'] != '') {
        this.printers = response.json().printers ? response.json().printers : []
      }
    })
  }

  getBarcodePrinters() {
    this.userService.getBarcodeReadersByUserId(this.u_id).subscribe((response) => {
      console.log(response)

      if (response['_body'] != '') {
        this.barcodeReaders = response.json().brs ? response.json().brs : []
      }
    })
  }

  getBarcodeReaders() {
    this.userService.getBarcodePrintersByUserId(this.u_id).subscribe((response) => {
      console.log(response)

      if (response['_body'] != '') {
        this.barcodePrinters = response.json().bps ? response.json().bps : []
      }
    })
  }

  subscribeToCreationEvents() {
    this.events.subscribe('barcodePrinterCreated', (data) => {
      if (this.u_id == data.barcodePrinter.u_id) {
        this.barcodePrinters.push(data.barcodePrinter)
      }
    })

    this.events.subscribe('barcodeReaderCreated', (data) => {
      if (this.u_id == data.barcodeReader.u_id) {
        this.barcodeReaders.push(data.barcodeReader)
      }
    })

    this.events.subscribe('printerCreated', (data) => {
      if (this.u_id == data.printer.u_id) {
        this.printers.push(data.printer)
      }
    })

    this.events.subscribe('computerCreated', (data) => {
      if (this.u_id == data.computer.u_id) {
        this.computers.push(data.computer)
      }
    })
  }

  subscribeToDeletionEvents() {
    this.events.subscribe('barcodePrinterRemoved', (data) => {
      if (this.barcodePrinters.length > data.index) {
        this.barcodePrinters.splice(data.index, 1)
      }
    })

    this.events.subscribe('barcodeReaderRemoved', (data) => {
      if (this.barcodeReaders.length > data.index) {
        this.barcodeReaders.splice(data.index, 1)
      }
    })

    this.events.subscribe('printerRemoved', (data) => {
      if (this.printers.length > data.index) {
        this.printers.splice(data.index, 1)
      }
    })

    this.events.subscribe('computerRemoved', (data) => {
      if (this.computers.length > data.index) {
        this.computers.splice(data.index, 1)
      }
    })
  }

  showAdditionAlert() {
    let alert = this.alertCtrl.create({
      title: 'Yeni Kayıt Ekle',
      subTitle: 'Ne eklemek istiyorsunuz?',
      buttons: [
        {
          text: 'Bilgisayar',
          handler: () => {
            let computerFormModal = this.modalCtrl.create(ComputerFormPage, {
              u_id: this.u_id,
              mode: 'create'
            })

            computerFormModal.present()
          }
        },
        {
          text: 'Yazıcı',
          handler: () => {
            let printerFormModal = this.modalCtrl.create(PrinterFormPage, {
              u_id: this.u_id,
              mode: 'create'
            })

            printerFormModal.present()
          }
        },
        {
          text: 'Barkod Okuyucu',
          handler: () => {
            let barcodeReaderFormModal = this.modalCtrl.create(BarcodeReaderFormPage, {
              u_id: this.u_id,
              mode: 'create'
            })

            barcodeReaderFormModal.present()
          }
        },
        {
          text: 'Barkod Yazıcı',
          handler: () => {
            let barcodePrinterFormModal = this.modalCtrl.create(BarcodePrinterFormPage, {
              u_id: this.u_id,
              mode: 'create'
            })

            barcodePrinterFormModal.present()
          }
        },
        {
          text: 'Vazgeç'
        }
      ]
    })

    alert.present()
  }

}
