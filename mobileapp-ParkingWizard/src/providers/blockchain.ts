import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from './http-client';

export class ParkingSpaceInfo {
  slotId: string;
  pricePerMinute: number;
  descr: string;
  xCoord: number;
  yCoord: number;
  available: boolean;
  bluetoothName: string;
}

@Injectable()
export class Blockchain {

  address = '';

  constructor(public client: HttpClient) {  
  }

  getAddress(){
    this.client.gett('/accounts/defaultAccount').then(v => this.address = v.text());
  }

  getParkingSpaces(): Promise<ParkingSpaceInfo[]> {
    return this.client.get<ParkingSpaceInfo[]>(`/accounts/${this.address}/slots`);
  }

  reservateSlot(slotId: number, duration: number) {
    this.client.gett(`/accounts/${this.address}/reservateSlot?slotId=${slotId}&durationInMinutes=${duration}`);
  }

}
