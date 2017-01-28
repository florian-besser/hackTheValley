import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Blockchain, ParkingSpaceInfo } from '../../providers/blockchain';
import { BLE } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  parkingSpaces: ParkingSpaceInfo[];
  conntectedToGate: boolean = false;
  gates: any[] = [];
  deviceId: string = "";
  service: string = "";
  characteristic: string = "";

  constructor(private platform: Platform, public navCtrl: NavController, private blockchain: Blockchain) {

  }

  ionViewDidEnter() {
    this.blockchain.getParkingSpaces().then(s => this.parkingSpaces = s);
    
    this.platform.ready().then(() => this.browseForGates());
  }

  reservateSlot(slotId: number) {
    this.blockchain.reservateSlot(slotId, 100);
  }

  isGatePresent(name: string){
    return name === 'BLEGate';
  }

  openGate(){
    if(this.conntectedToGate) {
      BLE
        .writeWithoutResponse(this.deviceId, this.service, this.characteristic, this.stringToBytes("OPEN;"))
        .catch((error) => alert("write error: " + error));
    } else {
      alert("Not connected");
    }
  }

  browseForGates() { // Scan on every entering the page.
    BLE.isEnabled().then(() => {
      BLE.startScan([]).subscribe((peripheral) => {
        console.log('Peripheral was found');
        if(peripheral.name === 'BLEGate') {
          this.gates.push(peripheral);
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
    }).catch(error => alert("Bluetooth is *not* enabled. " + error));
  }

  connect(device) {
    BLE.connect(device.id).subscribe((data) => {
      this.conntectedToGate = true;
      this.deviceId = data.id;
      this.service = data.characteristics[0].service;
      this.characteristic = data.characteristics[0].characteristic;
    }, error => alert(error));
  }

  // ASCII only
  stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }
}
