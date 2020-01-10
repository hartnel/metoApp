import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const DEFAULT_CITY="assets/img/default_city.jpg";

const headers = new HttpHeaders()
            .set("Access-Control-Allow-Origin", "*");
 
@Injectable({
  providedIn: 'root'

})


export class TownImageService {

  constructor(private httpClient:HttpClient) { }

  currentTown:String=DEFAULT_CITY;

   getImage(location:Location):Observable <String>{

    


   var url=environment.wikiUrl+location.city;
    
    

    return this.httpClient.get(url,{headers}).pipe ( map(data=>{

  
      console.log(data);

      var pages=data['query'].pages;
      if(!pages[Object.keys(pages) [0]].thumbnail)
      {
      this.currentTown="url('" +DEFAULT_CITY+"')";
      return  DEFAULT_CITY;
      }
      
      
      var img= pages[Object.keys(pages) [0]].thumbnail.source;
      console.log(img)

      this.currentTown="url('" +img+"')";
      return img;
      
      

       })
    );
  }
}
