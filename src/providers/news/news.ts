import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  newsUrl: string;
  apiNewsKey = "0777cf5771cb461f9edc69432802988b";
  newsPages = "5"

  constructor(public http: HttpClient) {
    console.log('Hello NewsProvider Provider');
    this.newsUrl = "https://newsapi.org/v2/top-headlines?country="
    
    
  }

  getNews(cca2) {
    return this.http.get(this.newsUrl + cca2 + "&pageSize=" + this.newsPages + "&apiKey=" + this.apiNewsKey);
  }

}
