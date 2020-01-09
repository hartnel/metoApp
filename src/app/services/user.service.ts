import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {Location} from '../models/location';
import { Router } from '@angular/router';


@Injectable()
export class UserService {
  
  isAuth = false;
  user: any;

  private userLocations=new Map();
  constructor(private dbService: NgxIndexedDBService,private router:Router) {
    this.initLocations();
    dbService.currentStore = 'user';
    this.checkIfDatabaseIsEmpty();


    
  }

  addLocation(location : Location) : Promise<any>{

    if (this.userLocations.has(location.key)){
      console.log("localisation présente");
      alert("Vous avez déjà enregistré cette localisation");
      return;
    }


   // this.user.locations.push(location);
    this.userLocations.set(location.key,location);
    //return this.updateProfile(this.user)
  }

  removeLocation(location : Location) : Promise<any>{

    if(confirm("Voulez-vous vraiment supprimer cette localisation?")){
      this.userLocations.delete(location.key);
      this.router.navigateByUrl('locations/add');
      return;
      
    }
   let new_location = this.user.locations.filter(
     (loc : Location)=> (loc.name != location.name)
   )

   this.user.locations = new_location;
   return this.updateProfile(this.user);
    
  }


  getLocations(){
  return this.userLocations;
  }
 

  initLocations(){
    var yaounde=new Location(11.51667, 3.866);

      yaounde.country="Cameroun";
      yaounde.city="Yaoundé";

    var douala=new Location(9.7,4.05);
      douala.country="Cameroun";
      douala.city="Doualad";

      
     
      this.userLocations.set(douala.key,douala);
      this.userLocations.set(yaounde.key,yaounde);
     
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

  register(lastname?: string, firstname?: string, birthday?: Date, sex?: string, profile?: Blob, locations?:Location[]) {
    let user = {
      lastname: lastname,
      firstname: firstname,
      birthday: birthday,
      sex: sex,
      profile: profile,
      locations: locations,
    }
    return new Promise((resolve, reject) => {
      /* if(this.isAuth){
        return this.updateProfile(user);
      }*/
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