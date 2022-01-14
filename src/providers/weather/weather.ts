import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class WeatherProvider {
  apiKey = '50598b88e53b4c49928aa6e597738f83';
  url;

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.weatherbit.io/v2.0/current?lat=';
  }

  getWeather(lat, lon, units){
    return this.http.get(this.url + lat + '&lon=' + lon + "&key=" + this.apiKey + '&units=' + units);
  }


}
