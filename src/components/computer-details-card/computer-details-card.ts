import { Component, Input } from '@angular/core';
import { ComputerServiceProvider } from '../../providers/computer-service/computer-service';
import { ModalController, AlertController, LoadingController, Events } from 'ionic-angular';
import { ComputerFormPage } from '../../pages/computer-form/computer-form';

@Component({
  selector: 'computer-details-card',
  templateUrl: 'computer-details-card.html'
})
export class ComputerDetailsCardComponent {

  @Input() computer
  @Input() index

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,

    private computerService: ComputerServiceProvider,

    private events: Events
  ) {
    this.events.subscribe('computerUpdated', (data) => {
      if (this.computer.c_id == data.computer.c_id) {
        this.computer = data.computer
      }
    })
  }

  openComputerFormPage() {
    let computerFormPageModal = this.modalCtrl.create(ComputerFormPage, {
      c_id: this.computer.c_id,
      mode: 'update'
    })

    computerFormPageModal.present()
  }

  showComputerDeletionWarning() {
    let alert = this.alertCtrl.create({
      title: 'Emin misiniz?',
      subTitle: 'Bilgisayar kaydı silinecek. Emin misiniz? Bu işlem geri alınamaz',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: 'Sil',
          handler: () => this.deleteComputer()
        }
      ]
    })

    alert.present()
  }

  deleteComputer() {
    let loading = this.loadingCtrl.create({ content: 'Bilgisayar Siliniyor...' })

    loading.present()

    this.computerService.deleteComputer(this.computer.c_id).subscribe((response) => {
      console.log(response)

      this.events.publish('computerRemoved', {
        index: this.index
      })

      loading.dismiss()
    })
  }

}
