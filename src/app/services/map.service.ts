import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class MapService {

  constructor(private httpClient:HttpClient) { }



coordinateSearch(lon:number,lat:number) {

  var url = (environment.osmReverseUrl|| '')
  .replace(new RegExp('{lon}', 'ig'), `${lon}`)
  .replace(new RegExp('{lat}', 'ig'), `${lat}`)
return this.httpClient.get(url);

}

citySearch(city:string){

  var url = (environment.osmDirectUrl|| '')
    .replace(new RegExp('{city}', 'ig'), `${city}`)

    return this.httpClient.get(url);
}

}