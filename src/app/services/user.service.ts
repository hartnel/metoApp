import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Location } from '../models/location';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocationService } from './location.service';


@Injectable()
export class UserService implements CanActivate {

  isAuth = false;


  user: any;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/register'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
  private userLocations = new Map();
  constructor(private dbService: NgxIndexedDBService, private router: Router, private locationService: LocationService) {
    this.initLocations();

/*
//test
var yaounde=new Location(11.53, 3.86);
      yaounde.city="Yaoundé";
      yaounde.country="Cameroun";
      yaounde.region="Centre";

      var douala=new Location(3,3);
      douala.city="Douala";
      douala.country="Cameroun";
      douala.region="Littoral";

      this.getLocations().set(douala.key, douala);
      this.getLocations().set(yaounde.key, yaounde);
//endTest

*/


    dbService.currentStore = 'user';
    this.checkIfDatabaseIsEmpty();

  }

  addLocation(location: Location) {

    this.locationService.addLocation(location)
      .then(() => {
       this.updateLocation()
      })
      .catch(err => {
        console.log(err);
      })
  }

  removeLocation(location: Location){
    this.locationService.removeLocation(location)
    .then(()=>{
      this.updateLocation()
    })
    .catch(err => console.log(err))
  }


  getLocations() {
    return this.userLocations;
  }


  async initLocations() {
    await this.locationService.initLocations()
      .then(() => {
        this.updateLocation();
      });




  }

  updateLocation() {
    this.userLocations = this.locationService.getLocations();
  }

  private checkIfDatabaseIsEmpty() {
    this.dbService.getAll()
      .then(users => {
        if (users.length === 0) {
          this.isAuth = true;
          this.user = users[0]
        }
        else {
          this.isAuth = false;
        }
      })
      .catch(err => {
        console.log(err);
      })

  }


  clearDB() {
    this.dbService.clear().then(
      () => {
      },
      error => {
        console.log(error);
      }
    );
  }

  register(lastname?: string, firstname?: string, birthday?: Date, sex?: string, profile?: Blob, locations?: Location[]) {
    let user = {
      lastname: lastname,
      firstname: firstname,
      birthday: birthday,
      sex: sex,
      profile: profile,
      locations: locations,
    }
    return new Promise((resolve, reject) => {
      this.clearDB()
      this.dbService.add(user)
        .then((id) => {
          this.isAuth = true;
          this.dbService.getByID(id)
            .then(user => {
              this.user = user
              resolve(this.user);
            })
            .catch(err => reject(err));
        }).catch(err => reject(err))

    })
  }

  private checkifShouldUpdate(old_obj, new_obj) {
    let keys = Object.keys(old_obj);
    let new_keys = Object.keys(new_obj);
    let final_object = {}
    keys.forEach(key => {
      final_object[key] = new_keys.includes(key) ? new_obj[key] : old_obj[key]
    })

    return final_object;

  }

  flushUpdate() {
    return new Promise((resolve, reject) => {
      this.dbService.update(this.user)
        .then(() => {
          resolve();
        })
        .catch(err => {
          this.checkIfDatabaseIsEmpty();
          reject(err);
        })
    })
  }

  updateProfile(infos: any) {
    return new Promise((resolve, reject) => {
      if (this.isAuth) {
        let updatedInfo = this.checkifShouldUpdate(this.user, { ...infos })
        this.dbService.update(updatedInfo)
          .then(() => {
            this.dbService.getByID(this.user.id)
              .then(user => {
                this.user = user;
                resolve()
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err))
      }
      else {
        let err = new Error("you are not auhtenticated");
        return reject(err);
      }
    })
  }

}
