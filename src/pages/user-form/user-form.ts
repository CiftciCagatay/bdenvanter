import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { CitiesProvider } from '../../providers/cities/cities';

@IonicPage()
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserFormPage {

  index
  user = {
    u_id: null
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private cities: CitiesProvider,
    private userService: UserServiceProvider,

    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,

    private events: Events
  ) {
    this.index = this.navParams.get('index')
    this.user.u_id = this.navParams.get('u_id')

    let loading = this.loadingCtrl.create({ content: 'Lütfen Bekleyiniz...' })

    loading.present()

    this.userService.getUserDetailsById(this.user.u_id).subscribe((response) => {
      if (response['_body']) {
        console.log(response.json())
        this.user = response.json().user
  
        loading.dismiss()
      } else {
        loading.dismiss()

        let toast = this.toastCtrl.create({
          message: 'Kullanıcı kaydı bulunamadı. Kullanıcı silinmiş veya taşınmış olabilir',
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
      title: 'Kullanıcı Güncellensin Mi?',
      buttons: [
        {
          text: 'Geri Dön'
        },
        {
          text: 'Güncelle',
          handler: () => {
            this.updateUser()
          }
        }
      ]
    })

    alert.present()
  }

  updateUser() {
    let loading = this.loadingCtrl.create({ content: 'Kullanıcı Güncelleniyor...' })

    loading.present()

    this.userService.updateUser(this.user.u_id, this.user).subscribe((response) => {
      loading.dismiss()

      let toast = this.toastCtrl.create({
        message: 'Kullanıcı güncellendi. Değişiklikler uygulanmadıysa yenile butonunu kullanınız',
        duration: 1500
      })

      toast.present()


      this.events.publish('userUpdated', {
        index: this.index,
        user: this.user
      })

      this.navCtrl.pop()
    })
  }

}
