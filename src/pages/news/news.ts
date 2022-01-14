import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { NewsProvider } from '../../providers/news/news';
import { Storage } from '@ionic/storage';
import { CityProvider } from '../../providers/city/city';
import { HomePage } from '../home/home';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private ds: DataServiceProvider, private storage: Storage, private np: NewsProvider, private cp: CityProvider ) {
  }

  newsInfo: any = {};
  cityInfo: any = {};

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  ionViewDidEnter(){

    this.storage.get("cityInfo").then((value) => { //Retrieve City info for cca2 News provider getNews(cca2)
      if (value == null) {
        console.log("No Info found")
      } else {
        this.cityInfo = value;
        console.log(value);
      }
    })

    this.storage.get("newsInfo").then((value) => { //Retrieve News info
      if (value == null) {
        console.log("No Info found")
      } else {
        this.newsInfo = value;
        console.log(value);
      }
    })
  }
}
