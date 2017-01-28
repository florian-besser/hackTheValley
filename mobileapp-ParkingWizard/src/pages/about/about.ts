import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BLE } from 'ionic-native';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  devices: any[] = [];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() { // Scan on every entering the page.
    BLE.isEnabled().then(() => {
      BLE.startScan([]).subscribe((peripheral) => {
        console.log('Peripheral was found');
        let newDeviceArray = [];

        for(let i = 0; i < this.devices.length; i++) {
          newDeviceArray.push(this.devices[i]);
        }

        newDeviceArray.push(peripheral);
        this.devices = newDeviceArray;
      }, error => alert(error));

        // stop scan after 5 seconds
        setTimeout(BLE.stopScan, 5000,
          function() {
            console.log("scan stopped");
          },
          function() {
            console.log("stopScan failed");
          }
        );
    }).catch(() => alert("Bluetooth is *not* enabled"));
  }

}
