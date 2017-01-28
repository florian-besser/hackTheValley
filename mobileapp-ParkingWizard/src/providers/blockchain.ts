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

  address = '0xf88e609aac9ad4039cddfab35fbf3fd750430097';

  constructor(public client: HttpClient) {  
  }

  getParkingSpaces(): Promise<ParkingSpaceInfo[]> {
    return this.client.get<ParkingSpaceInfo[]>(`/accounts/${this.address}/slots`);
  }

  reservateSlot(slotId: number) {
    this.client.get(`/accounts/${this.address}/reservateSlot?slotId=${slotId}`);
  }

}
