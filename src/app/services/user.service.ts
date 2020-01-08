import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {Location} from '../models/location';


@Injectable()
export class UserService {

  isAuth = false;
  user: any;

  constructor(private dbService: NgxIndexedDBService) {
    dbService.currentStore = 'user';
    this.checkIfDatabaseIsEmpty();
  }

  addLocation(location : Location) : Promise<any>{
    this.user.locations.push(location);
    return this.updateProfile(this.user)
  }

  removeLocation(location : Location) : Promise<any>{
   let new_location = this.user.locations.filter(
     (loc : Location)=> (loc.name != location.name)
   )

   this.user.locations = new_location;
   return this.updateProfile(this.user);
    
  }



  getLocations(){
    var yaounde=new Location(0,0);
      yaounde.country="Cameroun";
      yaounde.city="Yaoundé";

    var douala=new Location(1,1);
      douala.country="Cameroun";
      douala.city="Douala";

      return [yaounde,douala];
  }

  private checkIfDatabaseIsEmpty() {
      this.dbService.getAll()
      .then(users =>{
        if (users.length===0){
          this.isAuth = true;
          this.user = users[0]
        }
        else{
          this.isAuth = false;
        }
      })
      .catch(err=>{
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

  register(lastname?: string, firstname?: string, birthday?: string, sex?: string, profile?: Blob, locations?:Location[]) : Promise<any>{
    let user = {
      lastname: lastname,
      firstname: firstname,
      birthday: birthday,
      sex: sex,
      profile: profile,
      locations: locations,
    }
    return new Promise((resolve, reject) => {
      if(this.isAuth){
        return this.updateProfile(user);
      }
      this.dbService.add(user)
        .then(() => {
          this.isAuth = true;
          this.user = user;
          resolve();
        })
        .catch(err => reject(err))
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

  updateProfile(infos: any)  : Promise<any>{
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