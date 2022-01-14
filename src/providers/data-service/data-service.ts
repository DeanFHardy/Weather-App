import { HttpClient } from '@angular/common/http';
import { CompileStylesheetMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {

  constructor(public http: HttpClient, private storage: Storage ) {
    console.log('Hello DataServiceProvider Provider');
  }


  public cityInfo = { //City Info Object
    commonName: "",
    cca2: "",
    lat: 0,
    lng: 0,
    flag: ""
  };

  public weatherInfo = { //Weather Info Object
    temp: "",
    description: "",
    icon: "",
    wind_cdir_full: ""
  };

  public newsInfo = { //News Info Object
      urlToImage: "",
      title: "",
      description: "",
      url: ""
    
  };

  
  storedCityInfo(cityData: any){ //Stores City Info
    this.cityInfo.commonName = (cityData[0].name.common);
    this.cityInfo.cca2 = (cityData[0].cca2);
    this.cityInfo.lat = (cityData[0].latlng[0]);
    this.cityInfo.lng = (cityData[0].latlng[1]);
    this.cityInfo.flag = (cityData[0].flags.png);

    this.storage.set("cityInfo", this.cityInfo);
  }

  storedWeatherInfo(currentWeather: any){ //Stores Weather Info
    this.weatherInfo.temp = currentWeather.data[0].temp;
    this.weatherInfo.description = currentWeather.data[0].weather.description;
    this.weatherInfo.icon = "https://www.weatherbit.io/static/img/icons/" + currentWeather.data[0].weather.icon + ".png";
    this.weatherInfo.wind_cdir_full = currentWeather.data[0].wind_cdir_full;

    this.storage.set("weatherInfo", this.weatherInfo);
  }

  storedNewsInfo(newsData: any){ //Stores News Info
    for(let i = 0; i < 5; i++){
      this.newsInfo.urlToImage = newsData.articles[i].urlToImage;

      this.newsInfo.title = newsData.articles[i].title;

      this.newsInfo.description = newsData.articles[i].description;

      this.newsInfo.url = newsData.articles[i].url;

    }

    this.storage.set("newsInfo", newsData);
  }

  
}
