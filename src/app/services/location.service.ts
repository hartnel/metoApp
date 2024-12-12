import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Location } from '../models/location';
import { UserService } from './user.service';
import { dbConfig } from '../db/db.conf';


@Injectable({
  providedIn: 'root'
})
export class LocationService {


  private locations = new Map();
  constructor(private dbService: NgxIndexedDBService) {
    this.dbService = new NgxIndexedDBService(dbConfig);
    this.dbService.currentStore = 'location';
    console.log(this.dbService.currentStore);
    this.initLocations();
    //console.log(this.locations);

  }


  removeLocation(location: Location) {
    console.log("deleting location");
    return new Promise((resolve, reject) => {
      this.dbService.deleteRecord(location.id)
        .then(() => {
          this.locations.delete(location.key);
          resolve();
        })
        .catch(err => reject(err))
    })
  }

  getLocations() {
    return this.locations;
  }

  async initLocations() {

    await this.dbService.getAll()
      .then((locations: Location[]) => {
        console.log("locations BD" );
        for(let location of locations){

          var loc=new Location(location.latitude,location.longitude);
          Object.assign(loc,location);


            console.log("ajout");

            this.locations.set(loc.key, loc);
          }




        console.log("mpa");
        console.log(this.locations);
      })
      .catch(err => {
        console.log(err);
      });



  }

  addLocation(location: Location) {
    return new Promise((resolve, reject) => {


      if (this.locations.has(location.key)) {
        let err = new Error("localisation présente");
        return reject(err);
      }
      else {
        this.dbService.add(location)
          .then(() => {
            this.locations.set(location.key, location);
            console.log(this.locations);
            return resolve();
          })
          .catch(err => reject(err));
      }

    })
  }

}
