import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const DEFAULT_CITY="assets/img/default_city.jpg";

const headers = new HttpHeaders()
            .set("Access-Control-Allow-Origin", "*");
 
@Injectable({
  providedIn: 'root'

})


export class TownImageService {

  constructor(private httpClient:HttpClient) { }

  

  async getImage(location:Location){

   return DEFAULT_CITY;


   var url=environment.wikiUrl+location.city;
    this.httpClient.get(url,{headers}).subscribe(data=>console.log(data)  );
      
  }
}
