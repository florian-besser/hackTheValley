import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class ParkingSpaceInfo {
  id: string;
  description: string;
}

@Injectable()
export class Blockchain {

  constructor(public http: Http) {
  }

  getParkingSpaces(): Promise<ParkingSpaceInfo[]> {
    const parkingSpace1 = new ParkingSpaceInfo();
    parkingSpace1.id = '0x34384398448';
    parkingSpace1.description = 'Very central spot';    
    const parkingSpace2 = new ParkingSpaceInfo();
    parkingSpace2.id = '0x34384328448';
    parkingSpace2.description = 'Luxury parking';    

    return Promise.resolve([
      parkingSpace1, parkingSpace2
    ]);
  }

}
