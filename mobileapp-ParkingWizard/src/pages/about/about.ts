import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { BLE } from 'ionic-native';

// ASCII only
function stringToBytes(string) {
  var array = new Uint8Array(string.length);
  for (var i = 0, l = string.length; i < l; i++) {
    array[i] = string.charCodeAt(i);
  }
  return array.buffer;
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  devices: any[] = [];

  constructor(public navCtrl: NavController) {

  }

  connected: boolean = false;

  deviceId: string = "";
  service: string = "";
  characteristic: string = "";

  connect(device) {
    BLE.connect(device.id).subscribe((data) => {
      this.connected = true;
      this.deviceId = data.id;
      this.service = data.characteristics[0].service;
      this.characteristic = data.characteristics[0].characteristic;
    }, error => alert(error));
  }

  onClick(device) {
    if(this.connected) {
      BLE
        .writeWithoutResponse(this.deviceId, this.service, this.characteristic, stringToBytes("OPEN;"))
        .catch((error) => alert("write error: " + error));
    } else {
      alert("Not connected");
    }
  }



  // ASCII only
  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  ionViewDidEnter() { // Scan on every entering the page.
    BLE.isEnabled().then(() => {
      BLE.startScan([]).subscribe((peripheral) => {
        console.log('Peripheral was found');
        if(peripheral.name === 'BLEGate') {
          this.devices.push(peripheral);
          this.connect(peripheral);
        }

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
