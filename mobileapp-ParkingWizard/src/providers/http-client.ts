import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Config } from '../config/config';

@Injectable()
export class HttpClient {
  baseUrl: string;

  constructor(public http: Http) {
    this.baseUrl = 'http://192.168.1.110:8088';
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  get<T>(relativeUrl: string): Promise<T> {
    return this.http.get(this.baseUrl + relativeUrl).toPromise().then(v => v.json());
  }

  gett(relativeUrl: string) {
    return this.http.get(this.baseUrl + relativeUrl).toPromise();
  }

  post<T>(relativeUrl: string, payload: any): Promise<T> {
    return this.http.post(this.baseUrl + relativeUrl, payload).toPromise().then(v => v.json());
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
