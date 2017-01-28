import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Blockchain, ParkingSpaceInfo } from '../../providers/blockchain';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  parkingSpaces: ParkingSpaceInfo[];

  constructor(public navCtrl: NavController, private blockchain: Blockchain) {

  }

  ionViewDidEnter() {
    this.blockchain.getParkingSpaces().then(s => this.parkingSpaces = s);
  }

}
