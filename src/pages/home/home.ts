import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { NewsPage } from '../news/news';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { CityProvider } from '../../providers/city/city';
import { WeatherProvider } from '../../providers/weather/weather';
import { DataServiceProvider} from '../../providers/data-service/data-service'
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  city: string;
  cityInfo: any = {};
  weatherInfo: any = {};
  citySelected: boolean = false;
  cityFound = false;
  units: string;
  lat: string;
  lng: string;
  icon: any;
  countryCode: string;
  hidden = true;
  hidden1 = true;
  hidden2 = true;
  hidden3 = true;
  hidden4 = false;
  flags;


  constructor(public navCtrl: NavController, private storage: Storage, hc: HttpClient, private cp: CityProvider, private wp: WeatherProvider, private ds: DataServiceProvider) {

  }

  openSettings(){
    this.navCtrl.push(SettingsPage)
  }

  openNews(){
    this.navCtrl.push(NewsPage)
  }

  ionViewDidEnter(){ //Retrieve storage Data

    this.storage.get("cityName").then((value) => { //Storage of City (capital) 
      if (value == null) {
        this.hidden = true
        this.hidden1 = false
        this.hidden3 = true
        console.log("No City value in storage")
      } else {
        this.hidden = false
        this.hidden1 = true
        this.hidden2 = false
        this.hidden3 = false //News Button 
        this.hidden4 = true
        this.city = value;
        console.log(value);
      }
    });

    this.storage.get("units").then((value) => { //Storage of temp Units
      if (value == null) {
        console.log("No Unit value in storage")
      } else {
        this.units = value;
      }
    });

    this.storage.get("cityInfo").then((value) => { //Storage of City info
      if (value == null) {
        console.log("No Info found")
      } else {
        this.cityInfo = value;
        console.log(value);
      }
    })

    this.storage.get("weatherInfo").then((value) => { //Storage of weather info
      if (value == null) {
        console.log("No Info found")
      } else {
        this.weatherInfo = value;
      }
    })

  }
  
}