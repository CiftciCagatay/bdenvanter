import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ModalController, AlertController, LoadingController, Events } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { UserFormPage } from '../../pages/user-form/user-form';

/**
 * Generated class for the UserDetailsCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-details-card',
  templateUrl: 'user-details-card.html'
})
export class UserDetailsCardComponent {

  @Input() u_id
  @Input() index
  @Output() userDeleted = new EventEmitter<any>()

  user = {}

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,

    private userService: UserServiceProvider,

    private events: Events
  ) {
    this.events.subscribe('userUpdated', (data) => {
      if (data.user.u_id == this.u_id) {
        this.user = data.user
      }
    })
  }

  ngOnChanges (changes) {
    this.getUser()
  }

  getUser () {
    if (!this.u_id) return
    
    this.userService.getUserDetailsById(this.u_id).subscribe((response) => {
      console.log(response)

      if (response['_body'] != '') {
        this.user = response.json().user
      }
    })
  }

  openUserFormPage() {
    let userFormPageModal = this.modalCtrl.create(UserFormPage, {
      u_id: this.u_id,
      index: this.index
    })

    userFormPageModal.present()
  }

  showUserDeletionWarning() {
    let alert = this.alertCtrl.create({
      title: 'Emin misiniz?',
      subTitle: 'Kullanıcı kaydı silinecek. Emin misiniz? Bu işlem geri alınamaz',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: 'Sil',
          handler: () => this.deleteUser()
        }
      ]
    })

    alert.present()
  }

  deleteUser() {
    let loading = this.loadingCtrl.create({ content: 'Kullanıcı Siliniyor...' })

    loading.present()

    this.userService.deleteUser(this.u_id).subscribe((response) => {
      loading.dismiss()

      this.userDeleted.emit()
    })
  }

}
