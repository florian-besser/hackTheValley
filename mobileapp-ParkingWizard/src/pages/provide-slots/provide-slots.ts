import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkingSpaceInfo, Blockchain } from '../../providers/blockchain';

/*
  Generated class for the ProvideSlots page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-provide-slots',
  templateUrl: 'provide-slots.html'
})
export class ProvideSlotsPage {

  parkingSpaceInfo: ParkingSpaceInfo = new ParkingSpaceInfo();

  constructor(public navCtrl: NavController, public navParams: NavParams, public blockchain: Blockchain) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvideSlotsPage');
  }

  provideSlot(){
    this.blockchain.provideSlot(this.parkingSpaceInfo);
  }

}
