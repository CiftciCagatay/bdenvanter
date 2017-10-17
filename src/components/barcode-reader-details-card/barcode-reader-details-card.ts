import { Component, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController, Events } from 'ionic-angular';
import { BarcodeReaderServiceProvider } from '../../providers/barcode-reader-service/barcode-reader-service';
import { BarcodeReaderFormPage } from '../../pages/barcode-reader-form/barcode-reader-form';

@Component({
  selector: 'barcode-reader-details-card',
  templateUrl: 'barcode-reader-details-card.html'
})
export class BarcodeReaderDetailsCardComponent {

  @Input() barcodeReader
  @Input() index

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private barcodeReaderService: BarcodeReaderServiceProvider,

    private events: Events
  ) {
    this.events.subscribe('barcodeReaderUpdated', (data) => {
      if (this.barcodeReader.br_id == data.barcodeReader.br_id) {
        this.barcodeReader = data.barcodeReader
      }
    })
  }

  openBarcodeReaderFormPage() {
    let userFormPageModal = this.modalCtrl.create(BarcodeReaderFormPage, {
      br_id: this.barcodeReader.br_id,
      mode: 'update'
    })

    userFormPageModal.present()
  }

  showBarcodeReaderDeletionWarning() {
    let alert = this.alertCtrl.create({
      title: 'Emin misiniz?',
      subTitle: 'Barkod Okuyucu kaydı silinecek. Emin misiniz? Bu işlem geri alınamaz',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: 'Sil',
          handler: () => this.deleteBarcodeReader()
        }
      ]
    })

    alert.present()
  }

  deleteBarcodeReader() {
    let loading = this.loadingCtrl.create({ content: 'B.Okuyucu Siliniyor...' })

    loading.present()

    this.barcodeReaderService.deleteBarcodeReader(this.barcodeReader.br_id).subscribe((response) => {
      console.log(response)

      this.events.publish('barcodeReaderRemoved', {
        index: this.index
      })

      loading.dismiss()
    })
  }
}
