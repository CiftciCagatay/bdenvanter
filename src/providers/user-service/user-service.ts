import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalsProvider } from '../globals/globals';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  departments = ["Satış", "Tasarım", "Depo", "Mekanik", "Tamamlama", "Üretim", "Muhasebe", "Planlama", "Personel", "Yönetim", "BIM", "İplik", "Texture", "Boyahane", "Dokuma", "Teknik Bakım", "Satın Alma", "İdari İşler", "Santral", "Bilgi İşlem", "Yazılım", "Nakliye Ofisi", "Top Kesim", "Rotasyon Baskı", "Proses", "Kumaş Açma", "Üretim Makine Bakım", "Tekstüre", "Yeni İplik Depo", "Stor ve K.K. Üretim", "Kartela", "Konjen", "Kıraç Fabrika Müdürü", "Makina Mühendisi", "Paketleme Bölümü", "Elektrik Atölyesi", "Ürün Takip", "Dokuma Teknisyenliği", "Ön Güvenlik", "Dış Ticaret Depo", "Dijital Baskı", "Örme", "Sevkiyat Depo", "Malzeme Depo", "Hammadde Depo", "Üretim Makine Bakım", "Laboratuar", "Revir", "İdare Amirliği", "Boya Terbiye", "Jet Boya", "Boyahane Müdürü", "Dış Ticaret", "Lojistik Planlama", "İplik Tedarik", "Dokuma Planlama", "İnsan Kaynakları", "ÜRGE", "Reklam", "İhracat Operasyon", "İhracat Muhasebe", "Mermer Fabrika", "Maltepe Mağaza", "Eymes Muhasebe", "Fabrika Müdürü", null, "Güvenlik", "Halı Üretim", "BDZ Apresevk", "İplik Büküm", "Ammak", "Ehost Üretim", "Elektrik Odası", "Kazan Dairesi", "Punch", "Perde Görsel Düzenleme", "Eymes Planlama", "Battaniye", "Halı Satış", "Zebra Toptan", "Kağıt Baskı", "Lazer Kesim", "Eymes İade", "Eymes Depo", "Eymes Muhasebe Depo", "Eymes Kesimhane Depo", "Eymes Kesimhane", "Eymes Mim", "Halı Planlama", "Stor Muhasebe", "Stor Planlama", "Eymes İdari İşler", "Eymes Aksesuar", "Eymes Havuz Depo", "Eym Satış Müdürlüğü", "Eym Planlama", "BDZ Muhasebe", "Eymes Çadır Depo"]

  locations = ["Beylikdüzü", "Ankara", "Kıraç", "Denizli", "Eymes", "Eymes-Depo", "Laleli", "Perla-Ankara", "Perla-Çankırı", "Zeytinburnu"]
  
  constructor(
    public http: Http,
    private globals: GlobalsProvider
  ) {
    console.log('Hello UserServiceProvider Provider');
  }

  getUsers(name = '', lastUserId = 0) {
    return this.http.get(`${this.globals.ref}/users?name=${name}&lastUserId=${lastUserId}`)
  }

  getUserDetailsById(userId) {
    let url = `${this.globals.ref}/users/${userId}`

    console.log(`${url} adresine GET isteği gönderiliyor...`)

    return this.http.get(url)
  }

  getPrintersByUserId(userId) {
    let url = `${this.globals.ref}/users/${userId}/printers`

    console.log(`${url} adresine GET isteği gönderiliyor...`)

    return this.http.get(url)
  }

  getComputersByUserId(userId) {
    let url = `${this.globals.ref}/users/${userId}/computers`

    console.log(`${url} adresine GET isteği gönderiliyor...`)

    return this.http.get(url)
  }

  getBarcodeReadersByUserId(userId) {
    let url = `${this.globals.ref}/users/${userId}/barcodeReaders`

    console.log(`${url} adresine GET isteği gönderiliyor...`)

    return this.http.get(url)
  }

  getBarcodePrintersByUserId(userId) {
    let url = `${this.globals.ref}/users/${userId}/barcodePrinters`

    console.log(`${url} adresine GET isteği gönderiliyor...`)

    return this.http.get(url)
  }

  insertUser(props) {
    return this.http.post(`${this.globals.ref}/users`, props)
  }

  updateUser(userId, props) {
    return this.http.put(`${this.globals.ref}/users/${userId}`, props)
  }

  deleteUser(userId) {
    return this.http.delete(`${this.globals.ref}/users/${userId}`)
  }
}
