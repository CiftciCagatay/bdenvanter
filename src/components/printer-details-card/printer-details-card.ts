import { Component, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController, Events } from 'ionic-angular';
import { PrinterFormPage } from '../../pages/printer-form/printer-form';
import { PrinterServiceProvider } from '../../providers/printer-service/printer-service';

@Component({
  selector: 'printer-details-card',
  templateUrl: 'printer-details-card.html'
})
export class PrinterDetailsCardComponent {

  @Input() printer
  @Input() index

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private events: Events,

    private printerService: PrinterServiceProvider
  ) {
    this.events.subscribe('printerUpdated', (data) => {
      if (this.printer.p_id == data.printer.p_id) {
        this.printer = data.printer
      }
    })
  }

  openPrinterFormPage() {
    let printerFormPageModal = this.modalCtrl.create(PrinterFormPage, {
      p_id: this.printer.p_id,
      mode: 'update'
    })

    printerFormPageModal.present()
  }

  showPrinterDeletionWarning() {
    let alert = this.alertCtrl.create({
      title: 'Emin misiniz?',
      subTitle: 'Yazıcı kaydı silinecek. Emin misiniz? Bu işlem geri alınamaz',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: 'Sil',
          handler: () => this.deletePrinter()
        }
      ]
    })

    alert.present()
  }

  deletePrinter() {
    let loading = this.loadingCtrl.create({ content: 'Yazıcı Siliniyor...' })

    loading.present()

    this.printerService.deletePrinter(this.printer.p_id).subscribe((response) => {
      console.log(response)

      this.events.publish('printerRemoved', {
        index: this.index
      })

      loading.dismiss()
    })
  }
}
