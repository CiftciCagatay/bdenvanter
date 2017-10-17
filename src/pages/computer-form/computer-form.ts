import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, Events } from 'ionic-angular';
import { ComputerServiceProvider } from '../../providers/computer-service/computer-service';

/**
 * Generated class for the ComputerFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-computer-form',
  templateUrl: 'computer-form.html',
})
export class ComputerFormPage {

  mode
  index

  computer = {
    u_id: null,
    c_id: null,
    ip_number: '',
    type: '',
    processor_name: '',
    disc_type: '',
    disc_amount: null,
    ram_amount: null,
    os: '',
    arch: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private computerService: ComputerServiceProvider,

    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,

    private events: Events
  ) {
    this.index = this.navParams.get('index')
    this.computer.u_id = this.navParams.get('u_id')
    this.mode = this.navParams.get('mode')

    if (this.mode == 'update') {
      this.computer.c_id = this.navParams.get('c_id')

      this.getComputer()
    }
  }

  getComputer() {
    let loading = this.loadingCtrl.create({ content: 'Lütfen Bekleyin...' })

    loading.present()

    this.computerService.getComputer(this.computer.c_id).subscribe((response) => {
      if (response['_body']) {
        this.computer = response.json().computer

        loading.dismiss()
      } else {
        loading.dismiss()

        let toast = this.toastCtrl.create({
          message: 'Bilgisayar kaydı bulunamadı. Bilgisayar silinmiş veya taşınmış olabilir',
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
      title: this.mode == 'update' ? 'Bilgisayar Güncelle' : 'Yeni Bilgisayar Oluştur',
      buttons: [
        {
          text: 'Geri Dön'
        },
        {
          text: this.mode == 'update' ? 'Güncelle' : 'Oluştur',
          handler: () => {
            if (this.mode == 'update') {
              this.updateComputer()
            } else {
              this.createNewComputer()
            }
          }
        }
      ]
    })

    alert.present()
  }

  createNewComputer() {
    let loading = this.loadingCtrl.create({ content: 'Bilgisayar Oluşturuluyor...' })

    loading.present()

    this.computerService.insertComputer(this.computer).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      this.computer.c_id = response.json().c_id

      let toast = this.toastCtrl.create({
        message: 'Bilgisayar oluşturuldu ',
        duration: 750
      })

      toast.present()

      this.events.publish('computerCreated', {
        computer: this.computer
      })

      this.navCtrl.pop()
    })
  }

  updateComputer() {
    let loading = this.loadingCtrl.create({ content: 'Bilgisayar Güncelleniyor...' })

    loading.present()

    this.computerService.updateComputer(this.computer.c_id, this.computer).subscribe((response) => {
      console.log(response)
      loading.dismiss()

      let toast = this.toastCtrl.create({
        message: 'Bilgisayar güncellendi',
        duration: 750
      })

      toast.present()

      this.events.publish('computerUpdated', {
        index: this.index,
        computer: this.computer
      })

      this.navCtrl.pop()
    })
  }

}
