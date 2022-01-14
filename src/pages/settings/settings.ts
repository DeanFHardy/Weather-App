import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CityProvider } from '../../providers/city/city';
import { WeatherProvider } from '../../providers/weather/weather';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { NewsProvider } from '../../providers/news/news';
import 'rxjs/add/operator/toPromise';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  loadedCityData = [];
  loadedWeatherData = [];

  newInfo: string; //Value stored from radio buttons
  cityName: string;
  lat: string;
  lng: string;
  units: string;
  icon: any;
  countryCode: string;
  cityInfo: any[];
 

  

  
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private cp: CityProvider, private wp: WeatherProvider, private np: NewsProvider, private ds: DataServiceProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


  getCityInfo(){ //All "getInfo" promises retrive data from the Data Service Provider stored functions
    let promise = new Promise<void>((resolve, reject) => {
      this.cp.getCity(this.cityName)
      .toPromise()
      .then(
        res => { //Success
          this.getWeatherInfo(res);
          this.getNewsInfo(res);
          this.ds.storedCityInfo(res);
          resolve();
        }, err => {
          reject(err);
        }
      );
    });
    return promise;
  }

  getWeatherInfo(data: Object){
    let promise = new Promise<void>((resolve, reject) => {
      this.wp.getWeather(data[0].latlng[0], data[0].latlng[1], this.units)
      .toPromise()
      .then(
        res => {
          let loadedWeatherData  = res;
          this.ds.storedWeatherInfo(loadedWeatherData);
          resolve();
        }, err => {
          reject(err);
        }
      );
    });
    return promise;
  }

  getNewsInfo(data: Object){
    let promise = new Promise<void>((resolve, reject) => {
      this.np.getNews(data[0].cca2)
      .toPromise()
      .then(
        res => {
          let loadedNewsData  = res;
         this.ds.storedNewsInfo(loadedNewsData);
          resolve();
        }, err => {
          reject(err);
        }
      );
    });
    return promise;
  }

  saveInfo(){ //Saves the value from local storage.
    if(this.cityName == null){
      alert("Please Enter a City name before you save or press the back arrow.")
    }
    this.storage.set("units", this.units)
    this.storage.set("cityName", this.cityName)
    this.getCityInfo();
  }

}
