import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Location } from '../models/location';
import { UserService } from './user.service';
import { dbConfig } from '../db/db.conf';


@Injectable()
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
        locations.forEach((location: Location) => {
          //console.log(location);
          if (locations.length) {
            this.locations.set(location.key, location);
          }

        })
      })
      .catch(err => {
        console.log(err);
      })
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
