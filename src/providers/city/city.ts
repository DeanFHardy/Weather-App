import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class CityProvider {

  
  url;

  constructor(public http: HttpClient) {
    console.log('Hello CityProvider Provider');
    this.url = 'https://restcountries.com/v3.1/capital/';
  }

  getCity(cityName): Observable<any> {
    return this.http.get(this.url + cityName);
  }

}
