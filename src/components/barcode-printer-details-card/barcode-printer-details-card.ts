import { Component, Input } from '@angular/core';
import { BarcodePrinterFormPage } from '../../pages/barcode-printer-form/barcode-printer-form';
import { ModalController, LoadingController, AlertController, Events } from 'ionic-angular';
import { BarcodePrinterServiceProvider } from '../../providers/barcode-printer-service/barcode-printer-service';

@Component({
  selector: 'barcode-printer-details-card',
  templateUrl: 'barcode-printer-details-card.html'
})
export class BarcodePrinterDetailsCardComponent {

  @Input() barcodePrinter
  @Input() index

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private events: Events,

    private barcodePrinterService: BarcodePrinterServiceProvider
  ) {
    this.events.subscribe('barcodePrinterUpdated', (data) => {
      if (this.barcodePrinter.bp_id == data.barcodePrinter.bp_id) {
        this.barcodePrinter = data.barcodePrinter
      }
    })
  }

  openBarcodePrinterPage() {
    let barcodePrinterFormModal = this.modalCtrl.create(BarcodePrinterFormPage, {
      bp_id: this.barcodePrinter.bp_id,
      mode: 'update'
    })

    barcodePrinterFormModal.present()
  }

  showBarcodePrinterDeletionWarning() {
    let alert = this.alertCtrl.create({
      title: 'Emin misiniz?',
      subTitle: 'Barkod Yazıcı kaydı silinecek. Emin misiniz? Bu işlem geri alınamaz',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: 'Sil',
          handler: () => this.deleteBarcodePrinter()
        }
      ]
    })

    alert.present()
  }

  deleteBarcodePrinter() {
    let loading = this.loadingCtrl.create({ content: 'B.Yazıcı Siliniyor...' })

    loading.present()

    this.barcodePrinterService.deleteBarcodePrinter(this.barcodePrinter.bp_id).subscribe((response) => {
      console.log(response)

      this.events.publish('barcodePrinterRemoved', {
        index: this.index
      })

      loading.dismiss()
    })
  }
}
