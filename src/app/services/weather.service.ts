import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  
  constructor(private http:HttpClient) { }  
   
   
   
   getCurrentWeather(location:Location) {
    return this.http.get(`${environment.owmUrl}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${environment.owmKey}`);
   }  
  
  getForecast(location:Location) {
    return this.http.get(`${environment.owmUrl}/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${environment.owmKey}`);
  } 
}
