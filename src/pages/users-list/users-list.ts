import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Events } from 'ionic-angular';
import { UserDetailsPage } from '../user-details/user-details';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { UserFormPage } from '../user-form/user-form';
import { NewUserFormPage } from '../new-user-form/new-user-form';

@IonicPage()
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

  users = []

  lastUserId = 0
  searchString = ''

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private events: Events,

    private userService: UserServiceProvider,

    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.getUsers()

    this.events.subscribe('userDeleted', (data) => {
      if (data.user_index >= 0 && data.user_index < this.users.length) {
        this.users.splice(data.user_index, 1)
      }
    })

    this.events.subscribe('userUpdated', (data) => {
      console.log('User list', data)
      if (data.index < this.users.length && this.users[data.index].u_id == data.user.u_id) {
        console.log('updating')
        this.users[data.index].name = data.user.name
      }
    })
  }

  openNewUserFormPage() {
    this.modalCtrl.create(NewUserFormPage).present()
  }

  openUserFormPage(mode, u_id) {
    let userFormModal = this.modalCtrl.create(UserFormPage, {
      mode: mode,
      u_id: u_id
    })

    userFormModal.present()
  }

  pushToUsersDetailsPage(u_id, index) {
    this.navCtrl.push(UserDetailsPage, {
      u_id: u_id,
      user_index: index
    })
  }

  searchForBiggestUserId(users: Array<any>) {
    users.forEach(user => {
      if (user.u_id > this.lastUserId) {
        this.lastUserId = user.u_id
      }
    })

    console.log(`Son kullanıcı ID'si değişti. Yeni ID : ${this.lastUserId}`)
  }

  searchForUsers() {
    this.users = []
    this.lastUserId = 0

    this.userService.getUsers(this.searchString, this.lastUserId).subscribe((response) => {
      this.users.push(...response.json())
      this.searchForBiggestUserId(response.json())
    })
  }

  refreshUsers() {
    this.users = []
    this.lastUserId = 0
    this.searchString = ''

    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers(this.searchString, this.lastUserId).subscribe((response) => {
      this.users.push(...response.json())
      this.searchForBiggestUserId(response.json())
    })
  }

  getMoreUsers(infiniteScroll) {
    this.userService.getUsers(this.searchString, this.lastUserId).subscribe((response) => {
      setTimeout(() => {
        this.users.push(...response.json())
        this.searchForBiggestUserId(response.json())
        infiniteScroll.complete();
      }, 500)
    })
  }

  showUserDeletionWarning(u_id, index) {
    let alert = this.alertCtrl.create({
      title: 'Emin misiniz?',
      subTitle: 'Kullanıcı kaydı silinecek. Emin misiniz? Bu işlem geri alınamaz',
      buttons: [
        {
          text: 'Vazgeç'
        },
        {
          text: 'Sil',
          handler: () => {

            let loading = this.loadingCtrl.create({ content: 'Kullanıcı Siliniyor...' })

            loading.present()

            this.userService.deleteUser(u_id).subscribe((response) => {
              console.log(response)
              this.users.splice(index, 1)
              loading.dismiss()
            })
          }
        }
      ]
    })

    alert.present()
  }
}
