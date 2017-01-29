import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClient } from '../../providers/http-client';
import { Blockchain } from '../../providers/blockchain';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  url;

  constructor(public navCtrl: NavController, private httpClient: HttpClient,
  private blockchain: Blockchain) {
  }

  ionViewDidEnter() {
    this.url = this.httpClient.getBaseUrl();
  }

  setUrl() {
    this.httpClient.setBaseUrl(this.url);

    this.blockchain.getAddress();
  }
}
